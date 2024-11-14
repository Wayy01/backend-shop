import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createServerClient } from "@/lib/supabase/server"
import { UserNav } from "@/components/user-nav"
import { ConcertCard } from "@/components/concert-card"
import { mockConcerts } from "@/lib/mock-data"

export default async function Home() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Concert Tickets</h1>
        {session ? (
          <UserNav user={session.user} />
        ) : (
          <Link href="/auth">
            <Button size="lg" className="font-semibold">
              Sign In
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {mockConcerts.map((concert) => (
          <ConcertCard key={concert.id} concert={concert} />
        ))}
      </div>
    </div>
  )
}
