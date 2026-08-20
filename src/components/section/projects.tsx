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
import { ArrowUpRight, Expand, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ProjectDrawer, { DrawerHandle } from "../drawer/project-drawer";
import EdgeDash from "../edge-dash";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";

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
                <div className="flex flex-col">
                    <div className="relative flex flex-col items-center gap-2 px-4 py-8 md:py-16">
                        <EdgeDash side="right" className="-z-20" />
                        <EdgeDash side="left" className="-z-20" />
                        <span className="text-primary text-xs font-medium uppercase">
                            [ PROJects ]
                        </span>
                        <h1 className="text-4xl md:text-6xl font-normal tracking-tight text-foreground">
                            Built With Passion
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground text-center">
                            A selection of full stack applications showcasing my
                            ability to build responsive frontends, robust
                            backends, and seamless user experiences.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="relative border rounded overflow-hidden grid md:grid-cols-2">
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
                                const hasImage = Boolean(project.image);

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
                                            "group hover:bg-muted/40 relative cursor-pointer bg-card bordera roundeda overflow-hidden transition-colors",
                                            i < 2 && "border-b",
                                            i >= 2 &&
                                                i <
                                                    featuredProjects.length -
                                                        1 &&
                                                "border-b md:border-b-0",
                                            (i + 1) % 2 === 1 && "md:border-r",
                                        )}
                                    >
                                        <ArrowUpRight
                                            size={20}
                                            className="absolute top-3 right-3 z-10 text-muted-foreground transition-colors group-hover:text-primary"
                                        />
                                        <div className="hidden relative h-40 md:h-48 w-full overflow-hidden border-b border-border bg-muted/30">
                                            {hasImage ? (
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted/60 to-muted/20">
                                                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                                                        No preview
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 flex flex-col gap-2">
                                            <h3 className="font-medium text-lg tracking-normal text-muted-foreground">
                                                {i + 1 < 10
                                                    ? `0${i + 1}`
                                                    : i + 1}
                                            </h3>
                                            <h3 className="font-medium text-lg md:text-xl tracking-normal text-foreground">
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

                        <div className="flex">
                            <Link
                                href="https://github.com/almonsour013"
                                target="_blank"
                                className="flex flex-1"
                            >
                                <Button className="flex-1 p-4">
                                    <span>See more on my GitHub profile</span>
                                    <Github size={16} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
            <ProjectDrawer ref={projectDrawerRef} />
        </>
    );
}
