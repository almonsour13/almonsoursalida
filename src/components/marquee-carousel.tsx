"use client";

import { cn } from "@/lib/utils";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

interface MarqueeCarouselProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    speedPerSec?: number;
    className?: string;
    pauseOnHover?: boolean;
    direction?: "left" | "right";
}

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
    const duplicatedItems = [...items, ...items, ...items]; // Triple array for safer padding boundary
    const isPaused = useRef(false);
    const prefersReducedMotion = useRef(false);

    const reduceMotion = useReducedMotion();

    // Initialize base position depending on direction to prevent initial jump
    const baseX = useMotionValue(direction === "right" ? -33.33 : 0);

    const x = useTransform(baseX, (v) => `${wrap(-33.33, 0, v)}%`);

    useEffect(() => {
        prefersReducedMotion.current = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
    }, []);

    useAnimationFrame((_, delta) => {
        if (isPaused.current || prefersReducedMotion.current) return;

        const moveBy = (delta / 1000) * speedPerSec;
        baseX.set(
            direction === "right" ? baseX.get() + moveBy : baseX.get() - moveBy,
        );
    });

    return (
        <div className={cn("relative overflow-hidden w-full", className)}>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-20" />

            <div
                className="flex w-full flex-1 overflow-hidden"
                onMouseEnter={() => {
                    if (pauseOnHover) isPaused.current = true;
                }}
                onMouseLeave={() => {
                    if (pauseOnHover) isPaused.current = false;
                }}
            >
                <motion.div
                    className="flex gap-2 w-max cursor-grab active:cursor-grabbing"
                    style={{ x }}
                    drag="x"
                    dragConstraints={false}
                    dragElastic={0}
                    onDragStart={() => {
                        isPaused.current = true;
                    }}
                    onDrag={(_, info) => {
                        const trackWidth =
                            document.documentElement.clientWidth || 1;
                        const deltaPercent = (info.delta.x / trackWidth) * 100;
                        baseX.set(
                            direction === "right"
                                ? baseX.get() + deltaPercent
                                : baseX.get() + deltaPercent,
                        );
                    }}
                    onDragEnd={() => {
                        isPaused.current = false;
                    }}
                >
                    {duplicatedItems.map((item, i) => (
                        <>{renderItem(item, i)}</>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
