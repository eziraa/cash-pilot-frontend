import { z } from "zod"

const addTransactionSchema = z.object({
    id: z.string().min(1, "ID is required"),
    user_id: z.string().min(1, "User id is required"),
    account_id: z.string().min(1, "Account is required please select account"),
    category_id: z.string().min(1, "Category is required please select category"),
    type: z.string().min(1, "Transaction type is required"),
    currency: z.string().min(1, "Currency is required"),
    amount: z.number().min(0, "Amount should be positive number"),
    description: z.string().min(1, "Description is required"),
    date: z.string().min(1, "Date is required"),
    receipt_url: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
})

const updateTransactionSchema = z.object({
    id: z.string().min(1, "Transaction ID is required"),
    user_id: z.string().optional(),
    account_id: z.string().optional(),
    category_id: z.string().optional(),
    type: z.string().optional(),
    amount: z.number().min(0, "Amount should be positive number").optional(),
    description: z.string().optional(),
    date: z.string().optional(),
    receipt_url: z.string().optional(),
    tags: z.array(z.string()).optional(),
})

type AddTransactionInput = z.infer<typeof addTransactionSchema>
type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>

export {
    addTransactionSchema,
    updateTransactionSchema
}

export type {
    AddTransactionInput,
    UpdateTransactionInput
}