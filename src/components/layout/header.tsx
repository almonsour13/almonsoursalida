"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CornerFrame from "../corner-frame";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <SectionWrapper className="sticky top-0 z-20 bg-background" id="header">
            <CornerFrame
                className="relative border border-t-0 border-border"
                showTopLeft={false}
                showTopRight={false}
            >
                <div className="flex items-center justify-between gap-4 p-4">
                    <nav className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        <Link href="#contact">
                            <Button size="sm" className="rounded-full">
                                {"Let's"} talk
                            </Button>
                        </Link>
                    </div>

                    <button
                        className="md:hidden text-foreground"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {open ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {open && (
                    <div className="md:hidden border-t border-border flex flex-col p-4 gap-4">
                        <nav className="flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <Link href="#contact" onClick={() => setOpen(false)}>
                            <Button size="sm" className="rounded-full w-full">
                                {"Let's"} talk
                            </Button>
                        </Link>
                    </div>
                )}
            </CornerFrame>
        </SectionWrapper>
    );
}
