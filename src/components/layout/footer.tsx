"use client";

import Link from "next/link";
import AvailabilityBadge from "../common/availability-badge";
import EdgeLine from "../decorative/edge-line";
import FitText from "../common/fit-text";
import ContentContainer from "./content-container";

export default function Footer() {
    const date = new Date();

    return (
        <footer className="relative flex justify-center items-center overflow-hidden">
            <EdgeLine side="top" />
            <ContentContainer className="relative px-4">
                <EdgeLine
                    side={["left", "right"]}
                    className="hidden md:block"
                />
                <div className="flex flex-col md:flex-row items-start md:justify-between gap-4 py-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-base font-medium text-foreground">
                            AM. Salida
                        </span>
                        <p className="text-sm text-muted-foreground">
                            Full-stack developer building web, mobile, and
                            desktop products end to end.
                        </p>
                    </div>
                    <AvailabilityBadge className="flex" />
                </div>
                <div className="relative flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2 py-4">
                    <EdgeLine side="top" />
                    <span className="text-sm text-muted-foreground">
                        © {date.getFullYear()} Al-Monsour Salida. All rights
                        reserved.
                    </span>
                    <span className="text-sm text-muted-foreground">
                        Design inspired by{" "}
                        <Link
                            href="https://www.cloudflare.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
                        >
                            Cloudflare
                        </Link>
                    </span>
                </div>
                <div className="hidden -mx-2 md:-mx-4 pt-8 pb-0 flex items-center justify-center">
                    <FitText className="font-medium tracking-tight text-primary uppercase">
                        AM. SAlida
                    </FitText>
                </div>
            </ContentContainer>
        </footer>
    );
}

