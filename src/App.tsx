import SiteHeader from "./components/layout/SiteHeader";
import { TicketCard } from "./features/tickets/components/TicketCard";
import { useTickets } from "./features/tickets/hooks/useTickets";

export default function App() {
  const { tickets, loading, error } = useTickets();

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-inter">
      <SiteHeader />
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16 md:py-24">
        {loading ? (
          <p className="text-center text-neutral-500">Loading bookmarks…</p>
        ) : error ? (
          <p className="text-center text-red-600">
            Could not load bookmarks: {error}
          </p>
        ) : tickets.length === 0 ? (
          <p className="text-center text-neutral-500">No bookmarks found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14 items-start justify-items-center">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
