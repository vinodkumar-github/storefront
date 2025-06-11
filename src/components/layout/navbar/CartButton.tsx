"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartButton() {
    return (
        <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart className="w-5 h-5" />
        </Button>
    );
}