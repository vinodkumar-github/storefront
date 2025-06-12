"use client";

import { useState } from "react";
import { ShoppingCart} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// TODO: Replace with actual cart items from context/store
const dummyCartItems = [
    {
        id: "prod_1",
        name: "Chocolate Cake",
        price: 199,
        quantity: 1,
        // TODO: Replace placeholder with real image
        thumbnail: "https://placehold.co/64x64?text=Cake",
    },
    {
        id: "prod_2",
        name: "Croissant",
        price: 99,
        quantity: 2,
        thumbnail: "https://placehold.co/64x64?text=Croissant",
    },
];

export default function CartButton() {
    const [open, setOpen] = useState(false);

    const cartCount = dummyCartItems.reduce((acc, item) => acc + item.quantity, 0);
    const total = dummyCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[--accent] px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="w-[400px] sm:w-[480px] p-6 flex flex-col">
                <SheetHeader>
                    <SheetTitle className="text-lg flex justify-between items-center">
                        Your Cart

                    </SheetTitle>
                </SheetHeader>

                <Separator className="my-4" />

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto space-y-4">
                    {dummyCartItems.length === 0 ? (
                        <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                    ) : (
                        dummyCartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <img
                                    src={item.thumbnail}
                                    alt={item.name}
                                    className="w-16 h-16 rounded border object-cover"
                                />
                                <div className="flex-1">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                                </div>
                                <div className="text-sm font-semibold whitespace-nowrap">
                                    ₹{item.price * item.quantity}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <Separator className="my-4" />

                {/* Footer */}
                <SheetFooter className="flex flex-col gap-4">
                    <div className="flex justify-between text-base font-semibold">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                    <Button className="w-full">Checkout</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}