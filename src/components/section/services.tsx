"use client";

import { services } from "@/constant/services";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import CornerFrame from "../corner-frame";
import DotGrid from "../dot-grid";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";

export default function Services() {
    const visibleServices = services.filter((s) => s.visible);

    return (
        <SectionWrapper id="services">
            <CornerFrame className="relative border border-border rounded-md">
                <div className="p-4">
                    <span className="text-primary text-xs font-medium">
                        [ WHAT I OFFER ]
                    </span>
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-2">
                        What I Offer
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-xl">
                        Discover expert-crafted solutions to elevate your
                        digital experience — from front-end finesse to back-end
                        mastery.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 border-t border-border">
                    <div className="md:col-span-2 flex flex-col md:border-r border-border">
                        {visibleServices.map((service, index) => {
                            const isLast = index === visibleServices.length - 1;
                            return (
                                <Link
                                    key={service.title}
                                    href={`?service=${encodeURIComponent(service.title)}#contact`}
                                    className={`group flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors ${
                                        isLast ? "" : "border-b border-border"
                                    }`}
                                >
                                    <service.icon
                                        className="w-6 h-6 text-primary shrink-0"
                                        strokeWidth={1.5}
                                    />
                                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                        <h2 className="text-sm md:text-base font-medium text-foreground">
                                            {service.title}
                                        </h2>
                                        <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                                            {service.description}
                                        </p>
                                    </div>
                                    <ArrowUpRight
                                        size={18}
                                        className="text-muted-foreground shrink-0 group-hover:text-primary transition-colors"
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    <div className="relative bg-primary flex flex-col gap-4 p-4 justify-between">
                        <DotGrid className="opacity-60 z-10" />
                        <div>
                            <Sparkles className="w-6 h-6 text-primary-foreground/90 mb-3" />
                            <h3 className="text-primary-foreground font-semibold text-4xl mb-1">
                                Not sure what you need?
                            </h3>
                            <p className="text-primary-foreground/80 text-sm leading-relaxed">
                                Tell me what {"you're"} building and {"I'll"}
                                point you to the right approach — no obligation,
                                just a conversation.
                            </p>
                        </div>
                        <Link href="#contact" className="z-20">
                            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/80">
                                Start a conversation
                                <ArrowUpRight size={14} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </CornerFrame>
        </SectionWrapper>
    );
}
