"use client";

import { services } from "@/constant/services";
import { cn } from "@/lib/utils";
import CornerFrame from "../corner-frame";
import SectionWrapper from "../section-wrapper";

export default function Services() {
    return (
        <SectionWrapper id="services">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-medium leading-none tracking-wide text-foreground">
                        What I Offer
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                        Discover expert-crafted solutions to elevate your
                        digital experience — from front-end finesse to back-end
                        mastery.
                    </p>
                </div>
                <CornerFrame className="grid grid-cols-1 md:grid-cols-2 border">
                    {services
                        .filter((s) => s.visible)
                        .map((service, i) => (
                            <div
                                key={service.title}
                                className={cn(
                                    "border-border p-4",

                                    // Mobile: horizontal divider between items
                                    i > 0 && "border-t",

                                    // Desktop: vertical divider between columns
                                    "md:border-t-0 md:border-r",

                                    // Remove right border from the second column
                                    i % 2 === 1 && "md:border-r-0",

                                    // Desktop: horizontal divider starting from row 2
                                    i >= 2 && "md:border-t",
                                )}
                            >
                                <div className="flex flex-row items-start gap-4">
                                    <div className="flex aspect-square w-16 items-center justify-center border md:w-20">
                                        <service.icon
                                            className="h-8 w-8 md:h-12 md:w-12"
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col gap-1">
                                        <h1 className="text-lg tracking-wide text-foreground">
                                            {service.title}
                                        </h1>

                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </CornerFrame>
            </div>
        </SectionWrapper>
    );
}
