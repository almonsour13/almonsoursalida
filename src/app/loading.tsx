"use client";

import TextAnimate from "@/components/animation/text-animate";
import CornerFrame from "@/components/decorative/corner-frame";
import DotGrid from "@/components/decorative/dot-grid";
import { motion, useReducedMotion } from "framer-motion";

const LOADING_MESSAGES = [
    "Setting things up",
    "Loading the details",
    "Almost there",
];

export default function Loading() {
    const reduceMotion = useReducedMotion();

    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
            <DotGrid className="absolute inset-0 opacity-40" />

            <div className="relative flex flex-col items-center gap-6">
                <CornerFrame className="relative flex h-20 w-20 items-center justify-center border border-border rounded-md">
                    {reduceMotion ? (
                        // Rotation is the one motion type most likely to
                        // bother vestibular-sensitive users, so it's
                        // swapped for a gentle opacity pulse instead of
                        // being removed outright — still communicates
                        // "this is loading," just without the spin.
                        <motion.svg
                            width="56"
                            height="56"
                            className="absolute text-border"
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <circle
                                cx="28"
                                cy="28"
                                r="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeDasharray="8 6"
                            />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            width="56"
                            height="56"
                            className="absolute text-border"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <circle
                                cx="28"
                                cy="28"
                                r="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeDasharray="8 6"
                            />
                        </motion.svg>
                    )}

                    <motion.div
                        className="relative h-2 w-2 rounded-full bg-primary"
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </CornerFrame>

                <div className="flex flex-col items-center gap-1">
                    <span className="text-primary text-xs font-medium uppercase">
                        [ LOADING ]
                    </span>
                    <span className="text-xs text-muted-foreground">
                        <TextAnimate
                            words={LOADING_MESSAGES}
                            type="fade"
                            interval={1800}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}
