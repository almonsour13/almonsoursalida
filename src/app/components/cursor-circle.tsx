"use client";

import { useState, useEffect } from "react";

export default function CursorCircle() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    return (
        <>
            <div
                className="fixed hidden md:block"
                style={{
                    left: mousePosition.x - 25,
                    top: mousePosition.y - 25,
                }}
            >
                <div className="absolute top-[24px] left-[24px] rounded-full w-1 h-1 bg-white"/>
            </div>
            <div
                className="fixed hidden md:block pointer-events-none z-50 transition-all duration-300 ease-out"
                style={{
                    left: mousePosition.x - 25,
                    top: mousePosition.y - 25,
                }}
            >
                <svg width="50" height="50" className="animate-spin-slow">
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth="1"
                        strokeDasharray="10 5"
                        className="animate-pulse"
                    />
                    <circle
                        cx="25"
                        cy="25"
                        r="15"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="0.5"
                        strokeDasharray="5 3"
                        className="animate-reverse-spin"
                    />
                </svg>
            </div>
        </>
    );
}
