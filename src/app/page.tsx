"use client";
import Footer from "@/components/layout/footer";
import GithubDistribution from "@/components/section/github-constributions";
import Services from "@/components/section/services";
import Skills from "@/components/section/skills";
import { useObserveSection } from "@/hooks/use-observe-section";
import Contact from "../components/section/contact";
import Hero from "../components/section/hero";
import Projects from "../components/section/projects";

export default function Home() {
    const active = useObserveSection();
    return (
        <div className="flex flex-col gap-8 md:gap-16 w-full relative ">
            <Hero />
            <Services />
            <Projects />
            <Skills />
            <GithubDistribution />
            <Contact />
            <Footer />
        </div>
    );
}
