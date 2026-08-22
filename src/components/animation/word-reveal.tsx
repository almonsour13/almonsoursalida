"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface WordRevealProps {
    text: string;
    stepMs?: number;
    quotes?: boolean;
    className?: string;
    revealedClassName?: string;
    unrevealedClassName?: string;
    onComplete?: () => void;
}

export default function WordReveal({
    text,
    stepMs = 55,
    quotes = false,
    className,
    revealedClassName = "text-primary",
    unrevealedClassName = "text-muted-foreground/40",
    onComplete,
}: WordRevealProps) {
    const words = useMemo(() => text.split(" "), [text]);
    const reduceMotion = useReducedMotion();
    const [revealed, setRevealed] = useState(reduceMotion ? words.length : 0);

    useEffect(() => {
        if (reduceMotion) {
            setRevealed(words.length);
            onComplete?.();
            return;
        }

        setRevealed(0);
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setRevealed(i);
            if (i >= words.length) {
                clearInterval(id);
                onComplete?.();
            }
        }, stepMs);

        return () => clearInterval(id);
    }, [words, stepMs, reduceMotion]);

    const content = words.map((word, i) => (
        <span
            key={i}
            className={cn(
                "transition-colors duration-500 ease-out",
                className,
                i < revealed ? revealedClassName : unrevealedClassName,
            )}
        >
            {word}
            {i < words.length - 1 ? " " : ""}
        </span>
    ));

    if (!quotes) return <>{content}</>;

    return (
        <>
            &ldquo;
            {content}
            &rdquo;
        </>
    );
}
