"use client";

import Link from "next/link";
import EdgeDash from "../decorative/edge-dash";
import ContentContainer from "./content-container";

export default function Footer() {
    const date = new Date();

    return (
        <footer className="relative px-4 flex justify-center items-center">
            <EdgeDash side="top" />
            <ContentContainer>
                <div className="flex flex-col md:flex-row items-start justify-between gap-2 px-4 md:px-0 py-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-foreground">
                            AM. Salida
                        </span>
                        <p className="text-xs text-muted-foreground">
                            Full-stack developer building web, mobile, and
                            desktop products end to end.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded border border-border px-4 py-2 shrink-0">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                        <span className="text-xs text-foreground">
                            Available for projects
                        </span>
                    </div>
                </div>

                <div className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-3 px-4 md:px-0 py-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                        © {date.getFullYear()} Al-Monsour Salida. All rights
                        reserved.
                    </span>
                    <span className="text-xs text-muted-foreground">
                        Design inspired by{" "}
                        <Link
                            href="https://www.cloudflare.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
                        >
                            Cloudflare
                        </Link>
                    </span>
                </div>
            </ContentContainer>
        </footer>
    );
}
