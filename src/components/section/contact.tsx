"use client";
import { socials } from "@/constant/social";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

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
    ];

    return (
        <SectionWrapper id="contact">
            <div className="flex flex-col items-center gap-4">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-2xl font-medium leading-none tracking-wide text-foreground">
                        Get in touch
                    </h1>
                    <p className="md:max-w-3xl text-sm md:text-base text-muted-foreground">
                        Ready to bring your ideas to life? {"I'm"} always
                        excited to work on new projects and collaborate with
                        amazing people.
                    </p>
                </div>
                <div className="flex flex-col-reverse md:flex-row gap-2">
                    <div className="flex-2 space-y-2">
                        <div className="space-y-2">
                            {contactInfo.map((info, index) => (
                                <Card key={index}>
                                    <div className="flex flexr-row gap-4">
                                        <Card className="flex-shrink-0 w-12 h-12 p-0 flex items-center justify-center">
                                            <info.icon className="w-5 h-5 text-primary" />
                                        </Card>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                {info.type}
                                            </p>
                                            <p className="text-foreground font-medium">
                                                {info.value}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card>
                            <p className="text-base text-foreground italic">
                                {`"Let's create something amazing together. Every great project starts with a conversation."`}
                            </p>
                        </Card>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-sm text-muted-foreground">
                                Social Links
                            </h1>
                            <div className="flex gap-2">
                                {socials.map((social, index) => (
                                    <Link
                                        key={index}
                                        href={social.link}
                                        target="blank"
                                    >
                                        <Button size="icon" variant="outline">
                                            <social.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Card className="flex-3">
                        <div className="border-b flex flex-col gap-2 pb-4">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-6 h-6 text-primary" />
                                <h3 className="text-lg font-medium  tracking-wide  text-foreground">
                                    Send a Message
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Fill out the form below and {"I'll"} get back to
                                you as soon as possible.
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div className="flex flex-col md:flex-row gap-2">
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
                                        Please fill out all fields correctly or
                                        try again.
                                    </p>
                                )}
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </SectionWrapper>
    );
}
