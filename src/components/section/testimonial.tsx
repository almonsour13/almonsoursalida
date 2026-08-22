"use client";

import { TESTIMONIALS } from "@/constant/testimonial";
import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    motion,
    useAnimationFrame,
    useMotionValue,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TextAnimate from "../animation/text-animate";
import WordReveal from "../animation/word-reveal";
import EdgeDash from "../decorative/edge-dash";
import GridLines from "../decorative/grid-lines";
import SectionWrapper from "../layout/section-wrapper";

const SPEED_PERCENT_PER_SEC = 50 / 70;
const FEATURED_INTERVAL_MS = 10000;

function wrap(min: number, max: number, value: number) {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
}

const TRUST_WORDS = ["clients", "founders", "teams", "partners", "businesses"];
export default function Testimonials() {
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const marquee = [...TESTIMONIALS, ...TESTIMONIALS];
    const trackRef = useRef<HTMLDivElement>(null);
    const isPaused = useRef(false);
    const prefersReducedMotion = useRef(false);

    const baseX = useMotionValue(0);
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    useEffect(() => {
        prefersReducedMotion.current = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
    }, []);

    useAnimationFrame((_, delta) => {
        if (isPaused.current || prefersReducedMotion.current) return;
        baseX.set(baseX.get() - (delta / 1000) * SPEED_PERCENT_PER_SEC);
    });

    // rotate the featured testimonial on an interval
    useEffect(() => {
        if (prefersReducedMotion.current) return;
        const id = setInterval(() => {
            setFeaturedIndex((i) => (i + 1) % TESTIMONIALS.length);
        }, FEATURED_INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    const featured = TESTIMONIALS[featuredIndex];

    return (
        <SectionWrapper id="testimonials">
            <div className="relative flex flex-col pb-8 md:pb-16">
                <EdgeDash side="right" className="z-20 hidden md:block" />
                <EdgeDash side="left" className="z-20 hidden md:block" />
                <div className="relative flex flex-col items-start md:items-center gap-2 pt-16 md:pt-20 pb-8 md:pb-12">
                    <span className="text-xs font-medium text-primary uppercase">
                        [ TESTIMONIALS ]
                    </span>
                    <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-foreground items-start md:text-center">
                        Trusted by{" "}
                        <TextAnimate
                            words={TRUST_WORDS}
                            type="slide"
                            className="text-primary"
                            interval={5000}
                        />
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base items-tart md:text-center">
                        Honest reviews from founders, teams, and partners I've
                        collaborated with to build high-performing digital
                        products.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="md:px-4">
                        <div className="relative flex flex-col justify-center border border-dashed items-center gap-4 p-4 py-16 md:py-20 rounded overflow-hidden h-auto min-h-[320px] md:min-h-[280px]">
                            <GridLines className="z-10" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={featuredIndex}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                    className="absolute inset-0 z-20 flex flex-col items-start md:items-center justify-center gap-4 px-6 md:px-16"
                                >
                                    <h3 className="text-2xl font-medium leading-tight tracking-tight md:text-4xl text-start md:text-center">
                                        <WordReveal
                                            text={featured.quote}
                                            quotes
                                            stepMs={100}
                                        />
                                    </h3>

                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        -{featured.name}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="relative flex flex-col md:col-span-2 rounded overflow-hidden">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-background to-transparent z-10" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10" />

                        <div
                            className="flex w-full flex-1 overflow-hidden"
                            onMouseEnter={() => {
                                isPaused.current = true;
                            }}
                            onMouseLeave={() => {
                                isPaused.current = false;
                            }}
                        >
                            <motion.div
                                ref={trackRef}
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
                                        trackRef.current?.offsetWidth || 1;
                                    baseX.set(
                                        baseX.get() +
                                            (info.delta.x / trackWidth) * 100,
                                    );
                                }}
                                onDragEnd={() => {
                                    isPaused.current = false;
                                }}
                            >
                                {marquee.map((item, i) => {
                                    const isFeatured =
                                        i % TESTIMONIALS.length ===
                                        featuredIndex;

                                    return (
                                        <div
                                            key={`${item.quote}-${i}`}
                                            className="relative w-[300px] shrink-0 animate-card-pop"
                                        >
                                            <div
                                                className={cn(
                                                    "flex h-full flex-col gap-3 rounded border p-4 transition-colors duration-300",
                                                    isFeatured ? "bg-card" : "",
                                                )}
                                            >
                                                <p className="text-sm leading-relaxed text-foreground">
                                                    &ldquo;{item.quote}&rdquo;
                                                </p>

                                                <div className="mt-auto flex items-center gap-2.5">
                                                    <div className="min-w-0">
                                                        <p className="truncate text-xs font-medium text-foreground">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
