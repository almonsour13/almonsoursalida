"use client";

import { useCursorPosition } from "@/app/hooks/use-cursor-position";

export default function CursorCircle() {
    const { mousePosition, isClicking, isHovering } = useCursorPosition({
        avoidElementId: ["project-image-wrapper","profile-image-wrapper"],
    });
    
    if (isHovering) {
        return null;
    }

    return (
        <>
            {/* Center dot */}
            <div
                className="fixed hidden md:block -z-10 transition-all duration-200 ease-out"
                style={{
                    left: mousePosition.x - 25,
                    top: mousePosition.y - 25,
                }}
            >
                <div
                    className={`absolute top-[24px] left-[24px] rounded-full w-1 h-1 transition-all duration-200 ease-out ${
                        isClicking
                            ? "bg-foreground scale-150 shadow-lg shadow-foreground/50"
                            : "bg-foreground scale-100"
                    }`}
                />
            </div>

            {/* Animated circles */}
            <div
                className={`fixed hidden md:block pointer-events-none z-50 transition-all duration-300 ease-out ${
                    isClicking ? "scale-75" : "scale-100"
                }`}
                style={{
                    left: mousePosition.x - 25,
                    top: mousePosition.y - 25,
                }}
            >
                <svg
                    width="50"
                    height="50"
                    className={`transition-all duration-200 ${
                        isClicking
                            ? "animate-spin stroke-foreground"
                            : "animate-spin-slow stroke-foreground "
                    }`}
                >
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        strokeWidth={isClicking ? "1.5" : "1"}
                        strokeDasharray="10 5"
                        className={`transition-all duration-200 ${
                            isClicking ? "drop-shadow-lg" : ""
                        }`}
                    />
                </svg>
            </div>

            {/* Click ripple effect */}
            {isClicking && (
                <div
                    className="fixed hidden md:block pointer-events-none z-40"
                    style={{
                        left: mousePosition.x - 30,
                        top: mousePosition.y - 30,
                    }}
                >
                    <div className="w-[60px] h-[60px] rounded-full border border-foreground/30 animate-ping" />
                </div>
            )}
        </>
    );
}