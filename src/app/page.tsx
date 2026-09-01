import Link from "next/link";
import { Hero } from "@/components/hero";
import { MatchTicker } from "@/components/match-ticker";
import { StatsStrip } from "@/components/stats-strip";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { FixtureCard } from "@/components/fixture-card";
import { SponsorGrid } from "@/components/sponsor-grid";
import { getClub, getFixtures, getSponsors } from "@/lib/content";

export default function Home() {
  const club = getClub();
  const fixtures = getFixtures().slice(0, 3);
  const sponsors = getSponsors();

  return (
    <>
      <Hero />
      <MatchTicker />
      <StatsStrip />

      <section className="bg-panther-charcoal py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About the Club"
              title="A pride built on discipline and brotherhood."
              description={club.history}
            />
            <Link
              href="/about"
              className="inline-block text-sm font-bold text-panther-gold hover:text-panther-gold-dark"
            >
              Learn more about our story →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {club.values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-white/10 bg-panther-black p-5"
              >
                <p className="font-bold text-panther-gold">{value.title}</p>
                <p className="mt-1 text-sm text-panther-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-panther-black py-20">
        <Container>
          <SectionHeading
            eyebrow="Fixtures"
            title="Upcoming Matches"
            description="Catch the Panthers in action — mark your calendar and come support the pride."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fixtures.map((fixture) => (
              <FixtureCard key={fixture.id} fixture={fixture} />
            ))}
          </div>
          <Link
            href="/fixtures"
            className="mt-8 inline-block text-sm font-bold text-panther-gold hover:text-panther-gold-dark"
          >
            View full schedule &amp; results →
          </Link>
        </Container>
      </section>

      <section className="bg-panther-charcoal py-20">
        <Container>
          <SectionHeading
            eyebrow="Our Partners"
            title="Sponsors & Partners"
            description="Proudly backed by businesses that believe in our club and its fans."
          />
          <SponsorGrid sponsors={sponsors.slice(0, 4)} />
        </Container>
      </section>

      <section className="bg-panther-black py-20">
        <Container className="rounded-3xl border border-panther-gold/20 bg-gradient-to-br from-panther-charcoal to-panther-black p-10 text-center sm:p-16">
          <h2 className="text-3xl font-black text-panther-cream sm:text-4xl">
            Ready to join the pride?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-panther-muted">
            Whether you want to play, sponsor, or support — we&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-panther-gold px-8 py-3 text-sm font-bold text-panther-black transition hover:bg-panther-gold-dark"
          >
            Get in Touch
          </Link>
        </Container>
      </section>
    </>
  );
}
