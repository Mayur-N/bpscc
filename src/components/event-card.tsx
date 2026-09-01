import { Clock, MapPin } from "lucide-react";
import type { ClubEvent } from "@/lib/content";

export function EventCard({ event }: { event: ClubEvent }) {
  const date = new Date(event.date);
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", { month: "short" });

  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-panther-charcoal p-6 transition hover:border-panther-gold/40">
      <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-panther-gold/10 text-panther-gold">
        <span className="text-xl font-black leading-none">{day}</span>
        <span className="text-xs font-bold uppercase">{month}</span>
      </div>
      <div>
        <span className="mb-1 inline-block text-xs font-bold uppercase tracking-wider text-panther-gold">
          {event.category}
        </span>
        <p className="text-lg font-bold text-panther-cream">{event.title}</p>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-panther-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {event.time}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {event.location}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-panther-muted">{event.description}</p>
      </div>
    </div>
  );
}
