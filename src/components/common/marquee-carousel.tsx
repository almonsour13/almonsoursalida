"use client";

import { cn } from "@/lib/utils";
import {
    motion,
    useAnimationFrame,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from "framer-motion";
import { Fragment, ReactNode, useRef } from "react";

interface MarqueeCarouselProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    speedPerSec?: number;
    className?: string;
    pauseOnHover?: boolean;
    direction?: "left" | "right";
}

const COPIES = 3;
const PERIOD = 100 / COPIES; // exactly one copy, in % of the track width
const MAX_DELTA_MS = 64; // stops a big jump after the tab was in the background

function wrap(min: number, max: number, value: number) {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
}

export function MarqueeCarousel<T>({
    items,
    renderItem,
    speedPerSec = 50 / 36,
    className,
    pauseOnHover = true,
    direction = "left",
}: MarqueeCarouselProps<T>) {
    const reduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const hovered = useRef(false);
    const dragging = useRef(false);
    const inView = useInView(containerRef);

    // Start at the right edge of the loop when moving right, to avoid an initial jump
    const baseX = useMotionValue(direction === "right" ? -PERIOD : 0);
    const x = useTransform(baseX, (v) => `${wrap(-PERIOD, 0, v)}%`);

    useAnimationFrame((_, delta) => {
        if (
            reduceMotion ||
            !inView ||
            items.length === 0 ||
            hovered.current ||
            dragging.current
        )
            return;

        const moveBy = (Math.min(delta, MAX_DELTA_MS) / 1000) * speedPerSec;
        const next = baseX.get() + (direction === "right" ? moveBy : -moveBy);
        baseX.set(wrap(-PERIOD, 0, next)); // keep the stored value bounded
    });

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full overflow-hidden", className)}
        >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-20" />

            <div
                className="flex w-full overflow-hidden"
                onPointerEnter={(e) => {
                    if (pauseOnHover && e.pointerType === "mouse")
                        hovered.current = true;
                }}
                onPointerLeave={() => {
                    hovered.current = false;
                }}
            >
                <motion.div
                    ref={trackRef}
                    className="flex w-max cursor-grab select-none active:cursor-grabbing"
                    style={{ x, touchAction: "pan-y" }}
                    onPanStart={() => {
                        dragging.current = true;
                    }}
                    onPan={(_, info) => {
                        const width = trackRef.current?.offsetWidth;
                        if (!width) return;
                        const deltaPercent = (info.delta.x / width) * 100;
                        baseX.set(wrap(-PERIOD, 0, baseX.get() + deltaPercent));
                    }}
                    onPanEnd={() => {
                        dragging.current = false;
                    }}
                >
                    {Array.from({ length: COPIES }, (_, copy) => (
                        <div
                            key={copy}
                            aria-hidden={copy > 0 ? true : undefined}
                            className="flex shrink-0 gap-2 pr-2"
                        >
                            {items.map((item, i) => (
                                <Fragment key={i}>
                                    {renderItem(item, i)}
                                </Fragment>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
