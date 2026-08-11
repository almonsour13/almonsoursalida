"use client";
import Link from "next/link";
import { GitHubCalendar } from "react-github-calendar";
import SectionWrapper from "../section-wrapper";

export default function GithubContributions() {
    return (
        <SectionWrapper id="contributions">
            <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-medium leading-none tracking-wide text-foreground">
                        Open Source Contributions
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                        A real-time look at my recent engineering activity,
                        version control workflows, and ongoing project
                        iterations.
                    </p>
                </div>
                <Link href="https://github.com/almonsour13">
                    <GitHubCalendar
                        username="almonsour13"
                        colorScheme="light"
                        blockSize={16}
                        blockMargin={5.8}
                        blockRadius={0}
                        fontSize={12}
                        style={{ width: "100%" }}
                        theme={{
                            light: [
                                "var(--card)",
                                "oklch(0.85 0 0)",
                                "oklch(0.70 0 0)",
                                "oklch(0.55 0 0)",
                                "var(--primary)",
                            ],
                            dark: [
                                "var(--card)",
                                "oklch(0.32 0 0)",
                                "oklch(0.42 0 0)",
                                "oklch(0.55 0 0)",
                                "var(--primary)",
                            ],
                        }}
                        labels={{
                            totalCount:
                                "{{count}} contributions in the last year",
                        }}
                    />
                </Link>
            </div>
        </SectionWrapper>
    );
}
