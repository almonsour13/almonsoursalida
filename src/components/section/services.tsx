"use client";

import { services } from "@/constant/services";
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
                <div className="grid  md:grid-cols-2 gap-2">
                    {services
                        .filter((s) => s.visible)
                        .map((service) => {
                            return (
                                <CornerFrame
                                    key={service.title}
                                    className="border p-4"
                                >
                                    <div className="flex flex-row items-start gap-4">
                                        <CornerFrame className="w-16 md:w-20 aspect-square border flex items-center justify-center ">
                                            <service.icon
                                                className="w-8 h-8  md:w-12 md:h-12"
                                                strokeWidth={1.5}
                                            />
                                        </CornerFrame>
                                        <div className="flex-1 flex flex-col gap-1">
                                            <h1 className="text-wrap text-lg  tracking-wide  text-foreground">
                                                {service.title}
                                            </h1>
                                            <p className="text-wrap text-sm text-muted-foreground leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </CornerFrame>
                            );
                        })}
                </div>
            </div>
        </SectionWrapper>
    );
}
