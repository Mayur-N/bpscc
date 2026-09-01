import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { CommitteeCard } from "@/components/committee-card";
import { getCommittee } from "@/lib/content";

export const metadata = { title: "Committee | Black Panthers Cricket Club" };

export default function CommitteePage() {
  const committee = getCommittee();

  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Leadership"
          title="Committee & Management"
          description="Meet the people steering the club forward, on and off the field."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {committee.map((member) => (
            <CommitteeCard key={member.id} member={member} />
          ))}
        </div>
      </Container>
    </div>
  );
}
