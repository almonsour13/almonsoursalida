import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SectionProvider } from "@/context/section-context";

const geistSans = Geist({
    variable: "--font-poppins",
    subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add the weights you need
  variable: '--font-poppins',          // Optional: define a CSS variable
  display: 'swap',
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Al-Monsour M. Salida",
    description: "A static website portfolio of Al-Monsour M. Salida",
    icons: {
        icon: "/image/profile.JPG",
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
                className={`${geistSans.variable} ${geistMono.variable} antialiased `}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SectionProvider>{children}</SectionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
