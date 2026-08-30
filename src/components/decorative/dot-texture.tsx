"use client";

import { useEffect, useRef } from "react";

const CELL = 10; // px per dot cell
const MIN_DOT_RADIUS = 0.4; // resting dot size
const MAX_DOT_RADIUS = 2; // dot size at full ripple intensity
const RESTING_OPACITY = 0.8; // idle dot opacity — visible at rest
const MAX_OPACITY = 1; // opacity at full ripple intensity
const MAX_RIPPLES = 8; // more concurrent ripples = a continuously busy field
const DOT_COLOR = "128,128,128"; // resting dot color (gray) — plain R,G,B
const ACTIVE_COLOR_VAR = "--primary"; // CSS var read at runtime for active dots
const INTENSITY_BUCKETS = 20; // active-dot opacity/radius levels, reduces fillStyle changes

// Default range (ms) between auto-spawned ripples when no interval prop is
// given — a new ripple fires at MIN + random()*(MAX-MIN) after the last one.
const DEFAULT_AUTO_ANIMATE_INTERVAL: [number, number] = [900, 1800];

type Ripple = {
    x: number;
    y: number;
    start: number; // performance.now() timestamp when it was created
};

// CSS Color 4 functions (oklch(), hsl(), rgb(), lab(), etc.) all accept a
// trailing "/ alpha" inside their own parens. Rather than assuming a
// specific format (rgb triplet, oklch triplet, ...), just splice the alpha
// in before the color string's closing paren — works regardless of which
// color function your design tokens are actually written in.
function withAlpha(colorValue: string, alpha: number): string {
    const trimmed = colorValue.trim();
    const closeIdx = trimmed.lastIndexOf(")");
    if (!trimmed || closeIdx === -1) {
        // not a function-form color (e.g. empty, or a bare hex/named color)
        // — can't safely splice alpha into those, so return as-is
        return trimmed || `rgba(0,0,0,${alpha})`;
    }
    return `${trimmed.slice(0, closeIdx)} / ${alpha})`;
}

function readActiveColor(): string {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(ACTIVE_COLOR_VAR)
        .trim();
}

export default function DotTexture({
    className,
    reduceMotion,
    autoAnimate = true,
    interactive = true,
    autoAnimateInterval = DEFAULT_AUTO_ANIMATE_INTERVAL,
}: {
    className?: string;
    reduceMotion?: boolean | null;
    /** When false, no ambient ripples spawn on their own — only mouse-triggered ones (if `interactive`). Defaults to true. */
    autoAnimate?: boolean;
    /** When false, mouse movement no longer spawns ripples. Defaults to true. */
    interactive?: boolean;
    /**
     * [min, max] ms between auto-spawned ripples — each gap is
     * `min + random() * (max - min)`. Lower values = busier/faster field,
     * higher = calmer/sparser. Pass a single number to use a fixed
     * (non-random) interval. Defaults to [900, 1800]. Ignored when
     * `autoAnimate` is false.
     */
    autoAnimateInterval?: [number, number] | number;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ripples = useRef<Ripple[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = canvas?.parentElement;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // normalize the interval prop to a [min, max] pair once per effect
        // run, so a bare number becomes a fixed (zero-jitter) interval
        const [intervalMin, intervalMax] =
            typeof autoAnimateInterval === "number"
                ? [autoAnimateInterval, autoAnimateInterval]
                : autoAnimateInterval;

        // FIX: was a `const` captured once at effect setup, so it never
        // reflected a runtime theme change. Now mutable, refreshed by the
        // observer below whenever the theme actually toggles.
        let activeColorRaw = readActiveColor();

        // Re-read the CSS var only when the theme changes (attribute
        // mutation on <html>), not every frame — cheap and correct,
        // covers next-themes / Tailwind darkMode:'class' / data-theme
        // approaches in one observer.
        const themeObserver = new MutationObserver(() => {
            activeColorRaw = readActiveColor();
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-theme", "style"],
        });

        let cols = 0;
        let rows = 0;
        let width = 0;
        let height = 0;
        // capped lower than before (2 -> 1.5) — retina sharpness barely
        // changes at this dot size, but pixel count (and draw cost) does
        let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        let basePath: Path2D | null = null;
        let intensityBuffer: Float32Array | null = null;
        const touched: number[] = [];

        let raf = 0;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            cols = Math.ceil(width / CELL) + 1;
            rows = Math.ceil(height / CELL) + 1;

            // build the resting grid once as a single reusable path — this
            // is the single biggest win, since it replaces cols*rows
            // individual arc()+fill() calls every frame with one fill()
            const path = new Path2D();
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * CELL + CELL / 2;
                    const y = row * CELL + CELL / 2;
                    path.moveTo(x + MIN_DOT_RADIUS, y);
                    path.arc(x, y, MIN_DOT_RADIUS, 0, Math.PI * 2);
                }
            }
            basePath = path;
            intensityBuffer = new Float32Array(cols * rows);
        };

        const addRipple = (x: number, y: number) => {
            ripples.current.push({ x, y, start: performance.now() });
            if (ripples.current.length > MAX_RIPPLES) {
                ripples.current.shift();
            }
        };

        const handleMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const last = ripples.current[ripples.current.length - 1];
            if (!last || performance.now() - last.start > 180) {
                addRipple(x, y);
            }
        };

        const WAVELENGTH = 40; // px between ring peaks
        const SPEED = 0.075; // px/ms the ring front travels
        const LIFETIME = 4200; // ms before a ripple fully fades
        const RING_WIDTH = 120; // px, width of the trailing bright band

        // active-dot buckets, reused every frame instead of reallocated
        const bucketPaths: (Path2D | null)[] = new Array(
            INTENSITY_BUCKETS + 1,
        ).fill(null);

        let nextAutoAt = performance.now() + intervalMin;

        const draw = (now: number) => {
            if (!width || !height || !intensityBuffer || !basePath) {
                raf = requestAnimationFrame(draw);
                return;
            }

            if (!reduceMotion && autoAnimate && now > nextAutoAt) {
                addRipple(Math.random() * width, Math.random() * height);
                nextAutoAt =
                    now +
                    intervalMin +
                    Math.random() * (intervalMax - intervalMin);
            }

            ripples.current = ripples.current.filter(
                (r) => now - r.start < LIFETIME,
            );

            ctx.clearRect(0, 0, width, height);

            // 1) resting grid — one fill call, regardless of grid size
            ctx.fillStyle = `rgba(${DOT_COLOR}, ${RESTING_OPACITY})`;
            ctx.fill(basePath);

            // 2) accumulate ripple intensity, but only within each ripple's
            // own bounding box instead of scanning the entire grid per ripple
            intensityBuffer.fill(0);
            touched.length = 0;

            for (const ripple of ripples.current) {
                const age = now - ripple.start;
                const frontRadius = age * SPEED;
                if (frontRadius <= 0) continue;

                const fadeOut = 1 - age / LIFETIME;
                if (fadeOut <= 0) continue;

                // outer bound of possible influence for this ripple
                const reach = frontRadius;
                const minCol = Math.max(
                    0,
                    Math.floor((ripple.x - reach) / CELL),
                );
                const maxCol = Math.min(
                    cols - 1,
                    Math.ceil((ripple.x + reach) / CELL),
                );
                const minRow = Math.max(
                    0,
                    Math.floor((ripple.y - reach) / CELL),
                );
                const maxRow = Math.min(
                    rows - 1,
                    Math.ceil((ripple.y + reach) / CELL),
                );

                for (let row = minRow; row <= maxRow; row++) {
                    for (let col = minCol; col <= maxCol; col++) {
                        const x = col * CELL + CELL / 2;
                        const y = row * CELL + CELL / 2;

                        const dx = x - ripple.x;
                        const dy = y - ripple.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        const distFromFront = frontRadius - dist;
                        if (distFromFront < 0 || distFromFront > RING_WIDTH) {
                            continue;
                        }

                        const ringPhase =
                            Math.cos(
                                (distFromFront / WAVELENGTH) * Math.PI * 2,
                            ) *
                                0.5 +
                            0.5;

                        const fadeEdge = 1 - distFromFront / RING_WIDTH;
                        const contribution =
                            ringPhase * fadeOut * fadeEdge * 0.55;

                        const idx = row * cols + col;
                        if (intensityBuffer[idx] === 0 && contribution > 0) {
                            touched.push(idx);
                        }
                        intensityBuffer[idx] += contribution;
                    }
                }
            }

            // 3) render only the touched cells, bucketed by rounded
            // intensity so we do a handful of fill() calls instead of one
            // fillStyle change per active dot — now using the site's actual
            // --primary color (whatever format it's defined in)
            for (let i = 0; i < bucketPaths.length; i++) bucketPaths[i] = null;

            for (const idx of touched) {
                const intensity = Math.min(1, intensityBuffer[idx]);
                if (intensity < 0.03) continue;

                const bucket = Math.round(intensity * INTENSITY_BUCKETS);
                const row = Math.floor(idx / cols);
                const col = idx % cols;
                const x = col * CELL + CELL / 2;
                const y = row * CELL + CELL / 2;

                const bucketIntensity = bucket / INTENSITY_BUCKETS;
                const radius =
                    MIN_DOT_RADIUS +
                    (MAX_DOT_RADIUS - MIN_DOT_RADIUS) * bucketIntensity;

                let path = bucketPaths[bucket];
                if (!path) {
                    path = new Path2D();
                    bucketPaths[bucket] = path;
                }
                path.moveTo(x + radius, y);
                path.arc(x, y, radius, 0, Math.PI * 2);
            }

            for (let bucket = 0; bucket < bucketPaths.length; bucket++) {
                const path = bucketPaths[bucket];
                if (!path) continue;

                const bucketIntensity = bucket / INTENSITY_BUCKETS;
                const opacity =
                    RESTING_OPACITY +
                    (MAX_OPACITY - RESTING_OPACITY) * bucketIntensity;

                // reads the mutable, observer-refreshed value instead of
                // the value frozen at effect setup
                ctx.fillStyle = withAlpha(activeColorRaw, opacity);
                ctx.fill(path);
            }

            raf = requestAnimationFrame(draw);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        if (interactive) {
            container.addEventListener("mousemove", handleMove);
        }
        raf = requestAnimationFrame(draw);

        return () => {
            ro.disconnect();
            themeObserver.disconnect();
            if (interactive) {
                container.removeEventListener("mousemove", handleMove);
            }
            cancelAnimationFrame(raf);
        };
    }, [reduceMotion, autoAnimate, interactive, autoAnimateInterval]);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
