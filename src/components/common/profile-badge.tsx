"use client";

import { useSection } from "@/context/section-context";
import { useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileBadge() {
    const { activeSection } = useSection();
    const { scrollYProgress } = useScroll();
    const [scrollProgress, setScrollProgress] = useState(0);

    const pathname = usePathname();
    const [clientPathname, setClientPathname] = useState("");

    useEffect(() => {
        setClientPathname(pathname);
        console.log(pathname);
    }, [pathname]);

    useEffect(() => {
        return scrollYProgress.onChange((latest) => {
            setScrollProgress(latest * 100); // 0 - 100
        });
    }, [scrollYProgress]);

    return (
        <Link
            href="/#contact"
            className={`fixed z-30  left-4 lg:left-44 transform-all transition duration-300 ease-in-out
                ${
                    ((activeSection !== "hero" &&
                        activeSection !== "contact") ||
                        clientPathname.includes("/projects")) &&
                    scrollProgress !== 0
                        ? "translate-y-12"
                        : "-translate-y-24"
                }`}
        >
            <div className=" relative  flex items-center gap-2 overflow-hidden backdrop-blur-sm border rounded-3xl bg-card ">
                <div className="relative w-12 group-hover:w-0 overflow-hidden transform-all transition duration-300 ease-in-out">
                    <div className="h-10 md:h-12 w-10 md:w-12 rounded-full overflow-hidden">
                        <Image
                            src="/image/profile.JPG"
                            alt="Al-Monsour M. Salida"
                            className="h-full w-full object-cover"
                            width={800}
                            height={800}
                        />
                    </div>
                </div>
                <div className="flex flex-col mr-4">
                    <h1 className="font-medium">Hire Me !</h1>
                </div>
                <div className="absolute inset-0 shimmer" />
            </div>
        </Link>
    );
}
