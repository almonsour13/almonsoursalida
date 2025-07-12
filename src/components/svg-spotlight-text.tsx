"use client";
import React, { useRef, useState } from "react";

export default function SvgSpotlightText({
    className = "",
    text = "",
}: Readonly<{
    className?: string;
    text?: string;
}>) {
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
        <svg
            ref={svgRef}
            onMouseMove={handleMouseMove}
            width="100%"
            height="100%"
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            className={`select-none ${className}`}
        >
            <defs>
                <linearGradient
                    id="textGradient"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0%" stopColor="#00f6ff" />
                    <stop offset="100%" stopColor="#9c00ff" />
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

            {/* Background stroke text */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="0.5"
                className="font-[helvetica] font-bold fill-transparent text-7xl"
                stroke="#999"
            >
                {text}
            </text>

            {/* Masked gradient stroke text */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                stroke="url(#textGradient)"
                strokeWidth="0.5"
                mask="url(#textMask)"
                className="font-[helvetica] font-bold fill-transparent text-7xl"
            >
                {text}
            </text>
        </svg>
    );
}
