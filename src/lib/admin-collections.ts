export type CollectionShape = "array" | "object";

export type AdminCollectionMeta = {
  label: string;
  shape: CollectionShape;
};

/** Allow-list mapping admin UI collection keys to content file shapes. */
export const ADMIN_COLLECTIONS: Record<string, AdminCollectionMeta> = {
  club: { label: "Club Info", shape: "object" },
  "next-match": { label: "Next Match Banner", shape: "object" },
  committee: { label: "Committee", shape: "array" },
  players: { label: "Squad / Players", shape: "array" },
  fixtures: { label: "Fixtures", shape: "array" },
  results: { label: "Results", shape: "array" },
  events: { label: "Events", shape: "array" },
  gallery: { label: "Gallery", shape: "array" },
  reels: { label: "Reels", shape: "array" },
  sponsors: { label: "Sponsors", shape: "array" },
};
