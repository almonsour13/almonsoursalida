"use client";

import { socials } from "@/constant/social";
import { FileUser, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TextAnimate from "../animation/text-animate";
import ContentContainer from "../layout/content-container";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

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
        <ContentContainer>
            <div className="relative pt-24 md:pt-32">
                <div className="flex flex-col gap-6">
                    <Card className="relative aspect-square w-[160px] p-0 bg-background overflow-hidden flex items-center justify-center border-0">
                        <Image
                            alt="Portrait of AL-Monsour M. Salida"
                            src="/image/profile.png"
                            fill
                            className="object-cover grayscale hover:grayscale-0 duration-500 transition-all"
                            priority
                        />
                    </Card>
                    <div className="flex-1 flex flex-col gap-2 justify-between">
                        <h1 className="text-5xl md:text-5xl font-light tracking-tight leading-tight text-foreground">
                            <span className="text-muted-foreground">
                                Hey, I&apos;m
                            </span>{" "}
                            <br className="block md:hidden" />{" "}
                            <span className="text-primary">
                                AL-Monsour M. Salida
                            </span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-foreground">
                            <span>I&apos;m</span>{" "}
                            <TextAnimate
                                words={ROLES}
                                type="slide"
                                className="text-primary"
                            />
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            I specialize in building high-performance web,
                            mobile, and desktop applications — architecting
                            scalable{" "}
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
                                        <Button size="icon" variant="outline">
                                            <social.icon className="h-4 w-4 text-primary" />
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                            {/* <div className="hidden sm:block h-6 w-px bg-border mx-1" />
                                <AvailabilityBadge className="h-10" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
