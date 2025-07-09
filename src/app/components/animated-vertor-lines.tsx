"use client";

import { useEffect, useState } from "react";

interface AnimatedSeparatorProps {
    variant?: "default" | "reverse" | "pulse" | "wave";
    height?: number;
    className?: string;
}

export default function AnimatedSeparator({
    variant = "default",
    height = 120,
    className = "",
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
            <svg
                className="absolute inset-0 w-full h-full"
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

                {/* Secondary flowing line */}
                <path
                    d="M-50,80 Q150,40 350,80 T750,80 Q950,40 1250,80"
                    stroke="url(#separatorGradient2)"
                    strokeWidth="1.5"
                    fill="none"
                    className={`transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ animationDelay: getAnimationDelay(1) }}
                >
                    <animate
                        attributeName="d"
                        values="M-50,80 Q150,40 350,80 T750,80 Q950,40 1250,80;M-50,100 Q150,60 350,100 T750,100 Q950,60 1250,100;M-50,80 Q150,40 350,80 T750,80 Q950,40 1250,80"
                        dur={variant === "wave" ? "12s" : "10s"}
                        repeatCount="indefinite"
                    />
                </path>

                {/* Tertiary accent line */}
                <path
                    d="M0,40 Q300,10 600,40 T1200,40"
                    stroke="url(#separatorGradient3)"
                    strokeWidth="1"
                    fill="none"
                    className={`transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ animationDelay: getAnimationDelay(2) }}
                >
                    <animate
                        attributeName="d"
                        values="M0,40 Q300,10 600,40 T1200,40;M0,20 Q300,50 600,20 T1200,20;M0,40 Q300,10 600,40 T1200,40"
                        dur="6s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Particle dots */}
                <g
                    className={`transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <circle cx="200" cy="60" r="2" fill="#ffffff" opacity="0.8">
                        <animate
                            attributeName="cy"
                            values="60;20;60"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.8;0.3;0.8"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle
                        cx="400"
                        cy="60"
                        r="1.5"
                        fill="#gray-400"
                        opacity="0.6"
                    >
                        <animate
                            attributeName="cy"
                            values="60;100;60"
                            dur="5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.6;0.2;0.6"
                            dur="5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle
                        cx="600"
                        cy="60"
                        r="2.5"
                        fill="#ffffff"
                        opacity="0.7"
                    >
                        <animate
                            attributeName="cy"
                            values="60;30;60"
                            dur="3.5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.7;0.4;0.7"
                            dur="3.5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle
                        cx="800"
                        cy="60"
                        r="1.8"
                        fill="#gray-300"
                        opacity="0.5"
                    >
                        <animate
                            attributeName="cy"
                            values="60;90;60"
                            dur="4.5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.5;0.1;0.5"
                            dur="4.5s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle
                        cx="1000"
                        cy="60"
                        r="2.2"
                        fill="#ffffff"
                        opacity="0.6"
                    >
                        <animate
                            attributeName="cy"
                            values="60;15;60"
                            dur="6s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.6;0.3;0.6"
                            dur="6s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>

                {/* Connection lines between particles */}
                <g
                    className={`transition-opacity duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ animationDelay: getAnimationDelay(3) }}
                >
                    <line
                        x1="200"
                        y1="60"
                        x2="400"
                        y2="60"
                        stroke="rgba(34, 211, 238, 0.2)"
                        strokeWidth="0.5"
                    >
                        <animate
                            attributeName="stroke-opacity"
                            values="0.2;0.6;0.2"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </line>
                    <line
                        x1="400"
                        y1="60"
                        x2="600"
                        y2="60"
                        stroke="rgba(168, 85, 247, 0.2)"
                        strokeWidth="0.5"
                    >
                        <animate
                            attributeName="stroke-opacity"
                            values="0.2;0.6;0.2"
                            dur="3.5s"
                            repeatCount="indefinite"
                        />
                    </line>
                    <line
                        x1="600"
                        y1="60"
                        x2="800"
                        y2="60"
                        stroke="rgba(16, 185, 129, 0.2)"
                        strokeWidth="0.5"
                    >
                        <animate
                            attributeName="stroke-opacity"
                            values="0.2;0.6;0.2"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </line>
                    <line
                        x1="800"
                        y1="60"
                        x2="1000"
                        y2="60"
                        stroke="rgba(245, 158, 11, 0.2)"
                        strokeWidth="0.5"
                    >
                        <animate
                            attributeName="stroke-opacity"
                            values="0.2;0.6;0.2"
                            dur="4.5s"
                            repeatCount="indefinite"
                        />
                    </line>
                </g>

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
