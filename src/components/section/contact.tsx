"use client";
import { socials } from "@/constant/social";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import ImageLoader from "../image-loader";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const formRef = useRef<HTMLFormElement>(null);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("idle");

        const form = formRef.current;
        if (!form) return;

        const formData = new FormData(form);
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        if (!fullName || !email || !subject || !message) {
            setStatus("error");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({ fullName, email, subject, message }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to send");

            setStatus("success");
            form.reset();
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            type: "Email",
            value: "almonsoursalida@gmail.com",
            icon: Mail,
        },
        {
            type: "Phone",
            value: "+639569932496",
            icon: Phone,
        },
        {
            type: "Location",
            value: "Lupon, Davao Oriental, Philippines",
            icon: MapPin,
        },
    ];

    return (
        <SectionWrapper id="contact" className="relative py-16">
            <div className="md:max-w-6xl w-full min-h-screen">
                <div className="w-full space-y-4 md:space-y-8">
                    <div className="flex items-center gap-4 md:gap-8 ">
                        <div className="w-8 md:w-16 h-0.5 bg-border"></div>
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
                            Contact
                        </span>
                        <div className="flex-1 h-0.5 bg-border"></div>
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="flex-1 space-y-4">
                            <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-primary leading-none">
                                Get in touch
                            </h1>
                            <p className="md:max-w-3xl text-sm md:text-base mb-6 text-muted-foreground">
                                Ready to bring your ideas to life? {"I'm"}{" "}
                                always excited to work on new projects and
                                collaborate with amazing people.
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
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-8 h-0.5 bg-vorder"></div>
                            <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">
                                Contact Info
                            </span>
                        </div>

                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.type} // <- KEY ADDED
                                    className="group bg-card flex items-start gap-4 p-4 rounded-md border hover:border-primary/20 transition-all duration-300"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }} // keep only whileInView for scroll animation
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.15,
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <info.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                                            {info.type}
                                        </p>
                                        <p className="text-foreground font-medium">
                                            {info.value}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quote Section */}
                        <motion.div
                            className="bg-card rounded-md p-8 border border-primary/20 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div className="absolute top-4 right-4 text-4xl text-primary/20">
                                {`"`}
                            </div>
                            <p className="text-lg text-foreground mb-4 italic">
                                {`"Let's create something amazing together. Every great project starts with a conversation."`}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <ImageLoader
                                        src="/image/profile.JPG"
                                        alt="Al-Monsour M. Salida"
                                        className="h-full w-full object-cover"
                                        width={800}
                                        height={800}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">
                                        Al-Monsour Salida
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Web Developer
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form - Right Column */}
                    <div className="lg:col-span-3">
                        <motion.div
                            className="border  bg-card rounded-md overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            {/* Form Header */}
                            <div className="bg-card p-6 border-b">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-6 h-6 text-primary" />
                                    <h3 className="text-xl font-semibold text-foreground">
                                        Send a Message
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Fill out the form below and {"I'll"} get
                                    back to you within 24 hours.
                                </p>
                            </div>

                            {/* Form Content */}
                            <div className="p-6 md:p-8">
                                <form
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                className={cn(
                                                    "w-full px-4 py-3 rounded border bg-background",
                                                    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                                                    "transition-all duration-300 placeholder:text-muted-foreground/50"
                                                )}
                                                placeholder="Your full name"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-foreground">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className={cn(
                                                    "w-full px-4 py-3 rounded border bg-background",
                                                    "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                                                    "transition-all duration-300 placeholder:text-muted-foreground/50"
                                                )}
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            className={cn(
                                                "w-full px-4 py-3 rounded border bg-background",
                                                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                                                "transition-all duration-300 placeholder:text-muted-foreground/50"
                                            )}
                                            placeholder="Project inquiry, collaboration, or general question"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            className={cn(
                                                "w-full px-4 py-3 rounded border bg-background   min-h-[140px] resize-none",
                                                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                                                "transition-all duration-300 placeholder:text-muted-foreground/50"
                                            )}
                                            placeholder="Tell me about your project, timeline, and any specific requirements..."
                                            required
                                        />
                                    </div>
                                    <Button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-3 px-8 py-4"
                                        size="lg"
                                    >
                                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        <span>
                                            {isSubmitting
                                                ? "Sending..."
                                                : "Send Message"}
                                        </span>
                                    </Button>
                                    {status === "success" && (
                                        <p className="text-green-600 text-sm mt-2">
                                            Message sent successfully!
                                        </p>
                                    )}
                                    {status === "error" && (
                                        <p className="text-red-600 text-sm mt-2">
                                            Please fill out all fields correctly
                                            or try again.
                                        </p>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="mt-16 pt-8"
                >
                    <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                            Prefer a different way to connect? Find me on social
                            media or send a direct email.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex gap-3">
                                {socials.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link}
                                        target="blank"
                                    >
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="rounded-full"
                                        >
                                            <social.icon className="h-4 w-4" />
                                        </Button>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
