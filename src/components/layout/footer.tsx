import SectionWrapper from "../section-wrapper";

export default function Footer() {
    const date = new Date();
    return (
        <SectionWrapper>
            <div className="py-8 border-t border-border flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span>© {date.getFullYear()} Al-Monsour Salida.</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    <span className="text-xs">Available for projects</span>
                </div>
            </div>
        </SectionWrapper>
    );
}
