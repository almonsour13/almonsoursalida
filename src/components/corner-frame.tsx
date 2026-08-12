import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function CornerFrame({
    className,
    children,
    hideCorners = false,
    showTopLeft = true,
    showTopRight = true,
    showBottomLeft = true,
    showBottomRight = true,
}: {
    className?: string;
    children: ReactNode;
    hideCorners?: boolean;
    showTopLeft?: boolean;
    showTopRight?: boolean;
    showBottomLeft?: boolean;
    showBottomRight?: boolean;
}) {
    return (
        <div className={cn("relative", className)}>
            {!hideCorners && (
                <>
                    {showTopLeft && (
                        <span className="z-10 pointer-events-none absolute -top-1 -left-1 h-2 w-2 border border-border bg-background" />
                    )}
                    {showTopRight && (
                        <span className="z-10 pointer-events-none absolute -top-1 -right-1 h-2 w-2 border border-border bg-background" />
                    )}
                    {showBottomLeft && (
                        <span className="z-10 pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border border-border bg-background" />
                    )}
                    {showBottomRight && (
                        <span className="z-10 pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border border-border bg-background" />
                    )}
                </>
            )}
            {children}
        </div>
    );
}
