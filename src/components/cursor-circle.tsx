"use client";

import { useCursorPosition } from "@/hooks/use-cursor-position";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { useEffect, useState } from "react";

const BOX_SIZE = 40;
const RIPPLE_SIZE = 60;
const CLICKABLE_RING_SIZE = 60;

// Selector for anything that should trigger the "clickable" pop-up.
// Add/remove selectors here if your buttons/links use different markup.
const CLICKABLE_SELECTOR =
    'a, button, [role="button"], input[type="submit"], summary';

export default function CursorCircle() {
    const { mousePosition, isClicking, isHovering } = useCursorPosition({
        avoidElementId: ["project-image-wrapper", "profile-image-wrapper"],
    });

    const x = useMotionValue(mousePosition.x);
    const y = useMotionValue(mousePosition.y);
    const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        x.set(mousePosition.x);
        y.set(mousePosition.y);
    }, [mousePosition.x, mousePosition.y, x, y]);

    // Tracks whether the cursor is currently over a link/button, independent
    // of the avoidElementId hide logic above.
    const [isOverClickable, setIsOverClickable] = useState(false);

    useEffect(() => {
        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            setIsOverClickable(!!target?.closest(CLICKABLE_SELECTOR));
        };

        document.addEventListener("mouseover", handleOver);
        return () => document.removeEventListener("mouseover", handleOver);
    }, []);

    return (
        <AnimatePresence>
            {!isHovering && (
                <motion.div
                    className="fixed hidden md:block top-0 left-0 pointer-events-none z-50 mix-blend-difference"
                    style={{ x: springX, y: springY }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <motion.span
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                        animate={
                            isClicking
                                ? {
                                      width: 6,
                                      height: 6,
                                      boxShadow:
                                          "0 0 10px 2px rgba(255,255,255,0.8)",
                                  }
                                : isOverClickable
                                  ? {
                                        width: 0,
                                        height: 0,
                                        boxShadow: "0 0 0px 0px transparent",
                                    }
                                  : {
                                        width: [3, 4, 3],
                                        height: [3, 4, 3],
                                        boxShadow: "0 0 0px 0px transparent",
                                    }
                        }
                        transition={
                            isClicking
                                ? { duration: 0.2, ease: "easeOut" }
                                : isOverClickable
                                  ? { duration: 0.15, ease: "easeOut" }
                                  : {
                                        duration: 1.6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }
                        }
                    />

                    <motion.div
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                            top: 0,
                            left: 0,
                            width: BOX_SIZE,
                            height: BOX_SIZE,
                        }}
                        animate={{
                            scale: isClicking ? 0.65 : isOverClickable ? 0 : 1,
                            rotate: isClicking ? 45 : 0,
                            opacity: isOverClickable ? 0 : 1,
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <span className="absolute -top-px -left-px h-2.5 w-2.5 border-l border-t border-white" />
                        <span className="absolute -top-px -right-px h-2.5 w-2.5 border-r border-t border-white" />
                        <span className="absolute -bottom-px -left-px h-2.5 w-2.5 border-l border-b border-white" />
                        <span className="absolute -bottom-px -right-px h-2.5 w-2.5 border-r border-b border-white" />
                    </motion.div>

                    {/* Pop-up ring + label shown while hovering a link/button */}
                    <AnimatePresence>
                        {isOverClickable && !isClicking && (
                            <motion.div
                                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                                style={{
                                    top: 0,
                                    left: 0,
                                    width: CLICKABLE_RING_SIZE,
                                    height: CLICKABLE_RING_SIZE,
                                }}
                                initial={{ opacity: 0, scale: 0.3 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.3 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 420,
                                    damping: 20,
                                }}
                            >
                                <span className="absolute inset-0 rounded-full border border-white bg-white/10" />
                                <div className="relative flex flex-col items-center gap-0.5">
                                    <MousePointerClick className="h-6 w-6 text-white" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isClicking && (
                            <motion.span
                                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
                                style={{
                                    top: 0,
                                    left: 0,
                                    width: RIPPLE_SIZE,
                                    height: RIPPLE_SIZE,
                                }}
                                initial={{ opacity: 0.6, scale: 0.4 }}
                                animate={{ opacity: 0, scale: 1.4 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
