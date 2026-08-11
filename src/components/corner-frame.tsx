import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function CornerFrame({
    className,
    children,
    hideCorners = false,
}: {
    className?: string;
    children: ReactNode;
    hideCorners?: boolean;
}) {
    return (
        <div className={cn("relative", className)}>
            {!hideCorners && (
                <>
                    <span className="pointer-events-none absolute -top-1 -left-1 h-2 w-2 border border-border bg-background" />
                    <span className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 border border-border bg-background" />
                    <span className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 border border-border bg-background" />
                    <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 border border-border bg-background" />
                </>
            )}
            {children}
        </div>
    );
}
