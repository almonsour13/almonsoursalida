"use client";

import { socials } from "@/constant/social";
import { useCursorPosition } from "@/hooks/use-cursor-position";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FileUser, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CornerFrame from "../corner-frame";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const ROLES = [
    "Full-Stack Developer",
    "React Native Engineer",
    "Systems Architect",
    "Interface Craftsman",
];

const STACK = [
    "Node.js",
    "Laravel",
    "React",
    "Next.js",
    "Vue.js",
    "React Native",
    "WordPress",
];

const PRINCIPLES = [
    {
        title: "Ship fast",
        description:
            "Lean iterations from idea to production, without cutting corners on quality.",
    },
    {
        title: "Built to scale",
        description:
            "Architecture decisions made for the app you'll have in a year, not just today.",
    },
    {
        title: "Detail-obsessed",
        description:
            "Pixel-level UI polish and edge-case handling, on every screen, every time.",
    },
];

function DotGrid({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 -z-10",
                className,
            )}
            style={{
                backgroundImage:
                    "radial-gradient(rgba(128,128,128,0.35) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        />
    );
}

function RoleCycler() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROLES.length);
        }, 2600);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="relative inline-flex h-[1.2em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={ROLES[index]}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="text-primary whitespace-nowrap"
                >
                    {ROLES[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

export default function Hero() {
    const { mousePosition, isHovering } = useCursorPosition({
        targetElementId: ["profile-image-wrapper"],
        enableTouch: true,
    });
    const imageRef = useRef<HTMLDivElement>(null);
    const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (isHovering && imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            setRelativePosition({
                x: mousePosition.x - rect.left,
                y: mousePosition.y - rect.top,
            });
        }
    }, [mousePosition, isHovering]);

    return (
        <SectionWrapper className="pt-8 md:pt-16" id="hero">
            <CornerFrame className="border border-border px-4 py-12 md:py-20 overflow-hidden">
                <DotGrid />

                <div className="flex flex-col items-center gap-4 text-center">
                    <Link
                        href="#contact"
                        className="rounded-full bg-primary text-primary-foreground text-xs font-medium px-4 py-1.5 hover:opacity-90 transition-opacity"
                    >
                        Open to new projects — {"let's"} talk
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-foreground max-w-3xl">
                        AL-Monsour M. Salida
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground">
                        <RoleCycler />
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                        I build high-performance web, mobile, and desktop
                        applications end to end — architecting scalable
                        backends, crafting seamless frontends, and designing
                        structured, user-centered interfaces along the way.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 pt-1">
                        {STACK.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="relative mt-8 w-full flex justify-center">
                        <Card
                            ref={imageRef}
                            id="profile-image-wrapper"
                            className="relative p-0 flex group transition-all duration-200 rounded-md overflow-hidden w-56 md:w-64 aspect-[4/5]"
                        >
                            <Image
                                alt="anime-profile-image"
                                src="/image/anime-profile.png"
                                fill
                                className="object-cover"
                            />
                            {isHovering && (
                                <div
                                    className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 duration-300"
                                    style={{
                                        maskImage: `radial-gradient(circle 180px at ${relativePosition.x}px ${relativePosition.y}px, black 40%, transparent 100%)`,
                                        WebkitMaskImage: `radial-gradient(circle 180px at ${relativePosition.x}px ${relativePosition.y}px, black 40%, transparent 100%)`,
                                        maskSize: "100% 100%",
                                        WebkitMaskSize: "100% 100%",
                                    }}
                                >
                                    <Image
                                        alt="profile-image"
                                        src="/image/profile.png"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            )}
                        </Card>

                        <CornerFrame className="hidden lg:block absolute left-[8%] top-6 w-48 border border-primary/60 bg-background/90 backdrop-blur-sm px-3 py-2.5">
                            <p className="text-primary text-sm font-semibold">
                                5+ years
                            </p>
                            <p className="text-xs text-muted-foreground leading-snug">
                                Shipping production apps across web, mobile, and
                                desktop.
                            </p>
                        </CornerFrame>

                        <CornerFrame className="hidden lg:block absolute right-[8%] bottom-6 w-52 border border-primary/60 bg-background/90 backdrop-blur-sm px-3 py-2.5">
                            <p className="text-primary text-sm font-semibold">
                                20+ products
                            </p>
                            <p className="text-xs text-muted-foreground leading-snug">
                                Launched end to end, from schema to shipped UI.
                            </p>
                        </CornerFrame>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
                        <Link href="#contact">
                            <Button variant="default" className="rounded-full">
                                <PhoneCall className="w-4 h-4" />
                                <span>{"Let's"} Talk</span>
                            </Button>
                        </Link>
                        <Link
                            target="_blank"
                            href="https://docs.google.com/document/d/1_MNkRS92RUt3PGpjbCJz4QWbnwz1yvQZ9mf8dAhS9wI/edit?usp=sharing"
                        >
                            <Button variant="outline" className="rounded-full">
                                <FileUser className="w-4 h-4" />
                                <span>Resume</span>
                            </Button>
                        </Link>
                        <div className="hidden sm:block h-6 w-px bg-border mx-1" />
                        <div className="flex items-center gap-2">
                            {socials.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                >
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="rounded-full"
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </CornerFrame>

            <div className="grid md:grid-cols-3 border border-t-0 border-border overflow-hidden">
                {PRINCIPLES.map((principle, i) => (
                    <div
                        key={principle.title}
                        className={cn(
                            "flex flex-col gap-1.5 p-6",
                            i !== 0 && "md:border-l border-border",
                        )}
                    >
                        <h3 className="text-sm font-medium text-foreground">
                            {principle.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {principle.description}
                        </p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
