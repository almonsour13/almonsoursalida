"use client";

import { socials } from "@/constant/social";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Download, Eye, PhoneCall } from "lucide-react";
import Image from "next/image";
import GridLines from "../grid-lines";
import SectionWrapper from "../section-wrapper";

export default function Hero() {
    return (
        <SectionWrapper id="hero" className="relative">
            <div className=" md:max-w-6xl w-full flex flex-col items-center  justify-center min-h-screen">
                <div className="w-full flex items-center justify-between ">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-0.5 bg-primary"></div>
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                            Web Developer
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
                                <div className="w-12 h-0.5 bg-primary"></div>
                                <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                                    About Me
                                </span>
                            </div>
                            <p className="text-base text-muted-foreground max-w-2xl">
                                {"I'm"} a Web Developer with a strong background
                                in creating dynamic, responsive web applications
                                from front to back.
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
                                className={cn(
                                    "group flex items-center gap-2 px-4 py-2 rounded",
                                    "bg-foreground text-primary-foreground font-medium text-sm",
                                    "hover:bg-primary/90 transition-all duration-300",
                                    "hover:shadow-xl"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <PhoneCall className="w-4 h-4" />
                                <span>{"Let's"} Talk</span>
                            </motion.a>
                            <motion.a
                                    target="_blank"
                                href="/resume/Al-Monsour_Salida_Resume.pdf"
                                className={cn(
                                    "group flex items-center gap-2 px-4 py-2    rounded",
                                    "bg-card border text-foreground font-medium text-sm",
                                    "hover:border-primary/50 transition-all duration-300"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Eye className="w-4 h-4" />
                                <span>Resume</span>
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
                            <div className="aspect-square hidden lg:block rounded-md bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 overflow-hidden relative">
                                {/* Placeholder content */}
                                <div className="absolute inset-0 bg-card/50 backdrop-blur-sm"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image
                                        alt="profile-image"
                                        src="/image/profile.JPG"
                                        // src="/image/anime-profile.png"
                                        className="w-full h-full"
                                        width={1000}
                                        height={1000}
                                    />
                                </div>

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
                            {" "}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-0.5 bg-primary"></div>
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
                                        className={cn(
                                            "group flex items-center justify-center w-10 h-10 rounded-full",
                                            "bg-card border text-foreground",
                                            "hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                                        )}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
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
                                        <social.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">
                            Scroll
                        </div>
                        <motion.div
                            className="w-0.5 h-8 bg-primary/30"
                            animate={{ height: [32, 16, 32] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        ></motion.div>
                    </div>
                </motion.div> */}
            </div>
            <GridLines />
        </SectionWrapper>
    );
}
