import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "./components/AppSidebar"
import { GlobalGlow } from "./components/GlobalGlow"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "LLMetric - LLM Model Comparison Platform",
  description: "Compare different LLM models and their performance metrics",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <GlobalGlow />
          <AppSidebar>{children}</AppSidebar>
        </ThemeProvider>
      </body>
    </html>
  )
}
