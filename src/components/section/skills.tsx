"use client";

import { skills } from "@/constant/skills";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Layers, Sparkles, Target } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import TextAnimate from "../animation/text-animate";
import { MarqueeCarousel } from "../common/marquee-carousel";
import CornerFrame from "../decorative/corner-frame";
import ContentContainer from "../layout/content-container";
import { Card } from "../ui/card";

const STACK_WORDS = ["Stacks", "Tools", "Skills"];
const NOTES_INTERVAL_MS = 10000;
const ORBIT_ITEM_COUNT = 14;

const RING_CONFIG = {
    mobile: { count: 5, min: 40, max: 132 },
    desktop: { count: 12, min: 32, max: 172 },
};

function sanitizeIcon(icon: string) {
    return icon.replace(/<path(?![^>]*fill=)/g, '<path fill="currentColor"');
}

const SKILLS = skills.map((skill) => ({
    ...skill,
    icon: sanitizeIcon(skill.icon),
}));

type Skill = (typeof SKILLS)[number];

const ORBIT_SKILLS = SKILLS.slice(0, ORBIT_ITEM_COUNT);

const STACK_NOTES = [
    {
        icon: Layers,
        title: `${skills.length}+ tools`,
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

function Tooltip({ children }: { children: React.ReactNode }) {
    return (
        <span className="pointer-events-none absolute -top-7 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {children}
        </span>
    );
}

const OrbitRings = memo(function OrbitRings({
    isDesktop,
    reduceMotion,
}: {
    isDesktop: boolean;
    reduceMotion: boolean;
}) {
    const rings = useMemo(() => {
        const { count, min, max } = isDesktop
            ? RING_CONFIG.desktop
            : RING_CONFIG.mobile;

        return Array.from({ length: count }, (_, i) => ({
            size: min + (i * (max - min)) / Math.max(1, count - 1),
            duration: 10 + i * 8,
            reverse: i % 2 === 1,
            items: ORBIT_SKILLS.filter((_, j) => j % count === i),
        }));
    }, [isDesktop]);

    return (
        <>
            {rings.map((ring, i) => (
                <div
                    key={i}
                    className="absolute left-1/2 top-1/2 aspect-square rounded-full border"
                    style={{
                        width: `${ring.size}%`,
                        transform: "translate(-50%, -50%)",
                        animation: reduceMotion
                            ? undefined
                            : `orbit-spin ${ring.duration}s linear infinite`,
                        animationDirection: ring.reverse
                            ? "reverse"
                            : undefined,
                    }}
                >
                    {ring.items.map((item, j) => {
                        const angle = (2 * Math.PI * j) / ring.items.length;

                        return (
                            <div
                                key={item.name}
                                title={item.name}
                                className="group absolute"
                                style={{
                                    left: `${50 + 50 * Math.cos(angle)}%`,
                                    top: `${50 + 50 * Math.sin(angle)}%`,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <div className="relative flex size-9 items-center justify-center rounded-full border bg-background">
                                    <div
                                        className="h-4 w-4 text-primary"
                                        dangerouslySetInnerHTML={{
                                            __html: item.icon,
                                        }}
                                    />
                                    <Tooltip>{item.name}</Tooltip>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    );
});

function renderSkill(skill: Skill, i: number) {
    return (
        <Card
            key={`${skill.name}-${i}`}
            className={`group relative flex size-28 shrink-0 items-center justify-center border transition-colors hover:bg-muted/40 md:size-36 ${
                i === 0 ? "ml-4" : ""
            }`}
        >
            <div
                className="pointer-events-none h-10 w-10 text-primary transition-transform duration-200 group-hover:scale-110"
                dangerouslySetInnerHTML={{ __html: skill.icon }}
            />
            <Tooltip>{skill.name}</Tooltip>
        </Card>
    );
}

export default function Skills() {
    const [noteIndex, setNoteIndex] = useState(0);
    const reduceMotion = !!useReducedMotion();
    const isDesktop = useIsDesktop({});

    useEffect(() => {
        if (reduceMotion) return;
        const id = setInterval(
            () => setNoteIndex((i) => (i + 1) % STACK_NOTES.length),
            NOTES_INTERVAL_MS,
        );
        return () => clearInterval(id);
    }, [reduceMotion]);

    const note = STACK_NOTES[noteIndex];
    const NoteIcon = note.icon;

    return (
        <ContentContainer id="skills">
            <div className="relative flex flex-col">
                <div className="relative flex flex-col items-start gap-2 pb-8 md:pb-12">
                    <h1 className="text-5xl font-light capitalize leading-tight tracking-tight text-foreground">
                        Tech{" "}
                        <TextAnimate
                            words={STACK_WORDS}
                            className="text-primary"
                            interval={5000}
                        />
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base">
                        A curated collection of languages, frameworks, and tools
                        I use to architect scalable backends, design responsive
                        interfaces, and build high-performance web and mobile
                        solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {/* Orbit + rotating notes */}
                    <Card className="relative min-h-72 md:h-full">
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
                                    className="absolute inset-0 z-20 flex items-center justify-center"
                                >
                                    <Card className="flex flex-col items-center gap-1 border bg-background p-2 px-3 text-center md:p-4">
                                        <NoteIcon className="hidden h-4 w-4 text-muted-foreground md:block" />
                                        <h3 className="text-sm font-medium text-foreground md:text-base">
                                            {note.title}
                                        </h3>
                                        <p className="hidden text-sm leading-relaxed text-muted-foreground md:block">
                                            {note.description}
                                        </p>
                                    </Card>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </Card>

                    {/* Marquees */}
                    <div className="relative flex flex-col gap-2">
                        <MarqueeCarousel
                            items={SKILLS}
                            speedPerSec={0.8}
                            direction="left"
                            renderItem={renderSkill}
                        />
                        <MarqueeCarousel
                            items={SKILLS}
                            speedPerSec={0.8}
                            direction="right"
                            className="hidden md:block"
                            renderItem={renderSkill}
                        />
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
