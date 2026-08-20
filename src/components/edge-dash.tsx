import { cn } from "@/lib/utils";

export default function EdgeDash({
    side,
    dashSize = 16,
    gapSize = 12,
    className,
}: {
    side: "top" | "bottom" | "left" | "right";
    dashSize?: number;
    gapSize?: number;
    className?: string;
}) {
    const isVertical = side === "left" || side === "right";
    const cycle = dashSize + gapSize;

    const gradientDirection = isVertical ? "to_bottom" : "to_right";
    const gradient = `repeating-linear-gradient(${gradientDirection},var(--border)_0,var(--border)_${dashSize}px,transparent_${dashSize}px,transparent_${cycle}px)`;

    return (
        <div
            className={cn(
                "absolute",
                isVertical ? "inset-y-0 w-px" : "inset-x-0 h-px",
                side === "left" && "left-0",
                side === "right" && "right-0",
                side === "top" && "top-0",
                side === "bottom" && "bottom-0",
                className,
            )}
            style={{
                backgroundImage: gradient.replace(/_/g, " "),
            }}
        />
    );
}
