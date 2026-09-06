import { cn } from "@/lib/utils";

type Side = "top" | "bottom" | "left" | "right";

interface EdgeLineProps {
    side: Side | Side[];
    type?: "solid" | "dashed";
    dashSize?: number;
    gapSize?: number;
    thickness?: number;
    className?: string;
}

function SingleEdgeLine({
    side,
    type,
    dashSize,
    gapSize,
    thickness,
    className,
}: {
    side: Side;
    type: "solid" | "dashed";
    dashSize: number;
    gapSize: number;
    thickness: number;
    className?: string;
}) {
    const isVertical = side === "left" || side === "right";
    const length = 1000;

    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute overflow-visible text-border",
                isVertical
                    ? "inset-y-0 h-full w-[1px]"
                    : "inset-x-0 h-[1px] w-full",
                side === "top" && "top-0",
                side === "bottom" && "bottom-0",
                side === "left" && "left-0",
                side === "right" && "right-0",
                className,
            )}
            preserveAspectRatio="none"
            viewBox={`0 0 ${isVertical ? 1 : length} ${
                isVertical ? length : 1
            }`}
        >
            <line
                x1={isVertical ? 0.5 : 0}
                y1={isVertical ? 0 : 0.5}
                x2={isVertical ? 0.5 : length}
                y2={isVertical ? length : 0.5}
                pathLength={length}
                vectorEffect="non-scaling-stroke"
                stroke="currentColor"
                strokeWidth={thickness}
                strokeDasharray={
                    type === "dashed" ? `${dashSize} ${gapSize}` : undefined
                }
                strokeLinecap="butt"
            />
        </svg>
    );
}

/**
 * Renders a thin edge line on one side of its nearest positioned
 * ancestor, or on several at once.
 *
 * Usage:
 *   <EdgeLine side="bottom" />
 *   <EdgeLine side={["top", "bottom"]} />
 *   <EdgeLine side={["top", "left", "right"]} type="dashed" />
 */
export default function EdgeLine({
    side,
    type = "solid",
    dashSize = 12,
    gapSize = 8,
    thickness = 0.8,
    className,
}: EdgeLineProps) {
    const sides = Array.isArray(side) ? side : [side];

    return (
        <>
            {sides.map((s) => (
                <SingleEdgeLine
                    key={s}
                    side={s}
                    type={type}
                    dashSize={dashSize}
                    gapSize={gapSize}
                    thickness={thickness}
                    className={className}
                />
            ))}
        </>
    );
}
