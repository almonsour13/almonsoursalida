"use client";

import { cn } from "@/lib/utils";
import {
    AnimatePresence,
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
    type LucideIcon,
} from "lucide-react";
import { memo, useRef, useState } from "react";
import TextAnimate from "../animation/text-animate";
import ContentContainer from "../layout/content-container";
import { GutterLayout } from "../layout/gutter-layout";
import SectionLabel from "../layout/section-label";

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
const STEP_DURATION_MS = 1200;
const ALL_DONE_PAUSE_MS = 600;
const RESET_PAUSE_MS = 2000;

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
    const Icon: LucideIcon = step.icon;
    const highlighted = isActive || isDone;

    return (
        <div className="relative flex-1 flex border rounded bg-background">
            <AnimatePresence>
                {isDone && (
                    <motion.div
                        key="done-bg"
                        className="absolute z-10 inset-0 bg-primary rounded"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        className="absolute z-10 bottom-0 left-0 h-full w-full rounded bg-primary"
                        layoutId="bottomNav"
                        transition={{
                            layout: {
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            },
                        }}
                    />
                )}
            </AnimatePresence>
            <div className="z-20 flex-1 flex flex-col gap-4 md:gap-16 p-4">
                <div className="flex justify-between">
                    <span
                        className={cn(
                            "font-mono text-4xl",
                            highlighted && "text-primary-foreground",
                        )}
                    >
                        0{index + 1}
                    </span>
                    <div
                        className={cn(
                            "relative border-background-foreground flex h-8 w-8 shrink-0 border items-center justify-center rounded-full",
                            isDone && "bg-primary-foreground",
                        )}
                    >
                        {isActive ? (
                            <Loader2 className="z-10 h-4 w-4 animate-spin text-primary-foreground" />
                        ) : !isDone ? (
                            <Icon className="z-10 h-4 w-4 text-primary" />
                        ) : (
                            <Check className="z-10 h-4 w-4 text-primary" />
                        )}
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <h3
                        className={cn(
                            "text-xl font-medium tracking-tight text-foreground",
                            highlighted && "text-primary-foreground",
                        )}
                    >
                        {step.title}
                    </h3>
                    <p
                        className={cn(
                            "text-sm leading-relaxed text-muted-foreground",
                            highlighted && "text-primary-foreground/80",
                        )}
                    >
                        {step.description}
                    </p>
                </div>
            </div>
        </div>
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

        const isAllDone = active === STEPS.length;
        const isResetting = active === -1;

        const threshold = isAllDone
            ? ALL_DONE_PAUSE_MS
            : isResetting
              ? RESET_PAUSE_MS
              : STEP_DURATION_MS;

        if (elapsed.current >= threshold) {
            elapsed.current = 0;
            setActive((a) => {
                if (a === STEPS.length) return -1; // done -> neutral
                if (a === -1) return 0; // neutral -> restart
                return a + 1; // normal advance
            });
        }
    });

    return (
        <>
            <SectionLabel label="HOW I WORK" side={["top", "bottom"]} />
            <GutterLayout>
                <ContentContainer id="how-i-work" className="z-50">
                    <div className="flex flex-col" ref={sectionRef}>
                        <div className="relative flex flex-col items-start md:items-center gap-2 py-8 md:py-12">
                            <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-foreground items-start md:text-center capitalize">
                                A process built for{" "}
                                <TextAnimate
                                    words={HEADLINE_WORDS}
                                    type="flip"
                                    className="text-primary"
                                    interval={5000}
                                />
                            </h1>
                            <p className="text-sm text-muted-foreground md:text-base items-tart md:text-center">
                                Every engagement follows the same five-stage
                                framework — transparent, repeatable, and
                                structured to deliver consistent results.
                            </p>
                        </div>

                        <LayoutGroup>
                            <div className="flex flex-col md:flex-row gap-2">
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
            </GutterLayout>
        </>
    );
}
