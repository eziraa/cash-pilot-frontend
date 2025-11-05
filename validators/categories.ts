import { z } from 'zod';


const addCategorySchema = z.object({
    user_id: z.string().min(1, "User ID is required"),
    name: z.string().min(1, "Category name is required"),
    type: z.string().min(1, "Category type is required"),
    icon: z.string().optional(),
    color: z.string().optional()
})


const updateCategorySchema = z.object({
    user_id: z.string().optional(),
    name: z.string().optional(),
    type: z.string().optional(),
    icon: z.string().optional(),
    color: z.string().optional()
})

type AddCategoryInput = z.infer<typeof addCategorySchema>
type UpdateCategoryInput = z.infer<typeof updateCategorySchema>

export {
    addCategorySchema,
    updateCategorySchema
}

export type {
    AddCategoryInput,
    UpdateCategoryInput
}