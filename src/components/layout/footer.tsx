"use client";

import EdgeDash from "../edge-dash";
import SectionWrapper from "../section-wrapper";

export default function Footer() {
    const date = new Date();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <SectionWrapper className="relative flex justify-center items-center">
            <EdgeDash side="top" />
            <div className="">
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

                    <div className="flex items-center gap-2 rounded border border-border px-3 py-1.5 shrink-0">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                        <span className="text-xs text-foreground">
                            Available for projects
                        </span>
                    </div>
                </div>

                <div className="relative flex flex-col-reverse md:flex-row items-start md:items-center justify-center gap-3 px-4 md:px-0 py-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                        © {date.getFullYear()} Al-Monsour Salida. All rights
                        reserved.
                    </span>
                </div>
            </div>
        </SectionWrapper>
    );
}
