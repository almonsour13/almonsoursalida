"use client";

import { Github } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import EdgeDash from "../edge-dash";
import SectionWrapper from "../section-wrapper";
import { Button } from "../ui/button";

const GITHUB_USERNAME = "almonsour13";

export default function GithubContributions() {
    // Assumes next-themes (pairs with the shadcn/ui conventions used elsewhere
    // on the site). If you're using a different theme provider, swap this hook.
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <SectionWrapper id="contributions">
            <div className="flex flex-col">
                <div className="relative flex flex-col items-center gap-2 px-4 py-8 md:py-16">
                    <EdgeDash side="right" className="-z-20 hidden md:block" />
                    <EdgeDash side="left" className="-z-20 hidden md:block" />
                    <span className="text-xs font-medium text-primary uppercase">
                        [ GITHUB CONTRIBUTIONS ]
                    </span>

                    <h1 className="text-4xl md:text-6xl font-normal tracking-tight text-foreground text-center">
                        Open Source Contributions
                    </h1>

                    <p className="text-sm text-muted-foreground md:text-base text-center">
                        A real-time look at my recent engineering activity,
                        version control workflows, and ongoing project
                        iterations.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="p-4 bg-card border rounded overflow-hidden">
                        {!mounted ? (
                            <div className="h-[140px] w-full animate-pulse rounded bg-muted/40" />
                        ) : (
                            <GitHubCalendar
                                username={GITHUB_USERNAME}
                                colorScheme={
                                    resolvedTheme === "dark" ? "dark" : "light"
                                }
                                blockSize={16}
                                blockMargin={5.2}
                                blockRadius={0}
                                fontSize={12}
                                style={{ width: "100%" }}
                                theme={{
                                    light: [
                                        "var(--muted)",
                                        "oklch(0.85 0 0)",
                                        "oklch(0.70 0 0)",
                                        "oklch(0.55 0 0)",
                                        "var(--primary)",
                                    ],
                                    dark: [
                                        "var(--muted)",
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
                        )}
                    </div>

                    <div className="flex">
                        <Link
                            href="https://github.com/almonsour013"
                            target="_blank"
                            className="flex flex-1"
                        >
                            <Button className="flex-1 p-4">
                                View full profile
                                <Github className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
