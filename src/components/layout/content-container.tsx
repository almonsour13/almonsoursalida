import { cn } from "@/lib/utils";

export default function ContentContainer({
    children,
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("w-full md:max-w-6xl", className)} {...props}>
            {children}
        </div>
    );
}
