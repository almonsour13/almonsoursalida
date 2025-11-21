"use client";

import { services } from "@/constant/services";
import { motion } from "framer-motion";
import SectionWrapper from "../section-wrapper";

export default function Services() {
    return (
        <SectionWrapper id="services" className="py-12">
            <div className="flex flex-col items-center justify-center md:min-h-screen">
                <div className="w-full mb-4 md:mb-8">
                    <div className="flex items-center gap-4 md:gap-8 ">
                        <div className="w-8 md:w-16 h-0.5 bg-border"></div>
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                            Services
                        </span>
                        <div className="flex-1 h-0.5 bg-border"></div>
                    </div>
                </div>

                <div className="grid items-start md:grid-cols-2 gap-4 w-full relative">
                    <div className="flex flex-col stat">
                        <h1 className="text-5xl md:text-9xl font-bold uppercase tracking-tight text-foreground mb-6 leading-none">
                            What I Offer
                        </h1>
                        <p className="text-sm md:text-base mb-6 text-muted-foreground">
                            Discover expert-crafted solutions to elevate your
                            digital experience — from front-end finesse to
                            back-end mastery.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <div className="group relative">
                                    <div
                                        className={`border border-border bg-gradient-to-r from-card rounded-md p-6 transition-all duration-300 cursor-pointer"
                                    `}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Number */}
                                            <service.icon className="w-20 h-20 text-muted-foreground" />

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    {/* <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                                                    <service.icon className="w-5 h-5 text-primary-foreground" />
                                                </div> */}

                                                    <h4 className="text-xl font-bold text-foreground">
                                                        {service.title}
                                                    </h4>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                                    {service.description}
                                                </p>
                                                {/* <div className="flex hidden flex-wrap gap-2 mb-6">
                                                {service.features.map(
                                                    (feature, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                                        >
                                                            {feature}
                                                        </span>
                                                    )
                                                )}
                                            </div> */}
                                            </div>
                                        </div>
                                    </div>
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
                    viewport={{ once: true, amount: 0.3 }}
                    className="w-full flex flex-col md:flex-row items-center justify-between pt-8 gap-6"
                >
                    <p className="text-sm text-muted-foreground">
                        Looking to elevate your project?
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-primary tracking-wide">
                            Let’s build something great together
                        </span>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
