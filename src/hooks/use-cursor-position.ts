"use client";

import { useEffect, useState } from "react";

interface CursorPositionProps {
    targetElementId?: string[];
    avoidElementId?: string[];
    enableTouch?: boolean;
}

export const useCursorPosition = ({
    targetElementId,
    avoidElementId,
    enableTouch = false,
}: CursorPositionProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            const element = document.elementFromPoint(e.clientX, e.clientY);
            const isOverAvoided =
                avoidElementId?.some(
                    (id) => element?.closest(`#${id}`) !== null,
                ) ?? false;

            if (!targetElementId || targetElementId.length === 0) {
                setIsHovering(isOverAvoided);
                return;
            }

            if (isOverAvoided) {
                setIsHovering(false);
                return;
            }

            const isOverTarget = targetElementId.some(
                (id) => element?.closest(`#${id}`) !== null,
            );

            setIsHovering(isOverTarget);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;

            setMousePosition({ x: touch.clientX, y: touch.clientY });

            const element = document.elementFromPoint(
                touch.clientX,
                touch.clientY,
            );
            const isOverAvoided =
                avoidElementId?.some(
                    (id) => element?.closest(`#${id}`) !== null,
                ) ?? false;

            if (!targetElementId || targetElementId.length === 0) {
                setIsHovering(isOverAvoided);
                return;
            }

            if (isOverAvoided) {
                setIsHovering(false);
                return;
            }

            const isOverTarget = targetElementId.some(
                (id) => element?.closest(`#${id}`) !== null,
            );

            setIsHovering(isOverTarget);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            if (!touch) return;
            setIsClicking(true);
            setMousePosition({ x: touch.clientX, y: touch.clientY });
        };

        const handleTouchEnd = () => {
            setIsClicking(false);
            setIsHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        if (enableTouch) {
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchstart", handleTouchStart);
            window.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);

            if (enableTouch) {
                window.removeEventListener("touchmove", handleTouchMove);
                window.removeEventListener("touchstart", handleTouchStart);
                window.removeEventListener("touchend", handleTouchEnd);
            }
        };
    }, [targetElementId, avoidElementId, enableTouch]);

    return { mousePosition, isClicking, isHovering };
};
