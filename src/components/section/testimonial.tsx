"use client";

import { TESTIMONIALS } from "@/constant/testimonial";
import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    motion,
    useInView,
    useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TextAnimate from "../animation/text-animate";
import WordReveal from "../animation/word-reveal";
import { MarqueeCarousel } from "../common/marquee-carousel";
import ContentContainer from "../layout/content-container";
import { Card } from "../ui/card";

const FEATURED_INTERVAL_MS = 10000;
const TRUST_WORDS = ["clients", "founders", "teams", "partners", "businesses"];

export default function Testimonials() {
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduceMotion = !!useReducedMotion();
    const featuredRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(featuredRef, { amount: 0.3 });

    const count = TESTIMONIALS.length;

    useEffect(() => {
        if (reduceMotion || paused || !isInView || count < 2) return;
        const id = setInterval(() => {
            setFeaturedIndex((i) => (i + 1) % count);
        }, FEATURED_INTERVAL_MS);
        return () => clearInterval(id);
    }, [reduceMotion, paused, isInView, count]);

    if (count === 0) return null;

    const featured = TESTIMONIALS[featuredIndex];

    return (
        <ContentContainer id="testimonials">
            <div className="relative flex flex-col">
                <div className="relative flex flex-col items-start gap-2 pb-8 md:pb-12">
                    <h1 className="text-5xl font-light capitalize leading-tight tracking-tight text-foreground">
                        Trusted by{" "}
                        <TextAnimate
                            words={TRUST_WORDS}
                            type="slide"
                            className="text-primary"
                            interval={5000}
                        />
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Honest reviews from founders, teams, and partners{" "}
                        {"I've"} collaborated with to build high-performing
                        digital products.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Featured quote */}
                    <Card
                        ref={featuredRef}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocus={() => setPaused(true)}
                        onBlur={() => setPaused(false)}
                        className="relative flex min-h-[320px] items-center justify-center overflow-hidden border bg-card p-4 md:min-h-[280px] md:p-8"
                    >
                        <AnimatePresence mode="wait">
                            <motion.figure
                                key={featuredIndex}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{
                                    duration: reduceMotion ? 0 : 0.4,
                                    ease: "easeOut",
                                }}
                                className="flex flex-col items-start justify-center gap-4 px-2 md:items-center md:px-16"
                            >
                                <blockquote className="text-start text-2xl font-light leading-tight tracking-tight text-foreground md:text-center md:text-4xl">
                                    <WordReveal
                                        text={featured.quote}
                                        quotes
                                        stepMs={100}
                                    />
                                </blockquote>
                                <figcaption className="text-sm leading-relaxed text-muted-foreground">
                                    — {featured.name}
                                </figcaption>
                            </motion.figure>
                        </AnimatePresence>
                    </Card>

                    {/* Marquee */}
                    <MarqueeCarousel
                        items={TESTIMONIALS}
                        speedPerSec={0.35}
                        direction="left"
                        renderItem={(testimonial, i) => {
                            const isFeatured = i % count === featuredIndex;

                            return (
                                <div
                                    key={`${testimonial.quote}-${i}`}
                                    className="relative w-[300px] shrink-0"
                                >
                                    <Card
                                        className={cn(
                                            "h-full flex-col gap-3 border transition-colors duration-300",
                                            isFeatured && "bg-card",
                                        )}
                                    >
                                        <p className="text-sm leading-relaxed text-foreground">
                                            &ldquo;{testimonial.quote}&rdquo;
                                        </p>
                                        <p
                                            className={cn(
                                                "mt-auto truncate text-sm font-medium text-foreground transition-colors",
                                                isFeatured && "text-primary",
                                            )}
                                        >
                                            {testimonial.name}
                                        </p>
                                    </Card>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        </ContentContainer>
    );
}
