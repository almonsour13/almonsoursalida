import { cn } from "@/lib/utils";

export default function SectionWrapper({
    children,
    className,
    ...props
}: React.ComponentProps<"section">) {
    return (
        <section
            className={cn(
                "px-4 w-full flex items-center justify-center",
                className,
            )}
            {...props}
        >
            <div className="md:max-w-6xl w-full">{children}</div>
        </section>
    );
}
