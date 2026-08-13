"use client";
import { skills } from "@/constant/skills";
import { cn } from "@/lib/utils";
import { Layers, Sparkles, Target } from "lucide-react";
import CornerFrame from "../corner-frame";
import SectionWrapper from "../section-wrapper";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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

export default function Skills() {
    return (
        <SectionWrapper id="skills">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <span className="text-primary text-xs font-medium">
                        [ SKILLS ]
                    </span>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                        Tech Stacks
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                        A curated collection of languages, frameworks, and tools
                        I use to architect scalable backends, design responsive
                        interfaces, and build high-performance web and mobile
                        solutions.
                    </p>
                </div>

                <CornerFrame className="relative border border-border rounded-md">
                    <ScrollArea className="w-full h-auto whitespace-nowrap">
                        <div className="flex gap-3 w-max p-4 md:py-6">
                            {skills.map((skill) => {
                                const safeIcon = skill.icon.replace(
                                    /<path(?![^>]*fill=)/g,
                                    '<path fill="currentColor"',
                                );

                                return (
                                    <div
                                        key={skill.name}
                                        className="group relative size-16 border border-border border-dashed hover:border-solid rounded flex justify-center items-center flex-shrink-0 transition-colors hover:bg-muted/40"
                                    >
                                        <div
                                            className="w-8 h-8 text-foreground transition-colors group-hover:text-primary"
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
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </CornerFrame>

                <CornerFrame className="grid border md:grid-cols-3">
                    {STACK_NOTES.map((note, index) => (
                        <div
                            key={note.title}
                            className={cn(
                                " bg-card p-4",
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
