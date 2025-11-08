"use client";
import { projects } from "@/constant/data";
import ProjectCard from "../card/project-card";
import SectionWrapper from "../section-wrapper";

export default function Projects() {
    return (
        <SectionWrapper id="projects" className="">
            <div className="md:max-w-6xl w-full flex flex-col items-center min-h-screen">
                <div className="w-full">
                    <div className="flex items-center gap-4 md:gap-8 mb-4 md:mb-8">
                        <div className="w-8 md:w-16 h-0.5 bg-primary"></div>
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
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
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
                <div
                    className={`pt-8 border-border ${
                        projects.length > 0 ? "block" : "hidden"
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
        </SectionWrapper>
    );
}
