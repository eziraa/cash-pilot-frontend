"use server"

import { createClient } from "@/lib/server"

export async function createCategory(data: {
    user_id: string
    name: string
    type: "expense" | "income"
    icon?: string
    color?: string
}) {
    const client = await createClient()
    const { data: category, error } = await client
        .from("categories")
        .insert([data])
        .single()

    if (error) {
        throw new Error(error.message)
    }

    return category
}