import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FixturesTabs } from "@/components/fixtures-tabs";
import type { Fixture, Result } from "@/lib/content";

const fixtures: Fixture[] = [
  {
    id: "f1",
    opponent: "Test Rivals CC",
    date: "2026-12-01",
    time: "10:00",
    venue: "Test Ground",
    matchType: "T20",
    mapUrl: "https://example.com",
  },
];

const results: Result[] = [
  {
    id: "r1",
    opponent: "Old Rivals CC",
    date: "2026-01-01",
    result: "Won",
    teamScore: "200/5",
    opponentScore: "180/8",
    summary: "A comfortable win.",
  },
];

describe("FixturesTabs", () => {
  it("shows upcoming fixtures by default", () => {
    render(<FixturesTabs fixtures={fixtures} results={results} />);
    expect(screen.getByText(/Test Rivals CC/)).toBeInTheDocument();
    expect(screen.queryByText(/Old Rivals CC/)).not.toBeInTheDocument();
  });

  it("switches to past results when the tab is clicked", async () => {
    const user = userEvent.setup();
    render(<FixturesTabs fixtures={fixtures} results={results} />);

    await user.click(screen.getByRole("button", { name: "Past Results" }));

    expect(screen.getAllByText(/Old Rivals CC/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Test Rivals CC/)).not.toBeInTheDocument();
  });
});
