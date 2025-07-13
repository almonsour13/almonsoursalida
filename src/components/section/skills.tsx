"use client";
import { skills } from "@/constant/data";
import { useEffect, useRef, useState } from "react";
import SectionWrapper from "../section-wrapper";

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
            className="flex items-center justify-center"
        >
            <div className="md:max-w-6xl w-full flex flex-col items-center justify-center md:min-h-screen">
                <div className="w-full">
                    <h1 className="text-6xl text-wrap md:text-9xl font-bold mb-2 md:mb-4 uppercase">
                        Skills & {""}
                        <span className="hidden md:block">Technologies</span>
                        <span className="md:hidden">Techs</span>
                    </h1>
                    <p className="text-sm md:text-base mb-6 text-foreground">
                        A selection of technologies and tools I work with to
                        build responsive frontends, robust backends, and
                        seamless user experiences.
                    </p>
                </div>

                {/* Mobile: Horizontal scroll */}
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

                {/* Scroll indicator for mobile */}
                {maxScroll > 0 && (
                    <div className="md:hidden mt-4 flex justify-start w-full">
                        <div className="w-full flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-fit flex flex-wrap">
                                <span>Scroll right to see more</span>
                            </div>
                            <div className="flex-1 flex gap-1">
                                <div className="h-1 flex-1 bg-card rounded-full overflow-hidden">
                                    <div
                                        className="h-1 bg-foreground transition-all duration-300 ease-out"
                                        style={{
                                            width: `${Math.max(
                                                10,
                                                progress * 100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SectionWrapper>
    );
}
