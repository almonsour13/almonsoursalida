"use client";
import { GitHubCalendar } from "react-github-calendar";
import SectionWrapper from "../section-wrapper";

export default function GithubContributions() {
    return (
        <SectionWrapper id="contributions">
            <div className="flex-1 flex flex-col gap-2 w-full">
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
                <GitHubCalendar username="almonsour13" />
            </div>
        </SectionWrapper>
    );
}
