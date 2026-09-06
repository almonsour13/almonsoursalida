"use client";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
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
import DotPingTexture from "../decorative/dote-ping-texture";
import EdgeLine from "../decorative/edge-line";
import GradientDotGrid from "../decorative/gradient-dot-grid";
import { Button } from "../ui/button";

const FLOATING_ICONS = [
    {
        icon: Database,
        className: "top-[8%] left-[4%] hidden md:flex",
        rotate: -12,
        duration: 4.5,
        delay: 0,
    },
    {
        icon: Code,
        className: "top-[32%] left-[16%] hidden lg:flex",
        rotate: 10,
        duration: 5,
        delay: 0.6,
    },
    {
        icon: Server,
        className: "top-[52%] left-[4%] hidden md:flex",
        rotate: 8,
        duration: 4,
        delay: 1.1,
    },
    {
        icon: PenTool,
        className: "top-[6%] right-[8%] hidden md:flex",
        rotate: 14,
        duration: 4.2,
        delay: 0.3,
    },
    {
        icon: Workflow,
        className: "top-[32%] right-[16%] hidden lg:flex",
        rotate: -10,
        duration: 5.2,
        delay: 0.9,
    },
    {
        icon: PanelsTopLeft,
        className: "top-[52%] right-[4%] hidden lg:flex",
        rotate: -10,
        duration: 5.2,
        delay: 0.9,
    },
];

const ENTRANCE_DURATION = 0.6;
const ENTRANCE_STAGGER = 0.08;

export default function CTA() {
    const reduceMotion = useReducedMotion();

    return (
        <div className="w-full pb-4 p-0 md:p-4 relative">
            <EdgeLine side="top" className="hidden md:block" />
            <div className="w-full  md:rounded overflow-hidden relative bg-primary text-primary-foreground p-4 md:py-20 flex flex-col items-start md:items-center gap-4 text-start md:text-center">
                <DotPingTexture
                    reduceMotion={reduceMotion}
                    dotColor="--primary-foreground"
                    className="absolute inset-0 pointer-events-none hidden md:block"
                />
                <GradientDotGrid
                    className="z-10 block md:hidden"
                    color="--primary-foreground"
                />
                {FLOATING_ICONS.map((item, index) => {
                    const entranceDelay = index * ENTRANCE_STAGGER;
                    const floatDelay =
                        ENTRANCE_DURATION + entranceDelay + item.delay;

                    return (
                        <motion.div
                            key={index}
                            className={cn("z-30 absolute", item.className)}
                            initial={
                                reduceMotion
                                    ? undefined
                                    : {
                                          opacity: 0,
                                          y: -40,
                                          rotate: item.rotate,
                                      }
                            }
                            whileInView={
                                reduceMotion
                                    ? undefined
                                    : { opacity: 1, y: 0, rotate: item.rotate }
                            }
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                                duration: ENTRANCE_DURATION,
                                delay: entranceDelay,
                                ease: "easeOut",
                            }}
                        >
                            <motion.div
                                className="h-16 w-16 flex items-center justify-center rounded border border-dashed border-primary-foreground/50 bg-primary "
                                animate={
                                    reduceMotion
                                        ? undefined
                                        : {
                                              y: [0, -14, 0],
                                              rotate: [
                                                  item.rotate,
                                                  item.rotate + 4,
                                                  item.rotate,
                                              ],
                                          }
                                }
                                transition={{
                                    duration: item.duration,
                                    delay: floatDelay,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <item.icon className="h-6 w-6 text-primary-foreground/80" />
                            </motion.div>
                        </motion.div>
                    );
                })}

                <h2 className="relative z-20 text-4xl md:text-6xl font-medium leading-tight tracking-tight md:max-w-3xl capitalize">
                    {"Let's"} build something without boundaries
                </h2>
                <p className="relative z-20 opacity-90 md:max-w-xl ">
                    Every great project starts with a conversation — reach out
                    and {"let's"} talk through what {"you're"} building.
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
    );
}
