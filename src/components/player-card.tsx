import { Avatar } from "@/components/avatar";
import type { Player } from "@/lib/content";

export function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-panther-charcoal p-6 transition hover:border-panther-gold/40">
      <div className="flex items-center gap-4">
        <Avatar name={player.name} size="md" />
        <div>
          <p className="text-lg font-bold text-panther-cream">{player.name}</p>
          <p className="text-sm font-semibold text-panther-gold">{player.role}</p>
        </div>
        <span className="ml-auto text-3xl font-black text-panther-charcoal-light transition group-hover:text-panther-gold/40">
          #{player.jersey}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-y-1 text-xs text-panther-muted">
        <dt className="font-semibold text-panther-muted">Batting</dt>
        <dd className="text-right text-panther-cream">{player.battingStyle}</dd>
        <dt className="font-semibold text-panther-muted">Bowling</dt>
        <dd className="text-right text-panther-cream">{player.bowlingStyle}</dd>
      </dl>

      <div className="mt-4 grid grid-cols-4 gap-2 border-t border-white/10 pt-4 text-center">
        <div>
          <p className="text-sm font-bold text-panther-cream">{player.stats.matches}</p>
          <p className="text-[10px] uppercase tracking-wide text-panther-muted">Mat</p>
        </div>
        <div>
          <p className="text-sm font-bold text-panther-cream">{player.stats.runs}</p>
          <p className="text-[10px] uppercase tracking-wide text-panther-muted">Runs</p>
        </div>
        <div>
          <p className="text-sm font-bold text-panther-cream">{player.stats.wickets}</p>
          <p className="text-[10px] uppercase tracking-wide text-panther-muted">Wkts</p>
        </div>
        <div>
          <p className="text-sm font-bold text-panther-cream">{player.stats.catches}</p>
          <p className="text-[10px] uppercase tracking-wide text-panther-muted">Ct</p>
        </div>
      </div>
    </div>
  );
}
