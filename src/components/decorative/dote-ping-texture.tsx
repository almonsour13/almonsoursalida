"use client";

import { useEffect, useRef } from "react";

const CELL = 10; // px per dot cell — slightly larger cells read better at big scale
const MIN_DOT_RADIUS = 0.4; // resting dot size
const MAX_DOT_RADIUS = 2; // dot size at full pulse intensity
const MIN_ACTIVE_OPACITY = 0.4; // baseline opacity a ping dot ramps up from
const MAX_OPACITY = 1; // opacity at full pulse intensity
const INTENSITY_BUCKETS = 20; // active-dot opacity/radius levels, reduces fillStyle changes

const PING_INTERVAL = 12000; // ms for one full pulse cycle (spawn -> fully faded)

// CSS Color 4 functions (oklch(), hsl(), rgb(), lab(), etc.) all accept a
// trailing "/ alpha" inside their own parens — splice it in rather than
// assuming a specific color format for --primary.
function withAlpha(colorValue: string, alpha: number): string {
    const trimmed = colorValue.trim();
    const closeIdx = trimmed.lastIndexOf(")");
    if (!trimmed || closeIdx === -1) {
        return trimmed || `rgba(0,0,0,${alpha})`;
    }
    return `${trimmed.slice(0, closeIdx)} / ${alpha})`;
}

function readCssVar(name: string): string {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
}

export default function DotPingTexture({
    className,
    reduceMotion,
    travelRatio = 0.9,
    ringWidthRatio = 0.22,
    dotColor = "rgb(128,128,128,0.5)",
    activeColor = "--primary-foreground",
}: {
    className?: string;
    /** When true, renders only the static resting grid — no pulsing. */
    reduceMotion?: boolean | null;
    /**
     * How far the ring travels before fully fading, as a fraction of the
     * container's diagonal. 0.9 means it nearly reaches the corners.
     * Raise for a bigger container, or just leave the default — it scales
     * automatically since it's relative, not a fixed pixel value.
     */
    travelRatio?: number;
    /**
     * Thickness of the glowing band, as a fraction of the container's
     * diagonal. Larger containers get a proportionally wider ring.
     */
    ringWidthRatio?: number;
    /** Resting dot color — any valid CSS color string, alpha included. */
    dotColor?: string;
    /** Name of a CSS custom property (e.g. "--primary") to read for the ping color. */
    activeColor?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = canvas?.parentElement;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Mutable so it can be refreshed by the observer below when the
        // theme changes at runtime.
        let activeColorRaw = readCssVar(activeColor);

        // Re-read the CSS var whenever the theme actually changes, rather
        // than every frame (which would work but wastes a getComputedStyle
        // call 60x/sec for something that changes rarely). Most theme
        // toggles (next-themes, Tailwind darkMode: 'class', etc.) flip a
        // class or data-attribute on <html>, so watching those covers it.
        const themeObserver = new MutationObserver(() => {
            activeColorRaw = readCssVar(activeColor);
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-theme", "style"],
        });

        // Only draw while the canvas is actually on screen — this loop
        // would otherwise run at 60fps for the lifetime of the page even
        // when the section is scrolled far out of view.
        let isVisible = false;
        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                const wasVisible = isVisible;
                isVisible = entry.isIntersecting;
                // Coming back into view after being paused — restart the
                // rAF loop (it exits early and stops re-scheduling itself
                // once invisible, so it must be kicked off again here).
                if (isVisible && !wasVisible) {
                    raf = requestAnimationFrame(draw);
                }
            },
            { threshold: 0 },
        );
        visibilityObserver.observe(canvas);

        let cols = 0;
        let rows = 0;
        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        let basePath: Path2D | null = null;
        let centerX = 0;
        let centerY = 0;

        // derived from the container's own diagonal, recomputed on resize
        let diagonal = 0;
        let ringWidth = 0;
        let speed = 0; // px/ms, derived so the ring covers travelRatio*diagonal by PING_INTERVAL
        let wavelength = 0;

        let raf = 0;
        const startTime = performance.now();

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
            centerX = width / 2;
            centerY = height / 2;

            diagonal = Math.hypot(width, height);
            ringWidth = diagonal * ringWidthRatio;
            speed = (diagonal * travelRatio) / PING_INTERVAL;
            wavelength = ringWidth * 0.4; // proportionate internal banding

            // resting grid, cached once as a single reusable path
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
        };

        // active-dot buckets, reused every frame instead of reallocated
        const bucketPaths: (Path2D | null)[] = new Array(
            INTENSITY_BUCKETS + 1,
        ).fill(null);

        const draw = (now: number) => {
            if (!isVisible) return; // don't reschedule — the observer restarts us on re-entry

            if (!width || !height || !basePath) {
                raf = requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // resting grid — one fill call regardless of grid size
            ctx.fillStyle = dotColor;
            ctx.fill(basePath);

            if (!reduceMotion) {
                // two pulses staggered by half the interval, so a new ring
                // is always emerging as the previous one fades
                const elapsed = now - startTime;
                const ages = [
                    elapsed % PING_INTERVAL,
                    (elapsed + PING_INTERVAL / 2) % PING_INTERVAL,
                ];

                for (let i = 0; i < bucketPaths.length; i++)
                    bucketPaths[i] = null;

                const maxReach = diagonal / 2 + ringWidth;

                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const x = col * CELL + CELL / 2;
                        const y = row * CELL + CELL / 2;

                        const dx = x - centerX;
                        const dy = y - centerY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist > maxReach) continue;

                        let intensity = 0;

                        for (const age of ages) {
                            const frontRadius = age * speed;
                            const distFromFront = frontRadius - dist;
                            if (
                                distFromFront < 0 ||
                                distFromFront > ringWidth
                            ) {
                                continue;
                            }

                            const ringPhase =
                                Math.cos(
                                    (distFromFront / wavelength) * Math.PI * 2,
                                ) *
                                    0.5 +
                                0.5;

                            const fadeOut = 1 - age / PING_INTERVAL;
                            const fadeEdge = 1 - distFromFront / ringWidth;

                            intensity += ringPhase * fadeOut * fadeEdge * 0.6;
                        }

                        intensity = Math.min(1, intensity);
                        if (intensity < 0.04) continue;

                        const bucket = Math.round(
                            intensity * INTENSITY_BUCKETS,
                        );
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
                }

                for (let bucket = 0; bucket < bucketPaths.length; bucket++) {
                    const path = bucketPaths[bucket];
                    if (!path) continue;

                    const bucketIntensity = bucket / INTENSITY_BUCKETS;
                    const opacity =
                        MIN_ACTIVE_OPACITY +
                        (MAX_OPACITY - MIN_ACTIVE_OPACITY) * bucketIntensity;

                    // now reads the mutable, observer-refreshed value
                    // instead of a value frozen at effect setup
                    ctx.fillStyle = withAlpha(activeColorRaw, opacity);
                    ctx.fill(path);
                }
            }

            raf = requestAnimationFrame(draw);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        raf = requestAnimationFrame(draw);

        return () => {
            ro.disconnect();
            themeObserver.disconnect();
            visibilityObserver.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [reduceMotion, travelRatio, ringWidthRatio, dotColor, activeColor]);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
