"use client";
import React, { useRef, useState } from "react";

export default function GridLines2() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [coords, setCoords] = useState({ x: 50, y: 50 }); // percentages

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        const bounds = svgRef.current?.getBoundingClientRect();
        if (!bounds) return;

        const xPercent = ((e.clientX - bounds.left) / bounds.width) * 100;
        const yPercent = ((e.clientY - bounds.top) / bounds.height) * 100;

        setCoords({ x: xPercent, y: yPercent });
    };
    return (
        <div className="absolute -z-0 inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -z-10 inset-0 bg-radial from-transparent via-background/40  to-black" />
            <svg
                ref={svgRef}
                onMouseMove={handleMouseMove}
                className="absolute -z-20 inset-0 w-full h-full pointer-events-auto"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="textGradient"
                        gradientUnits="userSpaceOnUse"
                    >
                        {/* <stop offset="0%" stopColor="#00f6ff" />
                        <stop offset="100%" stopColor="#9c00ff" /> */}
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>

                    <radialGradient
                        id="revealMask"
                        gradientUnits="userSpaceOnUse"
                        r="20%"
                        cx={`${coords.x}%`}
                        cy={`${coords.y}%`}
                    >
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="black" />
                    </radialGradient>

                    <mask id="textMask">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="url(#revealMask)"
                        />
                    </mask>
                </defs>

                {/* Base grid lines (always visible, dim) */}
                <g
                    stroke="rgba(237, 237, 237, 0.2)"
                    strokeWidth="0.2"
                    className=""
                >
                    {Array.from({ length: 20 }).map((_, i) => (
                        <line
                            key={`vertical-base-${i}`}
                            x1={i * 100}
                            y1="0"
                            x2={i * 100}
                            y2="100%"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                    {Array.from({ length: 15 }).map((_, i) => (
                        <line
                            key={`horizontal-base-${i}`}
                            x1="0"
                            y1={i * 80}
                            x2="100%"
                            y2={i * 80}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </g>

                {/* Highlighted grid lines (visible through mask) */}
                <g
                    stroke="url(#textGradient)"
                    strokeWidth="1"
                    mask="url(#textMask)"
                    className="opacity-80 animate-pulse"
                    style={{ filter: "drop-shadow(0 0 4px rgba(0, 246, 255, 0.3))" }}
                >
                    {Array.from({ length: 20 }).map((_, i) => (
                        <line
                            key={`vertical-highlight-${i}`}
                            x1={i * 100}
                            y1="0"
                            x2={i * 100}
                            y2="100%"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                    {Array.from({ length: 15 }).map((_, i) => (
                        <line
                            key={`horizontal-highlight-${i}`}
                            x1="0"
                            y1={i * 80}
                            x2="100%"
                            y2={i * 80}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
