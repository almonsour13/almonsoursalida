import { projects } from "@/constant/projects";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export type DrawerHandle = {
    open: () => void;
    openWithTitle: (title: string) => void;
    close: () => void;
};

const ProjectDrawer = forwardRef<
    DrawerHandle,
    {
        onClose?: () => void;
    }
>(({ onClose }, ref) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const selectedProject = projects.find((project) => project.title === title);

    useImperativeHandle(ref, () => ({
        open: () => {
            setOpen(true);
            document.body.style.overflow = "hidden";
        },
        close: () => {
            setOpen(false);
            onClose?.();
        },
        openWithTitle: (title: string) => {
            if (!title) return;
            setTitle(title);
            setOpen(true);
            document.body.style.overflow = "hidden";
        },
    }));

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => {
            setTitle("");
            document.body.style.overflow = "";
        }, 300);
    };

    return (
        <>
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
                                className="w-full h-[90vh] bg-background rounded-t-lg px-4 py-8 md:py-12 overflow-y-auto pointer-events-auto"
                            >
                                <div className="max-w-6xl mx-auto h-full flex flex-col gap-4">
                                    <div className="w-full flex justify-between items-center gap-4">
                                        <h1 className="text-2xl font-medium tracking-wide">
                                            Project Details
                                        </h1>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            onClick={handleClose}
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col md:flex-row gap-4 pb-12">
                                            <div className="flex-1 flex flex-col gap-4">
                                                <Card className="relative p-0  aspect-video bg-card rounded-md overflow-hidden">
                                                    <Image
                                                        src={
                                                            selectedProject.image
                                                        }
                                                        alt={
                                                            selectedProject.title
                                                        }
                                                        loading="lazy"
                                                        className="w-full h-full object-cover"
                                                        width={1000}
                                                        height={1000}
                                                    />
                                                </Card>
                                            </div>
                                            <div className="space-y-4 flex-1">
                                                <div className="flex flex-col gap-2">
                                                    <h1 className="text-2xl leading-none font-medium tracking-wide text-foreground">
                                                        {selectedProject.title}
                                                    </h1>
                                                    <p className="text-sm leading-normal text-muted-foreground">
                                                        {
                                                            selectedProject.description
                                                        }
                                                    </p>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <h1 className="text-sm tracking-wide leading-none   text-foreground">
                                                        Technologies Used
                                                    </h1>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedProject.tech.map(
                                                            (
                                                                tech,
                                                                techIndex,
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        techIndex
                                                                    }
                                                                    className="px-3 py-2 bg-card border rounded text-xs font-medium text-foreground hover:border-primary/50 transition-colors"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    <h1 className="text-sm tracking-wide leading-none text-foreground">
                                                        Project Links
                                                    </h1>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedProject.live && (
                                                            <Link
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href={
                                                                    selectedProject.live
                                                                }
                                                            >
                                                                <Button variant="default">
                                                                    <ArrowUpRight className="h-4 w-4" />
                                                                    <span>
                                                                        View
                                                                        Live
                                                                    </span>
                                                                </Button>
                                                            </Link>
                                                        )}
                                                        {selectedProject.github && (
                                                            <Link
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                href={
                                                                    selectedProject.github
                                                                }
                                                            >
                                                                <Button variant="outline">
                                                                    <Github className="h-4 w-4" />
                                                                    <span>
                                                                        Source
                                                                        Code
                                                                    </span>
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
});

export default ProjectDrawer;
