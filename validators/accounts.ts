import { z } from 'zod';

const addAccountSchem = z.object({
    user_id: z.string().min(1, "User ID is required"),
    name: z.string().min(1, "Account name is required"),
    type: z.string().min(1, "Account type is required"),
    balance: z.number().min(0, "Balance must be a non-negative number"),
    currency: z.string().min(1, "Currency is required"),
})

const updateAccountSchem = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    balance: z.number().min(0, "Balance must be a non-negative number").optional(),
    currency: z.string().optional(),
})

type AddAccountInput = z.infer<typeof addAccountSchem>;
type UpdateAccountInput = z.infer<typeof updateAccountSchem>;

export {
    addAccountSchem,
    updateAccountSchem
}

export type {
    AddAccountInput,
    UpdateAccountInput
}