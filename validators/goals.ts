import { z } from 'zod';

const addGoalSchema = z.object({
    user_id: z.string().min(1, "User id is required"),
    name: z.string().min(1, "Goal name is required"),
    target_amount: z.number().min(0, "Target amount should be positive number"),
    deadline: z.string().min(1, "Deadline is required"),
    category: z.string().min(1, "Category is required")
})

const updateGoalSchema = z.object({
    name: z.string().optional(),
    target_amount: z.number().min(0, "Target amount should be positive number"),
    current_amount: z.number().min(0, "Current amount should be positive number"),
    deadline: z.string().optional(),
    category: z.string().optional()
})

type AddGoalInput = z.infer<typeof addGoalSchema>
type UpdateGoalInput = z.infer<typeof updateGoalSchema>

export {
    addGoalSchema,
    updateGoalSchema
}

export type {
    AddGoalInput,
    UpdateGoalInput
}