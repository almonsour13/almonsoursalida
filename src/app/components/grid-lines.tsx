"use client";
import React, { useRef, useState } from "react";

export default function GridLines() {
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
        <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
            <div className="absolute z-10 inset-0 bg-radial from-transparent via-black/20  to-black" />
            <svg
                ref={svgRef}
                onMouseMove={handleMouseMove}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full -z-20 pointer-events-auto"
            >
                <defs>
                    {/* <radialGradient
                        id="revealMask"
                        gradientUnits="userSpaceOnUse"
                        r="200"
                        cx={`${coords.x}%`}
                        cy={`${coords.y}%`}
                    >
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#ffffff" />
                    </radialGradient> */}

                    <pattern
                        id="gridPattern"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                        // patternTransform="rotate(135)scale(1)"
                    >
                        <path
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="0.5"
                            d="M0 0v40M0 0h40"
                        />
                    </pattern>
                </defs>

                {/* Base Grid */}
                <rect width="100%" height="100%" fill="url(#gridPattern)" />

                {/* Highlighted Grid Overlay with Mask */}
                <g mask="url(#mouseMask)">
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#gridPattern)"
                        style={{
                            stroke: "white",
                            strokeWidth: 1,
                            mixBlendMode: "lighten",
                        }}
                    />
                </g>

                {/* Define mask using the radial gradient */}
                <mask id="mouseMask">
                    <rect width="100%" height="100%" fill="black" />
                    <circle
                        cx={`${coords.x}%`}
                        cy={`${coords.y}%`}
                        r="150"
                        fill="url(#revealMask)"
                    />
                </mask>
            </svg>
        </div>
    );
}
