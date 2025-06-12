"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import Logo from "./Logo";
import CartButton from "./CartButton";
import UserDropdown from "./UserDropdown";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import CategoryDropdown from "@/components/layout/navbar/CategoryDropdown"; // if available

const navItems = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function DesktopNav() {
    const pathname = usePathname();

    return (
        <div className="hidden md:block w-full">
            {/* Top Bar */}
            <div className="flex items-center justify-between py-2 px-4 border-b">
                <Logo />

                {/* Center Search */}
                <div className="flex-1 px-4">
                    <div className="max-w-xl mx-auto">
                        <SearchBar />
                    </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <UserDropdown />
                    <CartButton />
                </div>
            </div>
            {/* Bottom Bar (Navigation Links) */}
            <div>
                <nav className="flex justify-center">

    <div className="flex justify-center items-center gap-8 px-6 py-3 max-w-7xl w-full mx-auto">
                    <CategoryDropdown />
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "relative text-base font-semibold transition-colors duration-200",
                                    pathname === item.href
                                        ? "text-[--accent] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[--accent]"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}