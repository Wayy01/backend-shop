import { Inter } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast"
import { CartProvider } from "@/contexts/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Concert Tickets",
  description: "Book your favorite concert tickets",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <main className="min-h-screen bg-background">
            {children}
            <ToastProvider />
          </main>
        </CartProvider>
      </body>
    </html>
  )
}
