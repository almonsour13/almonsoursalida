"use client";

import { projects } from "@/constant/projects";
import ProjectCard from "../card/project-card";
import SectionWrapper from "../section-wrapper";
import { motion } from "framer-motion";

export default function Projects() {
    const featuredProjects =
        projects.filter((project) => project.isFeatured) || [];
    return (
        <SectionWrapper id="projects" className="">
            <div className="flex flex-col items-center gap-6 md:gap-12">
                <div className="w-full space-y-4 md:space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-8 md:w-16 h-0.5 bg-border"></div>
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                            Projects
                        </span>
                        <div className="flex-1 h-0.5 bg-border"></div>
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="flex-1 space-y-4">
                            <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-foreground leading-none">
                                Built With Passion
                            </h1>
                            <p className="md:max-w-3xl text-sm md:text-base mb-6 text-muted-foreground">
                                A selection of full stack applications
                                showcasing my ability to build responsive
                                frontends, robust backends, and seamless user
                                experiences.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="text-right">
                                <div className="text-6xl font-light text-muted">
                                    {featuredProjects.length
                                        .toString()
                                        .padStart(2, "0")}
                                </div>
                                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                                    Featured Projects
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-16 md:gap-32">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full flex flex-col md:flex-row justify-between pt-8 gap-6"
                >
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                            Want to see more?
                        </h3>
                        <p className="text-muted-foreground">
                            These are just highlights from my portfolio. Check
                            out my complete collection of projects.
                        </p>
                    </div>
                    <div className="flex items-center justify-start md:justify-end gap-4">
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
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
