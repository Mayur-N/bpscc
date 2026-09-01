import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { SquadExplorer } from "@/components/squad-explorer";
import { getPlayers } from "@/lib/content";

export const metadata = { title: "Squad | Black Panthers Cricket Club" };

export default function SquadPage() {
  const players = getPlayers();

  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Squad"
          title="Player Profiles"
          description="Filter by role or search for a player to view career stats and playing styles."
        />
        <SquadExplorer players={players} />
      </Container>
    </div>
  );
}
