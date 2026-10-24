"use client";

import AvailabilityBadge from "../common/availability-badge";
import EdgeLine from "../decorative/edge-line";
import ContentContainer from "./content-container";

export default function Footer() {
    const date = new Date();

    return (
        // <footer className="relative flex justify-center items-center overflow-hidden">
        <ContentContainer className="relative">
            <div className="flex flex-col md:flex-row items-start md:justify-between gap-4 pb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-base font-medium text-foreground">
                        AM. Salida
                    </span>
                    <p className="text-sm text-muted-foreground">
                        Full-stack developer building web, mobile, and desktop
                        products end to end.
                    </p>
                </div>
                <AvailabilityBadge className="flex" />
            </div>
            <div className="relative flex flex-col-reverse md:flex-row items-start md:items-center gap-2 py-4">
                <EdgeLine side="top" />
                <span className="text-sm text-muted-foreground">
                    © {date.getFullYear()} Al-Monsour Salida. All rights
                    reserved.
                </span>
            </div>
        </ContentContainer>
        // </footer>
    );
}
