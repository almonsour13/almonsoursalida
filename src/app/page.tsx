"use client";
import ScrollToTopButton from "@/components/common/scroll-down-button";
import ThemeToggle from "@/components/common/theme-toggle";
import DotGrid from "@/components/decorative/dot-grid";
import CursorCircle from "@/components/effects/cursor-circle";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import CTA from "@/components/section/cta";
import HowIWork from "@/components/section/how-i-work";
import Services from "@/components/section/services";
import Skills from "@/components/section/skills";
import Testimonials from "@/components/section/testimonial";
import Contact from "../components/section/contact";
import Hero from "../components/section/hero";
import Projects from "../components/section/projects";

function Gutter() {
    return (
        <div className="relative hidden md:block flex-1 self-stretch">
            <DotGrid className="absolute inset-0 opacity-80" />
        </div>
    );
}

export default function Home() {
    return (
        <div className="relative flex flex-col">
            <Header />
            <div className="flex flex-col items-start relative w-full maax-w-6xl">
                <Hero />
                <Services />
                <Projects />
                <Skills />
                <HowIWork />
                {/* <GithubDistribution /> */}
                <Testimonials />
                <CTA />
                <Contact />
            </div>
            <Footer />
            <CursorCircle />
            <ScrollToTopButton />
            <ThemeToggle />
        </div>
    );
}
