import { CalendarDays, MapPin } from "lucide-react";
import type { Fixture } from "@/lib/content";

export function FixtureCard({ fixture }: { fixture: Fixture }) {
  const formattedDate = new Date(fixture.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-panther-charcoal p-6 transition hover:border-panther-gold/40">
      <div>
        <span className="mb-3 inline-block rounded-full bg-panther-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-panther-gold">
          {fixture.matchType}
        </span>
        <p className="text-xl font-bold text-panther-cream">
          Black Panthers CC <span className="text-panther-muted">vs</span> {fixture.opponent}
        </p>
        <div className="mt-4 space-y-2 text-sm text-panther-muted">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-panther-gold" />
            {formattedDate} · {fixture.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-panther-gold" />
            {fixture.venue}
          </p>
        </div>
      </div>
      {fixture.mapUrl && (
        <a
          href={fixture.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-sm font-semibold text-panther-gold hover:text-panther-gold-dark"
        >
          View venue map →
        </a>
      )}
    </div>
  );
}
