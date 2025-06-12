"use client"

import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Login from "./LoginForm"
import SignupForm from "./SignupForm"
import { useCustomer } from "@/lib/hooks/use-customer"

export default function AuthTabsDropdown() {
    const [tab, setTab] = useState("login")
    const { customer, loading } = useCustomer()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarFallback>{customer?.first_name?.[0] || "G"}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80 p-4 mt-1.5">
                {loading ? (
                    <p className="text-sm text-muted-foreground">Checking login...</p>
                ) : customer ? (
                    <div className="text-sm">
                        <p className="font-medium">{customer.first_name} {customer.last_name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                ) : (
                    <Tabs value={tab} onValueChange={setTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <Login setCurrentView={() => {}} />
                        </TabsContent>
                        <TabsContent value="signup">
                            <SignupForm />
                        </TabsContent>
                    </Tabs>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}