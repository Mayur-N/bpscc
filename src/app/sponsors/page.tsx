import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SponsorGrid } from "@/components/sponsor-grid";
import { getSponsors } from "@/lib/content";

export const metadata = { title: "Sponsors | Black Panthers Cricket Club" };

export default function SponsorsPage() {
  const sponsors = getSponsors();

  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Our Partners"
          title="Sponsors & Partners"
          description="We're grateful to the businesses that back the pride and help us grow the game."
        />
        <SponsorGrid sponsors={sponsors} />

        <div className="mt-14 rounded-2xl border border-panther-gold/20 bg-panther-charcoal p-8 text-center">
          <p className="text-lg font-bold text-panther-cream">Interested in sponsoring the Panthers?</p>
          <p className="mt-2 text-panther-muted">
            Get your brand in front of our players, families, and fans.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-block rounded-full bg-panther-gold px-6 py-3 text-sm font-bold text-panther-black transition hover:bg-panther-gold-dark"
          >
            Become a Sponsor
          </a>
        </div>
      </Container>
    </div>
  );
}
