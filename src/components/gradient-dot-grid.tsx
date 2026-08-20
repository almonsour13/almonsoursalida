import { cn } from "@/lib/utils";

export default function GradientDotGrid({
    className,
    glowPosition = "bottom",
}: {
    className?: string;
    glowPosition?: "bottom" | "top" | "center";
}) {
    const maskDirection =
        glowPosition === "top"
            ? "to top"
            : glowPosition === "center"
              ? "to bottom"
              : "to bottom";

    const glowAt =
        glowPosition === "top"
            ? "50% 0%"
            : glowPosition === "center"
              ? "50% 50%"
              : "50% 100%";

    const glowClass =
        glowPosition === "top"
            ? "top-0"
            : glowPosition === "center"
              ? "inset-0"
              : "bottom-0";

    return (
        <div
            className={cn("absolute inset-0 -z-10 overflow-hidden", className)}
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(128,128,128,1) 0.5px, transparent 0.5px)",
                    backgroundSize: "10px 10px",
                    maskImage: `linear-gradient(${maskDirection}, transparent 0%, rgba(0,0,0,0.5) 50%, black 100%)`,
                    WebkitMaskImage: `linear-gradient(${maskDirection}, transparent 0%, rgba(0,0,0,0.5) 50%, black 100%)`,
                }}
            />
        </div>
    );
}
