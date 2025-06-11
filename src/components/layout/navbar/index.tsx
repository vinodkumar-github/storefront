// src/components/layout/navbar/index.tsx
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background text-foreground backdrop-blur-md dark:bg-background/80 dark:text-foreground">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
                <Logo />
                <DesktopNav />
                <MobileNav />
            </div>
        </header>
    );
}