"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export type TextAnimateType =
    | "slide"
    | "blur"
    | "fade"
    | "flip"
    | "typewriter"
    | "scramble";

interface TextAnimateProps {
    /** The words/phrases to cycle through, in order. */
    words: string[];
    /** Which transition style to use. Defaults to "slide" (the original behavior). */
    type?: TextAnimateType;
    /** Time each word stays fully visible before the next transition starts, in ms. */
    interval?: number;
    /** Slide distance in px — only used by type="slide". */
    y?: number;
    /** ms per character — only used by type="typewriter". */
    typeSpeed?: number;
    /** Applied to the visible word itself (e.g. "text-primary"). */
    className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

function getVariants(
    type: Exclude<TextAnimateType, "typewriter" | "scramble">,
    y: number,
) {
    const rest = { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 };
    switch (type) {
        case "blur":
            return {
                initial: { ...rest, opacity: 0, filter: "blur(10px)" },
                animate: rest,
                exit: { ...rest, opacity: 0, filter: "blur(10px)" },
            };
        case "fade":
            return {
                initial: { ...rest, opacity: 0 },
                animate: rest,
                exit: { ...rest, opacity: 0 },
            };
        case "flip":
            return {
                initial: { ...rest, opacity: 0, rotateX: 90 },
                animate: rest,
                exit: { ...rest, opacity: 0, rotateX: -90 },
            };
        case "slide":
        default:
            return {
                initial: { ...rest, opacity: 0, y },
                animate: rest,
                exit: { ...rest, opacity: 0, y: -y },
            };
    }
}

/** Types each word out character by character, pauses, deletes it, repeats. */
function TypewriterCycler({
    words,
    interval,
    typeSpeed,
    className,
    reduceMotion,
}: {
    words: string[];
    interval: number;
    typeSpeed: number;
    className?: string;
    reduceMotion: boolean;
}) {
    const [wordIndex, setWordIndex] = useState(0);
    const [display, setDisplay] = useState("");
    const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
        "typing",
    );

    useEffect(() => {
        if (reduceMotion) {
            setDisplay(words[0] ?? "");
            return;
        }
        if (words.length === 0) return;

        const current = words[wordIndex % words.length];
        let timeout: ReturnType<typeof setTimeout>;

        if (phase === "typing") {
            if (display.length < current.length) {
                timeout = setTimeout(
                    () => setDisplay(current.slice(0, display.length + 1)),
                    typeSpeed,
                );
            } else {
                timeout = setTimeout(() => setPhase("pausing"), interval);
            }
        } else if (phase === "pausing") {
            timeout = setTimeout(() => setPhase("deleting"), 300);
        } else {
            if (display.length > 0) {
                timeout = setTimeout(
                    () => setDisplay(display.slice(0, -1)),
                    typeSpeed / 1.6,
                );
            } else {
                setWordIndex((i) => (i + 1) % words.length);
                setPhase("typing");
            }
        }

        return () => clearTimeout(timeout);
    }, [display, phase, wordIndex, words, interval, typeSpeed, reduceMotion]);

    return (
        <span className={cn("whitespace-nowrap", className)}>
            {display}
            <span
                aria-hidden
                className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-current align-middle"
            />
        </span>
    );
}

/** Scrambles through random characters before settling into the next word. */
function ScrambleCycler({
    words,
    interval,
    className,
    reduceMotion,
}: {
    words: string[];
    interval: number;
    className?: string;
    reduceMotion: boolean;
}) {
    const [wordIndex, setWordIndex] = useState(0);
    const [display, setDisplay] = useState(words[0] ?? "");

    useEffect(() => {
        if (reduceMotion) {
            setDisplay(words[0] ?? "");
            return;
        }
        if (words.length <= 1) return;

        const cycle = setInterval(() => {
            const next = words[(wordIndex + 1) % words.length];
            let iteration = 0;
            const scramble = setInterval(() => {
                setDisplay(
                    next
                        .split("")
                        .map((char, i) =>
                            i < iteration
                                ? char
                                : CHARS[
                                      Math.floor(Math.random() * CHARS.length)
                                  ],
                        )
                        .join(""),
                );
                iteration += next.length / 8;
                if (iteration >= next.length) {
                    clearInterval(scramble);
                    setDisplay(next);
                    setWordIndex((i) => (i + 1) % words.length);
                }
            }, 30);
        }, interval);

        return () => clearInterval(cycle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wordIndex, words, interval, reduceMotion]);

    return (
        <span className={cn("whitespace-nowrap", className)}>{display}</span>
    );
}

/**
 * Cycles through a list of words/phrases, looping forever, with a choice
 * of transition styles. Originally the Hero's RoleCycler (type="slide"
 * is that exact original behavior, kept as the default so existing
 * usages don't need to change).
 *
 * Usage:
 *   <TextAnimate words={ROLES} />                     // slide (default, original behavior)
 *   <TextAnimate words={ROLES} type="blur" />
 *   <TextAnimate words={ROLES} type="fade" />
 *   <TextAnimate words={ROLES} type="flip" />
 *   <TextAnimate words={ROLES} type="typewriter" />
 *   <TextAnimate words={ROLES} type="scramble" />
 *
 * Respects prefers-reduced-motion for every type — holds on the first
 * word instead of auto-advancing/animating for people who've asked for
 * less motion.
 */
export default function TextAnimate({
    words,
    type = "slide",
    interval = 2600,
    y = 14,
    typeSpeed = 55,
    className,
}: TextAnimateProps) {
    const [index, setIndex] = useState(0);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (type === "typewriter" || type === "scramble") return;
        if (reduceMotion || words.length <= 1) return;
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, interval);
        return () => clearInterval(id);
    }, [words, interval, reduceMotion, type]);

    if (type === "typewriter") {
        return (
            <TypewriterCycler
                words={words}
                interval={interval}
                typeSpeed={typeSpeed}
                className={className}
                reduceMotion={!!reduceMotion}
            />
        );
    }

    if (type === "scramble") {
        return (
            <ScrambleCycler
                words={words}
                interval={interval}
                className={className}
                reduceMotion={!!reduceMotion}
            />
        );
    }

    const current = words[index] ?? "";
    const variants = getVariants(type, y);

    return (
        <span
            className={cn(
                "relative inline-flex  overflow-hidden align-bottom",
                type === "flip" && "[perspective:400px]",
            )}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={current}
                    initial={reduceMotion ? variants.animate : variants.initial}
                    animate={variants.animate}
                    exit={reduceMotion ? variants.animate : variants.exit}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className={cn("whitespace-nowrap", className)}
                >
                    {current}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
