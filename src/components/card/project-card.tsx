"use client";

import { useProject } from "@/context/project-context";
import { Project } from "@/type/type";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ProjectCard({
    project,
    index,
}: {
    project: Project;
    index: number;
}) {
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
            className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } justify-between items-start gap-8`}
        >
            <div
                className="group relative p-4 md:p-8 image-content cursor-pointer rounded-md border overflow-hidden"
                onClick={handclickOpen}
            >
                <div className="rounded overflow-hidden">
                    <Image
                        src={project.images[currentImageIndex]}
                        alt={project.title}
                        className="rounded w-md transition-transform duration-300"
                        width={1000}
                        height={1000}
                    />
                </div>
                <Image
                    src={project.images[currentImageIndex]}
                    alt={project.title}
                    className="rounded absolute transition-transform duration-300 blur-[5px] -z-10 opacity-50"
                    fill
                />
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
                        <a
                            target="blank"
                            href={project.github}
                        >
                            <Button variant="outline">
                                <Github className="h-4 w-4" />
                                <span>GitHub</span>
                            </Button>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
