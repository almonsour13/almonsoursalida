import { cn } from "@/lib/utils";

export default function DotGrid({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 -z-10",
                className,
            )}
            style={{
                backgroundImage:
                    "radial-gradient(rgba(128,128,128,0.25) 1px, transparent 1px)",
                backgroundSize: "8px 8px",
            }}
        />
    );
}
