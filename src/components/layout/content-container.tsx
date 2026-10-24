import { cn } from "@/lib/utils";

export default function ContentContainer({
    children,
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className="w-full px-4 relative flex items-center justify-center">
            <div className={cn("w-full md:max-w-7xl", className)} {...props}>
                {children}
            </div>
        </div>
    );
}
