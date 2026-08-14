"use client";

import { socials } from "@/constant/social";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
    FileUser,
    LayoutTemplate,
    Lightbulb,
    PhoneCall,
    Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CornerFrame from "../corner-frame";
import DotGrid from "../dot-grid";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";

const ROLES = [
    "Full-Stack Developer",
    "Front-End Developer",
    "Back-End Developer",
    "Mobile App Developer",
    "CMS Developer",
    "Automation Developer",
];

const SOLUTIONS = [
    {
        icon: Lightbulb,
        title: "Build your idea",
        description:
            "Turn your idea into a working website, application, or digital product.",
    },
    {
        icon: Wrench,
        title: "Improve your existing app",
        description:
            "Add features, fix issues, and improve existing projects and systems.",
    },
    {
        icon: LayoutTemplate,
        title: "Create a better experience",
        description:
            "Build clean, responsive interfaces that are simple and easy to use.",
    },
];

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
    return (
        <SectionWrapper className="mt-8 md:mt-16" id="hero">
            <div className="relative flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <CornerFrame className="w-full lg:w-xs shrink-0 flex flex-col gap-3 border">
                        <div className="relative overflow-hidden aspect-square h-full">
                            <Image
                                alt="profile-image"
                                src="/image/profile.png"
                                fill
                                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
                                priority
                            />
                        </div>
                    </CornerFrame>
                    <CornerFrame className="p-4 md:p-6 border flex-1 flex flex-col gap-4 justify-start relative">
                        <DotGrid className="opacity-40 -z-10" />
                        <div className=" absolute inset-0 bg-card -z-20"></div>
                        <span className="text-primary text-xs font-medium">
                            [ INTRODUCTION ]
                        </span>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl md:text-5xl font-medium md:leading-14 tracking-tight text-foreground">
                                <span className="hidden md:block">
                                    Hey, I'm
                                </span>
                                AL-Monsour M. Salida
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground">
                                <RoleCycler />
                            </p>
                        </div>

                        <p className="text-base text-muted-foreground leading-relaxed">
                            I'm a{" "}
                            <span className="text-primary">
                                Full-Stack Developer
                            </span>{" "}
                            specializing in building high-performance web,
                            mobile, and desktop applications. From architecting
                            scalable backends with{" "}
                            <span className="text-primary">Node.js</span> and{" "}
                            <span className="text-primary">Laravel</span> to
                            crafting seamless frontends using{" "}
                            <span className="text-primary">React</span>,{" "}
                            <span className="text-primary">Next.js</span>,{" "}
                            <span className="text-primary">Vue.js</span> and{" "}
                            <span className="text-primary">React Native</span>,
                            with additional experience across CMS platforms like{" "}
                            <span className="text-primary">WordPress</span> and
                            etc, I focus on writing clean, maintainable code and
                            designing structured, user-centered interfaces.
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                            <Link href="#contact">
                                <Button variant="default">
                                    <PhoneCall className="w-4 h-4" />
                                    <span>{"Let's"} Talk</span>
                                </Button>
                            </Link>
                            <Link
                                target="_blank"
                                href="https://docs.google.com/document/d/1_MNkRS92RUt3PGpjbCJz4QWbnwz1yvQZ9mf8dAhS9wI/edit?usp=sharing"
                            >
                                <Button variant="outline">
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
                                        <Button size="icon" variant="outline">
                                            <social.icon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </CornerFrame>
                </div>
                <CornerFrame className="grid border md:grid-cols-3">
                    {SOLUTIONS.map((solution, i) => {
                        const Icon = solution.icon;

                        return (
                            <div
                                key={solution.title}
                                className={cn(
                                    "group bg-card p-5 transition-colors hover:bg-muted/30",

                                    i > 0 &&
                                        "border-t border-border md:border-t-0 md:border-l",
                                    // i % 2 === 1 && "bg-primary",
                                )}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />

                                    <span className="font-mono text-[10px] text-muted-foreground">
                                        0{i + 1}
                                    </span>
                                </div>

                                <h3 className="mb-2 text-sm font-medium text-foreground">
                                    {solution.title}
                                </h3>

                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {solution.description}
                                </p>
                            </div>
                        );
                    })}
                </CornerFrame>
            </div>
        </SectionWrapper>
    );
}
