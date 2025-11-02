import { createClient } from "@/lib/server"
import { EditTransactionContent } from "@/components/edit-transaction-content"


export default async function EditTransactionPage({ params }: { params: Promise<{ transactionId: string }> }) {
    const supabase = await createClient()
    const { transactionId } = await params
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    console.log(transactionId)
    const [accountsData, categoriesData, transactionData] = await Promise.all([
        supabase.from("accounts").select("*").eq("user_id", user.id),
        supabase.from("categories").select("*").eq("user_id", user.id),
        supabase.from("transactions").select("*").eq("id", transactionId).single(),
    ])

    console.log(transactionData)

    return (
        <EditTransactionContent transaction={transactionData.data} accounts={accountsData.data || []} categories={categoriesData.data || []} userId={user.id} />
    )
}
