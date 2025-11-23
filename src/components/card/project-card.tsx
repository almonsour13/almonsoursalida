"use client";

import { useCursorPosition } from "@/app/hooks/use-cursor-position";
import { useProject } from "@/context/project-context";
import { Project } from "@/type/type";
import { motion } from "framer-motion";
import { ArrowUpRight, Expand, Github } from "lucide-react";
import { useEffect, useState } from "react";
import ImageLoader from "../image-loader";
import { Button } from "../ui/button";

export default function ProjectCard({
    project,
    index,
}: {
    project: Project;
    index: number;
}) {
    const { mousePosition, isHovering } = useCursorPosition({
        targetElementId: ["project-image-wrapper"],
    });

    const { setSelectedProjectTitle } = useProject();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!project.images || project.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [project.images]);

    const handclickOpen = () => {
        setSelectedProjectTitle(project.title);
    };

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <div
                className="relative flex gap-4 md:gap-8 items-start"
            >
                <div className="sticky top-20 -ml-20 hidden amd:block text-4xl md:text-6xl font-light text-muted">
                    {String(index + 1).padStart(2, "0")}
                </div>
                <div
                    className={`flex-1 flex flex-col ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } justify-between items-start gap-8`}
                >
                    <div
                        id="project-image-wrapper"
                        className="aspect-video group relative p-4 md:p-8 cursor-pointer rounded-md border overflow-hidden"
                        onClick={handclickOpen}
                    >
                        <ImageLoader
                            src={project.images[currentImageIndex]}
                            alt={project.title}
                            width={1000}
                            height={1000}
                            className="rounded-md w-md"
                        />
                        <ImageLoader
                            src={project.images[currentImageIndex]}
                            alt={project.title}
                            width={1000}
                            height={1000}
                            className="h-full w-full left-0 top-0 absolute transition-transform duration-300 blur-[5px] -z-10 opacity-50"
                        />
                        {isHovering && (
                            <div
                                className="fixed hidden md:flex pointer-events-none z-[99] h-20 w-20 bg-primary rounded-full items-center justify-center transition-all duration-300 ease-out"
                                style={{
                                    left: mousePosition.x - 40,
                                    top: mousePosition.y - 40,
                                }}
                            >
                                <Expand className="h-6 w-6 text-primary-foreground" />
                            </div>
                        )}
                    </div>
                    <div
                        className={`flex flex-col gap-4 items-start justify-center max-w-lg`}
                    >
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                                {project.title}
                            </h2>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                <span className="line-clamp-3">
                                    {project.description}
                                </span>
                                <span
                                    className="font-medium text-foreground cursor-pointer"
                                    onClick={handclickOpen}
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
                                <a target="blank" href={project.live}>
                                    <Button>
                                        <ArrowUpRight className="h-4 w-4" />
                                        <span>View Live</span>
                                    </Button>
                                </a>
                            )}
                            {project.github && (
                                <a target="blank" href={project.github}>
                                    <Button variant="outline">
                                        <Github className="h-4 w-4" />
                                        <span>GitHub</span>
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
