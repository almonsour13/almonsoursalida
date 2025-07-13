"use client";

import { socials } from "@/constant/social";
import { motion } from "framer-motion";
import GridLines from "../grid-lines";
import SectionWrapper from "../section-wrapper";

export default function Hero() {
    return (
        <SectionWrapper
            id="hero"
            className="flex items-center justify-center relative"
        >
            <div className=" md:max-w-6xl w-full flex items-center justify-center min-h-screen">
                <div className="flex-1 flex flex-col gap-2 md:gap-4">
                    <motion.h1 
                        className="text-6xl md:text-9xl font-bold leading-tights uppercase"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span 
                            className="bg-backgrounds"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Hi,
                        </motion.span>{" "}
                        <br />
                        <motion.span 
                            className="bg-backgrounds"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {"I'm"}{" "}
                        </motion.span>
                        <motion.span 
                            className="bg-backgrounds"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.6 }}
                        >
                            Al-Monsour{" "}
                        </motion.span>
                        <motion.span 
                            className="bg-backgrounds"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, delay: 0.8 }}
                        >
                            Salida
                        </motion.span>
                    </motion.h1>
                    
                    <motion.p 
                        className="text-sm md:text-base text-foreground bg-background"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {"I'm"} a Full Stack Web Developer with experience in
                        designing, developing, and deploying dynamic web
                        applications. I specialize in JavaScript, React,
                        Node.js, and SQL/NoSQL databases. I love solving
                        problems with clean code and intuitive design.
                    </motion.p>
                    
                    <motion.div 
                        className="flex flex-col md:flex-row flex-wrap gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <div className="flex gap-2">
                            <motion.a
                                href="#contact"
                                className="flex items-center justify-between h-8 px-3 py-1 bg-card border rounded-full text-xs md:text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                            >
                                Contact Me
                            </motion.a>
                            <motion.a
                                href=""
                                className="flex items-center justify-between h-8 px-3 py-1 bg-card border rounded-full text-xs md:text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 1.1 }}
                            >
                                Download CV
                            </motion.a>
                        </div>
                        <div className="flex gap-2">
                            {socials.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    className="flex items-center justify-center h-8 w-8 py-1 bg-card border rounded-full text-xs md:text-sm"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        duration: 0.6, 
                                        delay: 1.2 + (index * 0.1),
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                >
                                    <social.icon className="h-4 w-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
                {/* <div className="hidden md:block bg-red-400 w-80 h-80">
                    <img src="/image/profile.JPG" alt="" />
                </div> */}
            </div>
            <GridLines />
        </SectionWrapper>
    );
}