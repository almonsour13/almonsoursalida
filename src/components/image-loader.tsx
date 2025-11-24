"use client";

import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageLoaderProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
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
    const [retryCount, setRetryCount] = useState(0);
    const [imageKey, setImageKey] = useState(0);

    const MAX_RETRIES = 2;

    const handleOnLoad = () => {
        setIsImageLoading(false);
        setIsImageError(false);
    };

    const handleOnError = () => {
        setIsImageLoading(false);

        // Max retries reached
        setIsImageError(true);
    };

    const handleManualRetry = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setRetryCount(0);
        setImageKey((prev) => prev + 1);
        setIsImageLoading(true);
        setIsImageError(false);
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
                    {retryCount > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">
                                Retrying... ({retryCount}/{MAX_RETRIES})
                            </span>
                        </div>
                    )}
                </div>
            )}
            {isImageError && !isImageLoading && (
                <div
                    className={cn(
                        "w-full h-full flex flex-col items-center justify-center gap-3 bg-muted text-muted-foreground",
                        className
                    )}
                >
                    <button
                        onClick={handleManualRetry}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs bg-background border rounded hover:bg-accent transition-colors"
                    >
                        <RotateCw className="w-3 h-3" />
                        Try Again
                    </button>
                </div>
            )}
            <Image
                key={imageKey} // Force remount on retry
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoad={handleOnLoad}
                onError={handleOnError}
                priority={priority}
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
