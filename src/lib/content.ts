import club from "@/content/club.json";
import nextMatch from "@/content/next-match.json";
import committee from "@/content/committee.json";
import players from "@/content/players.json";
import fixtures from "@/content/fixtures.json";
import results from "@/content/results.json";
import events from "@/content/events.json";
import gallery from "@/content/gallery.json";
import reels from "@/content/reels.json";
import sponsors from "@/content/sponsors.json";

export type Club = typeof club;
export type NextMatch = typeof nextMatch;

export type CommitteeMember = {
  id: string;
  name: string;
  designation: string;
  bio: string;
  photo?: string;
  email?: string;
  instagram?: string;
  linkedin?: string;
};

export type PlayerRole =
  | "Top-Order Batsman"
  | "Medium-Fast Bowler"
  | "All-Rounder"
  | "Wicket-Keeper";

export type Player = {
  id: string;
  name: string;
  jersey: number;
  role: PlayerRole;
  battingStyle: string;
  bowlingStyle: string;
  photo?: string;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    catches: number;
    average: number;
    strikeRate: number;
  };
};

export type Fixture = {
  id: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  matchType: string;
  mapUrl: string;
  opponentLogo?: string;
};

export type Result = {
  id: string;
  opponent: string;
  date: string;
  result: "Won" | "Lost" | "Draw";
  teamScore: string;
  opponentScore: string;
  summary: string;
  scorecardUrl?: string;
};

export type ClubEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
};

export type GalleryItem = {
  id: string;
  alt: string;
  category: string;
  src?: string;
};

export type Reel = {
  id: string;
  platform: string;
  title: string;
  embedUrl: string;
  thumbnail?: string;
};

export type Sponsor = {
  id: string;
  name: string;
  url: string;
  tier: "Platinum" | "Gold" | "Silver";
  logo?: string;
};

export function getClub(): Club {
  return club;
}

export function getNextMatch(): NextMatch {
  return nextMatch;
}

export function getCommittee(): CommitteeMember[] {
  return committee as CommitteeMember[];
}

export function getPlayers(): Player[] {
  return players as Player[];
}

export function getFixtures(): Fixture[] {
  return [...(fixtures as Fixture[])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getResults(): Result[] {
  return [...(results as Result[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getEvents(): ClubEvent[] {
  return [...(events as ClubEvent[])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getGallery(): GalleryItem[] {
  return gallery as GalleryItem[];
}

export function getReels(): Reel[] {
  return reels as Reel[];
}

export function getSponsors(): Sponsor[] {
  return sponsors as Sponsor[];
}
