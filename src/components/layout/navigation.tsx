"use client";

import { useSection } from "@/context/section-context";
import {
    AnimatePresence,
    motion
} from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

export default function NavigationMenu({
    isExpanded,
    setIsExpanded,
}: {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
}) {
    const { activeSection, setActiveSection } = useSection();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const sections = [
        { id: "hero", label: "Home" },
        { id: "projects", label: "Projects" },
        { id: "skills", label: "Skills" },
        { id: "services", label: "Services" },
        { id: "contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (isScrolling) return;

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
                        window.history.replaceState(null, "", `#${section.id}`);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, setActiveSection, isScrolling]);

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isExpanded]);

    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    setActiveSection(hash);
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 100);
        }
    }, []);
    return (
        <>
            <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="outline"
                size="icon"
                className="rounded-full z-40 h-10 md:h-12 w-10 md:w-12"
            >
                <AnimatePresence mode="wait">
                    {isExpanded ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="h-4 w-4" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="h-4 w-4" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-background/95 backdrop-blur-md z-30"
                            onClick={() => setIsExpanded(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="fixed inset-0 z-30 flex items-center justify-center"
                        >
                            <ScrollArea className="flex-1">
                                <SectionWrapper>
                                    <div className="h-screen flex flex-col justify-center gap-12">
                                        {/* Navigation Items */}
                                        <nav className="space-y-2 mt-20 md:mt-0 flex flex-col">
                                            {sections.map((section, index) => {
                                                const isActive =
                                                    activeSection ===
                                                    section.id;
                                                return (
                                                    <motion.div
                                                        key={section.id}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -50,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            x: -50,
                                                        }}
                                                        transition={{
                                                            duration: 0.4,
                                                            delay: index * 0.1,
                                                            ease: "easeOut",
                                                        }}
                                                        className="h-full flex-1"
                                                    >
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                const element =
                                                                    document.getElementById(
                                                                        section.id
                                                                    );
                                                                if (element) {
                                                                    setIsScrolling(
                                                                        true
                                                                    );
                                                                    setActiveSection(
                                                                        section.id
                                                                    );
                                                                    window.history.pushState(
                                                                        null,
                                                                        "",
                                                                        `#${section.id}`
                                                                    );
                                                                    element.scrollIntoView(
                                                                        {
                                                                            behavior:
                                                                                "smooth",
                                                                            block: "start",
                                                                        }
                                                                    );
                                                                    setTimeout(
                                                                        () => {
                                                                            setIsScrolling(
                                                                                false
                                                                            );
                                                                        },
                                                                        1000
                                                                    );
                                                                    setIsExpanded(
                                                                        false
                                                                    );
                                                                }
                                                            }}
                                                            className="w-full h-full group relative"
                                                        >
                                                            {/* Hover Line */}
                                                            <motion.div
                                                                className={`absolute left-0 top-0 bottom-0 w-1 origin-top ${
                                                                    isActive
                                                                        ? "bg-foreground"
                                                                        : "bg-foreground"
                                                                }`}
                                                                initial={{
                                                                    scaleY: isActive
                                                                        ? 1
                                                                        : 0,
                                                                }}
                                                                whileHover={{
                                                                    scaleY: 1,
                                                                }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                }}
                                                            />

                                                            <div
                                                                className={`flex items-center h-full justify-between py-6 px-6 border-b transition-all ${
                                                                    isActive
                                                                        ? "border-foreground/50 pl-8"
                                                                        : "border-border/50 group-hover:border-foreground/30 group-hover:pl-8"
                                                                }`}
                                                            >
                                                                <div className="flex items-baseline gap-6">
                                                                    {/* Number */}
                                                                    <span
                                                                        className={`text-sm font-light transition-colors ${
                                                                            isActive
                                                                                ? "text-foreground"
                                                                                : "text-muted-foreground group-hover:text-foreground"
                                                                        }`}
                                                                    >
                                                                        {index +
                                                                            1}
                                                                    </span>

                                                                    {/* Label */}
                                                                    <h2
                                                                        className={`text-4xl md:text-6xl font-light tracking-tight transition-all ${
                                                                            isActive
                                                                                ? "tracking-wide"
                                                                                : "group-hover:tracking-wide"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            section.label
                                                                        }
                                                                    </h2>
                                                                </div>

                                                                {/* Arrow */}
                                                                <motion.div
                                                                    initial={{
                                                                        x: isActive
                                                                            ? 0
                                                                            : -10,
                                                                        opacity:
                                                                            isActive
                                                                                ? 1
                                                                                : 0,
                                                                    }}
                                                                    whileHover={{
                                                                        x: 0,
                                                                        opacity: 1,
                                                                    }}
                                                                    transition={{
                                                                        duration: 0.2,
                                                                    }}
                                                                >
                                                                    <ArrowRight className="h-6 w-6 md:h-8 md:w-8" />
                                                                </motion.div>
                                                            </div>
                                                        </button>
                                                    </motion.div>
                                                );
                                            })}
                                        </nav>
                                    </div>
                                </SectionWrapper>
                            </ScrollArea>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
