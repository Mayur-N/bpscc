import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { EventCard } from "@/components/event-card";
import { GalleryGrid } from "@/components/gallery-grid";
import { ReelsGrid } from "@/components/reels-grid";
import { getEvents, getGallery, getReels } from "@/lib/content";

export const metadata = { title: "Events & Gallery | Black Panthers Cricket Club" };

export default function GalleryPage() {
  const events = getEvents();
  const gallery = getGallery();
  const reels = getReels();

  return (
    <div className="space-y-20 py-16">
      <Container>
        <SectionHeading
          eyebrow="What's On"
          title="Upcoming Events"
          description="Club events and training camps."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Container>

      <Container>
        <SectionHeading
          eyebrow="Social Hub"
          title="Media Gallery"
          description="Moments from match days, training, and club socials."
        />
        <GalleryGrid items={gallery} />
      </Container>

      <Container>
        <SectionHeading
          eyebrow="Watch"
          title="Reels & Highlights"
          description="The best sixes, wickets, and behind-the-scenes clips."
        />
        <ReelsGrid reels={reels} />
      </Container>
    </div>
  );
}
