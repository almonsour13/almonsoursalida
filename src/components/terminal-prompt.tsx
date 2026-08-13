"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function BlinkingCursor() {
    return (
        <motion.span
            aria-hidden
            className="inline-block h-3.5 w-[7px] translate-y-[1px] bg-primary motion-reduce:hidden"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
                duration: 1,
                repeat: Infinity,
                times: [0, 0.5, 0.5, 1],
                ease: "linear",
            }}
        />
    );
}

/**
 * A per-section "prompt" eyebrow: `guest@portfolio:~$ <command>` with a
 * blinking cursor and an optional output badge that fades in a beat later,
 * as if the command just returned. Each section passes its own `command`
 * (and optional `output`) so every header reads as unique while sharing
 * one visual language.
 */
export default function TerminalPrompt({
    command,
    output,
    live = false,
}: {
    command: string;
    output?: string;
    live?: boolean;
}) {
    const [showOutput, setShowOutput] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShowOutput(true), 850);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-muted-foreground/60">
                guest@portfolio:~$
            </span>
            <span className="text-primary">{command}</span>
            <BlinkingCursor />

            {output && (
                <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={
                        showOutput
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -4 }
                    }
                    transition={{ duration: 0.3 }}
                    className="ml-1 inline-flex items-center gap-1.5 rounded border border-border bg-card px-1.5 py-0.5 text-[11px] text-muted-foreground"
                >
                    {live && (
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:hidden" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                        </span>
                    )}
                    {output}
                </motion.span>
            )}
        </div>
    );
}
