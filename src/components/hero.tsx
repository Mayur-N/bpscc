import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/container";
import { getClub } from "@/lib/content";

export function Hero() {
  const club = getClub();

  return (
    <section className="relative overflow-hidden bg-panther-black">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(224,179,76,0.22), transparent 45%), radial-gradient(circle at 80% 0%, rgba(125,35,51,0.22), transparent 40%)",
        }}
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="relative h-[26rem] w-[26rem] sm:h-[34rem] sm:w-[34rem]"
          style={{
            WebkitMaskImage: "radial-gradient(circle, black 45%, transparent 72%)",
            maskImage: "radial-gradient(circle, black 45%, transparent 72%)",
          }}
        >
          <Image
            src="/images/logo.png"
            alt=""
            fill
            sizes="(min-width: 640px) 34rem, 26rem"
            className="object-contain opacity-[0.14] mix-blend-screen"
          />
        </div>
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0)_0%,rgba(10,11,13,1)_100%)]"
        aria-hidden
      />
      <Container className="relative py-24 sm:py-32">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-panther-gold/30 bg-panther-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-panther-gold">
          Est. {club.founded} · Riverside District
        </p>
        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-panther-cream sm:text-6xl">
          Fearless on the Field,{" "}
          <span className="text-gradient-panther">United as a Pride.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-panther-muted">
          {club.name} is a premier grassroots club built on discipline, brotherhood,
          and relentless competitive spirit. Join us on our journey to the top of
          the league.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/fixtures"
            className="inline-flex items-center gap-2 rounded-full bg-panther-gold px-6 py-3 text-sm font-bold text-panther-black transition hover:bg-panther-gold-dark"
          >
            <CalendarDays className="h-4 w-4" />
            View Fixtures
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-panther-cream transition hover:border-panther-gold hover:text-panther-gold"
          >
            Join the Club
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
