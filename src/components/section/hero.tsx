"use client";

import { socials } from "@/constant/social";
import { useReducedMotion } from "framer-motion";
import { FileUser, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TextAnimate from "../animation/text-animate";
import DotSprayTexture from "../decorative/dot-spray-texture";
import EdgeLine from "../decorative/edge-line";
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
            <DotSprayTexture
                // reduceMotion={reduceMotion}
                className="absolute inset-0 -z-10 pointer-events-none"
                // autoAnimateInterval={6000}
            />
            <EdgeLine side="bottom" className="-z-20 hidden md:block" />
            <ContentContainer>
                <div className="relative flex flex-col gap-2 py-8 md:py-20">
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-10">
                        <div className="w-full lg:w-xs shrink-0 flex flex-col gap-2">
                            <div className="relative aspect-square h-full rounded overflow-hidden border">
                                <Image
                                    alt="Portrait of AL-Monsour M. Salida"
                                    src="/image/profile.png"
                                    fill
                                    sizes="(min-width: 1024px) 320px, 100vw"
                                    className="object-cover grayscale hover:grayscale-0 duration-500 transition-all"
                                    priority
                                />
                            </div>

                            <div className="hidden lg:flex items-center gap-2 rounded border px-4 h-10 py-2 bg-background">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                                </span>
                                <span className="font-mono text-sm text-muted-foreground">
                                    Available for new projects
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-4 justify-between">
                            <h1 className="flex flex-col text-5xl md:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
                                <span>Hey, I&apos;m</span>
                                <span>AL-Monsour M. Salida</span>
                            </h1>

                            <p className="text-2xl md:text-4xl text-muted-foreground">
                                <TextAnimate
                                    words={ROLES}
                                    className="text-primary"
                                    type="slide"
                                />
                            </p>

                            <p className="text-base text-muted-foreground leading-relaxed">
                                I&apos;m a{" "}
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

                            <div className="flex flex-wrap items-center gap-2 pt-1">
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

                            <div className="flex lg:hidden items-center gap-2 rounded border px-4 h-10 py-2 w-fit bg-background">
                                <span className="relative flex shrink-0">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                                </span>
                                <span className="font-mono text-sm text-muted-foreground">
                                    Available for new projects
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    );
}
