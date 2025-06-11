import Navbar from "@/components/layout/navbar";
import React from "react";
import "@/app/globals.css"; // ✅ critical to include Tailwind styles
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Navbar />
        <main>{children}</main>
        </body>
        </html>
    );
}