"use client";
import ScrollToTopButton from "@/components/common/scroll-down-button";
import ThemeToggle from "@/components/common/theme-toggle";
import CursorCircle from "@/components/effects/cursor-circle";
import Footer from "@/components/layout/footer";
import { GutterLayout } from "@/components/layout/gutter-layout";
import Header from "@/components/layout/header";
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
        <div className="relative flex flex-col">
            <Header />
            <Hero />
            <GutterLayout>
                <Services />
                <Projects />
                <Skills />
                <HowIWork />
                <Testimonials />
            </GutterLayout>
            <CTA />
            <GutterLayout>
                <Contact />
            </GutterLayout>
            <Footer />
            <CursorCircle />
            <ScrollToTopButton />
            <ThemeToggle />
        </div>
    );
}
