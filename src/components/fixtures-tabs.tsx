"use client";

import { useState } from "react";
import { FixtureCard } from "@/components/fixture-card";
import { ResultCard } from "@/components/result-card";
import type { Fixture, Result } from "@/lib/content";

export function FixturesTabs({
  fixtures,
  results,
}: {
  fixtures: Fixture[];
  results: Result[];
}) {
  const [tab, setTab] = useState<"upcoming" | "results">("upcoming");

  return (
    <div>
      <div className="mb-8 inline-flex rounded-full border border-white/10 bg-panther-charcoal p-1">
        {(["upcoming", "results"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-bold capitalize transition ${
              tab === t
                ? "bg-panther-gold text-panther-black"
                : "text-panther-muted hover:text-panther-cream"
            }`}
          >
            {t === "upcoming" ? "Upcoming Fixtures" : "Past Results"}
          </button>
        ))}
      </div>

      {tab === "upcoming" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fixtures.map((fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}
