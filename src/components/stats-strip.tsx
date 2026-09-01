import { Trophy, Users, Swords, Percent } from "lucide-react";
import { Container } from "@/components/container";
import { getClub } from "@/lib/content";

export function StatsStrip() {
  const club = getClub();
  const stats = [
    { label: "Trophies Won", value: club.stats.trophies, icon: Trophy },
    { label: "Active Players", value: club.stats.activePlayers, icon: Users },
    { label: "Matches Played", value: club.stats.matchesPlayed, icon: Swords },
    { label: "Win Percentage", value: `${club.stats.winPercentage}%`, icon: Percent },
  ];

  return (
    <section className="bg-panther-black py-16">
      <Container>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-panther-charcoal p-6 text-center transition hover:border-panther-gold/40"
            >
              <Icon className="mx-auto mb-3 h-7 w-7 text-panther-gold" />
              <p className="text-3xl font-black text-panther-cream">{value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-panther-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
