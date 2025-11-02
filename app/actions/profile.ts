"use server"

import { createClient } from "@/lib/server"

/**
 * Update a user profile
 * @param data: Profile values
 */
export async function updateProfile(data: {
  id: string
  display_name: string
  currency: string
}) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: data.display_name, currency: data.currency })
    .eq("id", data.id)

  if (error) throw new Error(error.message)
}

/**
 * 
 * @param userId User id to fetch his profiles
 * @returns list of user profiles
 */

export async function getUserProfiles(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("profiles").select('*').eq("id", userId)
  if (error) throw new Error(error.message)
  return data as {
    display_name: string;
    email: string;
    currency: string
  }[]
}