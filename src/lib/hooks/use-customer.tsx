"use client"

import { useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"

export function useCustomer() {
    const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCustomer() {
            try {
                const res = await fetch("/api/customer/me")
                if (!res.ok) {
                    throw new Error("Not logged in")
                }
                const data = await res.json()
                setCustomer(data.customer)
            } catch {
                setCustomer(null)
            } finally {
                setLoading(false)
            }
        }

        fetchCustomer()
    }, [])

    return { customer, loading }
}