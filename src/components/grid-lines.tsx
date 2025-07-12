"use client";

export default function GridLines() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute z-0 inset-0 bg-radial from-transparent via-background/80  to-background" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full -z-20 pointer-events-auto stroke-muted-foreground/30"
            >
                <defs>
                    <pattern
                        id="gridPattern"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            fill="none"
                            strokeWidth="0.5"
                            d="M0 0v40M0 0h40"
                        />
                    </pattern>
                </defs>

                {/* Base Grid */}
                <rect width="100%" height="100%" fill="url(#gridPattern)" />
            </svg>
        </div>
    );
}
