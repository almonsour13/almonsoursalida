"use client";

import { cn } from "@/lib/utils";
import EdgeLine from "../decorative/edge-line";
import ContentContainer from "./content-container";

type EdgeSide = "top" | "bottom" | "left" | "right";

interface SectionLabelProps {
    /** The label text — automatically wrapped in "[ ]" and uppercased, matching the site's convention. */
    label: string;
    className?: string;
    /** Side(s) to render an EdgeLine divider on. Pass one, an array for multiple, or omit for none. */
    side?: EdgeSide | EdgeSide[];
}

export default function SectionLabel({
    label,
    className,
    side,
}: SectionLabelProps) {
    const sides = side ? (Array.isArray(side) ? side : [side]) : [];

    return (
        <div className="w-full relative flex justify-center items-center">
            <ContentContainer className={cn("relative py-8 flex", className)}>
                <div className="px-4 md:border-l-3 border-primary flex items-center">
                    <span className="text-xs font-medium text-primary uppercase">
                        [ {label} ]
                    </span>
                </div>
                <EdgeLine
                    side={["left", "right"]}
                    className="hidden md:block"
                />
            </ContentContainer>
            <EdgeLine side={sides} className="hsidden md:block" />
        </div>
    );
}
