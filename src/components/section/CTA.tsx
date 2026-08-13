"use client";
import { motion } from "framer-motion";
import {
    Code,
    Database,
    PanelsTopLeft,
    PenTool,
    Server,
    Workflow,
} from "lucide-react";
import CornerFrame from "../corner-frame";
import DotGrid from "../dot-grid";
import SectionWrapper from "../section-wrapper";

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
        <SectionWrapper id="contact">
            <CornerFrame className="relative border border-border rounded-md">
                <div className="w-full relative bg-primary text-primary-foreground p-4 py-16 md:py-20 flex flex-col items-center gap-4 text-center">
                    <DotGrid className="opacity-100 z-10" />
                    {FLOATING_ICONS.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`absolute h-16 w-16 items-center justify-center rounded-lg border  border-dashed bg-primary-foreground/10 ${item.className}`}
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
                    <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight max-w-2xl">
                        {"Let's"} build something without boundaries
                    </h2>
                    <p className="opacity-90 max-w-xl">
                        Every great project starts with a conversation — reach
                        out and {"let's"} talk through what {"you're"} building.
                    </p>
                </div>
            </CornerFrame>
        </SectionWrapper>
    );
}
