import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export function ConcertCard({ concert }) {
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
    <Card className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={concert.featured_image_url}
          alt={concert.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{concert.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          {concert.venue.name}, {concert.venue.city}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <CalendarIcon className="mr-1 h-4 w-4" />
          {formattedDate}
        </div>
        <div className="flex items-center text-sm">
          <Clock className="mr-1 h-4 w-4" />
          {formattedTime}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {concert.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm">
          From{" "}
          <span className="font-bold">
            ${Math.min(...concert.ticket_categories.map(cat => cat.price))}
          </span>
        </div>
        <Link href={`/concerts/${concert.id}`}>
          <Button>View Tickets</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
