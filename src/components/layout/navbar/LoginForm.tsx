"use client"

import { FormEvent, useState } from "react"
import { sdk } from "@/lib/medusa/config"
import { LOGIN_VIEW } from "@/lib/templates/login-template"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

type Props = {
    setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        try {
            await sdk.auth.login("customer", "emailpass", { email, password })
            window.location.reload() // Reload to sync session
        } catch (err: any) {
            setError("Login failed: " + (err?.message || "Unknown error"))
        }
    }

    return (
        <div className="w-full max-w-sm space-y-6 px-4 py-2">
            <div className="text-center space-y-1">
                <h2 className="text-lg font-semibold">Welcome back</h2>
                <p className="text-sm text-muted-foreground">
                    Sign in to continue shopping.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    required
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                />
                {error && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}
                <Button type="submit" className="w-full">
                    Sign in
                </Button>
            </form>

            <div className="text-sm text-center">
                Not a member?{" "}
                <button
                    onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                    className="underline font-medium"
                >
                    Join us
                </button>
            </div>
        </div>
    )
}

export default Login