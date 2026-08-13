"use client";

import { projects } from "@/constant/projects";
import { useCursorPosition } from "@/hooks/use-cursor-position";
import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import {
    ArrowUpRight,
    Expand,
    Github,
    ShieldCheck,
    Sparkles,
    Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
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

    const x = useMotionValue(mousePosition.x - 30);
    const y = useMotionValue(mousePosition.y - 30);
    const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        x.set(mousePosition.x - 30);
        y.set(mousePosition.y - 30);
    }, [mousePosition.x, mousePosition.y, x, y]);

    const featuredProjects = projects.filter((p) => p.isFeatured === true);

    return (
        <>
            <SectionWrapper id="projects">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-primary text-xs font-medium uppercase">
                            [ PROJects ]
                        </span>
                        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                            Built With Passion
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            A selection of full stack applications showcasing my
                            ability to build responsive frontends, robust
                            backends, and seamless user experiences.
                        </p>
                    </div>
                    <CornerFrame className="relative border border-border">
                        <div className="relative grid md:grid-cols-2">
                            <AnimatePresence>
                                {isHovering && (
                                    <motion.div
                                        className="fixed hidden md:flex pointer-events-none z-[99] h-16 w-16 bg-primary rounded-full items-center justify-center top-0 left-0"
                                        style={{ x: springX, y: springY }}
                                        initial={{ opacity: 0, scale: 0.6 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.6 }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <Expand className="h-6 w-6 text-primary-foreground" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {featuredProjects.map((project, i) => {
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
                                            "group hover:bg-muted/40 relative cursor-pointer overflow-hidden border-border transition-colors",
                                            "border-b",
                                            (i + 1) % 2 === 1 && "md:border-r",
                                        )}
                                    >
                                        <ArrowUpRight
                                            size={20}
                                            className="absolute top-3 right-3 text-muted-foreground transition-colors group-hover:text-primary"
                                        />
                                        <div className="p-4 flex flex-col gap-2">
                                            <h3 className="font-semibold text-lg tracking-normal text-muted-foreground">
                                                {i + 1 < 10
                                                    ? `0${i + 1}`
                                                    : i + 1}
                                            </h3>
                                            <h3 className="font-semibold text-lg md:text-xl tracking-normal text-foreground">
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
                    </CornerFrame>

                    <div className="flex">
                        <Link
                            href="https://github.com/almonsour013"
                            target="_blank"
                            className="flex flex-1 p-4 bg-primary items-center justify-center gap-2 text-base text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            <span>See more on my GitHub profile</span>
                            <Github size={16} />
                        </Link>
                    </div>

                    <div className="hidden grid md:grid-cols-3 border-t border-border">
                        {FEATURE_NOTES.map((note, index) => (
                            <div
                                key={note.title}
                                className={cn(
                                    "p-4 bg-card",
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
                    </div>
                </div>
            </SectionWrapper>
            <ProjectDrawer ref={projectDrawerRef} />
        </>
    );
}
