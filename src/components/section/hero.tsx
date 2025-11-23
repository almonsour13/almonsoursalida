"use client";

import { useCursorPosition } from "@/app/hooks/use-cursor-position";
import { socials } from "@/constant/social";
import { motion } from "framer-motion";
import { Eye, PhoneCall } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GridLines from "../grid-lines";
import ImageLoader from "../image-loader";
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

    useEffect(() => {
        console.log(isHovering);
        console.log(mousePosition);
    }, [isHovering, mousePosition]);

    return (
        <SectionWrapper id="hero" className="relative">
            <div className="flex flex-col items-center  justify-center min-h-screen">
                <div className="w-full flex items-center justify-between ">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-0.5 bg-border"></div>
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                            Full Stack Developer
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">
                            Est. 2025
                        </span>
                        <div className="w-8 h-0.5 bg-border"></div>
                    </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-4">
                    <div className="flex-2 flex flex-col gap-4">
                        <motion.h1
                            className="text-6xl sm:text-8xl md:text-9xl font-bold leading-tights uppercase"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            <motion.span
                                className="block"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {/* {"I'm"}{" "} */}
                                Al-Monsour
                            </motion.span>
                            <motion.span
                                className="block"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                Salida
                            </motion.span>
                        </motion.h1>

                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-0.5 bg-border"></div>
                                <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                                    About Me
                                </span>
                            </div>
                            <p className="text-base text-muted-foreground max-w-2xl">
                                {"I'm"} a Full Stack Developer with a strong
                                background in creating dynamic, responsive web
                                applications from front to back.
                            </p>
                        </motion.div>
                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.0 }}
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button variant="default">
                                    <PhoneCall className="w-4 h-4" />
                                    <span>{"Let's"} Talk</span>
                                </Button>
                            </motion.a>
                            <motion.a
                                target="_blank"
                                href="/resume/Al-Monsour M. Slida - Resume.3.pdf"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button variant="outline">
                                    <Eye className="w-4 h-4" />
                                    <span>Resume</span>
                                </Button>
                            </motion.a>
                        </motion.div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4 md:gap-8 md:pt-4">
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <div
                                ref={imageRef}
                                id="profile-image-wrapper"
                                className="aspect-square hidden group  mask-profile lg:block transition-all duration-200 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 bordaer border-primary/20 overflow-hidden relative"
                            >
                                <div className="absolute inset-0">
                                    <ImageLoader
                                        alt="profile-image"
                                        src="/image/profile.JPG"
                                        className="w-full h-full object-cover "
                                        width={1000}
                                        height={1000}
                                        priority={true}
                                    />
                                </div>

                                {/* Anime Profile with Spotlight Mask */}
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
                                        <ImageLoader
                                            alt="anime-profile-image"
                                            src="/image/anime-profile.png"
                                            className="w-full h-full object-cover"
                                            width={1000}
                                            height={1000}
                                            priority={true}
                                        />
                                    </div>
                                )}
                                {/* {isHovering && (
                                    <div
                                        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none border border-white"
                                        style={{
                                            left: relativePosition.x - 150,
                                            top: relativePosition.y - 150,
                                            transition:
                                                "left 0.1s ease-out, top 0.1s ease-out",
                                        }}
                                    />
                                )} */}
                                {/* Decorative elements */}
                                <div className="absolute top-4 right-4 w-12 h-12 bg-primary/10 rounded-full"></div>
                                <div className="absolute bottom-4 left-4 w-8 h-8 bg-primary/20 rounded-full"></div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-0.5 bg-border"></div>
                                <span className="text-xs font-medium tracking-widest uppercase text-primary">
                                    Connect
                                </span>
                            </div>
                            <div className="flex gap-3">
                                {socials.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.link}
                                        target="blank"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 1.6 + index * 0.1,
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                        }}
                                    >
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="rounded-full"
                                        >
                                            <social.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                                        </Button>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <GridLines />
        </SectionWrapper>
    );
}
