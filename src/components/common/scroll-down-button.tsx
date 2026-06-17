"use client";

import { cn } from "@/lib/utils";
import { useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ScrollToTopButton() {
    const { scrollYProgress } = useScroll();

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setScrollProgress(latest * 100); // 0 - 100
        });
    }, [scrollYProgress]);

    // Convert to degrees for conic-gradient (100% → 360deg)
    const progressDegree = (scrollProgress / 100) * 360;

    return (
        <div
            className={cn(
                "fixed p-px bg-card z-30 bottom-8 right-4 md:right-8 rounded-full transform transition duration-300 ease-in-out",
                scrollProgress === 0 ? "translate-y-24" : "-translate-y-0",
            )}
            style={{
                background: `radial-gradient(closest-side, white 0%, transparent 80% 100%), 
                       conic-gradient(var(--primary) ${progressDegree}deg, var(--border) 0deg)`,
            }}
        >
            <Button
                variant="outline"
                size="icon"
                className="rounded-full border-0"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <ArrowUp className="w-4 h-4 relative z-10 text-primary" />
            </Button>
        </div>
    );
}
