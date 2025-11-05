import { z } from 'zod';

const addBudgetSchem = z.object({
    user_id: z.string().min(1, "User ID is required"),
    category_id: z.string().min(1, "Category ID is required"),
    limit_amount: z.number().min(0, "Limit amount must be a non-negative number"),
    period: z.string().min(1, "Period is required"),
})

const updateBudgetSchem = z.object({
    category_id: z.string().optional(),
    limit_amount: z.number().min(0, "Limit amount must be a non-negative number").optional(),
    period: z.string().optional(),
})

type AddBudgetInput = z.infer<typeof addBudgetSchem>;
type UpdateBudgetInput = z.infer<typeof updateBudgetSchem>;

export {
    addBudgetSchem,
    updateBudgetSchem
}

export type {
    AddBudgetInput,
    UpdateBudgetInput
}