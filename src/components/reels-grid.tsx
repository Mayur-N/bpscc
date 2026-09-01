import { PlayCircle } from "lucide-react";
import type { Reel } from "@/lib/content";

export function ReelsGrid({ reels }: { reels: Reel[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reels.map((reel) => (
        <div
          key={reel.id}
          className="overflow-hidden rounded-2xl border border-white/10 bg-panther-charcoal"
        >
          <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-panther-charcoal-light to-panther-black text-panther-gold">
            <PlayCircle className="h-12 w-12" />
          </div>
          <div className="p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-panther-gold">
              {reel.platform}
            </span>
            <p className="mt-1 text-sm font-semibold text-panther-cream">{reel.title}</p>
            <a
              href={reel.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs font-semibold text-panther-gold hover:text-panther-gold-dark"
            >
              Watch now →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
