"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Project } from "@/type/type";
import { ArrowUpRight, Github, X } from "lucide-react";
import Image from "next/image";

export default function ProjectModal({
    project,
    children,
}: {
    project: Project;
    children?: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    // Close modal on escape key press
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [open]);

    // Close modal when clicking outside
    const handleBackdropClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    return (
        <>
            {/* Trigger button */}
            <div onClick={() => setOpen(true)} className="group cursor-pointer image-content relative flex items-center justify-center flex-1 p-4 h-80 aspect-video max-w-lg rounded-md overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border">
                {children}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{
                                duration: 0.4,
                                type: "spring",
                                damping: 25,
                            }}
                            className="relative max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-background border border-border rounded-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}

                            <div className="p-6 md:p-8">
                                {/* Modal Header */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-8 md:w-16 h-0.5 bg-primary"></div>
                                        <span className="text-sm font-medium tracking-widest uppercase text-primary">
                                            Project Details
                                        </span>
                                        <div className="flex-1 h-0.5 bg-border"></div>
                                        <button
                                            onClick={() => setOpen(false)}
                                            className="cursor-pointer w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-card transition-colors flex items-center justify-center"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground leading-none">
                                        {project.title}
                                    </h1>
                                </div>

                                {/* Modal Content */}
                                <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                                    {/* Project Image */}
                                    <div className="relative">
                                        <div className="relative aspect-video rounded-md overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                                width={1000}
                                                height={1000}
                                            />
                                        </div>

                                        {/* Additional images could go here */}
                                        <div className="grid-cols-3 gap-4 mt-4 hidden">
                                            {/* Placeholder for additional project images */}
                                            {[1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className="aspect-video rounded bg-gradient-to-br from-primary/5 to-primary/10 border border-dashed border-border flex items-center justify-center"
                                                >
                                                    <div className="text-xs text-muted-foreground text-center">
                                                        Additional
                                                        <br />
                                                        Image {i}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="flex flex-col gap-6">
                                        {/* Project Description */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-3">
                                                About This Project
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Tech Stack */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-3">
                                                Technologies Used
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map(
                                                    (tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="px-3 py-2 bg-card border rounded text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
                                                        >
                                                            {tech}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        {/* Project Links */}
                                        <div className="flex gap-3">
                                            {project.live && (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={project.live}
                                                    className={cn(
                                                        "flex items-center gap-2 px-4 py-2 rounded",
                                                        "bg-foreground text-primary-foreground font-medium text-sm",
                                                        "hover:bg-primary/90 transition-all duration-300",
                                                        "border border-primary"
                                                    )}
                                                >
                                                    <ArrowUpRight className="h-4 w-4" />
                                                    <span>View Live</span>
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={project.github}
                                                    className={cn(
                                                        "flex items-center gap-2 px-4 py-2 rounded",
                                                        "bg-card border text-foreground font-medium text-sm",
                                                        "hover:border-primary/50 transition-all duration-300"
                                                    )}
                                                >
                                                    <Github className="h-4 w-4" />
                                                    <span>Source Code</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
