"use client";

import { useObserveSection } from "@/hooks/use-observe-section";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EdgeDash from "../decorative/edge-dash";
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

    const renderLinks = (onLinkClick?: () => void) =>
        NAV_LINKS.map((link) => {
            const isActive = normalize(link.href) === active;
            return (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={onLinkClick}
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
        });

    return (
        <header
            className="sticky w-full px-4 py-4  top-0 z-50 bg-background flex justify-center items-center"
            id="header"
        >
            <EdgeDash side="bottom" />
            <ContentContainer>
                <div className="flex items-center justify-between gap-4">
                    <nav className="hidden md:flex items-center gap-6">
                        {renderLinks()}
                    </nav>

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
                    <Link href="#contact" className="block">
                        <Button>Get in touch</Button>
                    </Link>
                </div>

                {open && (
                    <div className="md:hidden border-t border-border flex flex-col p-4 gap-4">
                        <nav className="flex flex-col gap-3">
                            {renderLinks(() => setOpen(false))}
                        </nav>
                    </div>
                )}
            </ContentContainer>
        </header>
    );
}
