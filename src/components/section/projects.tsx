"use client";

import { projects } from "@/constant/projects";
import { useCursorPosition } from "@/hooks/use-cursor-position";
import { cn } from "@/lib/utils";
import {
    ArrowUpRight,
    Github,
    ShieldCheck,
    Sparkles,
    Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CornerFrame from "../corner-frame";
import ProjectDrawer, { DrawerHandle } from "../drawer/project-drawer";
import SectionWrapper from "../section-wrapper";

const FEATURE_NOTES = [
    {
        icon: Wrench,
        title: "Fits your workflow",
        description: "Git, CI, and whatever framework your team already runs.",
    },
    {
        icon: ShieldCheck,
        title: "Secure by default",
        description:
            "Auth, validation, and data handling done right from commit one.",
    },
    {
        icon: Sparkles,
        title: "Deployed, not just demoed",
        description: "Shipped to production with docs and monitoring included.",
    },
];

export default function Projects() {
    const projectDrawerRef = useRef<DrawerHandle>(null);
    const { mousePosition, isHovering } = useCursorPosition({
        targetElementId: ["project-image-wrapper"],
    });

    return (
        <>
            <SectionWrapper id="projects">
                <CornerFrame className="relative border border-border rounded-md">
                    <div className="p-4">
                        <span className="text-primary text-xs font-medium">
                            [ RECENT WORK ]
                        </span>
                        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-2">
                            Projects
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-xl">
                            A selection of full stack applications showcasing my
                            ability to build responsive frontends, robust
                            backends, and seamless user experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-2 border-t border-border">
                        {projects
                            .filter((p) => p.isFeatured === true)
                            .map((project, i) => {
                                return (
                                    <div
                                        key={project.title}
                                        id="project-image-wrapper"
                                        onClick={() =>
                                            projectDrawerRef.current?.openWithTitle(
                                                project.title,
                                            )
                                        }
                                        className={cn(
                                            "group relative cursor-pointer overflow-hidden border-border",
                                            "border-r border-b",
                                            (i + 1) % 2 === 0 && "md:border-r",
                                        )}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            loading="lazy"
                                            className="hidden object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <ArrowUpRight
                                            size={20}
                                            className="absolute top-3 right-3 text-white/80 group-hover:text-primary transition-colors"
                                        />
                                        <div className="p-4 flex flex-col gap-2">
                                            <h3 className="font-semibold text-lg tracking-normal">
                                                {i + 1 < 10
                                                    ? `0${i + 1}`
                                                    : i + 1}
                                            </h3>
                                            <h3 className="font-semibold text-lg md:text-xl tracking-normal">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-3 max-w-md">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="grid md:grid-cols-3">
                        {FEATURE_NOTES.map((note, index) => (
                            <div
                                key={note.title}
                                className={`p-4 ${
                                    index > 0
                                        ? "border-t border-border md:border-t-0 md:border-l"
                                        : ""
                                }`}
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
                    </div>

                    <div className="flex items-center justify-center gap-2 p-4 border-t border-border">
                        <Link
                            href="https://github.com/almonsour013"
                            target="_blank"
                            className="flex gap-2 items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <span>See more on my GitHub profile</span>
                            <Github size={16} />
                        </Link>
                    </div>
                </CornerFrame>
            </SectionWrapper>
            <ProjectDrawer ref={projectDrawerRef} />
        </>
    );
}
