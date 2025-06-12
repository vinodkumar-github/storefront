"use client"

import { useCustomer } from "@/lib/hooks/use-customer"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import {sdk} from "@/lib/medusa/config"

export default function UserActionsDropdown() {
    const { customer, setCustomer } = useCustomer()
    const router = useRouter()

    const handleLogout = async () => {
        await sdk.auth.logout().then(() => {
            setCustomer(undefined)
            router.refresh()
        })
        .catch((err) => {
            console.error("Logout failed:", err)
        })
    }

    const getInitials = (email?: string) => {
        if (!email) return "U"
        return email[0]?.toUpperCase()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarFallback>{getInitials(customer?.email)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-1.5">
                <DropdownMenuItem disabled>
                    {customer?.email ?? "User"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/account")}>
                    My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/orders")}>
                    Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}