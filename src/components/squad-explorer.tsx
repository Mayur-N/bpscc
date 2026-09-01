"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PlayerCard } from "@/components/player-card";
import type { Player, PlayerRole } from "@/lib/content";

const ROLES: (PlayerRole | "All")[] = [
  "All",
  "Top-Order Batsman",
  "Medium-Fast Bowler",
  "All-Rounder",
  "Wicket-Keeper",
];

export function SquadExplorer({ players }: { players: Player[] }) {
  const [role, setRole] = useState<(typeof ROLES)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return players.filter((player) => {
      const matchesRole = role === "All" || player.role === role;
      const matchesQuery = player.name.toLowerCase().includes(query.toLowerCase());
      return matchesRole && matchesQuery;
    });
  }, [players, role, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                role === r
                  ? "border-panther-gold bg-panther-gold/15 text-panther-gold"
                  : "border-white/10 text-panther-muted hover:text-panther-cream"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-panther-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players..."
            className="w-full rounded-full border border-white/10 bg-panther-charcoal py-2 pl-9 pr-4 text-sm text-panther-cream outline-none focus:border-panther-gold"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-panther-charcoal p-10 text-center text-panther-muted">
          No players match your search.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
}
