import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function NavMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const sections = [
        { id: "hero", label: "Home" },
        { id: "projects", label: "Projects" },
        { id: "skills", label: "Skills" },
        { id: "services", label: "Services" },
        { id: "contact", label: "Contact" },
    ];

    const radius = 120; // Distance from center
    const startAngle = -90; // Start from top
    const angleStep = 360 / sections.length;

    return (
        <div
            className={`fixed h-96 w-96 ${
                isOpen ? "-top-4 -right-4 md:top-0 md:right-0" : "-top-36 -right-36 md:-top-24 md:-right-24"
            } transition-all duration-500 ease-in-out rounded-full overflow-hidden z-50`}
            // animate={{
            //     top: isOpen ? "0rem" : "-6rem",
            //     right: isOpen ? "0rem" : "-6rem",
            // }}
            // transition={{
            //     duration: 1,
            //     type: "spring",
            //     stiffness: 200,
            //     damping: 25,
            // }}
        >
            <div className="h-full w-full relative">
                {/* Menu Items in Circle */}
                <AnimatePresence>
                    {isOpen &&
                        sections.map((section, index) => {
                            const angle =
                                (startAngle + angleStep * index) *
                                (Math.PI / 180);
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;

                            return (
                                <motion.div
                                    key={section.id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0,
                                        x: 0,
                                        y: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: x,
                                        y: y,
                                    }}
                                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    }}
                                    className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                >
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        className="rounded-full shadow-lg hover:scale-110 transition-transform whitespace-nowrap"
                                        onClick={() => {
                                            document
                                                .getElementById(section.id)
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                });
                                            setIsOpen(false);
                                        }}
                                    >
                                        {section.label}
                                    </Button>
                                </motion.div>
                            );
                        })}
                </AnimatePresence>

                {/* Center Toggle Button */}
                <div className="absolute h-full w-full flex items-center justify-center">
                    <Button
                        size="icon"
                        className="rounded-full shadow-xl relative z-10"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-6 w-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="h-6 w-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                </div>
            </div>
        </div>
    );
}
