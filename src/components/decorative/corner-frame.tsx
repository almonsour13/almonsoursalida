import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface CornerFrameProps extends ComponentProps<"div"> {
    hideCorners?: boolean;
    showTopLeft?: boolean;
    showTopRight?: boolean;
    showBottomLeft?: boolean;
    showBottomRight?: boolean;
}

const SIZE = 12;
const DISTANCE = SIZE / 2;

export default function CornerFrame({
    className,
    hideCorners = false,
    showTopLeft = true,
    showTopRight = true,
    showBottomLeft = true,
    showBottomRight = true,
    ...props
}: CornerFrameProps) {
    if (hideCorners) return null;

    const corners = [
        {
            show: showTopLeft,
            style: {
                top: -DISTANCE,
                left: -DISTANCE,
            },
        },
        {
            show: showTopRight,
            style: {
                top: -DISTANCE,
                right: -DISTANCE,
            },
        },
        {
            show: showBottomLeft,
            style: {
                bottom: -DISTANCE,
                left: -DISTANCE,
            },
        },
        {
            show: showBottomRight,
            style: {
                bottom: -DISTANCE,
                right: -DISTANCE,
            },
        },
    ];

    return (
        <>
            {corners.map(
                (corner, index) =>
                    corner.show && (
                        <span
                            key={index}
                            {...props}
                            style={{
                                width: SIZE,
                                height: SIZE,
                                ...corner.style,
                            }}
                            className={cn(
                                "pointer-events-none absolute z-10 border rounded-[2px] border-border bg-background",
                                className,
                            )}
                        />
                    ),
            )}
        </>
    );
}
