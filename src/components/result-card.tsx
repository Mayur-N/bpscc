import { cn } from "@/lib/utils";
import type { Result } from "@/lib/content";

export function ResultCard({ result }: { result: Result }) {
  const formattedDate = new Date(result.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-panther-charcoal p-6">
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
            result.result === "Won" && "bg-panther-gold/15 text-panther-gold",
            result.result === "Lost" && "bg-red-500/15 text-red-400",
            result.result === "Draw" && "bg-panther-crimson/15 text-panther-crimson"
          )}
        >
          {result.result}
        </span>
        <span className="text-xs text-panther-muted">{formattedDate}</span>
      </div>
      <p className="mt-3 text-lg font-bold text-panther-cream">
        Black Panthers CC vs {result.opponent}
      </p>
      <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-panther-muted">
        <span>Panthers: {result.teamScore}</span>
        <span>{result.opponent}: {result.opponentScore}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-panther-muted">{result.summary}</p>
      {result.scorecardUrl && (
        <a
          href={result.scorecardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-panther-gold hover:text-panther-gold-dark"
        >
          Full scorecard →
        </a>
      )}
    </div>
  );
}
