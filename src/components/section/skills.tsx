"use client";
import { skills } from "@/constant/data";
import SectionWrapper from "../section-wrapper";
import { Card } from "../ui/card";

export default function Skills() {
    return (
        <SectionWrapper id="skills">
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
                <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 gap-2">
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
            </div>
        </SectionWrapper>
    );
}
