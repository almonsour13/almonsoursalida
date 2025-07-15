"use client";

import { motion } from "framer-motion";

export default function Loading() {

    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden animate-pulse">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="max-w-2xl w-full px-6 text-center space-y-12">
                {/* Editorial Header */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-center gap-4">
                        <motion.div 
                            className="w-12 h-0.5 bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: 48 }}
                            transition={{ duration: 1,
                                repeat: Infinity,
                                repeatType: "mirror",
                                repeatDelay: 0.5,}}
                        />
                        <span className="text-xs font-medium tracking-widest uppercase text-primary">
                            Portfolio Loading
                        </span>
                        <motion.div 
                            className="w-12 h-0.5 bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: 48 }}
                            transition={{ duration: 1, 
                                repeat: Infinity,
                                repeatType: "mirror",
                                repeatDelay: 0.5,}}
                        />
                    </div>

                    {/* Main Name */}
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.h1 
                            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-none uppercase"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <motion.span 
                                className="block"
                                initial={{ opacity: 0, x: 0 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                Al-Monsour
                            </motion.span>
                            <motion.span 
                                className="block"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 1.0 }}
                            >
                                Salida
                            </motion.span>
                        </motion.h1>
                        
                        <motion.p 
                            className="text-xs text-muted-foreground uppercase tracking-wide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            Web Developer
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Editorial Footer */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-0.5 bg-primary/30"></div>
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">
                            Est. 2025
                        </span>
                        <div className="w-6 h-0.5 bg-primary/30"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}