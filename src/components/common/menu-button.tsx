"use client";
import { useObserveSection } from "@/hooks/use-observe-section";
import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    LayoutGroup,
    motion,
    useReducedMotion,
} from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EdgeLine from "../decorative/edge-line";
import { NAV_LINKS, normalize } from "../layout/header";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function MenuButton() {
    const [open, setOpen] = useState(false);

    const active = useObserveSection();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        const handleResize = () => {
            if (window.innerWidth >= 768) setOpen(false);
        };

        window.addEventListener("keydown", handleKey);
        window.addEventListener("resize", handleResize);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKey);
            window.removeEventListener("resize", handleResize);
        };
    }, [open]);

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className="fixed top-24 right-4 md:right-8 rounded-full z-50"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav"
            >
                {open ? (
                    <X className="w-4 h-4" />
                ) : (
                    <Menu className="w-4 h-4" />
                )}
            </Button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-nav"
                        className="fixed inset-0 z-40 h-dvh bg-background flex flex-col overflow-y-auto px-4 pt-24 pb-8 md:px-8"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.25,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                    >
                        <div className="flex flex-col items-start gap-2 pb-8">
                            <h2 className="text-5xl font-light tracking-tight text-foreground capitalize leading-tight">
                                Navigate{" "}
                                <span className="text-primary">on</span>
                            </h2>
                            <p className="text-sm text-muted-foreground md:text-base">
                                Jump to any section of the page.
                            </p>
                        </div>

                        <LayoutGroup>
                            <nav className="flex flex-col gap-2">
                                {NAV_LINKS.map((link, i) => {
                                    const isActive =
                                        normalize(link.href) === active;

                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: reduceMotion
                                                    ? 0
                                                    : 0.3,
                                                delay: reduceMotion
                                                    ? 0
                                                    : 0.05 * i + 0.1,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setOpen(false)}
                                                aria-current={
                                                    isActive
                                                        ? "page"
                                                        : undefined
                                                }
                                                className="block"
                                            >
                                                <Card className="relative flex-row items-center justify-between border bg-background gap-0 overflow-hidden  hover:bg-muted/40">
                                                    {isActive && (
                                                        <motion.div
                                                            className="absolute z-10 inset-0"
                                                            layoutId="menuHighlight"
                                                            transition={{
                                                                layout: {
                                                                    duration:
                                                                        reduceMotion
                                                                            ? 0
                                                                            : 0.4,
                                                                    ease: [
                                                                        0.22, 1,
                                                                        0.36, 1,
                                                                    ],
                                                                },
                                                            }}
                                                        >
                                                            <Card className="h-full w-full bg-primary border-none p-0" />
                                                        </motion.div>
                                                    )}

                                                    <div className="z-20 flex flex-1 items-center gap-4 md:gap-8">
                                                        <h3
                                                            className={cn(
                                                                "text-xl font-medium tracking-tight text-foreground transition-colors",
                                                                isActive &&
                                                                    "text-primary-foreground",
                                                            )}
                                                        >
                                                            {link.label}
                                                        </h3>
                                                    </div>

                                                    <ArrowRight
                                                        className={cn(
                                                            "z-20 h-6 w-6 text-primary hover:text-primary-foreground transition-colors",
                                                            isActive &&
                                                                "text-primary-foreground",
                                                        )}
                                                    />
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>
                        </LayoutGroup>

                        <EdgeLine side="bottom" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
