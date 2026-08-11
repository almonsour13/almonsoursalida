"use client";

import { projects } from "@/constant/projects";
import { useCursorPosition } from "@/hooks/use-cursor-position";
import { ArrowUpRight, Expand, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CornerFrame from "../corner-frame";
import ProjectDrawer, { DrawerHandle } from "../drawer/project-drawer";
import SectionWrapper from "../section-wrapper";

export default function Projects() {
    const projectDrawerRef = useRef<DrawerHandle>(null);
    const { mousePosition, isHovering } = useCursorPosition({
        targetElementId: ["project-image-wrapper"],
    });
    const featuredProjects =
        projects.filter((project) => project.isFeatured) || [];
    const recentActivity = featuredProjects.slice(0, 4);

    return (
        <>
            <SectionWrapper id="projects">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-3 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
                            Recent projects
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            A selection of full stack applications showcasing my
                            ability to build responsive frontends, robust
                            backends, and seamless user experiences.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2">
                        <CornerFrame className="border border-border p-5 flex flex-col gap-2">
                            <p className="text-xs text-muted-foreground mb-1">
                                Build log
                            </p>
                            {recentActivity.map((project) => (
                                <div
                                    key={project.title}
                                    className="flex items-center justify-between gap-3 py-2 not-last:border-b border-border/60"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                        <span className="text-sm text-foreground truncate">
                                            {project.title}
                                        </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground shrink-0">
                                        Shipped
                                    </span>
                                </div>
                            ))}
                        </CornerFrame>

                        <div className="bg-primary text-primary-foreground p-6 flex flex-col justify-center gap-2">
                            <h3 className="text-lg font-medium">
                                Always building something new
                            </h3>
                            <p className="text-sm opacity-90 leading-relaxed">
                                Beyond what's featured here, there's usually a
                                side project mid-flight. GitHub has the full
                                history, commits and all.
                            </p>
                            <Link
                                href="https://github.com/almonsour13"
                                target="_blank"
                                className="mt-2 w-fit flex items-center gap-2 rounded-full bg-primary-foreground text-primary px-4 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity"
                            >
                                <Github size={14} />
                                <span>View GitHub</span>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                        {featuredProjects.map((project) => {
                            const image = project.image;
                            return (
                                <CornerFrame
                                    key={project.title}
                                    className="group border border-border cursor-pointer transition-colors duration-200 hover:border-primary/60"
                                >
                                    <div
                                        onClick={() => {
                                            projectDrawerRef.current?.openWithTitle(
                                                project.title,
                                            );
                                        }}
                                    >
                                        <div
                                            className="hidden relative overflow-hidden min-h-32 border-b border-border"
                                            id="project-image-wrapper"
                                        >
                                            <Image
                                                src={image}
                                                width={200}
                                                height={180}
                                                alt={project.title}
                                                loading="lazy"
                                                className="w-full aspect-video object-cover"
                                            />
                                            {isHovering && (
                                                <div
                                                    className="fixed hidden md:flex pointer-events-none z-[99] h-16 w-16 bg-primary rounded-full items-center justify-center transition-all duration-300 ease-out"
                                                    style={{
                                                        left:
                                                            mousePosition.x -
                                                            40,
                                                        top:
                                                            mousePosition.y -
                                                            40,
                                                    }}
                                                >
                                                    <Expand className="h-6 w-6 text-primary-foreground" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1 p-4">
                                            <div className="flex flex-row justify-between items-start gap-2">
                                                <h1 className="text-lg font-medium tracking-wide text-foreground">
                                                    {project.title}
                                                </h1>
                                                <ArrowUpRight
                                                    size={20}
                                                    className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                                                />
                                            </div>
                                            <p className="line-clamp-2 text-wrap text-sm text-muted-foreground">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                </CornerFrame>
                            );
                        })}
                    </div>

                    <div className="w-full flex flex-row items-center gap-2">
                        <Link
                            href="https://github.com/almonsour13"
                            target="_blank"
                            className="flex gap-2 items-center"
                        >
                            <h1 className="text-sm text-muted-foreground hover:underline capitalize">
                                See more in my GitHub profile
                            </h1>
                            <Github size={16} />
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
            <ProjectDrawer ref={projectDrawerRef} />
        </>
    );
}
