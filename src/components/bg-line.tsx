"use client";

import { ReactNode, useEffect, useState } from "react";

interface AnimatedSeparatorProps {
    variant?: "default" | "reverse" | "pulse" | "wave";
    height?: number;
    className?: string;
    children:ReactNode
}

export default function BgLine({
    variant = "default",
    height = 120,
    className = "",
    children
}: AnimatedSeparatorProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);
    const getAnimationDelay = (index: number) => {
        switch (variant) {
            case "reverse":
                return `${(3 - index) * 0.5}s`;
            case "pulse":
                return `${index * 0.3}s`;
            default:
                return `${index * 0.5}s`;
        }
    };
    return (
        <div
            className={`relative w-full overflow-hidden ${className}`}
            style={{ height: `${height}px` }}
        >
            {children}
            <svg
                className="absolute -z-0 inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <defs>
                    {/* Primary gradient */}
                    <linearGradient
                        id="separatorGradient1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#ffffff"
                            stopOpacity="0.8"
                        />
                        <stop
                            offset="25%"
                            stopColor="#gray-400"
                            stopOpacity="0.6"
                        />
                        <stop
                            offset="50%"
                            stopColor="#ffffff"
                            stopOpacity="0.8"
                        />
                        <stop
                            offset="75%"
                            stopColor="#gray-300"
                            stopOpacity="0.6"
                        />
                        <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity="0.8"
                        />
                    </linearGradient>

                    {/* Secondary gradient */}
                    <linearGradient
                        id="separatorGradient2"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="0%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#ffffff"
                            stopOpacity="0.4"
                        />
                        <stop
                            offset="50%"
                            stopColor="#gray-400"
                            stopOpacity="0.2"
                        />
                        <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity="0.4"
                        />
                    </linearGradient>

                    {/* Pulse gradient */}
                    <linearGradient
                        id="separatorGradient3"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop
                            offset="0%"
                            stopColor="#gray-500"
                            stopOpacity="0.6"
                        />
                        <stop
                            offset="50%"
                            stopColor="#ffffff"
                            stopOpacity="0.8"
                        />
                        <stop
                            offset="100%"
                            stopColor="#gray-500"
                            stopOpacity="0.6"
                        />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter
                        id="separatorGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Main flowing line */}
                <path
                    d="M-100,60 Q200,20 400,60 T800,60 Q1000,20 1300,60"
                    stroke="url(#separatorGradient1)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#separatorGlow)"
                    className={`transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ animationDelay: getAnimationDelay(0) }}
                >
                    <animate
                        attributeName="d"
                        values="M-100,60 Q200,20 400,60 T800,60 Q1000,20 1300,60;M-100,40 Q200,80 400,40 T800,40 Q1000,80 1300,40;M-100,60 Q200,20 400,60 T800,60 Q1000,20 1300,60"
                        dur={variant === "pulse" ? "4s" : "8s"}
                        repeatCount="indefinite"
                    />
                </path>

                <rect
                    width="100%"
                    height="100%"
                    fill="url(#separatorGrid)"
                    className={`transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                />
            </svg>
        </div>
    );
}
