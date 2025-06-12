// src/components/nav/CategoryDropdown.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {sdk}  from "@/lib/medusa/config"
import { HttpTypes } from "@medusajs/types"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function CategoryDropdown() {
    const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([])

    useEffect(() => {
        sdk.store.category.list()
            .then(({ product_categories }) => setCategories(product_categories))
            .catch(console.error)
    }, [])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer text-muted-foreground hover:text-foreground">
                Categories
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {categories.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                        <Link className="text-muted-foreground hover:text-foreground" href={`/categories/${category.handle}`}>{category.name}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}