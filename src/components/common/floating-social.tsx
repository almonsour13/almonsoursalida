"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, X } from "lucide-react";
import { useSection } from "@/context/section-context";
import { socials } from "@/constant/social";

export default function FloatingSocials() {
    const [isShowSocialMedia, setIsShowSocialMedia] = useState(false);
    const { activeSection } = useSection();

    return (
        <div className="fixed z-50 bottom-4 lg:bottom-12 left-4 lg:left-46 flex flex-col gap-2">
            <AnimatePresence>
                {isShowSocialMedia && (
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.2,
                            ease: "easeOut",
                        }}
                    >
                        {socials.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.link}
                                className="flex items-center justify-center h-8 w-8 py-1 bg-card border rounded-full text-xs md:text-sm"
                                initial={{ opacity: 0, scale: 0, y: 32 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0, y: 32 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeOut",
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25,
                                    delay: index * 0.08,
                                }}
                                whileHover={{
                                    scale: 1.15,
                                    rotate: 8,
                                    transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <social.icon className="h-4 w-4" />
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsShowSocialMedia(!isShowSocialMedia)}
                className={`cursor-pointer flex items-center justify-center w-8 h-8 p-2 rounded-full border bg-card backdrop-blur-sm
          transform transition duration-500 ease-in-out  
          ${
              activeSection === "hero" || activeSection === "contact"
                  ? "translate-y-12 md:translate-y-24"
                  : "translate-y-0"
          }
        `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isShowSocialMedia ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isShowSocialMedia ? "close" : "open"}
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isShowSocialMedia ? (
                            <X className="w-4 h-4" />
                        ) : (
                            <User className="w-4 h-4" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
