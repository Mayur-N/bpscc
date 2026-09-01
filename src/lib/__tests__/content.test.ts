import { describe, expect, it } from "vitest";
import {
  getClub,
  getCommittee,
  getEvents,
  getFixtures,
  getGallery,
  getPlayers,
  getReels,
  getResults,
  getSponsors,
} from "@/lib/content";

describe("content getters", () => {
  it("returns club info with required fields", () => {
    const club = getClub();
    expect(club.name).toBe("Black Panthers Cricket Club");
    expect(club.social.email).toMatch(/@/);
    expect(Array.isArray(club.values)).toBe(true);
  });

  it("sorts fixtures chronologically (soonest first)", () => {
    const fixtures = getFixtures();
    const dates = fixtures.map((f) => new Date(f.date).getTime());
    const sorted = [...dates].sort((a, b) => a - b);
    expect(dates).toEqual(sorted);
  });

  it("sorts results reverse-chronologically (most recent first)", () => {
    const results = getResults();
    const dates = results.map((r) => new Date(r.date).getTime());
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  it("sorts events chronologically (soonest first)", () => {
    const events = getEvents();
    const dates = events.map((e) => new Date(e.date).getTime());
    const sorted = [...dates].sort((a, b) => a - b);
    expect(dates).toEqual(sorted);
  });

  it("returns players with well-formed stats", () => {
    const players = getPlayers();
    expect(players.length).toBeGreaterThan(0);
    for (const player of players) {
      expect(player.stats.matches).toBeGreaterThanOrEqual(0);
      expect(typeof player.name).toBe("string");
    }
  });

  it("every player, committee member, fixture, result, event, and sponsor has a unique id", () => {
    const collections = [
      getPlayers(),
      getCommittee(),
      getFixtures(),
      getResults(),
      getEvents(),
      getGallery(),
      getReels(),
      getSponsors(),
    ];
    for (const collection of collections) {
      const ids = collection.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("does not include any community-engagement content (removed per club request)", () => {
    const club = getClub();
    const events = getEvents();
    expect(club.values.some((v) => v.title === "Community")).toBe(false);
    expect(events.some((e) => e.category === "Community")).toBe(false);
  });
});
