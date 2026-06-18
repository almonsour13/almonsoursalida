"use client";
import Footer from "@/components/layout/footer";
import Services from "@/components/section/services";
import Skills from "@/components/section/skills";
import { useObserveSection } from "@/hooks/use-observe-active-tab";
import Contact from "../components/section/contact";
import Hero from "../components/section/hero";
import Projects from "../components/section/projects";

export default function Home() {
    const active = useObserveSection();
    return (
        <div className="flex flex-col gap-16 w-full relative ">
            <Hero />
            <Services />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
        </div>
    );
}
