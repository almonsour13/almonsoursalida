"use client";

import { useLayoutEffect, useRef, useState } from "react";

const REFERENCE_FONT_SIZE = 100;
interface FitTextProps {
    children: string;
    className?: string;
    minFontSize?: number;
    maxFontSize?: number;
}

export default function FitText({
    children,
    className,
    minFontSize = 32,
    maxFontSize = 500,
}: FitTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const [fontSize, setFontSize] = useState(REFERENCE_FONT_SIZE);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const measure = measureRef.current;
        if (!container || !measure) return;

        const recalc = () => {
            const containerWidth = container.getBoundingClientRect().width;
            const naturalWidth = measure.getBoundingClientRect().width;
            if (naturalWidth === 0 || containerWidth === 0) return;

            const next = (containerWidth / naturalWidth) * REFERENCE_FONT_SIZE;
            setFontSize(Math.min(maxFontSize, Math.max(minFontSize, next)));
        };

        recalc();
        const ro = new ResizeObserver(recalc);
        ro.observe(container);
        return () => ro.disconnect();
    }, [children, minFontSize, maxFontSize]);

    return (
        <div ref={containerRef} className="w-full overflow-hidden">
            <span
                ref={measureRef}
                aria-hidden
                className={className}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: REFERENCE_FONT_SIZE,
                    pointerEvents: "none",
                }}
            >
                {children}
            </span>
            <span
                className={className}
                style={{
                    display: "block",
                    whiteSpace: "nowrap",
                    fontSize,
                    lineHeight: 0.9,
                }}
            >
                {children}
            </span>
        </div>
    );
}
