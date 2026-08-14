"use client";

import { Github } from "lucide-react";
import Link from "next/link";
import { GitHubCalendar } from "react-github-calendar";
import CornerFrame from "../corner-frame";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";

const GITHUB_USERNAME = "almonsour13";

export default function GithubContributions() {
    return (
        <SectionWrapper id="contributions">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium text-primary">
                            [ GITHUB CONTRIBUTIONS ]
                        </span>

                        <h1 className="text-2xl md:text-4xl font-medium tracking-tight text-foreground">
                            Open Source Contributions
                        </h1>

                        <p className="text-sm text-muted-foreground md:text-base max-w-xl">
                            A real-time look at my recent engineering activity,
                            version control workflows, and ongoing project
                            iterations.
                        </p>
                    </div>

                    <Link
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0"
                    >
                        <Button className="gap-2 p-4">
                            View full profile
                            <Github className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <CornerFrame className="border p-4 hover:bg-muted/40">
                    <Link
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHubCalendar
                            username={GITHUB_USERNAME}
                            colorScheme="light"
                            blockSize={16}
                            blockMargin={5.2}
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
                </CornerFrame>
            </div>
        </SectionWrapper>
    );
}
