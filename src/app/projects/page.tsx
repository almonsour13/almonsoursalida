"use client";

import ProjectCard from "@/components/card/project-card";
import Footer from "@/components/layout/footer";
import SectionWrapper from "@/components/section-wrapper";
import { projects } from "@/constant/projects";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <SectionWrapper className="py-20">
                <div className="flex flex-col items-center gap-6 md:gap-12">
                    <div className="w-full space-y-4 md:space-y-8">
                        <div className="flex items-center gap-4 md:gap-8">
                            <button
                                className="cursor-pointer w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-card transition-colors flex items-center justify-center"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div className="w-8 md:w-16 h-0.5 bg-border"></div>
                            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                                Projects
                            </span>
                            <div className="flex-1 h-0.5 bg-border"></div>
                        </div>
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
                    </div>
                    <div className="flex flex-col w-full gap-16 md:gap-32">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </SectionWrapper>
            <Footer />
        </div>
    );
}
