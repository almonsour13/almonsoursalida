"use client";

import { Github } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import ContentContainer from "../layout/content-container";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const GITHUB_USERNAME = "almonsour13";

export default function GithubContributions() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ContentContainer id="contributions">
            <div className="flex flex-col">
                <div className="relative flex flex-col items-start gap-2 pb-8 md:pb-12">
                    <h1 className="text-5xl font-light tracking-tight text-foreground items-start md:text-center capitalize leading-tight ">
                        Open Source Contributions
                    </h1>
                    <p className="text-sm text-muted-foreground md:text-base items-tart md:text-center">
                        A real-time look at my recent engineering activity,
                        version control workflows, and ongoing project
                        iterations.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <Card className="overflow-hidden">
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
                    </Card>

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
        </ContentContainer>
    );
}
