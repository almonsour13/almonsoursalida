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
                    <span className="pointer-events-none absolute -top-px -left-px h-2.5 w-2.5 border-l border-t border-primary/60" />
                    <span className="pointer-events-none absolute -top-px -right-px h-2.5 w-2.5 border-r border-t border-primary/60" />
                    <span className="pointer-events-none absolute -bottom-px -left-px h-2.5 w-2.5 border-l border-b border-primary/60" />
                    <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-r border-b border-primary/60" />
                </>
            )}
            {children}
        </div>
    );
}
