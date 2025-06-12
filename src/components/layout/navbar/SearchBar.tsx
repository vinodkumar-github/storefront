"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {sdk}  from "@/lib/medusa/config"
import { HttpTypes } from "@medusajs/types"
import {useEffect, useState} from "react";

export default function SearchBar() {
    const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([])

    useEffect(() => {
        sdk.store.category.list()
            .then(({ product_categories }) => setCategories(product_categories))
            .catch(console.error)
    }, [])
    return (
        <div className="flex items-center gap-1">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key={"All Products"} value={"All Products"}>
                        {"All Products"}
                    </SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={category.handle}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input placeholder="Search products..." className="w-full" />
        </div>
    );
}