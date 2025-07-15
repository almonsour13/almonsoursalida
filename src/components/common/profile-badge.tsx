"use client";

import { useSection } from "@/context/section-context";
import { useScroll } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";


export default function ProfileBadge() {
    const { activeSection } = useSection();
    const { scrollYProgress } = useScroll();

    return (
        <div
            className={`backdrop-blur-sm border rounded-3xl pr-4 bg-background/50 fixed z-30 top-4 md:top-12 left-4 md:left-46 flex items-center gap-2 transform transition duration-300 ease-in-out
        ${
            (activeSection === "hero" || activeSection === "contact") || scrollYProgress.get() === 0
                ? "-translate-y-16 md:-translate-y-24"
                : "translate-y-0"
        }`}
        >
            <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                        src="/image/profile.JPG"
                        alt="Al-Monsour M. Salida"
                        className="h-full w-full object-cover"
                        width={800}
                        height={800}
                    />
                </div>

                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
            </div>
            <div className="flex flex-col">
                <h1>Al-Monsour M. Salida</h1>
                <p className="text-xs text-muted-foreground">Web Developer</p>
            </div>
            <div className="h-8 w-px bg-border mx-1"/>
            <a href="#contact" className="flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
            </a>
        </div>
    );
}
