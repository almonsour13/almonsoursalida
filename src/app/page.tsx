"use client";
import DotGrid from "@/components/dot-grid";
import EdgeDash from "@/components/edge-dash";
import CTA from "@/components/section/cta";
import GithubDistribution from "@/components/section/github-constributions";
import Services from "@/components/section/services";
import Skills from "@/components/section/skills";
import { useObserveSection } from "@/hooks/use-observe-section";
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
    const active = useObserveSection();
    return (
        <div className="relative px-4 flex">
            <div className="absolute inset-0  flex px-4">
                <div className="flex-1 relative">
                    <EdgeDash side="left" className="-z-20" />
                    <EdgeDash side="right" className="-z-20" />
                </div>
            </div>
            <Gutter />

            <div className="pb-8 md:pb-16 flex flex-col items-start relative w-full max-w-6xl">
                {/* <Header /> */}
                <Hero />
                <Services />
                <Projects />
                <Skills />
                <GithubDistribution />
                <CTA />
                <Contact />
            </div>

            <Gutter />
        </div>
    );
}
