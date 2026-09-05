import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import "./globals.css";
import "./style.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-dm-sans",
});

export const metadata: Metadata = {
    title: "Al-Monsour M. Salida",
    description: "A static website portfolio of Al-Monsour M. Salida",
    icons: {
        icon: "/image/profile.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    " h-full antialiased bg-background overflow-x-hidden",
                    dmSans.variable,
                    dmSans.className,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
