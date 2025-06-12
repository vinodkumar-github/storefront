"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

import { sdk } from "@/lib/medusa/config"
import { FetchError } from "@medusajs/js-sdk"
import { LOGIN_VIEW } from "@/lib/templates/login-template"// path as per your structure

const RegisterSchema = z.object({
    first_name: z.string().min(2, "First name is required."),
    last_name: z.string().min(2, "Last name is required."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(4, "Password must be at least 4 characters."),
})

type RegisterInput = z.infer<typeof RegisterSchema>

interface RegisterProps {
    setCurrentView?: (view: LOGIN_VIEW) => void
}

export default function Register({ setCurrentView }: RegisterProps) {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const form = useForm<RegisterInput>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: RegisterInput) => {
        setLoading(true)
        setError(null)

        try {
            await sdk.auth.register("customer", "emailpass", {
                email: values.email,
                password: values.password,
            })
        } catch (error) {
            const fetchError = error as FetchError

            const identityExists =
                fetchError.statusText !== "Unauthorized" ||
                fetchError.message !== "Identity with email already exists"

            if (identityExists) {
                setError("An error occurred while registering: " + fetchError.message)
                setLoading(false)
                return
            }

            const loginResponse = await sdk.auth
                .login("customer", "emailpass", {
                    email: values.email,
                    password: values.password,
                })
                .catch((e) => {
                    setError("Login fallback failed: " + e.message)
                })

            if (!loginResponse || typeof loginResponse !== "string") {
                setError("Login fallback failed: unsupported or invalid response.")
                setLoading(false)
                return
            }
        }

        try {
            const { customer } = await sdk.store.customer.create({
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
            })

            // After success, switch back to Login view
            if (setCurrentView) {
                setCurrentView(LOGIN_VIEW.SIGN_IN)
            }
        } catch (error) {
            setError("Failed to create customer: " + String(error))
        }

        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertTitle>Registration failed</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="johndoe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating Account..." : "Register"}
                </Button>

                <div className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setCurrentView?.(LOGIN_VIEW.SIGN_IN)}
                        className="underline"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </Form>
    )
}