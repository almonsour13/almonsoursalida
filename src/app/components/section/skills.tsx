import { skills } from "@/constant/data";
import SectionWrapper from "../section-wrapper";

export default function Skills() {
    return (
        <SectionWrapper
            id="skills"
            className="flex items-center justify-center"
        >
            <div className=" md:max-w-6xl w-full flex flex-col items-center justify-center min-h-screen">
                <div className="w-full">
                    {/* <div className="text-7xl h-56 w-full font-bold mb-4">
                        <SvgSpotlightText
                            className="text-7xl"
                            text="Projects"
                        />
                    </div> */}
                    <h1 className="text-2xl md:text-7xl font-bold mb-4 leading-tight">
                        Skills
                    </h1>
                    <p className="text-sm md:text-base mb-6 text-gray-300  ">
                        A selection of full stack applications showcasing my
                        ability to build responsive frontends, robust backends,
                        and seamless user experiences.
                    </p>
                </div>
                <div className="grid grid-cols-4 md:grid-cols-10 gap-2 w-full">
                    {skills.map((skill, index) => {
                        // Add fill="currentColor" to all <path> elements (if it doesn't exist)
                        const safeIcon = skill.icon.replace(
                            /<path(?![^>]*fill=)/g,
                            '<path fill="currentColor"'
                        );

                        return (
                            <div
                                key={index}
                                className="p-4 rounded flex flex-col items-center justify-center gap-2"
                            >
                                <div
                                    className="w-12 h-12 text-whi" // Tailwind text color
                                    dangerouslySetInnerHTML={{
                                        __html: safeIcon,
                                    }}
                                />
                                <h1 className="text-xs text-gray-300">{skill.name}</h1>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}
