import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

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
                className={`${dmSans.variable} ${dmSans.className} h-full antialiased bg-background`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
