"use client";

import { socials } from "@/constant/social";
import { FileUser, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TextAnimate from "../animation/text-animate";
import AvailabilityBadge from "../common/availability-badge";
import DotSprayTexture from "../decorative/dot-spray-texture";
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
    return (
        <div className="w-full px-4 relative flex items-center justify-center">
            <DotSprayTexture className="absolute inset-0 -z-10 pointer-events-none" />
            <ContentContainer>
                <div className="relative py-8 md:py-20">
                    <div className="flex flex-col gap-6">
                        <div className="relative aspect-video md:aspect-square h-full w-full lg:w-[180px]  rounded bg-background overflow-hidden flex items-center justify-center">
                            <Image
                                alt="Portrait of AL-Monsour M. Salida"
                                src="/image/profile.png"
                                fill
                                className="object-cover md:grayscale hover:grayscale-0 duration-500 transition-all"
                                priority
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-4 justify-between">
                            <h1 className="flex flex-col gap-4 md:flex-row text-5xl md:text-6xl font-light tracking-tight text-foreground">
                                <span>Hey, I&apos;m</span>
                                <span className="text-primary">
                                    AL-Monsour M. Salida
                                </span>
                            </h1>
                            <p className="text-2xl md:text-4xl text-foreground">
                                <span>I&apos;m</span>{" "}
                                <TextAnimate
                                    words={ROLES}
                                    type="slide"
                                    className="text-primary"
                                />
                            </p>
                           <p className="text-base text-muted-foreground leading-relaxed">
                                I specialize in building high-performance web, mobile,
                                and desktop applications — architecting scalable{" "}
                                <span className="text-primary">backends</span>,
                                crafting seamless{" "}
                                <span className="text-primary">frontends</span>, and
                                delivering solutions across{" "}
                                <span className="text-primary">CMS platforms</span>.
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
                                                <social.icon className="h-4 w-4 text-primary" />
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                                <div className="hidden sm:block h-6 w-px bg-border mx-1" />
                                <AvailabilityBadge className="h-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </div>
    );
}
