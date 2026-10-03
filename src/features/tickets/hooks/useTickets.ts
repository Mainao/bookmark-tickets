import { useEffect, useState } from "react";
import type { Ticket } from "@/types/ticket";
import { fetchTickets } from "../api/bookmarks";

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Outside the extension (e.g. `npm run dev`) chrome.bookmarks is unavailable.
    if (typeof chrome === "undefined" || !chrome.bookmarks) {
      setError(
        "Bookmarks are only available when loaded as a Chrome extension.",
      );
      setLoading(false);
      return;
    }

    let cancelled = false;
    const load = () => {
      fetchTickets()
        .then((result) => {
          if (cancelled) return;
          setTickets(result);
          setError(null);
        })
        .catch((e: unknown) => {
          if (!cancelled) setError(e instanceof Error ? e.message : String(e));
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    load();
    const events = [
      chrome.bookmarks.onCreated,
      chrome.bookmarks.onRemoved,
      chrome.bookmarks.onChanged,
      chrome.bookmarks.onMoved,
    ];
    events.forEach((event) => event.addListener(load));
    return () => {
      cancelled = true;
      events.forEach((event) => event.removeListener(load));
    };
  }, []);

  return { tickets, loading, error };
}
