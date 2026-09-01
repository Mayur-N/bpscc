import { MapPin, CalendarClock } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { getClub } from "@/lib/content";

export const metadata = { title: "About | Black Panthers Cricket Club" };

export default function AboutPage() {
  const club = getClub();

  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          eyebrow="About Us"
          title={`The Story of ${club.name}`}
          description={club.history}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-panther-charcoal p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-panther-gold">Mission</p>
            <p className="mt-2 text-panther-muted">{club.mission}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-panther-charcoal p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-panther-gold">Vision</p>
            <p className="mt-2 text-panther-muted">{club.vision}</p>
          </div>
        </div>

        <div className="mt-10">
          <SectionHeading title="Core Values" />
          <div className="grid gap-4 sm:grid-cols-3">
            {club.values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-white/10 bg-panther-charcoal p-5">
                <p className="font-bold text-panther-gold">{value.title}</p>
                <p className="mt-1 text-sm text-panther-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-panther-charcoal p-6">
            <MapPin className="h-6 w-6 text-panther-gold" />
            <p className="mt-3 font-bold text-panther-cream">Home Grounds</p>
            <p className="mt-1 text-sm text-panther-muted">{club.homeGround.name}</p>
            <p className="text-sm text-panther-muted">{club.homeGround.address}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-panther-charcoal p-6">
            <CalendarClock className="h-6 w-6 text-panther-gold" />
            <p className="mt-3 font-bold text-panther-cream">Training Sessions</p>
            <p className="mt-1 text-sm text-panther-muted">{club.training.days}, {club.training.time}</p>
            <p className="text-sm text-panther-muted">Weekend nets: {club.training.weekendNets}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

