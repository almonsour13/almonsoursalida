"use client";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Code,
    Database,
    PanelsTopLeft,
    PenTool,
    Server,
    Workflow,
} from "lucide-react";
import Link from "next/link";
import EdgeDash from "../edge-dash";
import GradientDotGrid from "../gradient-dot-grid";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";

const FLOATING_ICONS = [
    {
        icon: Database,
        className: "top-[10%] left-[4%] hidden md:flex",
        rotate: -12,
        duration: 4.5,
        delay: 0,
    },
    {
        icon: Code,
        className: "top-[40%] left-[12%] hidden lg:flex",
        rotate: 10,
        duration: 5,
        delay: 0.6,
    },
    {
        icon: Server,
        className: "bottom-[10%] left-[8%] hidden md:flex",
        rotate: 8,
        duration: 4,
        delay: 1.1,
    },
    {
        icon: PenTool,
        className: "top-10 right-[8%] hidden md:flex",
        rotate: 14,
        duration: 4.2,
        delay: 0.3,
    },
    {
        icon: Workflow,
        className: "bottom-[40%] right-[16%] hidden lg:flex",
        rotate: -10,
        duration: 5.2,
        delay: 0.9,
    },
    {
        icon: PanelsTopLeft,
        className: "bottom-[10%] right-[4%] hidden lg:flex",
        rotate: -10,
        duration: 5.2,
        delay: 0.9,
    },
];
export default function CTA() {
    return (
        <SectionWrapper id="cta" className="relative">
            <div className="relative pt-8 md:pt-16">
                <EdgeDash side="right" className="-z-20 hidden md:block" />
                <EdgeDash side="left" className="-z-20 hidden md:block" />
            </div>
            <div className="relative rounded overflow-hidden">
                <div className="w-full relative bg-primary text-primary-foreground p-4 py-16 md:py-20 flex flex-col items-center gap-4 text-center">
                    <GradientDotGrid className="opacity-100 z-10" />
                    {FLOATING_ICONS.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`absolute h-16 w-16 items-center justify-center rounded border border-dashed border-border bg-primary-foreground/10 ${item.className}`}
                            initial={{ rotate: item.rotate }}
                            animate={{
                                y: [0, -14, 0],
                                rotate: [
                                    item.rotate,
                                    item.rotate + 4,
                                    item.rotate,
                                ],
                            }}
                            transition={{
                                duration: item.duration,
                                delay: item.delay,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <item.icon className="h-6 w-6 text-primary-foreground/80" />
                        </motion.div>
                    ))}

                    <span className="relative z-20 text-xs font-medium uppercase text-primary-foreground/70">
                        [ LET'S TALK ]
                    </span>

                    <h2 className="relative z-20 text-3xl md:text-5xl font-medium leading-tight tracking-tight max-w-2xl">
                        {"Let's"} build something without boundaries
                    </h2>
                    <p className="relative z-20 opacity-90 max-w-xl">
                        Every great project starts with a conversation — reach
                        out and {"let's"} talk through what {"you're"} building.
                    </p>

                    <Link href="#contact" className="relative z-20">
                        <Button
                            className="bg-primary-foreground text-primary hover:bg-primary-foreground/80"
                            size="lg"
                        >
                            Get in touch
                            <ArrowUpRight size={14} />
                        </Button>
                    </Link>
                </div>
            </div>
        </SectionWrapper>
    );
}
