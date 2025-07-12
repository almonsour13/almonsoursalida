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
        <section className={`px-4 w-full ${className}`} id={id}>
            {children}
        </section>
    );
}
