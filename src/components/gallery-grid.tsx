"use client";

import { useState } from "react";
import { X, ImageIcon } from "lucide-react";
import type { GalleryItem } from "@/lib/content";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-panther-charcoal"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-panther-charcoal-light to-panther-black text-panther-muted transition group-hover:text-panther-gold">
              <ImageIcon className="h-8 w-8" />
              <span className="px-3 text-center text-xs">{item.alt}</span>
            </div>
            <span className="absolute bottom-2 left-2 rounded-full bg-panther-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-panther-gold">
              {item.category}
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close preview"
            className="absolute right-6 top-6 rounded-full border border-white/20 p-2 text-panther-cream hover:border-panther-gold hover:text-panther-gold"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex aspect-video w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-panther-charcoal text-panther-muted">
            <ImageIcon className="h-12 w-12" />
            <p className="px-6 text-center">{active.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
