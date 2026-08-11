"use client";
import { socials } from "@/constant/social";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FormEvent, ReactNode, useRef, useState } from "react";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

function CornerFrame({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn("relative", className)}>
            <span className="pointer-events-none absolute -top-px -left-px h-2.5 w-2.5 border-l border-t border-primary/60" />
            <span className="pointer-events-none absolute -top-px -right-px h-2.5 w-2.5 border-r border-t border-primary/60" />
            <span className="pointer-events-none absolute -bottom-px -left-px h-2.5 w-2.5 border-l border-b border-primary/60" />
            <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-r border-b border-primary/60" />
            {children}
        </div>
    );
}

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
            visible: true,
        },
        {
            type: "Phone",
            value: "+639569932496",
            icon: Phone,
            visible: true,
        },
        {
            type: "Location",
            value: "Lupo, Davao Oriental, Philippines.",
            icon: MapPin,
            visible: true,
        },
    ];

    return (
        <SectionWrapper id="contact">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-foreground">
                        Get in touch
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground">
                        Ready to bring your ideas to life? {"I'm"} always
                        excited to work on new projects and collaborate with
                        amazing people.
                    </p>
                </div>

                <div className="w-full grid md:grid-cols-5 gap-3">
                    <CornerFrame className="md:col-span-2 border border-border p-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            {contactInfo
                                .filter((c) => c.visible)
                                .map((info, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row items-center gap-3"
                                    >
                                        <div className="flex items-center justify-center h-9 w-9 rounded-md border border-border shrink-0">
                                            <info.icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                {info.type}
                                            </p>
                                            <p className="text-sm text-foreground leading-relaxed truncate">
                                                {info.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="flex flex-col gap-3 border-t border-border pt-4">
                            <p className="text-xs text-muted-foreground">
                                Elsewhere
                            </p>
                            <div className="flex gap-2">
                                {socials.map((social, index) => (
                                    <Link
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                    >
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="rounded-full group"
                                        >
                                            <social.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </CornerFrame>

                    <CornerFrame className="md:col-span-3 border border-border p-6">
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div className="flex flex-col md:flex-row gap-4">
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
                                    <Label>Email Address</Label>{" "}
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
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Message</Label>
                                <Textarea
                                    name="message"
                                    className="min-h-[140px]"
                                    placeholder="Tell me about your project, timeline, and any specific requirements..."
                                    required
                                />
                            </div>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full rounded-full flex items-center justify-center gap-3 px-8 py-4"
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
                    </CornerFrame>
                </div>

                <div className="w-full bg-primary text-primary-foreground p-10 md:p-16 flex flex-col items-center gap-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight max-w-2xl">
                        {"Let's"} build something without boundaries
                    </h2>
                    <p className="opacity-90 max-w-xl">
                        Every great project starts with a conversation — reach
                        out and {"let's"} talk through what {"you're"} building.
                    </p>
                    <Link href="#contact">
                        <Button
                            size="lg"
                            className="rounded-full bg-primary-foreground text-primary hover:opacity-90"
                        >
                            <span>Start a conversation</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </SectionWrapper>
    );
}
