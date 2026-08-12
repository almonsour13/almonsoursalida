import { cn } from "@/lib/utils";

export default function SectionWrapper({
    children,
    className,
    ...props
}: React.ComponentProps<"section">) {
    return (
        <section
            className={cn(
                "relative w-full px-4 flex items-center justify-center",
                className,
            )}
            {...props}
        >
            {/* <div className="hidden md:block absolute inset-x-0 top-0 h-px bg-[repeating-linear-gradient(to_right,var(--border)_0,var(--border)_6px,transparent_6px,transparent_12px)]" /> */}

            <div className="w-full md:max-w-6xl">{children}</div>

            {/* <div className="hidden md:block absolute inset-x-0 bottom-0 h-px bg-[repeating-linear-gradient(to_right,var(--border)_0,var(--border)_6px,transparent_6px,transparent_12px)]" /> */}
        </section>
    );
}
