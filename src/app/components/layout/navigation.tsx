"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationMenu() {
    const [activeSection, setActiveSection] = useState("home");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    // const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const sections = [
        { id: "hero", label: "Home"},
        { id: "projects", label: "Projects"},
        { id: "skills", label: "Skills"},
        { id: "contact", label: "Contact"},
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = (currentScrollY / scrollHeight) * 100;

            setScrollProgress(progress);

            // Auto-hide navigation on scroll down, show on scroll up
            // if (currentScrollY > lastScrollY && currentScrollY > 100) {
            //     setIsVisible(false);
            // } else {
            //     setIsVisible(true);
            // }
            setLastScrollY(currentScrollY);

            // Update active section
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

    return (
        <>
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-black/20 backdrop-blur-sm z-50">
                <div
                    className="h-full bg-gradient-to-r from-white via-gray-400 to-zinc-800 transition-all duration-300 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
                {/* <div
                    className="absolute top-0 h-full w-2 bg-white shadow-lg shadow-cyan-400/50 transition-all duration-300 ease-out"
                    style={{
                        left: `${scrollProgress}%`,
                        transform: "translateX(-50%)",
                    }}
                /> */}
            </div>

            {/* Main Navigation */}
            <div
                className={`fixed top-1/2 right-0 transform h-screen -translate-y-1/2 z-40 transition-all duration-500 ease-in-out `}
            >
                <div className="relative h-full">

                    {/* Navigation Content */}
                    <nav className={`relative px-4 md:px-6 py-20 h-full transition ease-in-out  md:translate-x-0 ${isExpanded?"translate-x-0 absolute inset-0 bg-black/20 backdrop-blur-xl border border-white/10":"translate-x-24 md:translate-x-0 "}`}>
                        {/* Toggle Button */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="absolute -left-2 top-1/2 transform bg-black -translate-y-1/2 h-12 w-4 border backdrop-blur-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all duration-300 md:hidden"
                        >
                            {isExpanded ? (
                                <ChevronRight size={20} />
                            ) : (
                                <ChevronLeft size={20} />
                            )}
                        </button>

                        {/* Navigation Items */}
                        <ul className="flex  justify-between  flex-col gap-4 h-full">
                            {sections.map((section, index) => {
                                const isActive = activeSection === section.id;
                                return (
                                    <li key={section.id} className={`relative flex flex-col ${index !== sections.length-1 && "h-full "}`}>
                                        <button
                                            onClick={() =>
                                                handleSectionClick(section.id)
                                            }
                                            className={`group relative flex items-center gap-4 w-full text-left transition-all duration-300 hover:scale-105 ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-gray-300 hover:text-white"
                                            }`}
                                        >
                                            {/* Section Number */}
                                            <div
                                                className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                                                    isActive
                                                        ? "border text-white"
                                                        : " border border-white/10 text-gray-500 group-hover:border-white group-hover:text-white"
                                                }`}
                                            >
                                                <span className="text-xs font-mono">
                                                    {index+1}
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
                                                className={`absolute -left-0 w-8 h-8 -z-10 bg-white/20 rounded-full transition-all duration-300 ${
                                                    isActive
                                                        ? "opacity-100 scale-100"
                                                        : "opacity-0 scale-0"
                                                }`}
                                            />

                                            {/* Hover Effect */}
                                            <div
                                                className={`absolute inset-0 -z-10 bg-gradient-to-r w-8 transition md:w-full ${isExpanded && "w-full"} rounded-l-4xl from-white/10 via-gray-500/10 to-transparent rounded-lg transition-all duration-300 ${
                                                    isActive
                                                        ? "opacity-100"
                                                        : "opacity-0 group-hover:opacity-50"
                                                }`}
                                            />
                                        </button>

                                        {/* Connection Line to Next Item */}
                                        {index < sections.length - 1 && (
                                            <div className="ml-4 w-px flex-1 bg-gradient-to-b from-gray-600 to-transparent" />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
