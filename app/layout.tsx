import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geist_mono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Expense Tracker - Manage Your Finances",
  description: "Advanced expense tracker with multi-account support, budgets, and analytics",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-right" />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
