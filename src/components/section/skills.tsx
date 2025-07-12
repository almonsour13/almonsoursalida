import { skills } from "@/constant/data";
import SectionWrapper from "../section-wrapper";

export default function Skills() {
    return (
        <SectionWrapper
            id="skills"
            className="flex items-center justify-center"
        >
            <div className="md:max-w-6xl w-full flex flex-col items-center justify-center md:min-h-screen">
                <div className="w-full">
                    <h1 className="text-3xl md:text-7xl font-bold mb-2 md:mb-4 leading-tight">
                        Skills
                    </h1>
                    <p className="text-sm md:text-base mb-6 text-foreground">
                        A selection of full stack applications showcasing my
                        ability to build responsive frontends, robust backends,
                        and seamless user experiences.
                    </p>
                </div>

                {/* Mobile: Horizontal scroll */}
                <div className="w-full md:hidden">
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        <div className="flex gap-3 px-1">
                            {skills.map((skill, index) => {
                                const safeIcon = skill.icon.replace(
                                    /<path(?![^>]*fill=)/g,
                                    '<path fill="currentColor"'
                                );
                                return (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 p-4 w-24 rounded-lg flex flex-col items-center justify-center gap-2 border bg-background/50 backdrop-blur-sm min-w-[80px]"
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
                                className="p-4 rounded-lg hover:bg-card flex flex-col items-center justify-center gap-2 border bg-background/50 backdrop-blur-sm transition-all duration-300"
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
                <div className="md:hidden mt-2 flex justify-center">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>Scroll to see more</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse delay-100"></div>
                            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-pulse delay-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
