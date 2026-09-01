import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import { getClub } from "@/lib/content";

export const metadata = { title: "Contact | Black Panthers Cricket Club" };

export default function ContactPage() {
  const club = getClub();

  return (
    <div className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact & Membership Inquiry"
          description="Interested in playing, sponsoring, or partnering with us? Send us a message."
        />

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-panther-charcoal p-6 sm:p-8">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-panther-charcoal p-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-wider text-panther-cream">
                Direct Contact
              </p>
              <ul className="space-y-3 text-sm text-panther-muted">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-panther-gold" />
                  <a href={`mailto:${club.social.email}`} className="hover:text-panther-gold">
                    {club.social.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-panther-gold" />
                  <a href={`tel:${club.social.phone}`} className="hover:text-panther-gold">
                    {club.social.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-panther-gold" />
                  {club.homeGround.address}
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Club ground location"
                src={club.homeGround.mapEmbedUrl}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
