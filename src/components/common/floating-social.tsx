"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, X } from "lucide-react";
import { useSection } from "@/context/section-context";
import { socials } from "@/constant/social";
import { Button } from "../ui/button";

export default function FloatingSocials() {
    const [isShowSocialMedia, setIsShowSocialMedia] = useState(false);
    const { activeSection } = useSection();

    useEffect(() => {
        if (activeSection === "hero" || activeSection === "contact") {
            setIsShowSocialMedia(false);
        }
    },[activeSection])
    return (
        <div
            className={`fixed z-30 bottom-4 lg:bottom-12 left-4 lg:left-20 flex flex-col gap-2`}
        >
            <AnimatePresence>
                {isShowSocialMedia && (
                    <motion.div
                        className={`flex flex-col gap-2`}
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
                                target="blank"
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
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="rounded-full"
                                >
                                    <social.icon className="h-4 w-4" />
                                </Button>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <Button
                size="icon"
                variant="outline"
                className={`rounded-full transform transition-all duration-500 ease-in-out ${
                    activeSection === "hero" || activeSection === "contact"
                        ? "translate-y-12 md:translate-y-24"
                        : "translate-y-0"
                }`}
                onClick={() => setIsShowSocialMedia(!isShowSocialMedia)}
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
            </Button>
        </div>
    );
}
