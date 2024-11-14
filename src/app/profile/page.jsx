import { createServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { getUserOrders } from "@/lib/db-utils"

// ProfilePage component to display user profile and order information
export default async function ProfilePage() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Redirect to authentication page if user is not logged in
  if (!session) {
    redirect('/auth')
  }

  // Fetch user orders using the getUserOrders function
  const orders = await getUserOrders(session.user.id)
  const user = session.user

  // Calculate total number of tickets purchased
  const totalTickets = orders?.reduce((sum, order) =>
    sum + (order.order_items?.length || 0), 0) || 0

  // Calculate total amount spent by the user
  const totalSpent = orders?.reduce((sum, order) =>
    sum + parseFloat(order.total_amount || 0), 0) || 0

  return (
    <div className="container max-w-4xl py-10">
      {/* Header section with navigation back to home and user navigation */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <UserNav user={user} />
      </div>

      <div className="grid gap-8">
        {/* User Info Card displaying user's profile information */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img
                src={user.user_metadata.avatar_url}
                alt={user.user_metadata.full_name}
                className="h-20 w-20 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold">{user.user_metadata.full_name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview displaying total tickets, total spent, and number of orders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{totalTickets}</p>
                <p className="text-sm text-muted-foreground">Total Tickets</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{orders?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Orders Made</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section displaying recent orders made by the user */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recent Orders</h2>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id.slice(0, 8)}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Purchased on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Total: ${order.total_amount}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        Status: {order.status}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.order_items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-4 last:border-0"
                      >
                        <div>
                          <p className="font-medium">
                            {item.ticket.category.event.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.ticket.category.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.ticket.category.event.event_date).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.ticket.category.event.venue.name},
                            {item.ticket.category.event.venue.city}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Ticket
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No orders yet</p>
                <Link href="/" className="mt-4 inline-block">
                  <Button>Browse Concerts</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions for browsing concerts and viewing all tickets */}
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline">Browse More Concerts</Button>
          </Link>
          <Link href="/orders">
            <Button>View All Tickets</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
