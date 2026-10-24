"use client";

import { cn } from "@/lib/utils";
import {
    LayoutGroup,
    motion,
    useAnimationFrame,
    useInView,
    useReducedMotion,
} from "framer-motion";
import {
    Check,
    Code2,
    Compass,
    Gauge,
    Loader2,
    PenTool,
    Rocket,
} from "lucide-react";
import { memo, useRef, useState } from "react";
import TextAnimate from "../animation/text-animate";
import ContentContainer from "../layout/content-container";
import { Card } from "../ui/card";

const STEPS = [
    {
        icon: Compass,
        title: "Plan",
        description:
            "Understand goals, users, and constraints before writing a single line of code.",
    },
    {
        icon: PenTool,
        title: "Design",
        description:
            "Wireframe the structure, then design the interface with real content, not placeholder text.",
    },
    {
        icon: Code2,
        title: "Develop",
        description:
            "Build with clean, typed, maintainable code — feature by feature, with regular check-ins.",
    },
    {
        icon: Gauge,
        title: "Optimize",
        description:
            "Profile performance, close accessibility gaps, and tighten anything that feels slow.",
    },
    {
        icon: Rocket,
        title: "Deliver",
        description:
            "Ship, monitor, and stick around for fixes, iterations, and whatever comes next.",
    },
];

const HEADLINE_WORDS = ["clarity", "speed", "quality", "trust"];
const STEP_MS = 1200;
const DONE_PAUSE_MS = 600;
const RESET_PAUSE_MS = 2000;
const NEUTRAL = -1;

type Step = (typeof STEPS)[number];

const StepCard = memo(function StepCard({
    step,
    index,
    isActive,
    isDone,
}: {
    step: Step;
    index: number;
    isActive: boolean;
    isDone: boolean;
}) {
    const Icon = step.icon;
    const filled = isActive || isDone;

    return (
        <Card className="relative flex flex-1 gap-0 overflow-hidden border bg-background">
            {/* Done fill: static. Active fill: slides between cards via layoutId */}
            {isDone && <div className="absolute inset-0 z-10 bg-primary" />}
            {isActive && (
                <motion.div
                    layoutId="stepFill"
                    className="absolute inset-0 z-10 bg-primary"
                    transition={{
                        layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    }}
                />
            )}

            <div className="z-20 flex flex-1 flex-col gap-4 md:gap-20">
                <div className="flex justify-between">
                    <span
                        className={cn(
                            "font-mono text-4xl transition-colors",
                            filled && "text-primary-foreground",
                        )}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                        className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-background-foreground transition-colors",
                            isDone && "bg-primary-foreground",
                        )}
                    >
                        {isActive ? (
                            <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                        ) : isDone ? (
                            <Check className="h-4 w-4 text-primary" />
                        ) : (
                            <Icon className="h-4 w-4 text-primary" />
                        )}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                    <h3
                        className={cn(
                            "text-xl font-medium tracking-tight text-foreground transition-colors",
                            filled && "text-primary-foreground",
                        )}
                    >
                        {step.title}
                    </h3>
                    <p
                        className={cn(
                            "text-sm leading-relaxed text-muted-foreground transition-colors",
                            filled && "text-primary-foreground/80",
                        )}
                    >
                        {step.description}
                    </p>
                </div>
            </div>
        </Card>
    );
});

export default function HowIWork() {
    const [active, setActive] = useState(0);
    const reduceMotion = useReducedMotion();
    const elapsed = useRef(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.1 });

    useAnimationFrame((_, delta) => {
        if (reduceMotion || !isInView) return;
        elapsed.current += delta;

        const threshold =
            active === STEPS.length
                ? DONE_PAUSE_MS
                : active === NEUTRAL
                  ? RESET_PAUSE_MS
                  : STEP_MS;

        if (elapsed.current < threshold) return;
        elapsed.current = 0;

        // 0..n-1 advance, n (all done) -> neutral, neutral -> restart
        setActive((a) => (a === STEPS.length ? NEUTRAL : a + 1));
    });

    return (
        <ContentContainer id="how-i-work">
            <div className="flex flex-col" ref={sectionRef}>
                <div className="relative flex flex-col items-start gap-2 pb-8 md:pb-12">
                    <h1 className="text-5xl font-light capitalize leading-tight tracking-tight text-foreground">
                        A process built for{" "}
                        <TextAnimate
                            words={HEADLINE_WORDS}
                            type="flip"
                            className="text-primary"
                            interval={5000}
                        />
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        Every engagement follows the same five-stage framework —
                        transparent, repeatable, and structured to deliver
                        consistent results.
                    </p>
                </div>

                <LayoutGroup>
                    <div className="flex flex-col gap-2 md:flex-row">
                        {STEPS.map((step, i) => (
                            <StepCard
                                key={step.title}
                                step={step}
                                index={i}
                                isActive={i === active}
                                isDone={active >= 0 && i < active}
                            />
                        ))}
                    </div>
                </LayoutGroup>
            </div>
        </ContentContainer>
    );
}
