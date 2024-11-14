'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export function TicketCategory({ category, isLoggedIn, eventTitle }) {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ticketId: category.id,
        eventTitle,
        categoryName: category.name,
        price: category.price,
      },
    })

    toast({
      title: "Added to cart",
      description: `${category.name} ticket for ${eventTitle} added to cart.`,
    })

    setIsAdding(false)
  }

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold">{category.name}</h3>
          <p className="text-sm text-muted-foreground">
            {category.remaining} tickets remaining
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-lg font-bold">
            ${category.price}
          </p>
          {isLoggedIn ? (
            <Button
              disabled={category.remaining === 0 || isAdding}
              onClick={handleAddToCart}
            >
              {category.remaining === 0 ? 'Sold Out' :
               isAdding ? 'Adding...' : 'Add to Cart'}
            </Button>
          ) : (
            <Link href="/auth">
              <Button variant="secondary">Sign in to Buy</Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
