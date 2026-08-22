import { cn } from "@/lib/utils";
import DotGrid from "../decorative/dot-grid";
import EdgeDash from "../decorative/edge-dash";
import ContentContainer from "./content-container";

function Gutter() {
    return (
        <div className="relative hidden md:block flex-1 self-stretch">
            <DotGrid className="absolute inset-0 opacity-80" />
        </div>
    );
}

export default function SectionWrapper({
    children,
    className,
    ...props
}: React.ComponentProps<"section">) {
    return (
        <section
            className={cn("relative flex w-full px-4", className)}
            {...props}
        >
            <div className="absolute inset-0 flex px-4 -z-40 pointer-events-none ">
                <div className="hidden md:block flex-1 relative">
                    <EdgeDash side="left" className="-z-20" />
                    <EdgeDash side="right" className="-z-20" />
                </div>
            </div>
            <Gutter />
            <ContentContainer>{children}</ContentContainer>
            <Gutter />
        </section>
    );
}
