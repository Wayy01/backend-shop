'use client'

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

// CartButton component displays a shopping cart icon with item count badge
export function CartButton() {
  // Get cart state from cart context
  const { state } = useCart()

  // Calculate total number of items in cart by summing quantities
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    // Link wraps button to navigate to checkout page when clicked
    <Link href="/checkout">
      {/* Button styled as outline variant with icon size and relative positioning */}
      <Button variant="outline" size="icon" className="relative">
        {/* Shopping cart icon */}
        <ShoppingCart className="h-5 w-5" />

        {/* Conditionally render item count badge if cart is not empty */}
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  )
}
