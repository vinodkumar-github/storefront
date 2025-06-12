"use client"

import { useCustomer } from "@/lib/hooks/use-customer"
import UserActionsDropdown from "./UserActionsDropdown"
import AuthTabsDropdown from "./AuthTabsDropdown"

export default function UserDropdown() {
    const { customer } = useCustomer()

    return customer ? <UserActionsDropdown /> : <AuthTabsDropdown />
}