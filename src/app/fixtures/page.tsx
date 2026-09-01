import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { FixturesTabs } from "@/components/fixtures-tabs";
import { getFixtures, getResults } from "@/lib/content";

export const metadata = { title: "Fixtures & Results | Black Panthers Cricket Club" };

export default function FixturesPage() {
  const fixtures = getFixtures();
  const results = getResults();

  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Schedule"
          title="Fixtures & Results"
          description="Follow the Panthers' season — upcoming matches and full past results archive."
        />
        <FixturesTabs fixtures={fixtures} results={results} />
      </Container>
    </div>
  );
}
