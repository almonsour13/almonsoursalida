"use client";

import CornerFrame from "../corner-frame";
import SectionWrapper from "../section-wrapper";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    const date = new Date();

    return (
        <SectionWrapper className="" id="footer">
            <CornerFrame
                className="relative border border-b-0 border-border"
                showBottomLeft={false}
                showBottomRight={false}
            >
                <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 p-4">
                    <span className="text-sm text-muted-foreground">
                        © {date.getFullYear()} Al-Monsour Salida.
                    </span>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded border border-border px-3 py-1">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                            </span>
                            <span className="text-xs text-muted-foreground">
                                Available for projects
                            </span>
                        </div>
                    </div>
                </div>
            </CornerFrame>
        </SectionWrapper>
    );
}
