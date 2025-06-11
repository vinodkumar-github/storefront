import Navbar from "@/components/layout/navbar";
import React from "react";
import "@/app/globals.css"; // ✅ critical to include Tailwind styles
import { ThemeProvider } from 'next-themes'
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
        <Navbar />
        <main>{children}</main>
        </ThemeProvider>
        </body>
        </html>
    );
}