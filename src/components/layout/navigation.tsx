"use client";

import { ChevronLeft, ChevronRight, ChevronUp, User, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { socials } from "@/constant/social";

export default function NavigationMenu() {
    const { theme, setTheme } = useTheme();
    const [activeSection, setActiveSection] = useState("home");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
    const [isShowSocialMedia, setIsShowSocialMedia] = useState(false);

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
    }, [lastScrollY]);

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

    const handleThemeToggle = useCallback(() => {
        if (isThemeTransitioning) return;

        setIsThemeTransitioning(true);

        setTimeout(() => {
            setTheme(theme === "dark" ? "light" : "dark");
        }, 200);

        setTimeout(() => {
            setIsThemeTransitioning(false);
        }, 1000);
    }, [theme, setTheme, isThemeTransitioning]);

    return (
        <>
            {/* socials */}
            <div className="fixed z-50 bottom-4 md:bottom-12 left-4 flex flex-col gap-2">
                <AnimatePresence>
                    {isShowSocialMedia && (
                        <motion.div
                            className="flex flex-col gap-2"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeOut",
                            }}
                        >
                            {socials.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    className="flex items-center justify-center h-8 w-8 py-1 bg-card border rounded-full text-xs md:text-sm"
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                        y: 32, // Starting from button position (8 + 8 + 16 gap)
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0,
                                        y: 32, // Returning to button position
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        delay: index * 0.08,
                                    }}
                                    whileHover={{
                                        scale: 1.15,
                                        rotate: 8,
                                        transition: { duration: 0.2 },
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon className="h-4 w-4" />
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.button
                    onClick={() => setIsShowSocialMedia(!isShowSocialMedia)}
                    className={`
                        cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border border-foregrounsd bg-card backdrop-blur-sm
                        ransform transition duration-500 ease-in-out  
                        ${
                            activeSection === "hero" ||
                            activeSection === "contact"
                                ? "translate-y-12 md:translate-y-24"
                                : "translate-y-0"
                        }
                        `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        rotate: isShowSocialMedia ? 180 : 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isShowSocialMedia ? "close" : "open"}
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            {!isShowSocialMedia ? (
                                <User className="w-4 h-4" />
                            ) : (
                                <X className="w-4 h-4" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.button>
            </div>
            {/* themes */}
            <AnimatePresence>
                {isThemeTransitioning && (
                    <>
                        <motion.div
                            className={`fixed z-50 top-14 md:top-12 right-4 md:right-36 w-8 h-8 border-2 rounded-full ${
                                theme === "dark"
                                    ? "border-white/20"
                                    : "border-gray-900/20"
                            }`}
                            initial={{
                                scale: 1,
                                opacity: 0.6,
                            }}
                            animate={{
                                scale: 20,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 1.2,
                                delay: 0.1,
                                ease: "easeOut",
                            }}
                            style={{
                                transformOrigin: "center",
                            }}
                        />
                        <motion.div
                            className="fixed z-40 top-14 md:top-12 right-4 md:right-36 w-8 h-8 border-2 rounded-full bg-foreground"
                            initial={{
                                scale: 1,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 500,
                                opacity: 1,
                            }}
                            exit={{
                                scale: 1,
                                // opacity:0
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.1,
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
            <motion.button
                onClick={handleThemeToggle}
                className={`fixed ${
                    isExpanded ? "z-30" : "z-50"
                } top-14 md:top-12 right-4 md:right-36 cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border border-foregroundd bg-card backdrop-blur-sm`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isThemeTransitioning}
            >
                <motion.div
                    animate={{ rotate: isThemeTransitioning ? 360 : 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Sun className="w-4 h-4 dark:hidden" />
                    <Moon className="w-4 h-4 hidden dark:block" />
                </motion.div>
            </motion.button>
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-0.5 backdrop-blur-sm z-50">
                <div
                    className="h-full bg-foreground transition-all duration-300 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
            {/* Main Navigation */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`md:hidden fixed ${
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
            {/* scroll down button */}
            <button
                onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`md:hidden fixed z-30 bottom-4 right-4 cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border border-foregrounds bg-card backdrop-blur-sm transform transition duration-300 ease-in-out 
                    ${
                        activeSection === "hero"
                            ? "translate-y-12"
                            : "translate-y-0"
                    }
                    
                    `}
            >
                <ChevronUp className="w-4 h-4" />
            </button>
            <div
                className={`fixed p-4 md:py-12 z-30 top-0 bottom-0 w-48 md:w-36 right-0 md:border-l-0  transform transition duration-500 ease-in-out  md:translate-x-0 ${
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
                                        className={`group cursor-pointer relative flex items-center gap-4 w-full text-left transition-all duration-300 hover:scale-105 ${
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
                                                        type: "spring",
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
