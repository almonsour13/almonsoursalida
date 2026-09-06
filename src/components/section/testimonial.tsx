"use client";

import { TESTIMONIALS } from "@/constant/testimonial";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import TextAnimate from "../animation/text-animate";
import WordReveal from "../animation/word-reveal";
import { MarqueeCarousel } from "../common/marquee-carousel";
import GridLines from "../decorative/grid-lines";
import ContentContainer from "../layout/content-container";
import { GutterLayout } from "../layout/gutter-layout";
import SectionLabel from "../layout/section-label";

const FEATURED_INTERVAL_MS = 10000;

const TRUST_WORDS = ["clients", "founders", "teams", "partners", "businesses"];

export default function Testimonials() {
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const reduceMotion = !!useReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;
        const id = setInterval(() => {
            setFeaturedIndex((i) => (i + 1) % TESTIMONIALS.length);
        }, FEATURED_INTERVAL_MS);
        return () => clearInterval(id);
    }, [reduceMotion]);

    const featured = TESTIMONIALS[featuredIndex];
    return (
        <>
            <SectionLabel label="TESTIMONIALS" side={["top", "bottom"]} />
            <GutterLayout>
                <ContentContainer id="testimonials">
                    <div className="relative flex flex-col">
                        <div className="relative flex flex-col items-start md:items-center gap-2 py-8 md:py-12">
                            <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-foreground items-start md:text-center capitalize">
                                Trusted by{" "}
                                <TextAnimate
                                    words={TRUST_WORDS}
                                    type="slide"
                                    className="text-primary"
                                    interval={5000}
                                />
                            </h1>
                            <p className="text-sm text-muted-foreground md:text-base items-tart md:text-center">
                                Honest reviews from founders, teams, and
                                partners I've collaborated with to build
                                high-performing digital products.
                            </p>
                        </div>
                        <div className="relative flex flex-col gap-4">
                            <div className="">
                                <div className="bg-card relative flex flex-col bg-caard justify-center border border-solid items-center gap-4 p-4 md:py-20 rounded overflow-hidden h-auto min-h-[320px] md:min-h-[280px]">
                                    <GridLines className="z-10 hidden" />
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
                            <MarqueeCarousel
                                items={TESTIMONIALS}
                                speedPerSec={0.35}
                                direction="left"
                                renderItem={(testimonial, i) => {
                                    return (
                                        <div
                                            key={`${testimonial.quote}-${i}`}
                                            className="relative w-[300px] shrink-0"
                                        >
                                            <div
                                                data-idx={i}
                                                className={cn(
                                                    "flex h-full flex-col gap-3 rounded border p-4 transition-colors duration-300",
                                                    i % TESTIMONIALS.length ===
                                                        featuredIndex &&
                                                        "bg-card",
                                                )}
                                            >
                                                <p className="text-sm leading-relaxed text-foreground">
                                                    &ldquo;{testimonial.quote}
                                                    &rdquo;
                                                </p>

                                                <div className="mt-auto flex items-center gap-2.5">
                                                    <div className="min-w-0">
                                                        <p
                                                            className={cn(
                                                                "truncate text-xs font-medium text-foreground",
                                                                i %
                                                                    TESTIMONIALS.length ===
                                                                    featuredIndex &&
                                                                    "text-primary",
                                                            )}
                                                        >
                                                            {testimonial.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }}
                            />
                            {/* <TestimonialsMarquee featuredIndex={featuredIndex} /> */}
                        </div>
                    </div>
                </ContentContainer>
            </GutterLayout>
        </>
    );
}
