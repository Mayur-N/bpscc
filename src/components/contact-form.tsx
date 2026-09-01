"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const INQUIRY_TYPES = [
  "Join as a Player",
  "Sponsorship",
  "General Query",
  "Match Challenge",
];

type Status = "idle" | "submitting" | "success" | "error";

// On static hosts (e.g. GitLab Pages) there is no /api/contact server, so point
// NEXT_PUBLIC_CONTACT_FORM_ENDPOINT at an external form backend (Formspree, Basin, etc).
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "/api/contact";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-panther-gold/30 bg-panther-gold/10 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-panther-gold" />
        <p className="text-lg font-bold text-panther-cream">Thanks for reaching out!</p>
        <p className="text-sm text-panther-muted">
          Our committee will get back to you within 2–3 business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-panther-gold hover:text-panther-gold-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-panther-cream">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            className="w-full rounded-xl border border-white/10 bg-panther-charcoal px-4 py-2.5 text-panther-cream outline-none focus:border-panther-gold"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-panther-cream">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            className="w-full rounded-xl border border-white/10 bg-panther-charcoal px-4 py-2.5 text-panther-cream outline-none focus:border-panther-gold"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-panther-cream">
            Phone Number <span className="text-panther-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={30}
            className="w-full rounded-xl border border-white/10 bg-panther-charcoal px-4 py-2.5 text-panther-cream outline-none focus:border-panther-gold"
          />
        </div>
        <div>
          <label htmlFor="inquiryType" className="mb-1.5 block text-sm font-semibold text-panther-cream">
            Inquiry Type
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            required
            defaultValue=""
            className="w-full rounded-xl border border-white/10 bg-panther-charcoal px-4 py-2.5 text-panther-cream outline-none focus:border-panther-gold"
          >
            <option value="" disabled>
              Select an option
            </option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-panther-cream">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-panther-charcoal px-4 py-2.5 text-panther-cream outline-none focus:border-panther-gold"
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-panther-gold px-6 py-3 text-sm font-bold text-panther-black transition hover:bg-panther-gold-dark disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Message
      </button>
    </form>
  );
}
