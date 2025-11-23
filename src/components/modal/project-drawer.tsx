"use client";

import { projects } from "@/constant/projects";
import { useProject } from "@/context/project-context";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useEffect, useState } from "react";
import ImageLoader from "../image-loader";

export default function ProjectDrawer() {
    const [open, setOpen] = useState(false);
    const { selectedProjectTitle, setSelectedProjectTitle } = useProject();

    const selectedProject = projects.find(
        (project) => project.title === selectedProjectTitle
    );
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (
            !selectedProject ||
            !selectedProject.images ||
            selectedProject.images.length <= 1
        )
            return;

        const interval = setInterval(() => {
            setCurrentImageIndex(
                (prev) => (prev + 1) % selectedProject.images.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedProject]);

    useEffect(() => {
        if (selectedProjectTitle !== "" && selectedProject !== null) {
            setOpen(true);
            document.body.style.overflow = "hidden";
        } else {
            setOpen(false);
        }
    }, [selectedProjectTitle, selectedProject]);

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setSelectedProjectTitle("");
            document.body.style.overflow = "";
        }, 300);
    };

    useEffect(() => {
        if (selectedProjectTitle === "") {
            setCurrentImageIndex(0);
        }
    }, [selectedProjectTitle]);

    return (
        <AnimatePresence>
            {open && selectedProject && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed w-full h-full top-0 left-0 bg-black/50 z-[99]"
                        onClick={handleClose}
                    />
                    <div className="fixed w-full h-screen top-0 left-0 flex items-end z-[100] pointer-events-none">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{
                                duration: 0.4,
                                damping: 30,
                                stiffness: 300,
                            }}
                            className="w-full h-[90vh] bg-background rounded-t-3xl px-4 py-8 md:py-12 overflow-y-auto pointer-events-auto"
                        >
                            <div className="max-w-6xl mx-auto h-full flex flex-col gap-8">
                                {/* Header */}
                                <div className="space-y-4 flex-shrink-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 md:w-16 h-0.5 bg-border"></div>
                                        <span className="text-sm font-medium tracking-widest uppercase text-primary">
                                            Project Details
                                        </span>
                                        <div className="flex-1 h-0.5 bg-border"></div>
                                        <button
                                            onClick={handleClose}
                                            className="cursor-pointer w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-card transition-colors flex items-center justify-center"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground leading-none">
                                        {selectedProject.title}
                                    </h1>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-12">
                                    {/* Images Section */}
                                    <div className="space-y-4 flex-2">
                                        <div className="relative aspect-video bg-card rounded-md overflow-hidden">
                                            <ImageLoader
                                                src={
                                                    selectedProject.images[
                                                        currentImageIndex
                                                    ]
                                                }
                                                alt={selectedProject.title}
                                                className="w-full h-full object-cover"
                                                width={1000}
                                                height={1000}
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                            {selectedProject.images.length >
                                                1 &&
                                                selectedProject.images.map(
                                                    (img, imgIndex) => (
                                                        <div
                                                            key={imgIndex}
                                                            className={`rounded aspect-video overflow-hidden bg-card hover:opacity-80 transition-colors cursor-pointer ${
                                                                imgIndex ===
                                                                    currentImageIndex &&
                                                                "ring-4   ring-primary"
                                                            }`}
                                                            onClick={() =>
                                                                setCurrentImageIndex(
                                                                    imgIndex
                                                                )
                                                            }
                                                        >
                                                            <ImageLoader
                                                                src={img}
                                                                alt={
                                                                    selectedProject.title
                                                                }
                                                                className="w-full h-full object-cover"
                                                                width={1000}
                                                                height={1000}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg font-semibold text-foreground">
                                                About This Project
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {selectedProject.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-lg font-semibold text-foreground">
                                                Technologies Used
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tech.map(
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

                                        <div className="flex flex-wrap gap-3 pt-2">
                                            {selectedProject.live && (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={selectedProject.live}
                                                    className={cn(
                                                        "flex items-center gap-2 px-4 py-2 rounded",
                                                        "bg-foreground text-primary-foreground font-medium text-sm",
                                                        "hover:bg-foreground/90 transition-all duration-300",
                                                        "border border-foreground"
                                                    )}
                                                >
                                                    <ArrowUpRight className="h-4 w-4" />
                                                    <span>View Live</span>
                                                </a>
                                            )}
                                            {selectedProject.github && (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={
                                                        selectedProject.github
                                                    }
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
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
