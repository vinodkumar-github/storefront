// src/components/layout/navbar/Logo.tsx
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="text-xl font-bold tracking-tight">
            BonaFideBakes.Co
        </Link>
    );
}