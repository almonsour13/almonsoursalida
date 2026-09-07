"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface DotTrendTextureProps {
    className?: string;
    /** Dot color, any valid CSS color. */
    dotColor?: string;
    /** Spacing between grid points, in px. */
    cell?: number;
    /** Half-length of each plus mark's arms, in px. */
    armLength?: number;
    /** Thickness of each plus mark's arms, in px. */
    armThickness?: number;
    /**
     * Height of the flat/left portion of the mass, as a fraction of the
     * container's height, before the rising trend kicks in.
     */
    baseHeight?: number;
    /**
     * Where (0-1, fraction of width) the mass starts climbing into the
     * rising trend line. Everything left of this stays roughly flat.
     */
    riseStart?: number;
    /**
     * How high the trend rises by the right edge, as an added fraction of
     * container height on top of baseHeight. Values above ~1 let the line
     * exit off the top of the container, like a chart trending off-frame.
     */
    riseAmount?: number;
    /** Shape of the rise curve — higher values keep it flatter for longer, then climb more sharply near the end. */
    riseSteepness?: number;
    /**
     * Thickness of the dithered transition band at the mass's edge, as a
     * fraction of container height. Larger = softer/organic edge.
     */
    edgeSoftness?: number;
    /** How chunky/organic the internal clumps and holes are (0-1). */
    clumpiness?: number;
    /** How much loose speckle appears just above the mass, fading with height. */
    speckleAmount?: number;
    /** Reproducible layout — same seed always produces the same pattern. */
    seed?: number;
}

// ---- deterministic value noise (no external deps) -------------------------

function mulberry32(seed: number) {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function make1DNoise(length: number, rng: () => number) {
    const points = Array.from({ length: Math.max(2, length) }, () => rng());
    return (t: number) => {
        const scaled = t * (points.length - 1);
        const i = Math.floor(scaled);
        const frac = scaled - i;
        const a = points[Math.min(i, points.length - 1)];
        const b = points[Math.min(i + 1, points.length - 1)];
        const eased = (1 - Math.cos(frac * Math.PI)) / 2;
        return a + (b - a) * eased;
    };
}

// Cheap 2D value noise: a small grid of random values, bilinearly
// interpolated with a smoothstep ease — good enough for organic-looking
// clumps at this scale without pulling in a real Perlin/simplex library.
function make2DNoise(gridW: number, gridH: number, rng: () => number) {
    const grid: number[][] = Array.from({ length: gridH }, () =>
        Array.from({ length: gridW }, () => rng()),
    );
    return (u: number, v: number) => {
        const x = u * (gridW - 1);
        const y = v * (gridH - 1);
        const x0 = Math.floor(x);
        const y0 = Math.floor(y);
        const x1 = Math.min(x0 + 1, gridW - 1);
        const y1 = Math.min(y0 + 1, gridH - 1);
        const fx = x - x0;
        const fy = y - y0;
        const ease = (t: number) => t * t * (3 - 2 * t);
        const sx = ease(fx);
        const sy = ease(fy);
        const top = grid[y0][x0] + (grid[y0][x1] - grid[y0][x0]) * sx;
        const bottom = grid[y1][x0] + (grid[y1][x1] - grid[y1][x0]) * sx;
        return top + (bottom - top) * sy;
    };
}

function fbm(
    noise: (u: number, v: number) => number,
    u: number,
    v: number,
    octaves: number,
    gain: number,
) {
    let amp = 1;
    let freq = 1;
    let sum = 0;
    let norm = 0;
    for (let i = 0; i < octaves; i++) {
        sum += amp * noise((u * freq) % 1, (v * freq) % 1);
        norm += amp;
        amp *= gain;
        freq *= 2;
    }
    return sum / norm;
}

export default function DotTrendTexture({
    className,
    dotColor = "rgba(190, 235, 190, 0.9)",
    cell = 10,
    armLength = 2,
    armThickness = 1,
    baseHeight = 0.24,
    riseStart = 0.5,
    riseAmount = 1.25,
    riseSteepness = 1.5,
    edgeSoftness = 0.3,
    clumpiness = 0.85,
    speckleAmount = 0.3,
    seed = 11,
}: DotTrendTextureProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = canvas?.parentElement;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = () => {
            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            if (!width || !height) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            const cols = Math.ceil(width / cell);
            const rows = Math.ceil(height / cell);

            const flatNoise = make1DNoise(10, mulberry32(seed));
            const clumpNoise = make2DNoise(10, 10, mulberry32(seed + 1));
            const speckleRng = mulberry32(seed + 2);

            // Flat-ish baseline for the left portion, climbing into a
            // rising trend line past `riseStart` — the core "chart line"
            // silhouette, distinct from the organic clump texture below.
            const baselineAt = (u: number) => {
                const rise =
                    Math.pow(
                        Math.max(0, (u - riseStart) / (1 - riseStart)),
                        riseSteepness,
                    ) * riseAmount;
                return baseHeight + 0.07 * flatNoise(u) + rise;
            };

            // Trailing tail thins out rather than staying as thick as the
            // main mass — tapers density down over the last ~40% of width.
            const taperAt = (u: number) =>
                1 - 0.3 * Math.max(0, Math.min(1, (u - 0.62) / 0.38));

            ctx.fillStyle = dotColor;

            const drawPlus = (cx: number, cy: number) => {
                ctx.fillRect(
                    cx - armLength,
                    cy - armThickness / 2,
                    armLength * 2 + armThickness,
                    armThickness,
                );
                ctx.fillRect(
                    cx - armThickness / 2,
                    cy - armLength,
                    armThickness,
                    armLength * 2 + armThickness,
                );
            };

            for (let row = 0; row < rows; row++) {
                const v = row / rows;
                const rowFrac = 1 - v; // 0 at bottom, 1 at top

                for (let col = 0; col < cols; col++) {
                    const u = col / cols;
                    const baseline = baselineAt(u);

                    // 0 right at the mass's crest, ramping to 1 deeper in.
                    const depth = (baseline - rowFrac) / edgeSoftness;
                    const mask = Math.max(0, Math.min(1, depth));

                    const clump = fbm(clumpNoise, u, v, 5, 0.55);
                    const field = clump * clumpiness + mask * 0.6;
                    const taper = taperAt(u);

                    const isBlob = field * taper > 0.78;

                    let isSpeckle = false;
                    if (!isBlob && depth < 0) {
                        // Only above the mass — fades out with height and
                        // is stronger toward the rising tail on the right.
                        const speckleZone = Math.max(0, Math.min(1, -depth));
                        const speckleChance =
                            (0.035 +
                                speckleAmount *
                                    Math.max(0, (u - 0.55) / 0.45)) *
                            Math.exp(-speckleZone * 2.6);
                        isSpeckle = speckleRng() < speckleChance;
                    }

                    if (isBlob || isSpeckle) {
                        const x = col * cell + cell / 2;
                        const y = row * cell + cell / 2;
                        drawPlus(x, y);
                    }
                }
            }
        };

        render();
        const ro = new ResizeObserver(render);
        ro.observe(container);

        return () => ro.disconnect();
    }, [
        dotColor,
        cell,
        armLength,
        armThickness,
        baseHeight,
        riseStart,
        riseAmount,
        riseSteepness,
        edgeSoftness,
        clumpiness,
        speckleAmount,
        seed,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 -z-10", className)}
            aria-hidden="true"
        />
    );
}
