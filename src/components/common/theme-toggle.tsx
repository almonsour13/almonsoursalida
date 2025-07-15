"use client";
import { useTheme } from "next-themes";
import { useCallback, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle({ isExpanded }: { isExpanded: boolean }) {
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
                            className={`fixed z-50 top-14 md:top-12 right-4 md:right-36 w-8 h-8 border-2 rounded-full ${
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
                            className="fixed z-40 top-14 md:top-12 right-4 md:right-36 w-8 h-8 border-2 rounded-full bg-foreground"
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
            <motion.button
                onClick={handleThemeToggle}
                className={`fixed ${
                    isExpanded ? "z-20" : "z-50"
                } top-14 lg:top-12 right-4 lg:right-36 cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border border-foregroundd bg-card backdrop-blur-sm`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isThemeTransitioning}
            >
                <motion.div
                    animate={{ rotate: isThemeTransitioning ? 360 : 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Sun className="w-4 h-4 dark:hidden" />
                    <Moon className="w-4 h-4 hidden dark:block" />
                </motion.div>
            </motion.button>
        </>
    );
}
