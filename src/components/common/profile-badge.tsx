"use client";

import { useSection } from "@/context/section-context";
import { useScroll } from "framer-motion";

export default function ProfileBadge() {
    const { activeSection } = useSection();
    const { scrollYProgress } = useScroll();

    return (
        <div
            className={`backdrop-blur-sm border rounded-3xl pr-4 bg-background/50 fixed z-30 top-4 md:top-12 left-4 md:left-46 flex items-center gap-2 transform transition duration-300 ease-in-out
        ${
            activeSection === "hero" || scrollYProgress.get() === 0
                ? "-translate-y-16 md:-translate-y-24"
                : "translate-y-0"
        }`}
        >
            <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                    src="/image/profile.JPG"
                    alt="Al-Monsour M. Salida"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col">
                <h1>Al-Monsour M. Salida</h1>
                <p className="text-xs text-muted-foreground">
                    Web Developer
                </p>
            </div>
        </div>
    );
}
