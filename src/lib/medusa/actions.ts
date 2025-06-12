// src/lib/medusa/actions.ts
"use server"

import { sdk } from "@/lib/medusa/config"
import { getAuthHeaders, getCacheOptions } from "@/lib/data/cookies"
import { HttpTypes } from "@medusajs/types"

export const retrieveCustomer = async (): Promise<HttpTypes.StoreCustomer | null> => {
    const authHeaders = await getAuthHeaders()
    if (!authHeaders) return null

    const headers = { ...authHeaders }
    const next = await getCacheOptions("customers")

    try {
        const { customer } = await sdk.client.fetch<{ customer: HttpTypes.StoreCustomer }>(
            `/store/customers/me`,
            {
                method: "GET",
                query: { fields: "*orders" },
                headers,
                next,
                cache: "force-cache",
            }
        )
        return customer
    } catch {
        return null
    }
}