"use client";
import { useTheme } from "next-themes";
import { useCallback, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);

    const handleThemeToggle = useCallback(() => {
        if (isThemeTransitioning) return;

        setIsThemeTransitioning(true);

        setTimeout(() => {
            setTheme(theme === "dark" ? "light" : "dark");
        }, 200);

        setTimeout(() => {
            setIsThemeTransitioning(false);
        }, 1000);
    }, [theme, setTheme, isThemeTransitioning]);

    return (
        <>
            <AnimatePresence>
                {isThemeTransitioning && (
                    <>
                        <motion.div
                            className={`fixed z-50 h-8 w-8 md:h-12 md:w-12 mt-10 md:mt-16 border-2 rounded-full ${
                                theme === "dark"
                                    ? "border-white/20"
                                    : "border-gray-900/20"
                            }`}
                            initial={{
                                scale: 1,
                                opacity: 0.6,
                            }}
                            animate={{
                                scale: 20,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 1.2,
                                delay: 0.1,
                                ease: "easeOut",
                            }}
                            style={{
                                transformOrigin: "center",
                            }}
                        />
                        <motion.div
                            className="fixed z-50 h-8 w-8 md:h-12 md:w-12 mt-10 md:mt-16 border-2 rounded-full bg-foreground"
                            initial={{
                                scale: 1,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 500,
                                opacity: 1,
                            }}
                            exit={{
                                scale: 1,
                                // opacity:0
                            }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.1,
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
            <Button
                onClick={handleThemeToggle}
                disabled={isThemeTransitioning}
                variant="outline"
                size="icon"
                className="rounded-full z-40"
            >
                <motion.div
                    animate={{ rotate: isThemeTransitioning ? 360 : 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Sun className="w-4 h-4 dark:hidden" />
                    <Moon className="w-4 h-4 hidden dark:block" />
                </motion.div>
            </Button>
        </>
    );
}
