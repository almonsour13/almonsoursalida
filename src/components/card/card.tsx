"use client";

import { useCursorPosition } from "@/app/hooks/use-cursor-position";
import { useProject } from "@/context/project-context";
import { Project } from "@/type/type";
import { motion } from "framer-motion";
import ImageLoader from "../image-loader";
import { ArrowUpRight, Expand, Github } from "lucide-react";
import { Button } from "../ui/button";

export default function Card({
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
                className={`group flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } bg-card`}
            >
                {/* <div
                className={`grid grid-cols-1 lg:grid-cols-2 bg-card [&>*]:text-left ${
                    index % 2 !== 0 ? "lg:[direction:rtl]" : ""
                }`}
            > */}
                <div
                    id="project-image-wrapper"
                    className="lg:w-1/2 aspect-video group relative cursor-pointer overflow-hidden group-hover:opacity-80"
                    onClick={handclickOpen}
                >
                    <ImageLoader
                        src={project.images[0]}
                        alt={project.title}
                        width={1000}
                        height={1000}
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
                <div className="lg:w-1/2 flex flex-col gap-4 p-8 ">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                            {project.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-muted-foreground text-wrap">
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
        </motion.div>
    );
}
