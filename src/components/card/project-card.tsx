"use client";

import { cn } from "@/lib/utils";
import { Project } from "@/type/type";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import ProjectModal from "../modal/project-modal";

export default function ProjectCard({
    project,
    index,
}: {
    project: Project;
    index: number;
}) {
    return (
        <motion.article
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.2,
                duration: 0.8,
            }}
            className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } pt-8 justify-between gap-4 bg-transparent`}
        >
            <ProjectModal project={project}>
                <div
                    className="group cursor-pointer image-content relative flex items-center justify-center flex-1 p-4 h-80 aspect-video max-w-lg rounded-md overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border"
                    // onClick={() => handleImageClick(project)}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        className="rounded w-md transition-transform duration-300"
                        width={1000}
                        height={1000}
                    />
                    <Image
                        src={project.image}
                        alt={project.title}
                        className="rounded absolute transition-transform duration-300 blur-[5px] -z-10 opacity-50"
                        fill
                    />
                    <div className="absolute z-50 w-full h-full bg-card/20 opacity-0 group-hover:opacity-100"></div>
                </div>
            </ProjectModal>
            <div
                className={`
                                    flex flex-col gap-4 items-start justify-center max-w-lg`}
            >
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                        {project.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        <span className="line-clamp-3">
                            {" "}
                            {project.description}
                        </span>
                        <span
                            // onClick={() =>
                            //     handleImageClick(project)
                            // }
                            className="font-medium text-foreground cursor-pointer"
                        >
                            View More
                        </span>
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-3 bg-card py-1 border rounded text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Project Links */}
                <div className="flex gap-2">
                    {project.live && (
                        <a
                            target="blank"
                            href={project.live}
                            className={cn(
                                "group/link flex items-center gap-2 px-4 py-2 rounded",
                                "bg-foreground text-primary-foreground font-medium text-sm",
                                "hover:bg-primary/90 transition-all duration-300",
                                "border border-primary"
                            )}
                        >
                            <ArrowUpRight className="h-4 w-4" />
                            <span>View Live</span>
                        </a>
                    )}
                    {project.github && (
                        <a
                            target="blank"
                            href={project.github}
                            className={cn(
                                "group/link flex items-center gap-2 px-4 py-2 rounded",
                                "bg-card border text-foreground font-medium text-sm",
                                "hover:border-primary/50 transition-all duration-300"
                            )}
                        >
                            <Github className="h-4 w-4" />
                            <span>Source Code</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}
