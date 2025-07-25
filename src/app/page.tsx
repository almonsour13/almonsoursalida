"use client";
import FloatingSocials from "@/components/common/floating-social";
import ScrollDownButton from "@/components/common/scroll-down-button";
import ScrollProgressBar from "@/components/common/scroll-progress-bar";
import ThemeToggle from "@/components/common/theme-toggle";
import Services from "@/components/section/services";
import { useState } from "react";
import CursorCircle from "../components/cursor-circle";
import Footer from "../components/layout/footer";
import NavigationMenu from "../components/layout/navigation";
import Contact from "../components/section/contact";
import Hero from "../components/section/hero";
import Projects from "../components/section/projects";
import Skills from "../components/section/skills";

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="flex flex-col gap-20 w-full relative font-sans ">
            {/* sections */}
            <Hero />
            <Projects />
            <Skills />
            <Services />
            <Contact />
            <Footer />
            {/* components */}
            <ScrollProgressBar />
            <NavigationMenu
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
            />
            {/* <ProfileBadge /> */}
            <CursorCircle />
            <ScrollDownButton />
            <ThemeToggle isExpanded={isExpanded} />
            <FloatingSocials />
        </div>
    );
}
