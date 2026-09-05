"use client";
import { contact_info } from "@/constant/contact-info";
import { socials } from "@/constant/social";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import TextAnimate from "../animation/text-animate";
import ContentContainer from "../layout/content-container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const HEADLINE_WORDS = [" work ", " build ", " create ", " start "];
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
        <ContentContainer id="contact" className="z-50">
            <div className="relative pb-8 md:pb-16 flex flex-col">
                <div className="relative flex flex-col items-start md:items-center gap-2 pt-16 md:pt-20 pb-8 md:pb-12">
                    <span className="text-primary text-xs font-medium uppercase">
                        [ GET IN TOUCH ]
                    </span>
                    <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-foreground items-start md:text-center capitalize">
                        {"Let's "}
                        <TextAnimate
                            words={HEADLINE_WORDS}
                            type="blur"
                            className="text-primary"
                            interval={5000}
                        />{" "}
                        together
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base items-tart md:text-center">
                        Ready to bring your ideas to life? {"I'm"} always
                        excited to work on new projects and collaborate with
                        amazing people.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-2">
                    <div className="flex flex-col md:col-span-2 gap-2">
                        <div className="border rounded overflow-hidden">
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
                                    <info.icon className="w-5 h-5 text-primary shrink-0 group-hover:text-primary transition-colors" />
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
                        </div>

                        <div className="flex flex-col items-start gap-2 md:px-4">
                            <p className="text-xs text-muted-foreground">
                                Elsewhere
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {socials.map((social, index) => (
                                    <Link
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                    >
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="group"
                                        >
                                            <social.icon className="h-4 w-4 text-primary transition-colors" />
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3 h-full">
                        <div className="p-4 border rounded overflow-hidden h-full bg-background">
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="space-y-4 h-full flex flex-col"
                            >
                                <div className="space-y-2 border-b border-border pb-4">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                        <h3 className="text-lg font-medium  tracking-wide  text-foreground">
                                            Send a Message
                                        </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Fill out the form below and {"I'll"} get
                                        back to you as soon as possible.
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className="flex-1 space-y-2">
                                        <Label>Full Name</Label>
                                        <Input
                                            className="h-10"
                                            type="text"
                                            name="fullName"
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label>Email Address</Label>
                                        <Input
                                            className="h-10"
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
                                        className="h-10"
                                        type="text"
                                        name="subject"
                                        placeholder="Project inquiry, collaboration, or general question"
                                        value={subject}
                                        onChange={(e) =>
                                            setSubject(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2 flex-1 flex flex-col">
                                    <Label>Message</Label>
                                    <Textarea
                                        name="message"
                                        className="min-h-[120px] flex-1"
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
                                    <p className="text-sm text-primary">
                                        Message sent — {"I'll"} get back to you
                                        soon.
                                    </p>
                                )}
                                {status === "error" && (
                                    <p className="text-sm text-destructive">
                                        Please fill out all fields correctly or
                                        try again.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
