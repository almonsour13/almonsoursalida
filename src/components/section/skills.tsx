"use client";
import { skills } from "@/constant/data";
import { useEffect, useRef, useState } from "react";
import SectionWrapper from "../section-wrapper";
import { Card } from "../ui/card";

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
        <SectionWrapper>
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-medium leading-none tracking-wide text-foreground">
                        Tech Stacks
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                        A selection of full stack applications showcasing my
                        ability to build responsive frontends, robust backends,
                        and seamless user experiences.
                    </p>
                </div>
                <div className="grid grid-cols-4 md:rgid-cols-4 lg:grid-cols-8 gap-2">
                    {skills.map((skill) => {
                        const safeIcon = skill.icon.replace(
                            /<path(?![^>]*fill=)/g,
                            '<path fill="currentColor"',
                        );

                        return (
                            <Card
                                key={skill.name}
                                className="aspect-square flex justify-center items-center flex-shrink-0"
                            >
                                <div className="flex justify-center items-center flex-col gap-2">
                                    <div
                                        className="w-8 h-8 md:w-12 md:h-12 text-foreground"
                                        dangerouslySetInnerHTML={{
                                            __html: safeIcon,
                                        }}
                                    />
                                    <h1 className="text-xs text-foreground text-center whitespace-nowrap">
                                        {skill.name}
                                    </h1>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}
