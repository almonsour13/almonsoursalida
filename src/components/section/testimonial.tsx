"use client";

import { TESTIMONIALS } from "@/constant/testimonial";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import TextAnimate from "../animation/text-animate";
import WordReveal from "../animation/word-reveal";
import GridLines from "../decorative/grid-lines";
import ContentContainer from "../layout/content-container";
import { MarqueeCarousel } from "../marquee-carousel";

const FEATURED_INTERVAL_MS = 10000;

const TRUST_WORDS = ["clients", "founders", "teams", "partners", "businesses"];

const TestimonialsMarquee = memo(function TestimonialsMarquee({
    featuredIndex,
}: {
    featuredIndex: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const nodes = container.querySelectorAll<HTMLElement>("[data-idx]");
        nodes.forEach((node) => {
            const idx = Number(node.dataset.idx);
            node.classList.toggle(
                "bg-card",
                idx % TESTIMONIALS.length === featuredIndex,
            );
        });
    }, [featuredIndex]);

    const renderItem = useCallback(
        (testimonial: (typeof TESTIMONIALS)[number], i: number) => (
            <div
                key={`${testimonial.quote}-${i}`}
                className="relative w-[300px] shrink-0"
            >
                <div
                    data-idx={i}
                    className="flex h-full flex-col gap-3 rounded border p-4 transition-colors duration-300"
                >
                    <p className="text-sm leading-relaxed text-foreground">
                        &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    <div className="mt-auto flex items-center gap-2.5">
                        <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-foreground">
                                {testimonial.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        [],
    );

    return (
        <div ref={containerRef}>
            <MarqueeCarousel
                items={TESTIMONIALS}
                speedPerSec={0.35}
                direction="left"
                renderItem={renderItem}
            />
        </div>
    );
});

const FeaturedQuote = memo(function FeaturedQuote({
    featuredIndex,
}: {
    featuredIndex: number;
}) {
    const featured = TESTIMONIALS[featuredIndex];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={featuredIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 z-20 flex flex-col items-start md:items-center justify-center gap-4 px-6 md:px-16"
            >
                <h3 className="text-2xl font-medium leading-tight tracking-tight md:text-4xl text-start md:text-center">
                    <WordReveal text={featured.quote} quotes stepMs={100} />
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                    -{featured.name}
                </p>
            </motion.div>
        </AnimatePresence>
    );
});

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

    return (
        <ContentContainer id="testimonials">
            <div className="relative flex flex-col pb-8 md:pb-16">
                <div className="relative flex flex-col items-start md:items-center gap-2 pt-16 md:pt-20 pb-8 md:pb-12">
                    <span className="text-xs font-medium text-primary uppercase">
                        [ TESTIMONIALS ]
                    </span>
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
                        Honest reviews from founders, teams, and partners I've
                        collaborated with to build high-performing digital
                        products.
                    </p>
                </div>

                <div className="relative flex flex-col gap-4">
                    <div className="md:px-4">
                        <div className="relative flex flex-col justify-center border border-dashed items-center gap-4 p-4 py-16 md:py-20 rounded overflow-hidden h-auto min-h-[320px] md:min-h-[280px]">
                            <GridLines className="z-10" />
                            <FeaturedQuote featuredIndex={featuredIndex} />
                        </div>
                    </div>

                    <TestimonialsMarquee featuredIndex={featuredIndex} />
                </div>
            </div>
        </ContentContainer>
    );
}
