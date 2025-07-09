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
        <section className={`pl-6 pr-16 md:pr-8 w-full ${className}`} id={id}>
            {children}
        </section>
    );
}
