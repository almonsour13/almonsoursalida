"use client";
import FloatingSocials from "@/components/common/floating-social";
import ThemeToggle from "@/components/common/theme-toggle";
import Services from "@/components/section/services";
import { useState } from "react";
import Footer from "../components/layout/footer";
import NavigationMenu from "../components/layout/navigation";
import Contact from "../components/section/contact";
import Hero from "../components/section/hero";
import Projects from "../components/section/projects";
import Skills from "../components/section/skills";

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="flex flex-col gap-20 w-full relative ">
            {/* sections */}
            <Hero />
            <Projects />
            <Skills />
            <Services />
            <Contact />
            <Footer />
            <div className="fixed flex flex-col items-center top-12 right-4 md:right-16 z-50 gap-2 md:gap-4">
                <NavigationMenu
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                />
                <ThemeToggle/>
            </div>
            {/* <ScrollDownButton /> */}
            <FloatingSocials />
        </div>
    );
}
