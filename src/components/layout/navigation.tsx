"use client";

import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function NavigationMenu() {
    const { setTheme } = useTheme();
    const [activeSection, setActiveSection] = useState("home");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const sections = [
        { id: "hero", label: "Home" },
        { id: "projects", label: "Projects" },
        { id: "skills", label: "Skills" },
        { id: "contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = (currentScrollY / scrollHeight) * 100;

            setScrollProgress(progress);

            setLastScrollY(currentScrollY);

            const scrollPosition = currentScrollY + 200;
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, sections]);

    const handleSectionClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsExpanded(false);
    };
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden"; // lock scroll
            window.scrollTo({ top: 0, behavior: "smooth" }); // optional: scroll to top
        } else {
            document.body.style.overflow = ""; // restore scroll
        }

        return () => {
            document.body.style.overflow = ""; // clean up
        };
    }, [isExpanded]);

    return (
        <>
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-black/20 backdrop-blur-sm z-50">
                <div
                    className="h-full bg-gradient-to-r from-white via-gray-400 to-zinc-800 transition-all duration-300 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Main Navigation */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="md:hidden fixed z-50 top-4 right-4 cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border border-foreground backdrop-blur-sm"
            >
                {isExpanded ? (
                    <ChevronRight className="w-4 h-4" />
                ) : (
                    <ChevronLeft className="w-4 h-4" />
                )}
            </button>
            <button
                onClick={() =>
                    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
                className="fixed z-30 top-14 md:top-12 right-4 md:right-36 cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border border-foreground backdrop-blur-sm"
            >
                <Sun className="w-4 h-4 dark:hidden" />
                <Moon className="w-4 h-4 hidden dark:block" />
            </button>
            <button
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    // goUp
                }}
                className={`md:hidden fixed z-30 bottom-4 right-4 cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border border-foreground backdrop-blur-sm transform transition duration-300 ease-in-out 
                    ${
                        activeSection === "hero"?"translate-y-12":"translate-y-0"
                    }
                    
                    `}
            >
                <ChevronUp className="w-4 h-4" />
            </button>
            <div
                className={`fixed p-4 md:py-12 top-0 bottom-0 w-48 md:w-36 right-0 md:border-l-0   z-40 transform transition duration-500 ease-in-out  md:translate-x-0 ${
                    isExpanded
                        ? "translate-x-0 border-l backdrop-blur-sm"
                        : "translate-x-48"
                }`}
            >
                <nav className={`relative h-full`}>
                    <ul className="flex  justify-between gap-4  flex-col h-full">
                        {sections.map((section, index) => {
                            const isActive = activeSection === section.id;
                            return (
                                <li
                                    key={section.id}
                                    className={`relative flex flex-col ${
                                        index !== sections.length - 1 &&
                                        "h-full "
                                    }`}
                                >
                                    <button
                                        onClick={() =>
                                            handleSectionClick(section.id)
                                        }
                                        className={`group relative flex items-center gap-4 w-full text-left transition-all duration-300 hover:scale-105 ${
                                            isActive ? "" : ""
                                        }`}
                                    >
                                        {/* Section Number */}
                                        <div
                                            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                                                isActive
                                                    ? "border-foreground bg-foreground text-primary-foreground text"
                                                    : "border-foreground"
                                            }`}
                                        >
                                            <span className="text-xs font-mono">
                                                {index + 1}
                                            </span>
                                        </div>

                                        {/* Section Label */}
                                        <span
                                            className={`block text-sm tracking-wider transition-all duration-300 `}
                                        >
                                            {section.label}
                                        </span>

                                        {/* Active Indicator */}
                                        <div
                                            className={`absolute -left-0 w-8 h-8 -z-10 rounded-full transition-all duration-300 ${
                                                isActive
                                                    ? "opacity-100 scale-100"
                                                    : "opacity-0 scale-0"
                                            }`}
                                        />
                                    </button>

                                    {/* Connection Line to Next Item */}
                                    {index < sections.length - 1 && (
                                        <div className="ml-4 w-px flex-1 bg-gradient-to-b from-foreground to-transparent" />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
}
