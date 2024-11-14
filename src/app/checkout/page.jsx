'use client'

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentForm } from "@/components/payment-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

export default function CheckoutPage() {
  const { state } = useCart()
  const router = useRouter()

  const total = state.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)

  const handlePaymentSuccess = () => {
    router.push('/orders')
  }

  if (state.items.length === 0) {
    return (
      <div className="container max-w-2xl py-20">
        <Card>
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
          </CardHeader>
          <CardFooter>
            <Link href="/">
              <Button>Browse Concerts</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Concerts
          </Button>
        </Link>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.items.map((item) => (
              <div key={item.ticketId} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.eventTitle}</p>
                  <p className="text-sm text-muted-foreground">{item.categoryName}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.price}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <p className="font-medium">Total</p>
                <p className="font-bold text-lg">${total.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentForm
              total={total}
              onSuccess={handlePaymentSuccess}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
