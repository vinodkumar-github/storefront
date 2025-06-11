// src/components/layout/navbar/DesktopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function DesktopNav() {
    const pathname = usePathname();

    return (
        <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                        "hover:underline transition-colors",
                        pathname === item.href ? "text-(--accent)" : "text-muted-foreground"
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}