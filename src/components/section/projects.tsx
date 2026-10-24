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
import Link from "next/link";
import { useEffect, useRef } from "react";
import TextAnimate from "../animation/text-animate";
import ProjectDrawer, { DrawerHandle } from "../drawer/project-drawer";
import ContentContainer from "../layout/content-container";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const BUILT_WITH_WORDS = ["Passion", "Precision", "Purpose", "Persistence"];

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
            <ContentContainer id="projects">
                <div className="flex flex-col">
                    <div className="relative flex flex-col items-start gap-2 pb-8 md:py-12">
                        <h1 className="text-5xl font-light tracking-tight text-foreground items-start capitalize leading-tight ">
                            Built With{" "}
                            <TextAnimate
                                words={BUILT_WITH_WORDS}
                                type="blur"
                                className="text-primary hidden md:block"
                                interval={5000}
                            />
                            <span className="md:hidden">Passion</span>
                        </h1>
                        <p className="text-sm text-muted-foreground md:text-base items-tart md:text-center">
                            A selection of full stack applications showcasing my
                            ability to build responsive frontends, robust
                            backends, and seamless user experiences.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="relative grid md:grid-cols-2 gap-2">
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
                                    <Card
                                        key={project.title}
                                        id="project-image-wrapper"
                                        onClick={() =>
                                            projectDrawerRef.current?.openWithTitle(
                                                project.title,
                                            )
                                        }
                                        className={cn(
                                            "group hover:bg-muted/40 relative cursor-pointer border  overflow-hidden transition-colors",
                                        )}
                                    >
                                        <ArrowUpRight
                                            size={20}
                                            className="absolute top-3 right-3 z-10 text-muted-foreground transition-colors group-hover:text-primary"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-medium text-lg tracking-normal text-muted-foreground">
                                                {i + 1 < 10
                                                    ? `0${i + 1}`
                                                    : i + 1}
                                            </h3>
                                            <h3 className="font-medium text-lg md:text-xl tracking-normal text-foreground group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-3 max-w-md">
                                                {project.description}
                                            </p>
                                        </div>
                                    </Card>
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
            </ContentContainer>
            <ProjectDrawer ref={projectDrawerRef} />
        </>
    );
}
