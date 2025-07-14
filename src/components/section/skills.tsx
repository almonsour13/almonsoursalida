"use client";
import { skills } from "@/constant/data";
import { useEffect, useRef, useState } from "react";
import SectionWrapper from "../section-wrapper";
import { motion } from "framer-motion";

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);

    // Calculate scroll progress for mobile horizontal scroll
    const handleScroll = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth - container.clientWidth;
        const currentProgress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;

        setProgress(currentProgress);
    };

    // Calculate max scroll width on mount and resize
    useEffect(() => {
        const updateMaxScroll = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            const scrollWidth = container.scrollWidth - container.clientWidth;
            setMaxScroll(scrollWidth);
        };

        updateMaxScroll();
        window.addEventListener("resize", updateMaxScroll);
        return () => window.removeEventListener("resize", updateMaxScroll);
    }, []);

    return (
        <SectionWrapper
            id="skills"
            className="flex items-center justify-center py-12"
        >
            <div className="md:max-w-6xl w-full flex flex-col gap-4 md:gap-   items-center justify-center md:min-h-screen">
                <div className="w-full">
                    <div className="flex items-center gap-4 md:gap-8 mb-4 md:mb-8">
                        <div className="w-8 md:w-16 h-0.5 bg-primary"></div>
                        <span className="text-sm font-medium tracking-widest uppercase text-primary">
                            Skills & {""}
                            <span className="hidden md:block">
                                Technologies
                            </span>
                            <span className="md:hidden">Techs</span>
                        </span>
                        <div className="flex-1 h-0.5 bg-border"></div>
                    </div>
                    {/* <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight text-foreground mb-6 leading-none">
                        Skills & {""}
                        <span className="hidden md:block">Technologies</span>
                        <span className="md:hidden">Techs</span>
                    </h1> */}
                    <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight text-foreground mb-6 leading-none">
                        My Dev{" "}
                        <span className="hidden md:inline">Environment</span>
                        <span className="md:hidden">Stack</span>
                    </h1>

                    <p className="text-sm md:text-base mb-6 text-muted-foreground">
                        A selection of full stack applications showcasing my
                        ability to build responsive frontends, robust backends,
                        and seamless user experiences.
                    </p>
                </div>

                {/* Mobile: Horizontal scroll */}
                <div className="w-full flex flex-col gap-4">
                    <div className="w-full md:hidden relative">
                        {progress > 0.01 && (
                            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                        )}
                        {progress < 0.99 && (
                            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                        )}
                        <div
                            ref={containerRef}
                            onScroll={handleScroll}
                            className="flex gap-3 overflow-x-auto py-2   scrollbar-hide scroll-smooth"
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            <div className="flex gap-3 px-1">
                                {skills.map((skill, index) => {
                                    const safeIcon = skill.icon.replace(
                                        /<path(?![^>]*fill=)/g,
                                        '<path fill="currentColor"'
                                    );
                                    return (
                                        <div
                                            key={index}
                                            className="flex-shrink-0 p-4 w-24 rounded-lg flex flex-col items-center justify-center gap-2 borderr backdrop-blur-sm min-w-[80px] hover:bg-card transition-colors duration-200"
                                        >
                                            <div
                                                className="w-8 h-8 text-foreground"
                                                dangerouslySetInnerHTML={{
                                                    __html: safeIcon,
                                                }}
                                            />
                                            <h1 className="text-xs text-foreground text-center whitespace-nowrap">
                                                {skill.name}
                                            </h1>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:hidden realtive">
                        {maxScroll > 0 && (
                            <motion.div
                                className="mt-6 flex items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Scroll right to explore
                                </span>
                                <div className="flex-1 h-0.5 bg-border rounded-full overflow-hidden max-w-32">
                                    <div
                                        className="h-full bg-primary transition-all duration-300 ease-out"
                                        style={{
                                            width: `${Math.max(
                                                10,
                                                progress * 100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Desktop: Grid layout */}
                <div className="hidden md:grid grid-cols-10 gap-4 w-full">
                    {skills.map((skill, index) => {
                        const safeIcon = skill.icon.replace(
                            /<path(?![^>]*fill=)/g,
                            '<path fill="currentColor"'
                        );
                        return (
                            <div
                                key={index}
                                className="p-4 rounded-lg hover:bg-card flex flex-col items-center justify-center gap-2 borderr backdrop-blur-sm transition-all duration-300"
                            >
                                <div
                                    className="w-12 h-12 text-foreground"
                                    dangerouslySetInnerHTML={{
                                        __html: safeIcon,
                                    }}
                                />
                                <h1 className="text-xs text-foreground text-center">
                                    {skill.name}
                                </h1>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full flex justify-start mt-2">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-0.5 hidden md:block bg-border"></div>
                        <span className="text-xs text-muted-foreground">
                            Always learning more
                        </span>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
