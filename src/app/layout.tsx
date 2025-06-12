import type { Metadata } from 'next'
import './globals.css'
import React from "react";
import ClientLayout from "@/components/layout/ClientLayout";
import {CustomerProvider} from "@/lib/hooks/use-customer";

export const metadata: Metadata = {
    title: 'BonaFideBakes.Co',
    description: 'BonaFideBakes.Co - Your source for delicious baked goods',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <CustomerProvider><body><ClientLayout>{children}</ClientLayout></body></CustomerProvider>
        </html>
    )
}