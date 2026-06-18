"use client";
import { skills } from "@/constant/data";
import SectionWrapper from "../section-wrapper";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export default function Skills() {
    return (
        <SectionWrapper id="skills">
            <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-medium leading-none tracking-wide text-foreground">
                        Tech Stacks
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                        A curated collection of languages, frameworks, and tools
                        I use to architect scalable backends, design responsive
                        interfaces, and build high-performance web and mobile
                        solutions.
                    </p>
                </div>

                <ScrollArea className="w-full whitespace-nowrap pb-4">
                    <div className="flex gap-2 w-max">
                        {skills.map((skill) => {
                            const safeIcon = skill.icon.replace(
                                /<path(?![^>]*fill=)/g,
                                '<path fill="currentColor"',
                            );

                            return (
                                <Card
                                    key={skill.name}
                                    className="size-16 flex justify-center items-center flex-shrink-0"
                                >
                                    <div className="flex justify-center items-center flex-col gap-2">
                                        <div
                                            className="w-8 h-8 text-foreground"
                                            dangerouslySetInnerHTML={{
                                                __html: safeIcon,
                                            }}
                                        />
                                        <h1 className="hidden text-xs text-foreground text-center whitespace-nowrap">
                                            {skill.name}
                                        </h1>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </SectionWrapper>
    );
}
