"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone, Send, User } from "lucide-react";
import SectionWrapper from "../section-wrapper";

export default function Contact() {
    return (
        <SectionWrapper
            id="contact"
            className="relative py-16"
        >
            <div className="md:max-w-6xl w-full  min-h-screen">
                {/* Magazine Header */}
                <div className="mb-16 relative">
                    <div className="flex items-center gap-8 mb-8">
                        <div className="w-16 h-0.5 bg-primary"></div>
                        <span className="text-sm font-medium tracking-widest uppercase text-primary">
                            Contact
                        </span>
                        <div className="flex-1 h-0.5 bg-border"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 items-end">
                        <div className="md:col-span-2">
                            <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight text-foreground mb-6 leading-none">
                                Get in touch 
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                Ready to bring your ideas to life? {"I'm"} always excited to work on new projects and collaborate with amazing people.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="text-right">
                                <div className="text-6xl font-light text-primary/20">
                                    24
                                </div>
                                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                                    Hours Response
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Information - Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-8 h-0.5 bg-primary"></div>
                                <span className="text-sm font-medium text-primary uppercase tracking-wide">
                                    Contact Info
                                </span>
                            </div>
                            
                            <div className="space-y-6">
                                {/* Email */}
                                <motion.div 
                                    className="group flex items-start gap-4 p-4 rounded-2xl border hover:border-primary/20 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Email</p>
                                        <p className="text-foreground font-medium">almonsoursalida@gmail.com</p>
                                    </div>
                                </motion.div>

                                {/* Phone */}
                                <motion.div 
                                    className="group flex items-start gap-4 p-4 rounded-2xl border hover:border-primary/20 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Phone</p>
                                        <p className="text-foreground font-medium">+639569932496</p>
                                    </div>
                                </motion.div>

                                {/* Location */}
                                <motion.div 
                                    className="group flex items-start gap-4 p-4 rounded-2xl border hover:border-primary/20 transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Location</p>
                                        <p className="text-foreground font-medium">Lupon, Davao Oriental, Philippines</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Quote Section */}
                        <motion.div
                            className="bg-card rounded-3xl p-8 border border-primary/20 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="absolute top-4 right-4 text-4xl text-primary/20">
                                {`"`}
                            </div>
                            <p className="text-lg text-foreground mb-4 italic">
                                {`"Let's create something amazing together. Every great project starts with a conversation."`}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Al-Monsour Salida</p>
                                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form - Right Column */}
                    <div className="lg:col-span-3">
                        <motion.div
                            className="border rounded-3xl overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {/* Form Header */}
                            <div className="bg-card p-6 border-b">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                    <h3 className="text-xl font-semibold text-foreground">Send a Message</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Fill out the form below and {"I'll"} get back to you within 24 hours.
                                </p>
                            </div>

                            {/* Form Content */}
                            <div className="p-6 md:p-8">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                className={cn(
                                                    "w-full px-4 py-3 rounded-xl border bg-card",
                                                    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                                                    "transition-all duration-300 placeholder:text-muted-foreground/50"
                                                )}
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className={cn(
                                                    "w-full px-4 py-3 rounded-xl border bg-card",
                                                    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                                                    "transition-all duration-300 placeholder:text-muted-foreground/50"
                                                )}
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            className={cn(
                                                "w-full px-4 py-3 rounded-xl border bg-card",
                                                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                                                "transition-all duration-300 placeholder:text-muted-foreground/50"
                                            )}
                                            placeholder="Project inquiry, collaboration, or general question"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">
                                            Message
                                        </label>
                                        <textarea
                                            className={cn(
                                                "w-full px-4 py-3 rounded-xl border bg-card min-h-[140px] resize-none",
                                                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                                                "transition-all duration-300 placeholder:text-muted-foreground/50"
                                            )}
                                            placeholder="Tell me about your project, timeline, and any specific requirements..."
                                        />
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className={cn(
                                            "group w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl",
                                            "bg-primary text-primary-foreground font-medium",
                                            "hover:bg-primary/90 transition-all duration-300",
                                            "shadow-lg hover:shadow-xl"
                                        )}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        <span>Send Message</span>
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Magazine Footer */}
                <div className="mt-16 pt-8">
                    <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                            Prefer a different way to connect? Find me on social media or send a direct email.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-0.5 bg-primary"></div>
                            <span className="text-sm font-medium text-primary">{"Let's"} build something great together</span>
                            <div className="w-12 h-0.5 bg-primary"></div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}