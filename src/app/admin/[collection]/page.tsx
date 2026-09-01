"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ADMIN_COLLECTIONS } from "@/lib/admin-collections";
import { JsonField, type JsonValue } from "@/components/admin/json-field";

type Status = "loading" | "idle" | "saving" | "saved" | "error";

export default function AdminCollectionPage() {
  const params = useParams<{ collection: string }>();
  const collection = params.collection;
  const meta = ADMIN_COLLECTIONS[collection];

  const [data, setData] = useState<JsonValue | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!meta) return;
    fetch(`/api/admin/content/${collection}`)
      .then(async (response) => {
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to load content.");
        }
        return response.json();
      })
      .then((body) => {
        setData(body.data);
        setStatus("idle");
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load content.");
        setStatus("error");
      });
  }, [collection, meta]);

  if (!meta) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-panther-cream">Unknown collection.</p>
        <Link href="/admin" className="text-sm text-panther-gold hover:text-panther-gold-dark">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  async function handleSave() {
    setStatus("saving");
    setError("");
    try {
      const response = await fetch(`/api/admin/content/${collection}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to save.");
      }
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to save.");
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/admin" className="text-sm text-panther-gold hover:text-panther-gold-dark">
        ← Back to dashboard
      </Link>
      <h1 className="mb-6 mt-3 text-2xl font-black text-panther-cream">{meta.label}</h1>

      {status === "loading" && <p className="text-panther-muted">Loading…</p>}
      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      {data !== null && status !== "loading" && (
        <div className="space-y-6">
          <JsonField value={data} onChange={setData} />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={status === "saving"}
              className="rounded-full bg-panther-gold px-6 py-3 text-sm font-bold text-panther-black transition hover:bg-panther-gold-dark disabled:opacity-60"
            >
              {status === "saving" ? "Saving…" : "Save changes"}
            </button>
            {status === "saved" && (
              <p className="text-sm font-semibold text-panther-gold">Saved.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
