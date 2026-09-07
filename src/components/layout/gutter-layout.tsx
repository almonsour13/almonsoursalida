import { cn } from "@/lib/utils";
import DotSprayTexture from "../decorative/dot-spray-texture";
import EdgeLine from "../decorative/edge-line";
import ContentContainer from "./content-container";

function Gutter() {
    return (
        <div className="relative hidden md:block flex-1 self-stretch z-10">
            <DotSprayTexture className="absolute inset-0" />
        </div>
    );
}

export function GutterLayout({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("flex relative", className)}>
            <Gutter />
            <ContentContainer className="w-full relative flex flex-col max-w-6xl p-4">
                <EdgeLine
                    className="hidden md:block z-20"
                    side={["left", "right"]}
                />
                {children}
            </ContentContainer>
            <Gutter />
        </div>
    );
}
