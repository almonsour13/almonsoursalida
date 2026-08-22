"use client";

import { socials } from "@/constant/social";
import { useReducedMotion } from "framer-motion";
import { FileUser, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TextAnimate from "../animation/text-animate";
import DotTexture from "../decorative/dot-texture";
import EdgeDash from "../decorative/edge-dash";
import ContentContainer from "../layout/content-container";
import { Button } from "../ui/button";

const ROLES = [
    "Full-Stack Developer",
    "Front-End Developer",
    "Back-End Developer",
    "Mobile App Developer",
    "CMS Developer",
    "Automation Developer",
];

export default function Hero() {
    const reduceMotion = useReducedMotion();
    return (
        <div className="w-full px-4 relative flex items-center justify-center">
            <DotTexture
                reduceMotion={reduceMotion}
                className="absolute inset-0 -z-10 pointer-events-none"
            />
            <EdgeDash side="bottom" className="-z-20" />
            <ContentContainer>
                <div className="relative flex flex-col gap-2 py-8 md:py-20">
                    {/* <EdgeDash side="right" className="-z-20 hidden md:block" />
                    <EdgeDash side="left" className="-z-20 hidden md:block" /> */}
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-4">
                        <div className="w-full lg:w-xs shrink-0 flex flex-col gap-2">
                            <div className="relative aspect-square h-full rounded overflow-hidden">
                                <Image
                                    alt="profile-image"
                                    src="/image/profile.png"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 duration-500 transition-all"
                                    priority
                                />
                            </div>

                            <div className="hidden lg:flaex items-center gap-2 rounded border px-4 h-10 py-2">
                                <span className="relative flex shrink-0">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                                </span>
                                <span className="font-mono text-sm text-muted-foreground">
                                    Available for new projects
                                </span>
                            </div>
                        </div>
                        <div className="md:px-4 flex-1 flex flex-col gap-2 md:gap-4 items-center md:items-start relative borader rounded overflow-hidden bg-bacakground">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground text-center md:text-start">
                                Hey, I'm
                            </h1>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground text-center md:text-start">
                                AL-Monsour M. Salida
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground ">
                                <TextAnimate
                                    words={ROLES}
                                    className="text-primary"
                                    type="slide"
                                />
                            </p>

                            <p className="text-base text-center md:text-start text-muted-foreground leading-relaxed">
                                I'm a{" "}
                                <span className="text-primary">
                                    Full-Stack Developer
                                </span>{" "}
                                specializing in building high-performance web,
                                mobile, and desktop applications. From
                                architecting scalable{" "}
                                <span className="text-primary">Backends</span>{" "}
                                to crafting seamless{" "}
                                <span className="text-primary">Frontends</span>,
                                with additional experience across{" "}
                                <span className="text-primary">
                                    CMS platforms
                                </span>
                                .
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
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
                                            <Button
                                                size="icon"
                                                variant="outline"
                                            >
                                                <social.icon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    );
}
