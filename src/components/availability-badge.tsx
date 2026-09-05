export default function AvailabilityBadge({
    className,
}: {
    className?: string;
}) {
    return (
        <div
            className={`flex items-center gap-2 rounded border px-4 h-10 py-2 bg-background ${className}`}
        >
            <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-sm text-muted-foreground">
                Available for New Projects
            </span>
        </div>
    );
}
