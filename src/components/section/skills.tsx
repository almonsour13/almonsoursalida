"use client";
import { skills } from "@/constant/skills";
import { cn } from "@/lib/utils";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useTransform,
} from "framer-motion";
import { Layers, Sparkles, Target } from "lucide-react";
import { useEffect, useRef } from "react";
import CornerFrame from "../corner-frame";
import SectionWrapper from "../section-wrapper";

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

const SPEED_PERCENT_PER_SEC = 50 / 36;

function wrap(min: number, max: number, value: number) {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
}

export default function Skills() {
    const marqueeSkills = [...skills, ...skills];
    const trackRef = useRef<HTMLDivElement>(null);
    const isPaused = useRef(false);
    const prefersReducedMotion = useRef(false);

    const baseX = useMotionValue(0);
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

    useEffect(() => {
        prefersReducedMotion.current = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
    }, []);

    useAnimationFrame((_, delta) => {
        if (isPaused.current || prefersReducedMotion.current) return;
        baseX.set(baseX.get() - (delta / 1000) * SPEED_PERCENT_PER_SEC);
    });

    return (
        <SectionWrapper id="skills">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <span className="text-primary text-xs font-medium">
                        [ SKILLS ]
                    </span>
                    <h1 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
                        Tech Stacks
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                        A curated collection of languages, frameworks, and tools
                        I use to architect scalable backends, design responsive
                        interfaces, and build high-performance web and mobile
                        solutions.
                    </p>
                </div>

                <CornerFrame className="relative border border-border">
                    <div className="hidden pointer-events-none absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="hidden pointer-events-none absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10" />

                    <div
                        className="w-full overflow-hidden"
                        onMouseEnter={() => {
                            isPaused.current = true;
                        }}
                        onMouseLeave={() => {
                            isPaused.current = false;
                        }}
                    >
                        <motion.div
                            ref={trackRef}
                            className="flex w-max cursor-grab active:cursor-grabbing"
                            style={{ x }}
                            drag="x"
                            dragConstraints={false}
                            dragElastic={0}
                            onDragStart={() => {
                                isPaused.current = true;
                            }}
                            onDrag={(_, info) => {
                                const trackWidth =
                                    trackRef.current?.offsetWidth || 1;
                                baseX.set(
                                    baseX.get() +
                                        (info.delta.x / trackWidth) * 100,
                                );
                            }}
                            onDragEnd={() => {
                                isPaused.current = false;
                            }}
                        >
                            {marqueeSkills.map((skill, i) => {
                                const safeIcon = skill.icon.replace(
                                    /<path(?![^>]*fill=)/g,
                                    '<path fill="currentColor"',
                                );

                                return (
                                    <div
                                        key={`${skill.name}-${i}`}
                                        className={cn(
                                            "group relative size-28 border-r flex justify-center items-center flex-shrink-0 transition-colors hover:bg-muted/40",
                                            i === 0 && "ml-4",
                                        )}
                                    >
                                        <div
                                            className="w-10 h-10 text-foreground transition-colors group-hover:text-primary pointer-events-none"
                                            dangerouslySetInnerHTML={{
                                                __html: safeIcon,
                                            }}
                                        />
                                        <span className="pointer-events-none z-20 absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground opacity-0 translate-y-[-4px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                                            {skill.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </CornerFrame>

                <CornerFrame className="grid border border-border rounded md:grid-cols-3">
                    {STACK_NOTES.map((note, index) => (
                        <div
                            key={note.title}
                            className={cn(
                                "bg-card p-4",
                                index > 0 &&
                                    "border-t border-border md:border-t-0 md:border-l",
                            )}
                        >
                            <note.icon className="mb-2 h-5 w-5 text-muted-foreground" />

                            <h3 className="mb-1 text-sm font-medium text-foreground">
                                {note.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {note.description}
                            </p>
                        </div>
                    ))}
                </CornerFrame>
            </div>
        </SectionWrapper>
    );
}
