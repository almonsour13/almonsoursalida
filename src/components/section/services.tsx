"use client";

import { services } from "@/constant/services";
import { cn } from "@/lib/utils";
import {
    ArrowUpRight,
    LayoutTemplate,
    Lightbulb,
    Sparkles,
    Wrench,
} from "lucide-react";
import Link from "next/link";
import TextAnimate from "../animation/text-animate";
import GridLines from "../decorative/grid-lines";
import ContentContainer from "../layout/content-container";
import { Button } from "../ui/button";

const SOLUTIONS = [
    {
        icon: Lightbulb,
        title: "Build your idea",
        description:
            "Turn your idea into a working website, application, or digital product.",
    },
    {
        icon: Wrench,
        title: "Improve your existing app",
        description:
            "Add features, fix issues, and improve existing projects and systems.",
    },
    {
        icon: LayoutTemplate,
        title: "Create a better experience",
        description:
            "Build clean, responsive interfaces that are simple and easy to use.",
    },
];

const OFFER_WORDS = ["Offer", "Build", "Ship", "Deliver"];
export default function Services() {
    const visibleServices = services.filter((s) => s.visible);

    return (
        <ContentContainer id="services" className="z-50">
            <div className="flex flex-col">
                <div className="relative flex flex-col items-start md:items-center gap-2 pt-16 md:pt-20 pb-8 md:pb-12">
                    <span className="text-xs font-medium text-primary uppercase">
                        [ SERVICES ]
                    </span>

                    <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-foreground items-start md:text-center">
                        What I{" "}
                        <TextAnimate
                            words={OFFER_WORDS}
                            type="fade"
                            className="text-primary"
                            interval={5000}
                        />
                    </h1>

                    <p className="text-sm text-muted-foreground md:text-base items-tart md:text-center">
                        Discover expert-crafted solutions to elevate your
                        digital experience — from front-end finesse to back-end
                        mastery.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="grid md:grid-cols-3 gap-2">
                        <div className="flex flex-col md:col-span-2 border rounded overflow-hidden">
                            {visibleServices.map((service, index) => {
                                const isLast =
                                    index === visibleServices.length - 1;

                                return (
                                    <Link
                                        key={service.title}
                                        href={`?service=${encodeURIComponent(
                                            service.title,
                                        )}#contact`}
                                        className={cn(
                                            "group flex items-start gap-4 p-4 transition-colors hover:bg-muted/40",
                                            isLast
                                                ? ""
                                                : "border-b border-border",
                                        )}
                                    >
                                        <div className="relative size-16 flex flex-shrink-0 items-center justify-center rounded border border-dashed border-border transition-colors group-hover:border-primary/50">
                                            <service.icon
                                                className="h-6 w-6 shrink-0 text-primary"
                                                strokeWidth={1.5}
                                            />
                                        </div>

                                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                                            <h2 className="text-sm font-medium text-foreground md:text-base">
                                                {service.title}
                                            </h2>

                                            <p className="text-xs text-muted-foreground md:text-sm">
                                                {service.description}
                                            </p>
                                        </div>

                                        <ArrowUpRight
                                            size={18}
                                            className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA Section */}
                        <div className="relative flex flex-col justify-between gap-4 bg-primary p-4 rounded overflow-hidden">
                            <GridLines className="z-10" />

                            <div className="relative z-20 flex flex-col gap-4">
                                <Sparkles className="h-6 w-6 text-primary-foreground/90" />

                                <h3 className="text-3xl font-medium leading-tight tracking-tight text-primary-foreground md:text-5xl">
                                    Not sure what you need?
                                </h3>

                                <p className="text-sm leading-relaxed text-primary-foreground/80">
                                    Tell me what {"you're"} building and{" "}
                                    {"I'll"} point you to the right approach —
                                    no obligation, just a conversation.
                                </p>

                                <Link href="#contact" className="z-20">
                                    <Button
                                        className="bg-primary-foreground text-primary hover:bg-primary-foreground/80"
                                        size="lg"
                                    >
                                        Start a conversation
                                        <ArrowUpRight size={14} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className=" grid border md:grid-cols-3 rounded overflow-hidden">
                        {SOLUTIONS.map((solution, i) => {
                            const Icon = solution.icon;

                            return (
                                <div
                                    key={solution.title}
                                    className={cn(
                                        "p-4 flex flex-col gap-2 bg-background",

                                        i > 0 &&
                                            "border-t border-border md:border-t-0 md:border-l",
                                    )}
                                >
                                    <Icon className="h-6 w-6 text-muted-foreground" />

                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-base font-medium text-foreground">
                                            {solution.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {solution.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
}
