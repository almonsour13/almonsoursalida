"use client";

import { services } from "@/constant/services";
import SectionWrapper from "../section-wrapper";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Services() {
    return (
        <SectionWrapper
            id="services"
            className="py-12"
        >
            <div className="md:max-w-6xl w-full flex flex-col gap-8  items-center justify-center md:min-h-screen">
                <div className="w-full">
                    <div className="flex items-center gap-4 md:gap-8 mb-8">
                        <div className="w-8 md:w-16 h-0.5 bg-primary"></div>
                        <span className="text-sm font-medium tracking-widest uppercase text-primary">
                            Services
                        </span>
                        <div className="flex-1 h-0.5 bg-border"></div>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight text-foreground mb-6 leading-none">
                         What I Offer
                    </h1>
                    <p className="text-sm md:text-base mb-6 text-muted-foreground">
                        Discover expert-crafted solutions to elevate your digital experience — from front-end finesse to back-end mastery.
                    </p>
                </div>

                {/* Layout: Featured Left, List Right */}
                <div className="grid md:grid-cols-12 gap-6 md:gap-12">
                    {/* Featured Service */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:col-span-6 bg-gradient-to-br from-primary/10 to-primary/5 border rounded-3xl p-10 relative"
                    >
                        <div className="absolute top-4 right-4 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium uppercase tracking-widest">
                            Featured
                        </div>
                        <div className="text-7xl font-black text-primary/10 absolute bottom-6 right-6 pointer-events-none select-none">
                            01
                        </div>
                        <h3 className="text-3xl font-bold text-foreground mb-4">
                            {services[0].title}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {services[0].description}
                        </p>
                    </motion.div>

                    {/* Remaining Services */}
                    <div className="md:col-span-6 flex flex-col gap-6">
                        {services.slice(1).map((service, index) => (
                            <motion.div
                                key={index + 1}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className={cn(
                                    "group flex items-start gap-6 border border-border rounded-2xl p-6",
                                    "hover:border-primary/30 hover:shadow-md transition-all"
                                )}
                            >
                                <div className="text-sm font-semibold text-muted-foreground">
                                    {(index + 2).toString().padStart(2, "0")}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-2">
                                        <service.icon className="text-2xl text-primary group-hover:scale-110 transition-transform" />
                                        <h4 className="text-xl font-semibold text-foreground">
                                            {service.title}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="w-full flex flex-col md:flex-row items-center justify-between pt-8 gap-6"
                >
                    <p className="text-base md:text-lg text-muted-foreground">
                        Looking to elevate your project?
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-0.5 bg-primary" />
                        <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                            Let’s build something great together
                        </span>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
