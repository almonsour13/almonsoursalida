"use client";

import { useState, useEffect } from "react";

export default function CursorCircle() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [isHoveringImageContent, setIsHoveringImageContent] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            const element = document.elementFromPoint(e.clientX, e.clientY);
            if (element && element.closest(".image-content")) {
                setIsHoveringImageContent(true);
            } else {
                setIsHoveringImageContent(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    // ⛔ If hovering over an image-content element, render nothing
    if (isHoveringImageContent)
        return (
            <div
                className="fixed pointer-events-none z-50 h-20 w-20 rounded-full flex items-center justify-center transition-all duration-300 ease-out text-background text-xs backdrop-invert  bg-foreground/80  border border-foreground"
                style={{
                    left: mousePosition.x - 40,
                    top: mousePosition.y - 40,
                }}
            >
                View
            </div>
        );

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
