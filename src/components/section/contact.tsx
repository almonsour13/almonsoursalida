"use client";
import { contact_info } from "@/constant/contact-info";
import { socials } from "@/constant/social";
import { cn } from "@/lib/utils";
import {
    Clock,
    Code,
    Database,
    MessageCircle,
    PanelsTopLeft,
    PenTool,
    Server,
    ShieldCheck,
    Workflow,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import CornerFrame from "../corner-frame";
import DotGrid from "../dot-grid";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { motion } from "framer-motion";
const CONTACT_NOTES = [
    {
        icon: Clock,
        title: "Usually quick",
        description: "Most messages get a reply within a day, often sooner.",
    },
    {
        icon: MessageCircle,
        title: "No auto-replies",
        description: "I read every message myself, no filters or bots.",
    },
    {
        icon: ShieldCheck,
        title: "No spam, ever",
        description: "Your details are only ever used to get back to you.",
    },
];
const FLOATING_ICONS = [
    {
        icon: Database,
        className: "top-[10%] left-[4%] hidden md:flex",
        rotate: -12,
        duration: 4.5,
        delay: 0,
    },
    {
        icon: Code,
        className: "top-[40%] left-[12%] hidden lg:flex",
        rotate: 10,
        duration: 5,
        delay: 0.6,
    },
    {
        icon: Server,
        className: "bottom-[10%] left-[8%] hidden md:flex",
        rotate: 8,
        duration: 4,
        delay: 1.1,
    },
    {
        icon: PenTool,
        className: "top-10 right-[8%] hidden md:flex",
        rotate: 14,
        duration: 4.2,
        delay: 0.3,
    },
    {
        icon: Workflow,
        className: "bottom-[40%] right-[16%] hidden lg:flex",
        rotate: -10,
        duration: 5.2,
        delay: 0.9,
    },
    {
        icon: PanelsTopLeft,
        className: "bottom-[10%] right-[4%] hidden lg:flex",
        rotate: -10,
        duration: 5.2,
        delay: 0.9,
    },
];
export default function Contact() {
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [subject, setSubject] = useState("");

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const service = searchParams.get("service");

        if (service) {
            setSubject(service);
        }
    }, [searchParams]);

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

    return (
        <SectionWrapper id="contact">
            <CornerFrame className="relative border border-border rounded-md">
                <div className="p-4">
                    <span className="text-primary text-xs font-medium">
                        [ GET IN TOUCH ]
                    </span>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-2">
                        {"Let's"} work together
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-xl">
                        Ready to bring your ideas to life? {"I'm"} always
                        excited to work on new projects and collaborate with
                        amazing people.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 border-t border-border">
                    <div className="md:col-span-2 md:border-r border-border p-4">
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div className="flex flex-col md:flex-row gap-3">
                                <div className="flex-1 space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                        type="text"
                                        name="fullName"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Label>Email Address</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <Input
                                    type="text"
                                    name="subject"
                                    placeholder="Project inquiry, collaboration, or general question"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Message</Label>
                                <Textarea
                                    name="message"
                                    className="min-h-[120px]"
                                    placeholder="Tell me about your project, timeline, and any specific requirements..."
                                    required
                                />
                            </div>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full flex items-center justify-center gap-3"
                                size="lg"
                            >
                                <span>
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Message"}
                                </span>
                            </Button>
                            {status === "success" && (
                                <p className="text-sm text-emerald-600">
                                    Message sent — {"I'll"} get back to you
                                    soon.
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-sm text-red-600">
                                    Please fill out all fields correctly or try
                                    again.
                                </p>
                            )}
                        </form>
                    </div>

                    <div className="flex flex-col border-t md:border-t-0">
                        {contact_info.map((info, i) => (
                            <Link
                                key={info.type}
                                href={info.href}
                                target={
                                    info.type === "Location"
                                        ? "_blank"
                                        : undefined
                                }
                                className={cn(
                                    "group flex items-center gap-3 p-4 transition-colors hover:bg-muted/40",
                                    i !== contact_info.length - 1 &&
                                        "border-b border-border",
                                )}
                            >
                                <info.icon className="w-5 h-5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                                <div className="flex flex-col min-w-0">
                                    <p className="text-xs text-muted-foreground">
                                        {info.type}
                                    </p>
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {info.value}
                                    </p>
                                </div>
                            </Link>
                        ))}

                        <div className="flex h-full border-t">
                            {socials.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    className={cn(
                                        "flex flex-1 h-fu justify-center items-center hover:bg-muted/40",
                                        index !== socials.length - 1 &&
                                            "border-r border-border",
                                    )}
                                >
                                    <social.icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid border-t border-border md:grid-cols-3">
                    {CONTACT_NOTES.map((note, index) => (
                        <div
                            key={note.title}
                            className={cn(
                                "p-4",
                                index > 0 &&
                                    "border-t border-border md:border-t-0 md:border-l",
                            )}
                        >
                            <note.icon className="mb-2 h-5 w-5 text-muted-foreground" />

                            <h3 className="mb-1 text-sm font-medium text-foreground">
                                {note.title}
                            </h3>

                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {note.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="w-full relative bg-primary text-primary-foreground p-4 py-16 md:py-20 flex flex-col items-center gap-4 text-center">
                    <DotGrid className="opacity-100 z-10" />
                    {FLOATING_ICONS.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`absolute h-16 w-16 items-center justify-center rounded-lg border border-border border-dashed bg-primary-foreground/10 ${item.className}`}
                            initial={{ rotate: item.rotate }}
                            animate={{
                                y: [0, -14, 0],
                                rotate: [
                                    item.rotate,
                                    item.rotate + 4,
                                    item.rotate,
                                ],
                            }}
                            transition={{
                                duration: item.duration,
                                delay: item.delay,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <item.icon className="h-6 w-6 text-primary-foreground/80" />
                        </motion.div>
                    ))}
                    <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight max-w-2xl">
                        {"Let's"} build something without boundaries
                    </h2>
                    <p className="opacity-90 max-w-xl">
                        Every great project starts with a conversation — reach
                        out and {"let's"} talk through what {"you're"} building.
                    </p>
                </div>
            </CornerFrame>
        </SectionWrapper>
    );
}
