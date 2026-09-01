import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SquadExplorer } from "@/components/squad-explorer";
import type { Player } from "@/lib/content";

const players: Player[] = [
  {
    id: "p1",
    name: "Alex Carter",
    jersey: 1,
    role: "Top-Order Batsman",
    battingStyle: "Right-hand bat",
    bowlingStyle: "—",
    stats: { matches: 10, runs: 300, wickets: 0, catches: 5, average: 30, strikeRate: 120 },
  },
  {
    id: "p2",
    name: "Sam Rivera",
    jersey: 2,
    role: "Medium-Fast Bowler",
    battingStyle: "Left-hand bat",
    bowlingStyle: "Left-arm medium",
    stats: { matches: 12, runs: 50, wickets: 20, catches: 3, average: 15, strikeRate: 80 },
  },
];

describe("SquadExplorer", () => {
  it("renders every player by default", () => {
    render(<SquadExplorer players={players} />);
    expect(screen.getByText("Alex Carter")).toBeInTheDocument();
    expect(screen.getByText("Sam Rivera")).toBeInTheDocument();
  });

  it("filters players by role", async () => {
    const user = userEvent.setup();
    render(<SquadExplorer players={players} />);

    await user.click(screen.getByRole("button", { name: "Medium-Fast Bowler" }));

    expect(screen.queryByText("Alex Carter")).not.toBeInTheDocument();
    expect(screen.getByText("Sam Rivera")).toBeInTheDocument();
  });

  it("filters players by search query", async () => {
    const user = userEvent.setup();
    render(<SquadExplorer players={players} />);

    await user.type(screen.getByPlaceholderText("Search players..."), "alex");

    expect(screen.getByText("Alex Carter")).toBeInTheDocument();
    expect(screen.queryByText("Sam Rivera")).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<SquadExplorer players={players} />);

    await user.type(screen.getByPlaceholderText("Search players..."), "nobody");

    expect(screen.getByText("No players match your search.")).toBeInTheDocument();
  });
});
