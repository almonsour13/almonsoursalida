import { cn } from "@/lib/utils";

export default function SectionWrapper({
    children,
    className,
    ...props
}: React.ComponentProps<"section">) {
    return (
        <section className={cn("w-full", className)} {...props}>
            <div className="w-full md:max-w-6xl">{children}</div>
        </section>
    );
}
