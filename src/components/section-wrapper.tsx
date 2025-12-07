export default function SectionWrapper({
    children,
    className = "",
    id = "",
}: Readonly<{
    children: React.ReactNode;
    className?: string;
    id?: string;
}>) {
    return (
        <section
            className={`px-4 w-full flex items-center justify-center   ${className}`}
            id={id}
        >
            <div className="md:max-w-7xl w-full">{children}</div>
        </section>
    );
}
