"use client";

import { socials } from "@/constant/social";
import { useCursorPosition } from "@/hooks/use-cursor-position";
import { Eye, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";

export default function Hero() {
    const { mousePosition, isHovering } = useCursorPosition({
        targetElementId: ["profile-image-wrapper"],
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
        <SectionWrapper className="pt-16" id="hero">
            <div className="flex flex-col md:flex-row  gap-4">
                <div className="flex  mask-profile">
                    <Image
                        alt="anime-profile-image"
                        src="/image/anime-profile.png"
                        width={800}
                        height={800}
                        className="w-full md:w-68  h-full"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-medium leading-none tracking-wide">
                            AL-Monsour Salida
                        </h1>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            I'm a Full-Stack Developer specializing in building
                            high-performance web, mobile, and desktop
                            applications. From architecting scalable backends
                            with Node.js and Laravel to crafting seamless
                            frontends using React, Next.js, and React Native, I
                            focus on writing clean, maintainable code and
                            designing structured, user-centered interfaces.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
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
                                <Eye className="w-4 h-4" />
                                <span>Resume</span>
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-sm text-muted-foreground">
                            Social Links
                        </h1>
                        <div className="flex gap-2">
                            {socials.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.link}
                                    target="blank"
                                >
                                    <Button size="icon" variant="outline">
                                        <social.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
