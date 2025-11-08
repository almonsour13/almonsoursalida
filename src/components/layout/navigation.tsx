"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { useSection } from "@/context/section-context";
import { AnimatePresence, motion } from "framer-motion";

export default function NavigationMenu({
    isExpanded,
    setIsExpanded,
}: {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
}) {
    const { activeSection, setActiveSection } = useSection();
    const [lastScrollY, setLastScrollY] = useState(0);

    const sections = [
        { id: "hero", label: "Home" },
        { id: "projects", label: "Projects" },
        { id: "skills", label: "Skills" },
        { id: "services", label: "Services" },
        // { id: "education", label: "Education" },
        { id: "contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;


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
    }, [lastScrollY,setActiveSection]);

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
            {/* Main Navigation */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`lg:hidden fixed ${
                    isExpanded ? "z-40" : "z-30"
                } top-4 right-4 cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border border-foregrounsd bg-card backdrop-blur-sm

                    `}
            >
                {isExpanded ? (
                    <ChevronRight className="w-4 h-4" />
                ) : (
                    <ChevronLeft className="w-4 h-4" />
                )}
            </button>
            <div
                className={`fixed p-4 lg:py-12 z-30 top-0 bottom-0 w-48 lg:w-36 right-0 lg:border-l-0  transform transition duration-500 ease-in-out  lg:translate-x-0 ${
                    isExpanded
                        ? "translate-x-0 border-l backdrop-blur-sm"
                        : "translate-x-48"
                }`}
            >
                <nav className={`relative h-full`}>
                    <ul className="flex  justify-between  flex-col h-full">
                        {sections.map((section, index) => {
                            const isActive = activeSection === section.id;
                            return (
                                <li
                                    key={section.id}
                                    className={`relative cursor-pointer flex flex-col ${
                                        index !== sections.length - 1 &&
                                        "h-full "
                                    }`}
                                >
                                    <button
                                        onClick={() =>
                                            handleSectionClick(section.id)
                                        }
                                        className={`group cursor-pointer relative flex items-center gap-2 w-full text-left transition-all duration-300 hover:scale-105 ${
                                            isActive ? "" : ""
                                        }`}
                                    >
                                        {/* Section Number */}
                                        <div
                                            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                                                isActive
                                                    ? "border-foregrounds text-primary-foreground text"
                                                    : "border-foregrounds bg-card"
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
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.span
                                                    className="absolute -z-10 left-0 h-8 w-8 border rounded-full bg-foreground"
                                                    layoutId="bottomNav"
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.3,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.3,
                                                    }}
                                                    transition={{
                                                        stiffness: 300,
                                                        damping: 25,
                                                        duration: 0.4,
                                                    }}
                                                />
                                            )}
                                        </AnimatePresence>
                                    </button>

                                    {/* Connection Line to Next Item */}
                                    {index < sections.length - 1 && (
                                        <div className="ml-4 w-px flex-1 bg-border " />
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
