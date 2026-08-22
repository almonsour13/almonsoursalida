"use client";

import { socials } from "@/constant/social";
import { FileUser, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TextAnimate from "../animation/text-animate";
import EdgeDash from "../decorative/edge-dash";
import SectionWrapper from "../layout/section-wrapper";
import { Button } from "../ui/button";

const ROLES = [
    "Full-Stack Developer",
    "Front-End Developer",
    "Back-End Developer",
    "Mobile App Developer",
    "CMS Developer",
    "Automation Developer",
];

const STATS = [
    { value: "4+", label: "Years experience" },
    { value: "40+", label: "Projects shipped" },
    { value: "15+", label: "Happy clients" },
];

export default function Hero() {
    return (
        <SectionWrapper id="hero">
            <div className="relative flex flex-col gap-2 py-8 md:py-20">
                <EdgeDash side="right" className="-z-20 hidden md:block" />
                <EdgeDash side="left" className="-z-20 hidden md:block" />
                <EdgeDash side="bottom" className="-z-20" />
                <div className="flex flex-col lg:flex-row gap-4">
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

                        <div className="hidden lg:flex items-center gap-2 rounded border px-4 h-10 py-2">
                            <span className="relative flex shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                            </span>
                            <span className="font-mono text-sm text-muted-foreground">
                                Available for new projects
                            </span>
                        </div>
                    </div>
                    <div className="md:px-4 flex-1 flex flex-col gap-4 justify-start relative boarder rounded overflow-hidden">
                        {/* <GradientDotGrid /> */}
                        <div className=" absolute inset-0 -z-20"></div>
                        <span className="text-primary text-xs font-medium">
                            [ INTRODUCTION ]
                        </span>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-medium md:laeading-14 tracking-tight text-foreground">
                                <span className="hidden md:block">
                                    Hey, I'm
                                </span>
                                AL-Monsour M. Salida
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground">
                                <p className="text-xl md:text-2xl text-muted-foreground">
                                    <TextAnimate
                                        words={ROLES}
                                        className="text-primary"
                                        type="slide"
                                    />
                                </p>
                            </p>
                        </div>

                        <p className="text-base text-muted-foreground leading-relaxed">
                            I'm a{" "}
                            <span className="text-primary">
                                Full-Stack Developer
                            </span>{" "}
                            specializing in building high-performance web,
                            mobile, and desktop applications. From architecting
                            scalable{" "}
                            <span className="text-primary">Backends</span> to
                            crafting seamless{" "}
                            <span className="text-primary">Frontends</span>,
                            with additional experience across{" "}
                            <span className="text-primary">CMS platforms</span>.
                        </p>

                        <div className="hidden grid grid-cols-3 divide-x rounded border bg-background">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col items-center justify-center gap-0.5 px-2 py-3"
                                >
                                    <span className="font-mono text-lg md:text-xl font-medium text-foreground">
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] md:text-xs text-muted-foreground text-center leading-tight">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>

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
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
