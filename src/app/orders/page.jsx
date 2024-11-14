import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { ChevronLeft } from "lucide-react"
import { getUserOrders } from "@/lib/db-utils"

export default async function OrdersPage() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth')
  }

  const orders = await getUserOrders(session.user.id)

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Concerts
          </Button>
        </Link>
        <UserNav user={session.user} />
      </div>

      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                Order #{order.id.slice(0, 8)}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Purchased on {new Date(order.created_at).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.ticket.category.event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.ticket.category.name} - {item.ticket.category.event.venue.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.ticket.category.event.event_date).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Ticket
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
