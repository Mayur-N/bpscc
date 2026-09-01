import { cn } from "@/lib/utils";
import type { Sponsor } from "@/lib/content";

const TIER_STYLES: Record<Sponsor["tier"], string> = {
  Platinum: "border-panther-gold/40 bg-panther-gold/5",
  Gold: "border-panther-gold-dark/50 bg-panther-gold-dark/10",
  Silver: "border-white/15 bg-white/5",
};

export function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  const tiers: Sponsor["tier"][] = ["Platinum", "Gold", "Silver"];

  return (
    <div className="space-y-10">
      {tiers.map((tier) => {
        const tierSponsors = sponsors.filter((s) => s.tier === tier);
        if (tierSponsors.length === 0) return null;
        return (
          <div key={tier}>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-panther-muted">
              {tier} Partners
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {tierSponsors.map((sponsor) => (
                <a
                  key={sponsor.id}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={cn(
                    "flex h-28 items-center justify-center rounded-2xl border p-4 text-center text-sm font-bold text-panther-cream transition hover:-translate-y-0.5",
                    TIER_STYLES[tier]
                  )}
                >
                  {sponsor.name}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
