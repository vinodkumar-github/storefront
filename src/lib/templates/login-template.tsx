"use client"

import { useState } from "react"

import Register from "@/components/layout/navbar/SignupForm"
import Login from "@/components/layout/navbar/LoginForm"

export enum LOGIN_VIEW {
    SIGN_IN = "sign-in",
    REGISTER = "register",
}

const LoginTemplate = () => {
    const [currentView, setCurrentView] = useState("sign-in")

    return (
        <div className="w-full flex justify-start px-8 py-8">
        {currentView === "sign-in" ? (
            <Login setCurrentView={setCurrentView} />
    ) : (
        <Register setCurrentView={setCurrentView} />
)}
    </div>
)
}

export default LoginTemplate
