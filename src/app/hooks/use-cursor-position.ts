"use client";

import { useEffect, useState } from "react";

interface CursorPositionProps {
    targetElementId?: string[];
    avoidElementId?: string[];
}

export const useCursorPosition = ({ targetElementId, avoidElementId }: CursorPositionProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            const element = document.elementFromPoint(e.clientX, e.clientY);
            const isOverAvoided = avoidElementId?.some(id => 
                element?.closest(`#${id}`) !== null
            ) ?? false;
            
             if (!targetElementId || targetElementId.length === 0) {
                setIsHovering(isOverAvoided);
                return;
            }
            
            if (isOverAvoided) {
                setIsHovering(false);
                return;
            }
            
            const isOverTarget = targetElementId.some(id => 
                element?.closest(`#${id}`) !== null
            );
            
            setIsHovering(isOverTarget);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [targetElementId, avoidElementId]);
    
    return { mousePosition, isClicking, isHovering };
};