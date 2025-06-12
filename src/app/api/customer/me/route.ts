// src/app/api/customer/me/route.ts

import { NextResponse } from "next/server"
import { retrieveCustomer } from "@/lib/medusa/actions"

export async function GET() {
    const customer = await retrieveCustomer()

    if (!customer) {
        return NextResponse.json({ customer: null }, { status: 401 })
    }

    return NextResponse.json({ customer })
}