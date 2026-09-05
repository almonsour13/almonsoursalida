"use client";

import { skills } from "@/constant/skills";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Layers, Sparkles, Target } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import TextAnimate from "../animation/text-animate";
import CornerFrame from "../decorative/corner-frame";
import ContentContainer from "../layout/content-container";
import { MarqueeCarousel } from "../marquee-carousel";

const STACK_NOTES = [
    {
        icon: Layers,
        title: `${skills.length} tools`,
        description: "Spanning frontend, backend, mobile, and infra.",
    },
    {
        icon: Target,
        title: "Picked for the job",
        description: "Chosen for fit on each project, not for hype.",
    },
    {
        icon: Sparkles,
        title: "Always adding more",
        description: "This list grows every time a project calls for it.",
    },
];

const STACK_WORDS = ["Stacks", "Tools", "Skills"];

const ORBIT_ITEM_COUNT = 14;
const NOTES_INTERVAL_MS = 10000;

const MOBILE_RING_COUNT = 5;
const DESKTOP_RING_COUNT = 12;
const MOBILE_MIN_RING_PERCENT = 40;
const MOBILE_MAX_RING_PERCENT = 132;
const DESKTOP_MIN_RING_PERCENT = 32;
const DESKTOP_MAX_RING_PERCENT = 172;

type OrbitItem = {
    name: string;
    icon: string;
};

type Ring = {
    sizePercent: number;
    durationSec: number;
    direction: 1 | -1;
    items: OrbitItem[];
};

function sanitizeIcon(icon: string) {
    return icon.replace(/<path(?![^>]*fill=)/g, '<path fill="currentColor"');
}

const SANITIZED_SKILLS = skills.map((skill) => ({
    ...skill,
    icon: sanitizeIcon(skill.icon),
}));

const ORBIT_SKILLS: OrbitItem[] = SANITIZED_SKILLS.slice(
    0,
    Math.min(ORBIT_ITEM_COUNT, SANITIZED_SKILLS.length),
);

const OrbitRings = memo(function OrbitRings({
    isDesktop,
    reduceMotion,
}: {
    isDesktop: boolean;
    reduceMotion: boolean;
}) {
    const ringCount = isDesktop ? DESKTOP_RING_COUNT : MOBILE_RING_COUNT;
    const minRingPercent = isDesktop
        ? DESKTOP_MIN_RING_PERCENT
        : MOBILE_MIN_RING_PERCENT;
    const maxRingPercent = isDesktop
        ? DESKTOP_MAX_RING_PERCENT
        : MOBILE_MAX_RING_PERCENT;

    const rings = useMemo<Ring[]>(() => {
        const buckets: OrbitItem[][] = Array.from(
            { length: ringCount },
            () => [],
        );

        ORBIT_SKILLS.forEach((item, index) => {
            buckets[index % ringCount].push(item);
        });

        return Array.from({ length: ringCount }, (_, index) => {
            const sizePercent =
                minRingPercent +
                (index * (maxRingPercent - minRingPercent)) /
                    Math.max(1, ringCount - 1);

            return {
                sizePercent,
                durationSec: 10 + index * 8,
                direction: index % 2 === 0 ? (1 as const) : (-1 as const),
                items: buckets[index],
            };
        });
    }, [ringCount, minRingPercent, maxRingPercent]);

    return (
        <>
            {rings.map((ring, index) => (
                <div
                    key={`ring-border-${index}`}
                    className="absolute left-1/2 top-1/2 aspect-square rounded-full border"
                    style={{
                        width: `${ring.sizePercent}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}

            {rings.map((ring, ringIndex) => (
                <div
                    key={`ring-${ringIndex}`}
                    className="absolute left-1/2 top-1/2 aspect-square"
                    style={{
                        width: `${ring.sizePercent}%`,
                        transform: "translate(-50%, -50%)",
                        willChange: reduceMotion ? undefined : "transform",
                        animation: reduceMotion
                            ? undefined
                            : `orbit-spin ${ring.durationSec}s linear infinite`,
                        animationDirection:
                            !reduceMotion && ring.direction === -1
                                ? "reverse"
                                : undefined,
                    }}
                >
                    {ring.items.map((item, itemIndex) => {
                        const count = Math.max(1, ring.items.length);
                        const angle = (360 / count) * itemIndex;
                        const radians = (angle * Math.PI) / 180;
                        const x = 50 + 50 * Math.cos(radians);
                        const y = 50 + 50 * Math.sin(radians);

                        return (
                            <div
                                key={`${item.name}-${itemIndex}`}
                                title={item.name}
                                className="group absolute flex size-9 items-center justify-center"
                                style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <div className="relative flex size-9 items-center justify-center rounded-full border bg-background">
                                    <div
                                        className="h-4 w-4 text-primary transition-colors"
                                        dangerouslySetInnerHTML={{
                                            __html: item.icon,
                                        }}
                                    />
                                    <span className="pointer-events-none absolute -top-7 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    );
});

const SkillsMarquee = memo(function SkillsMarquee() {
    const renderLeft = useCallback(
        (skill: (typeof SANITIZED_SKILLS)[number], i: number) => (
            <div
                key={`${skill.name}-${i}`}
                className={cn(
                    "group relative flex size-28 md:size-36 shrink-0 items-center justify-center rounded border transition-colors hover:bg-muted/40",
                    i === 0 && "ml-4",
                )}
            >
                <div
                    className="pointer-events-none h-10 w-10 text-primary transition-transform duration-200 group-hover:scale-110"
                    dangerouslySetInnerHTML={{ __html: skill.icon }}
                />
                <span className="pointer-events-none absolute -top-7 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    {skill.name}
                </span>
            </div>
        ),
        [],
    );

    const renderRight = useCallback(
        (skill: (typeof SANITIZED_SKILLS)[number], i: number) => (
            <div
                key={`${skill.name}-${i}`}
                className={cn(
                    "group relative flex size-36 shrink-0 items-center justify-center rounded border transition-colors hover:bg-muted/40",
                    i === 0 && "ml-4",
                )}
            >
                <div
                    className="pointer-events-none h-10 w-10 text-primary transition-transform duration-200 group-hover:scale-110"
                    dangerouslySetInnerHTML={{ __html: skill.icon }}
                />
                <span className="pointer-events-none absolute -top-7 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    {skill.name}
                </span>
            </div>
        ),
        [],
    );

    return (
        <div className="flex flex-col gap-2 relative">
            <MarqueeCarousel
                items={SANITIZED_SKILLS}
                speedPerSec={0.8}
                direction="left"
                renderItem={renderLeft}
            />
            <MarqueeCarousel
                items={SANITIZED_SKILLS}
                speedPerSec={0.8}
                direction="right"
                className="hidden md:block"
                renderItem={renderRight}
            />
        </div>
    );
});

export default function Skills() {
    const [noteIndex, setNoteIndex] = useState(0);
    const reduceMotion = !!useReducedMotion();
    const isDesktop = useIsDesktop({});

    useEffect(() => {
        if (reduceMotion) return;
        const id = setInterval(() => {
            setNoteIndex((i) => (i + 1) % STACK_NOTES.length);
        }, NOTES_INTERVAL_MS);
        return () => clearInterval(id);
    }, [reduceMotion]);

    const note = STACK_NOTES[noteIndex];
    const NoteIcon = note.icon;

    return (
        <ContentContainer id="skills">
            <div className="relative flex flex-col">
                <div className="relative flex flex-col items-start gap-2 pt-16 pb-8 md:items-center md:pt-20 md:pb-12">
                    <span className="text-xs font-medium uppercase text-primary">
                        [ SKILLS ]
                    </span>

                    <h1 className="text-5xl font-medium tracking-tight text-foreground md:text-center md:text-6xl capitalize">
                        Tech{" "}
                        <TextAnimate
                            words={STACK_WORDS}
                            className="text-primary"
                            interval={5000}
                        />
                    </h1>

                    <p className="text-sm text-muted-foreground md:text-center md:text-base">
                        A curated collection of languages, frameworks, and tools
                        I use to architect scalable backends, design responsive
                        interfaces, and build high-performance web and mobile
                        solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="relative rounded border min-h-72 md:h-full z-40">
                        <CornerFrame />
                        <div className="absolute inset-0 overflow-hidden">
                            <OrbitRings
                                isDesktop={isDesktop}
                                reduceMotion={reduceMotion}
                            />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={noteIndex}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                    }}
                                    className="absolute inset-0 z-20 flex flex-col items-center justify-center"
                                >
                                    <div className="flex flex-col items-center gap-1 border rounded bg-background p-2 px-3 text-center md:p-4">
                                        <NoteIcon className="hidden md:block h-4 w-4 text-muted-foreground" />
                                        <h3 className="text-sm md:text-base font-medium text-foreground">
                                            {note.title}
                                        </h3>
                                        <p className="hidden md:block text-sm leading-relaxed text-muted-foreground">
                                            {note.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <SkillsMarquee />
                </div>
            </div>
        </ContentContainer>
    );
}
