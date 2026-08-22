import { cn } from "@/lib/utils";

export default function GridLines({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 overflow-hidden",
                className,
            )}
        >
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                        linear-gradient(rgba(128,128,128,1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(128,128,128,1) 1px, transparent 1px)
                    `,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>
        </div>
    );
}
