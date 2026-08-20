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
                    "radial-gradient(rgba(128,128,128,1) 0.5px, transparent 0.5px)",
                backgroundSize: "10px 10px",
            }}
        />
    );
}
