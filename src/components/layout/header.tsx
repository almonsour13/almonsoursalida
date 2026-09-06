"use client";

import { useObserveSection } from "@/hooks/use-observe-section";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EdgeLine from "../decorative/edge-line";
import { Button } from "../ui/button";
import ContentContainer from "./content-container";

const NAV_LINKS = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

const normalize = (href: string) => (href === "#hero" ? "/" : `/${href}`);

export default function Header() {
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
        <header
            className="sticky w-full top-0 z-[60] bg-background flex justify-center items-center"
            id="header"
        >
            <EdgeLine side="bottom" />
            <ContentContainer className="relative px-4 py-4">
                <EdgeLine
                    side={["left", "right"]}
                    className="hidden md:block"
                />
                <div className="flex items-center justify-between gap-4">
                    <nav className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => {
                            const isActive = normalize(link.href) === active;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm transition-colors hover:text-primary",
                                        isActive
                                            ? "text-primary font-medium"
                                            : "text-muted-foreground",
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        className="md:hidden text-foreground"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {open ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                    <Link href="#contact" className="block">
                        <Button>Get in touch</Button>
                    </Link>
                </div>
            </ContentContainer>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            aria-hidden="true"
                            className="fixed inset-0 -z-10 bg-background/60 backdrop-blur-sm md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.2 }}
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            id="mobile-nav"
                            className="absolute left-0 right-0 top-full bg-background md:hidden overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.25,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                        >
                            <nav className="flex flex-col py-2">
                                {NAV_LINKS.map((link) => {
                                    const isActive =
                                        normalize(link.href) === active;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                            className={cn(
                                                "text-sm transition-colors hover:text-primary px-4 py-2",
                                                isActive
                                                    ? "text-primary font-medium"
                                                    : "text-muted-foreground",
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                            <EdgeLine side="bottom" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
