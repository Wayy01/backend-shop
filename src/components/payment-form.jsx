'use client'

// Import necessary UI components and hooks
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { createBrowserClient } from '@supabase/ssr'

/**
 * PaymentForm Component
 *
 * NOTE: This is a temporary implementation for testing purposes.
 * Will be replaced with actual payment provider integration (e.g., Stripe) in production.
 *
 * @param {number} total - Total amount to be charged
 * @param {Function} onSuccess - Callback function to execute after successful payment
 */
export function PaymentForm({ total, onSuccess }) {
  // Track payment processing state
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { state, dispatch } = useCart()

  // Initialize Supabase client for user authentication and database operations
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  /**
   * Handle form submission and payment processing
   * Currently implements a mock payment flow for testing
   * Will be replaced with actual payment gateway integration
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Verify user authentication status
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError

      // Simulate payment processing delay (1.5 seconds)
      // This will be replaced with actual payment gateway API calls
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Create order record in database
      // In production, this would happen after successful payment confirmation
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: total,
          status: 'completed',
          payment_method: 'card'
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Show success message
      toast({
        title: "Payment successful!",
        description: "Your tickets have been purchased successfully.",
      })

      // Clear cart and execute success callback
      dispatch({ type: 'CLEAR_CART' })
      onSuccess()

    } catch (error) {
      // Log errors in development environment
      if (process.env.NODE_ENV === 'development') {
        console.log('Payment error:', error)
      }

      // Show error message to user
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment form fields - Currently using mock data for testing */}
      {/* Will be replaced with secure payment gateway form elements */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="4242 4242 4242 4242"
            defaultValue="4242 4242 4242 4242" // Test value - will be removed in production
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              defaultValue="12/25" // Test value - will be removed in production
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              placeholder="123"
              defaultValue="123" // Test value - will be removed in production
              required
            />
          </div>
        </div>
      </div>

      {/* Submit button shows processing state */}
      <Button
        type="submit"
        className="w-full"
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </Button>
    </form>
  )
}
