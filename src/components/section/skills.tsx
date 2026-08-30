"use client";

import { skills } from "@/constant/skills";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Layers, Sparkles, Target } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
function isNeutralSlot(ringIndex: number, itemIndex: number) {
    return (ringIndex + itemIndex) % 5 === 0;
}

export default function Skills() {
    const [noteIndex, setNoteIndex] = useState(0);
    const reduceMotion = useReducedMotion();
    const isDesktop = useIsDesktop({});
    const ringCount = isDesktop ? DESKTOP_RING_COUNT : MOBILE_RING_COUNT;
    const minRingPercent = isDesktop
        ? DESKTOP_MIN_RING_PERCENT
        : MOBILE_MIN_RING_PERCENT;
    const maxRingPercent = isDesktop
        ? DESKTOP_MAX_RING_PERCENT
        : MOBILE_MAX_RING_PERCENT;

    useEffect(() => {
        if (reduceMotion) return;
        const id = setInterval(() => {
            setNoteIndex((i) => (i + 1) % STACK_NOTES.length);
        }, NOTES_INTERVAL_MS);
        return () => clearInterval(id);
    }, [reduceMotion]);

    const note = STACK_NOTES[noteIndex];
    const NoteIcon = note.icon;

    const orbitSkills = useMemo(
        () => skills.slice(0, Math.min(ORBIT_ITEM_COUNT, skills.length)),
        [],
    );

    const rings = useMemo<Ring[]>(() => {
        const buckets: OrbitItem[][] = Array.from(
            { length: ringCount },
            () => [],
        );

        orbitSkills.forEach((item, index) => {
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
    }, [orbitSkills, ringCount, minRingPercent, maxRingPercent]);

    return (
        <ContentContainer id="skills">
            <div className="relative flex flex-col">
                <div className="relative flex flex-col items-start gap-2 pt-16 pb-8 md:items-center md:pt-20 md:pb-12">
                    <span className="text-xs font-medium uppercase text-primary">
                        [ SKILLS ]
                    </span>

                    <h1 className="text-5xl font-medium tracking-tight text-foreground md:text-center md:text-6xl">
                        Tech{" "}
                        <TextAnimate
                            words={STACK_WORDS}
                            // type="scramble"
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
                        <CornerFrame className="" />
                        <div className="absolute inset-0 overflow-hidden">
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
                            {rings.map((ring, ringIndex) => (
                                <motion.div
                                    key={`ring-${ringIndex}`}
                                    className="absolute left-1/2 top-1/2 aspect-square"
                                    style={{
                                        width: `${ring.sizePercent}%`,
                                    }}
                                    initial={{
                                        x: "-50%",
                                        y: "-50%",
                                        rotate: 0,
                                    }}
                                    animate={
                                        reduceMotion
                                            ? {
                                                  x: "-50%",
                                                  y: "-50%",
                                                  rotate: 0,
                                              }
                                            : {
                                                  x: "-50%",
                                                  y: "-50%",
                                                  rotate: 360,
                                              }
                                    }
                                    transition={
                                        reduceMotion
                                            ? undefined
                                            : {
                                                  rotate: {
                                                      duration:
                                                          ring.durationSec,
                                                      repeat: Infinity,
                                                      ease: "linear",
                                                  },
                                              }
                                    }
                                >
                                    {ring.items.map((item, itemIndex) => {
                                        const count = Math.max(
                                            1,
                                            ring.items.length,
                                        );

                                        const angle = (360 / count) * itemIndex;

                                        const radians = (angle * Math.PI) / 180;

                                        const x = 50 + 50 * Math.cos(radians);

                                        const y = 50 + 50 * Math.sin(radians);

                                        const neutral = isNeutralSlot(
                                            ringIndex,
                                            itemIndex,
                                        );

                                        return (
                                            <div
                                                key={`${item.name}-${itemIndex}`}
                                                title={item.name}
                                                className=" absolute flex size-9 items-center justify-center"
                                                style={{
                                                    left: `${x}%`,
                                                    top: `${y}%`,
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                }}
                                            >
                                                <div className="relative flex size-9 items-center justify-center rounded-full border bg-background">
                                                    <div
                                                        className={cn(
                                                            "h-4 w-4 transition-colors",
                                                            neutral
                                                                ? "text-muted-foreground"
                                                                : "text-primary",
                                                        )}
                                                        dangerouslySetInnerHTML={{
                                                            __html: sanitizeIcon(
                                                                item.icon,
                                                            ),
                                                        }}
                                                    />
                                                    <span className="pointer-events-none absolute -top-7 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 relative">
                        <MarqueeCarousel
                            items={skills}
                            speedPerSec={0.8}
                            direction="left"
                            // className="-z-50"
                            renderItem={(skill, i) => {
                                const safeIcon = sanitizeIcon(skill.icon);

                                return (
                                    <div
                                        key={`${skill.name}-${i}`}
                                        className={cn(
                                            "group relative flex size-28 md:size-36 shrink-0 items-center justify-center rounded border transition-colors hover:bg-muted/40",
                                            i === 0 && "ml-4",
                                        )}
                                    >
                                        <div
                                            className="pointer-events-none h-10 w-10 text-foreground transition-transform duration-200 group-hover:scale-110 group-hover:text-primary"
                                            dangerouslySetInnerHTML={{
                                                __html: safeIcon,
                                            }}
                                        />

                                        <span className="pointer-events-none absolute -top-7 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                                            {skill.name}
                                        </span>
                                    </div>
                                );
                            }}
                        />
                        <MarqueeCarousel
                            items={skills}
                            speedPerSec={0.8}
                            direction="right"
                            className="hidden md:block"
                            renderItem={(skill, i) => {
                                return (
                                    <div
                                        key={`${skill.name}-${i}`}
                                        className={cn(
                                            "group relative flex size-36 shrink-0 items-center justify-center rounded border transition-colors hover:bg-muted/40",
                                            i === 0 && "ml-4",
                                        )}
                                    >
                                        <div
                                            className="pointer-events-none h-10 w-10 text-foreground transition-transform duration-200 group-hover:scale-110 group-hover:text-primary"
                                            dangerouslySetInnerHTML={{
                                                __html: sanitizeIcon(
                                                    skill.icon,
                                                ),
                                            }}
                                        />

                                        <span className="pointer-events-none absolute -top-7 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                                            {skill.name}
                                        </span>
                                    </div>
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
