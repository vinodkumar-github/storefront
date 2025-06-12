"use client";

import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/navbar";
import React from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <main>{children}</main>
        </ThemeProvider>
    );
}