import { cn } from "@/lib/utils";
import DotSprayTexture from "../decorative/dot-spray-texture";
import EdgeLine from "../decorative/edge-line";

function Gutter() {
    return (
        <div className="relative hidden md:block flex-1 self-stretch">
            <DotSprayTexture className="absolute inset-0" />
        </div>
    );
}

function SideEdges({
    className,
    type,
}: {
    className?: string;
    type?: "solid" | "dashed";
}) {
    return (
        <>
            <EdgeLine
                side="left"
                className={cn("z-40", className)}
                type={type}
            />
            <EdgeLine side="right" className={cn("z-40", className)} />
        </>
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
        <div className={cn("flex px-4 relative", className)}>
            <div
                className={cn("absolute inset-0 flex px-4 pointer-events-none")}
            >
                <div className="flex-1 relative">
                    <SideEdges className="hidden md:block " />
                </div>
            </div>
            <Gutter />
            <div className="flex flex-col items-start relative w-full max-w-6xl">
                <SideEdges className="hidden md:block " />
                {children}
            </div>
            <Gutter />
        </div>
    );
}
