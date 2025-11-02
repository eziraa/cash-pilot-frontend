'use server'
import { createClient } from "@/lib/server";
import { getUserProfiles } from "./profile";

/**
 * 
 * Get Logged in user
 * @returns logged in user data
 */

export async function getLoggedInUser() {
    const supabase = await createClient()

    const {
        data: { user },
        error
    } = await supabase.auth.getUser()

    if (error) {
        throw new Error(error.message)
    }

    const data = await getUserProfiles(user?.id ?? "")
    return { ...user, profiles: data }

}