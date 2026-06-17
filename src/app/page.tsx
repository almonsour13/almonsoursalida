"use client";
import Services from "@/components/section/services";
import Skills from "@/components/section/skills";
import { useState } from "react";
import Contact from "../components/section/contact";
import Hero from "../components/section/hero";
import Projects from "../components/section/projects";

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="flex flex-col gap-8 w-full relative ">
            {/* sections */}
            <Hero />
            <Services />
            <Projects />
            <Skills />
            <Contact />
            {/* <div className="fixed flex flex-col items-center top-12 right-4 lg:right-8 z-50 gap-2 md:gap-4">
                <NavigationMenu
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                />
                <ThemeToggle />
            </div>*/}
        </div>
    );
}
