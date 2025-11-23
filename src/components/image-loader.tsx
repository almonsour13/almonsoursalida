"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ImageLoaderProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean; // Add priority prop
}

export default function ImageLoader({
    src,
    alt,
    className,
    width = 800,
    height = 800,
    priority = false,
}: ImageLoaderProps) {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isImageError, setIsImageError] = useState(false);

    const handleOnLoad = () => {
        setIsImageLoading(false);
        setIsImageError(false);
    };

    const handleOnError = () => {
        setIsImageLoading(false);
        setIsImageError(true);
    };

    return (
        <>
            {isImageLoading && (
                <div
                    className={cn(
                        "w-full h-full relative animate-pulse bg-muted",
                        className
                    )}
                >
                    <div className="absolute inset-0 shimmer" />
                </div>
            )}
            {isImageError && !isImageLoading && (
                <div
                    className={cn(
                        "w-full h-full flex items-center justify-center bg-muted text-muted-foreground",
                        className
                    )}
                >
                    Failed to load image
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoad={handleOnLoad}
                onError={handleOnError}
                priority={priority}
                // loading="lazy"
                className={cn(
                    "w-full h-full transition-opacity duration-300",
                    isImageLoading || isImageError
                        ? "opacity-0"
                        : "opacity-100",
                    className
                )}
            />
        </>
    );
}
