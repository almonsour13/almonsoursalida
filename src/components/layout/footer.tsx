import SectionWrapper from "../section-wrapper";

export default function Footer() {
    const date = new Date();
    return (
        <SectionWrapper className="">
            <div className="py-8 border-t flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span>© {date.getFullYear()} Al-Monsour Salida.</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-xs">Available for projects</span>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
