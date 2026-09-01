import { MapPin, Clock, Swords } from "lucide-react";
import { Container } from "@/components/container";
import { getNextMatch } from "@/lib/content";

export function MatchTicker() {
  const match = getNextMatch();
  const formattedDate = new Date(match.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="border-y border-panther-gold/20 bg-panther-charcoal">
      <Container className="flex flex-col items-center gap-4 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-panther-gold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-panther-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-panther-gold" />
          </span>
          Next Fixture
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-panther-cream sm:justify-end">
          <span className="flex items-center gap-2 font-semibold">
            <Swords className="h-4 w-4 text-panther-crimson" />
            vs {match.opponent}
          </span>
          <span className="flex items-center gap-2 text-panther-muted">
            <Clock className="h-4 w-4" />
            {formattedDate}, {match.time}
          </span>
          <span className="flex items-center gap-2 text-panther-muted">
            <MapPin className="h-4 w-4" />
            {match.venue}
          </span>
          <span className="rounded-full bg-panther-gold/15 px-3 py-1 text-xs font-bold text-panther-gold">
            {match.matchType}
          </span>
        </div>
      </Container>
    </section>
  );
}
