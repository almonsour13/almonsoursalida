"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
    "Setting things up",
    "Loading the details",
    "Almost there",
];

const STEP_MS = 1500;
const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export default function Loading() {
    const reduceMotion = !!useReducedMotion();
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (reduceMotion) return;
        const id = setInterval(
            () => setStep((s) => (s + 1) % LOADING_MESSAGES.length),
            STEP_MS,
        );
        return () => clearInterval(id);
    }, [reduceMotion]);

    return (
        <div
            role="status"
            aria-live="polite"
            className="flex h-dvh w-full items-center justify-center bg-background px-4"
        >
            <span className="sr-only">Loading</span>

            <div
                aria-hidden="true"
                className="flex w-full max-w-xs flex-col gap-4"
            >
                <div className="flex items-baseline justify-between">
                    <span className="font-mono text-4xl text-foreground">
                        {pad(step + 1)}
                        <span className="text-base text-muted-foreground">
                            {" "}
                            / {pad(LOADING_MESSAGES.length)}
                        </span>
                    </span>
                </div>
                <div className="flex gap-2">
                    {LOADING_MESSAGES.map((message, i) => (
                        <div
                            key={message}
                            className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                                i <= step ? "bg-primary" : "bg-border"
                            }`}
                        />
                    ))}
                </div>
                <div className="h-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={step}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.3,
                                ease: EASE,
                            }}
                            className="text-sm text-muted-foreground"
                        >
                            {LOADING_MESSAGES[step]}
                            <span className="text-primary">.</span>
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
