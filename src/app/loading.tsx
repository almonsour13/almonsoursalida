"use client";

import TextAnimate from "@/components/animation/text-animate";
import { useReducedMotion } from "framer-motion";

const LOADING_MESSAGES = [
    "Setting things up",
    "Loading the details",
    "Almost there",
];

export default function Loading() {
    const reduceMotion = useReducedMotion();

    return (
        <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
            <div className="relative flex flex-col items-center gap-6">
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
