import Link from "next/link";
import { ADMIN_COLLECTIONS } from "@/lib/admin-collections";
import { LogoutButton } from "@/components/admin/logout-button";

export const metadata = { title: "Admin | Black Panthers Cricket Club" };

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-black text-panther-cream">Content Admin</h1>
        <LogoutButton />
      </div>
      <p className="mb-8 text-sm text-panther-muted">
        Edit site content below — no code or JSON editing required. Changes save to the
        content files immediately; a developer (or an auto-deploying staging server)
        still needs to commit &amp; push them to publish live.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {Object.entries(ADMIN_COLLECTIONS).map(([key, meta]) => (
          <li key={key}>
            <Link
              href={`/admin/${key}`}
              className="block rounded-xl border border-white/10 bg-panther-charcoal p-4 font-semibold text-panther-cream transition hover:border-panther-gold"
            >
              {meta.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
