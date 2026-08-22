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
    ...props
}: {
    className?: string;
    children: ReactNode;
    hideCorners?: boolean;
    showTopLeft?: boolean;
    showTopRight?: boolean;
    showBottomLeft?: boolean;
    showBottomRight?: boolean;
} & React.ComponentProps<"div">) {
    return (
        <div className={cn("relative rounded", className)} {...props}>
            {/* {!hideCorners && (
                <>
                    {showTopLeft && (
                        <span className="pointer-events-none absolute -top-1 -left-1 z-10 h-2 w-2 border border-border bg-background" />
                    )}

                    {showTopRight && (
                        <span className="pointer-events-none absolute -top-1 -right-1 z-10 h-2 w-2 border border-border bg-background" />
                    )}

                    {showBottomLeft && (
                        <span className="pointer-events-none absolute -bottom-1 -left-1 z-10 h-2 w-2 border border-border bg-background" />
                    )}

                    {showBottomRight && (
                        <span className="pointer-events-none absolute -bottom-1 -right-1 z-10 h-2 w-2 border border-border bg-background" />
                    )}
                </>
            )} */}

            {children}
        </div>
    );
}
