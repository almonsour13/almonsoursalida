// components/decorative/dot-hover-texture.tsx
"use client";

import { useEffect, useRef } from "react";

const CELL = 10; // px per dot cell
const MIN_DOT_RADIUS = 0.4; // resting dot size
const MAX_DOT_RADIUS = 2.2; // dot size at peak (freshly touched) intensity
const RESTING_OPACITY = 0.8; // baseline opacity a touched dot ramps up from
const MAX_OPACITY = 1; // opacity at peak intensity
const INTENSITY_BUCKETS = 20; // active-dot opacity/radius levels, reduces fillStyle changes
const MAX_TRACKED_DOTS = 4000; // safety cap on how many fading dots we track at once

type TouchedDot = {
    peak: number; // intensity (0..1) captured at the moment of touch
    touchedAt: number; // performance.now() timestamp of the most recent touch
};

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

// Takes the CSS var name as a parameter now that it comes from a prop
// rather than a module-level constant.
function readCssVarColor(varName: string): string {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
}

/** "--primary" -> true, "rgb(128,128,128,0.5)" -> false */
function isCssVarName(value: string): boolean {
    return value.trim().startsWith("--");
}

export default function DotSprayTexture({
    className,
    hoverRadius = 60,
    falloff = "smooth",
    fadeDuration = 2200,
    dotColor = "rgb(128,128,128,0.5)",
    restingOpacity = 0.5,
    activeColor = "--primary",
}: {
    className?: string;
    /** px radius around the cursor within which dots get touched. Bigger = wider "brush" size. Defaults to 120. */
    hoverRadius?: number;
    /**
     * Shape of the brightness gradient across `hoverRadius` at the moment
     * a dot is touched. "smooth" eases out gradually; "linear" is constant;
     * "sharp" stays near-max until close to the edge. Defaults to "smooth".
     */
    falloff?: "smooth" | "linear" | "sharp";
    /** ms a touched dot takes to fade back to resting after the cursor leaves it. Defaults to 2200 (~a couple seconds). */
    fadeDuration?: number;
    /**
     * Resting dot color. Either a literal CSS color (e.g.
     * "rgb(128,128,128,0.5)", alpha included) or a CSS custom property
     * name (e.g. "--primary") to read at runtime — auto-detected by a
     * leading "--". A var-based color re-resolves automatically when the
     * theme changes, just like `activeColor` does.
     */
    dotColor?: string;
    /** Only applied when `dotColor` is a CSS var name (a literal color already carries its own alpha). Defaults to 0.5. */
    restingOpacity?: number;
    /** Name of a CSS custom property (e.g. "--primary") to read for the touched-dot color. */
    activeColor?: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = canvas?.parentElement;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dotColorIsVar = isCssVarName(dotColor);

        let dotColorRaw = dotColorIsVar ? readCssVarColor(dotColor) : dotColor;
        let activeColorRaw = readCssVarColor(activeColor);

        const themeObserver = new MutationObserver(() => {
            if (dotColorIsVar) dotColorRaw = readCssVarColor(dotColor);
            activeColorRaw = readCssVarColor(activeColor);
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class", "data-theme", "style"],
        });

        let cols = 0;
        let rows = 0;
        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

        let basePath: Path2D | null = null;
        const mouse = { x: -9999, y: -9999, active: false };

        // per-dot memory: idx -> when it was last touched and how bright.
        // This is the actual "trail" mechanism — everything else is just
        // reading from this map and letting entries age out.
        //
        // Important invariant this relies on: Map iteration order tracks
        // touch RECENCY, not just insertion order. That's what makes the
        // eviction below cheap (see the comment at the touch site).
        const touched = new Map<number, TouchedDot>();

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

            // grid dimensions changed — old indices no longer map to the
            // same positions, so any in-flight trail would render in the
            // wrong place. Simplest safe fix: clear it on resize.
            touched.clear();
        };

        const handleMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };
        const handleLeave = () => {
            mouse.active = false;
            // deliberately NOT clearing `touched` here — that's the whole
            // point, the trail should keep fading after the cursor leaves
        };

        const falloffCurve = (t: number) => {
            switch (falloff) {
                case "linear":
                    return 1 - t;
                case "sharp":
                    return Math.pow(1 - t, 3);
                case "smooth":
                default:
                    return 1 - t * t * (3 - 2 * t);
            }
        };

        const bucketPaths: (Path2D | null)[] = new Array(
            INTENSITY_BUCKETS + 1,
        ).fill(null);

        const draw = (now: number) => {
            if (!width || !height || !basePath) {
                raf = requestAnimationFrame(draw);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            // resting grid — one fill call regardless of grid size.
            // `dotColor` is already a complete color string with its own
            // alpha (e.g. "rgb(128,128,128,0.5)"), so it's used directly
            // rather than wrapped in a second opacity value.
            ctx.fillStyle = dotColor;
            ctx.fill(basePath);

            // 1) stamp: while the cursor is active, mark/refresh every dot
            // currently within hoverRadius. This is the "drawing" step —
            // it only ever writes touchedAt = now, it never fades anything.
            if (mouse.active) {
                const minCol = Math.max(
                    0,
                    Math.floor((mouse.x - hoverRadius) / CELL),
                );
                const maxCol = Math.min(
                    cols - 1,
                    Math.ceil((mouse.x + hoverRadius) / CELL),
                );
                const minRow = Math.max(
                    0,
                    Math.floor((mouse.y - hoverRadius) / CELL),
                );
                const maxRow = Math.min(
                    rows - 1,
                    Math.ceil((mouse.y + hoverRadius) / CELL),
                );

                for (let row = minRow; row <= maxRow; row++) {
                    for (let col = minCol; col <= maxCol; col++) {
                        const x = col * CELL + CELL / 2;
                        const y = row * CELL + CELL / 2;

                        const dx = x - mouse.x;
                        const dy = y - mouse.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist > hoverRadius) continue;

                        const t = dist / hoverRadius;
                        const intensity = Math.max(0, falloffCurve(t));
                        if (intensity < 0.03) continue;

                        const idx = row * cols + col;
                        const existing = touched.get(idx);
                        const nextPeak = existing
                            ? Math.max(existing.peak, intensity)
                            : intensity;

                        // Deleting before re-setting an existing key moves
                        // it to the end of the Map's iteration order — that
                        // is what makes the eviction below cheap and
                        // correct. Without this, a dot re-touched 5 seconds
                        // after its first touch would still sit wherever it
                        // was FIRST inserted, so "evict the first N keys by
                        // iteration order" would evict the wrong entries
                        // (recently-touched, bright dots) instead of the
                        // genuinely stale ones.
                        if (existing) {
                            touched.delete(idx);
                        }
                        touched.set(idx, { peak: nextPeak, touchedAt: now });
                    }
                }

                // Safety cap so `touched` can't grow without bound during a
                // long, wide sweep. Because Map iteration order tracks
                // touch recency (see above), the oldest-touched entries are
                // simply the first ones the iterator yields — no sort
                // needed, and the cost is proportional to how far over the
                // cap we are, not to the total number of tracked dots.
                if (touched.size > MAX_TRACKED_DOTS) {
                    let overflow = touched.size - MAX_TRACKED_DOTS;
                    const it = touched.keys();
                    while (overflow-- > 0) {
                        const next = it.next();
                        if (next.done) break;
                        touched.delete(next.value);
                    }
                }
            }

            // 2) fade: every tracked dot decays purely based on time since
            // its own last touch — completely independent of current mouse
            // position. This runs every frame whether or not the mouse is
            // even active, which is what lets the trail keep fading after
            // the cursor leaves entirely.
            for (let i = 0; i < bucketPaths.length; i++) bucketPaths[i] = null;

            for (const [idx, dot] of touched) {
                const elapsed = now - dot.touchedAt;
                if (elapsed >= fadeDuration) {
                    touched.delete(idx);
                    continue;
                }

                const fadeT = elapsed / fadeDuration; // 0 (just touched) .. 1 (fully faded)
                const intensity = dot.peak * (1 - fadeT * fadeT); // eased fade-out

                if (intensity < 0.03) {
                    touched.delete(idx);
                    continue;
                }

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

                ctx.fillStyle = withAlpha(activeColorRaw, opacity);
                ctx.fill(path);
            }

            raf = requestAnimationFrame(draw);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(container);

        container.addEventListener("mousemove", handleMove);
        container.addEventListener("mouseleave", handleLeave);
        raf = requestAnimationFrame(draw);

        return () => {
            ro.disconnect();
            themeObserver.disconnect();
            container.removeEventListener("mousemove", handleMove);
            container.removeEventListener("mouseleave", handleLeave);
            cancelAnimationFrame(raf);
        };
    }, [hoverRadius, falloff, fadeDuration, dotColor, activeColor]);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
