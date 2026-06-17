"use client";

import { projects } from "@/constant/projects";
import { useCursorPosition } from "@/hooks/use-cursor-position";
import { Expand } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import ProjectDrawer, { DrawerHandle } from "../drawer/ProjectDrawer";
import SectionWrapper from "../section-wrapper";
import { Card } from "../ui/card";

export default function Projects() {
    const projectDrawerRef = useRef<DrawerHandle>(null);
    const { mousePosition, isHovering } = useCursorPosition({
        targetElementId: ["project-card-trigger"],
    });
    const featuredProjects =
        projects.filter((project) => project.isFeatured) || [];

    return (
        <>
            <SectionWrapper id="projects">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full flex flex-col gap-2">
                        <h1 className="text-2xl font-bold uppercase leading-none tracking-tight text-foreground">
                            Recent Projects
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            A selection of full stack applications showcasing my
                            ability to build responsive frontends, robust
                            backends, and seamless user experiences.
                        </p>
                    </div>
                    <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                        {featuredProjects.map((project) => {
                            const image = project.image;
                            return (
                                <div
                                    key={project.title}
                                    className="flex flex-col gap-2"
                                    onClick={() => {
                                        projectDrawerRef.current?.openWithTitle(
                                            project.title,
                                        );
                                    }}
                                >
                                    <Card
                                        className="p-0 cursor-pointer overflow-hidden min-h-32"
                                        id="project-image-wrapper"
                                    >
                                        <Image
                                            src={image}
                                            width={200}
                                            height={180}
                                            alt={project.title}
                                            loading="lazy"
                                            className="w-full aspect-video object-cover rounded"
                                        />
                                        {isHovering && (
                                            <div
                                                className="fixed hidden md:flex pointer-events-none z-[99] h-16 w-16 bg-primary rounded-full items-center justify-center transition-all duration-300 ease-out"
                                                style={{
                                                    left: mousePosition.x - 40,
                                                    top: mousePosition.y - 40,
                                                }}
                                            >
                                                <Expand className="h-6 w-6 text-primary-foreground" />
                                            </div>
                                        )}
                                    </Card>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <h1 className="text-lg font-medium text-foreground">
                                            {project.title}
                                        </h1>
                                        <p className="line-clamp-2 text-wrap text-sm text-muted-foreground">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <h1 className="text-base">
                            Visit my Github profile for more projects
                        </h1>
                    </div>
                </div>
            </SectionWrapper>
            <ProjectDrawer ref={projectDrawerRef} />
        </>
    );
}
