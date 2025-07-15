"use client";
import { projects } from "@/constant/data";
import { cn } from "@/lib/utils";
import { Project } from "@/type/type";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import ProjectModal from "../modal/project-modal";
import SectionWrapper from "../section-wrapper";
import Image from "next/image";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    const handleImageClick = (project: Project) => {
        setSelectedProject(project);
    };
    const closeModal = () => {
        setSelectedProject(null);
    };
    return (
        <SectionWrapper id="projects" className="">
            <div className="md:max-w-6xl w-full flex flex-col items-center min-h-screen">
                <div className="w-full">
                    <div className="flex items-center gap-4 md:gap-8 mb-8">
                        <div className="w-8 md:w-16 h-0.5 bg-primary"></div>
                        <span className="text-sm font-medium tracking-widest uppercase text-primary">
                            Projects
                        </span>
                        <div className="flex-1 h-0.5 bg-border"></div>
                    </div>
                    <div className="flex justify-between w-full">
                        <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight text-foreground mb-6 leading-none">
                            Built With Passion
                        </h1>
                        <div className="hidden md:block">
                            <div className="text-right">
                                <div className="text-6xl font-light text-primary/20">
                                    {projects
                                        .slice(0, 3)
                                        .length.toString()
                                        .padStart(2, "0")}
                                </div>
                                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                                    Featured Projects
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm md:text-base mb-6 text-muted-foreground">
                        A selection of full stack applications showcasing my
                        ability to build responsive frontends, robust backends,
                        and seamless user experiences.
                    </p>
                </div>
                <div className="flex flex-col w-full gap-6 md:gap-12">
                    {projects.slice(0, 3).map((project, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className={`flex flex-col ${
                                index % 2 === 0
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                            } pt-8 justify-between gap-4 bg-transparent`}
                        >
                            <div
                                className="group cursor-pointer image-content relative flex items-center justify-center flex-1 p-4 h-80 aspect-video max-w-lg rounded-md overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border"
                                onClick={() => handleImageClick(project)}
                            >
                                <div className="absolute hidden -z-10 top-0 left-0 text-8xl md:text-9xl font-bold text-primary/5 select-none">
                                    {(index + 1).toString().padStart(2, "0")}
                                </div>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="rounded w-md transition-transform duration-300"
                                    width={1000}
                                    height={1000}
                                />
                                <div className="absolute z-50 w-full h-full bg-card/20 opacity-0 group-hover:opacity-100"></div>
                            </div>
                            <div
                                className={`
                                    flex flex-col gap-4 items-start justify-center max-w-lg`}
                            >
                                {/* <div className="flex items-center gap-2 md:gap-4">
                                    <div className="w-4 *:md:w-8 h-0.5 bg-primary"></div>
                                    <span className="text-sm font-medium text-primary tracking-wide">
                                        PROJECT{" "}
                                        {(index + 1)
                                            .toString()
                                            .padStart(2, "0")}
                                    </span>
                                </div> */}
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
                                            onClick={() =>
                                                handleImageClick(project)
                                            }
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
                    ))}
                </div>
                <div
                    className={`pt-8 border-border ${
                        projects.length === 3 && "hidden"
                    }`}
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">
                                Want to see more?
                            </h3>
                            <p className="text-muted-foreground">
                                These are just highlights from my portfolio.
                                Check out my complete collection of projects.
                            </p>
                        </div>
                        <div className="flex items-center justify-start md:justify-end gap-4">
                            <div className="w-12 h-0.5 bg-primary"></div>
                            <a
                                href="projects"
                                className="flex items-center gap-2 text-primary font-medium hover:underline"
                            >
                                <span>View All Projects</span>
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={closeModal} />
            )}
        </SectionWrapper>
    );
}
