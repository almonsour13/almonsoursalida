"use client";
import MenuButton from "@/components/common/menu-button";
import ScrollToTopButton from "@/components/common/scroll-down-button";
import ThemeToggle from "@/components/common/theme-toggle";
import CursorCircle from "@/components/effects/cursor-circle";
import Footer from "@/components/layout/footer";
import CTA from "@/components/section/cta";
import HowIWork from "@/components/section/how-i-work";
import Services from "@/components/section/services";
import Skills from "@/components/section/skills";
import Testimonials from "@/components/section/testimonial";
import Contact from "../components/section/contact";
import Hero from "../components/section/hero";
import Projects from "../components/section/projects";

export default function Home() {
    return (
        <div className="relative flex flex-col gap-24 md:gap-32">
            {/* <Header /> */}
            <Hero />
            <Services />
            <Projects />
            <Skills />
            <HowIWork />
            <Testimonials />
            {/* <GithubContributions /> */}
            <CTA />
            <Contact />
            <Footer />
            <CursorCircle />
            <ScrollToTopButton />
            <ThemeToggle />
            <MenuButton />
        </div>
    );
}
