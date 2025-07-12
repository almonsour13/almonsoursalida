import { projects } from "@/constant/data";
import SectionWrapper from "../section-wrapper";

export default function Projects() {
    return (
        <SectionWrapper
            id="projects"
            className="flex items-center justify-center"
        >
            <div className="md:max-w-6xl w-full flex flex-col items-center min-h-screen">
                <div className="w-full">
                    
                    <h1 className="text-3xl md:text-7xl font-bold mb-2 md:mb-4 leading-tight">
                        Projects
                    </h1>
                    <p className="text-sm md:text-base mb-6 text-foreground">
                        A selection of full stack applications showcasing my
                        ability to build responsive frontends, robust backends,
                        and seamless user experiences.
                    </p>
                </div>
                <div className="flex flex-col w-full gap-4 md:gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${
                                index % 2 === 0
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                            } pt-8 overflow-hidden gap-4 bg-transparent rounded-xl`}
                        >
                            <div
                                className={`flex-1 rounded-2xl aspect-video max-w-lg h-80 bg-card ${
                                    index % 2 === 0
                                        ? "rounded-tr-2xl"
                                        : "rounded-tl-2xl"
                                }`}
                            >
                            </div>
                            <div className="flex-1 flex items-start justify-center flex-col gap-2 md:p-4 pt-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {project.tech.map((tag, Index) => (
                                        <span
                                            key={Index}
                                            className="px-3 py-1 rounded-full text-xs bg-card border"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl md:text-2xl font-bold">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-foreground leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex gap-2">
                                    <a
                                        href=""
                                        className="flex items-center justify-between px-3 py-1 bg-card border rounded-full text-xs"
                                    >
                                        Visit
                                    </a>
                                    <a
                                        href=""
                                        className="flex items-center justify-between px-3 py-1 bg-card border rounded-full  text-xs"
                                    >
                                        Source Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
