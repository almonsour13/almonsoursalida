"use client";

import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setScrollProgress(latest * 100);
        });
    }, [scrollYProgress]);

    return (
        <div className="fixed top-0 left-0 w-full h-0.5 backdrop-blur-sm z-50">
            <div
                className="h-full bg-foreground transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
}
