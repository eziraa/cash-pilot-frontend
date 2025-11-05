import { z } from "zod"

const updateProfileSchema = z.object({
    id: z.string().min(1, "User ID is required"),
    display_name: z.string().min(1, "User display name is required"),
    currency: z.string().min(1, "Currency is required")
})

type UpdateProfileInput = z.infer<typeof updateProfileSchema>

export {
    updateProfileSchema
}

export type {
    UpdateProfileInput
}