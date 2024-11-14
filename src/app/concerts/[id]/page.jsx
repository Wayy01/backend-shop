// Import necessary dependencies and components
import { createServerClient } from "@/lib/supabase/server"
import { mockConcerts } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, MapPin, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TicketCategory } from "@/components/ticket-category"
import { UserNav } from "@/components/user-nav"

// Server Component for displaying individual concert details
export default async function ConcertPage({ params }) {
  // Initialize Supabase client for server-side authentication
  const supabase = createServerClient()
  // Get the current user session
  const { data: { session } } = await supabase.auth.getSession()

  // Find the concert from mock data using the URL parameter ID
  const concert = mockConcerts.find(c => c.id === params.id)

  // Show 404 page if concert is not found
  if (!concert) {
    notFound()
  }

  // Format the event date and time for display
  const eventDate = new Date(concert.event_date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Concerts
          </Button>
        </Link>
        {/* Only show user navigation if user is logged in */}
        {session && <UserNav user={session.user} />}
      </div>

      {/* Concert details section */}
      <div className="flex flex-col gap-8">
        {/* Featured image container with aspect ratio */}
        <div className="aspect-[2/1] relative overflow-hidden rounded-xl">
          <img
            src={concert.featured_image_url}
            alt={concert.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Concert information section */}
        <div className="space-y-6">
          {/* Title and venue information */}
          <div>
            <h1 className="text-4xl font-bold">{concert.title}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {concert.venue.name}, {concert.venue.city}, {concert.venue.country}
            </div>
          </div>

          {/* Date and time information */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {formattedTime}
            </div>
          </div>

          {/* Concert description */}
          <p className="text-muted-foreground">
            {concert.description}
          </p>

          {/* Ticket categories section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Available Tickets</h2>
            {/* Map through and render each ticket category */}
            {concert.ticket_categories.map((category) => (
              <TicketCategory
                key={category.id}
                category={category}
                isLoggedIn={!!session}
                eventTitle={concert.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
