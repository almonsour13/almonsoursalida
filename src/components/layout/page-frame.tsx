export default function PageFrame({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="">{children}</div>
        </div>
    );
}
