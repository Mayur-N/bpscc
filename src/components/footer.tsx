import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/social-icons";
import { Container } from "@/components/container";
import { ClubLogo } from "@/components/club-logo";
import { getClub } from "@/lib/content";

export function Footer() {
  const club = getClub();

  return (
    <footer className="border-t border-white/10 bg-panther-charcoal">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <ClubLogo size="sm" priority={false} />
            <p className="text-lg font-extrabold text-panther-cream">
              Black Panthers <span className="text-panther-gold">CC</span>
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-panther-muted">
            {club.tagline}
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={club.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-white/10 p-2 text-panther-muted transition hover:border-panther-gold hover:text-panther-gold"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={club.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rounded-full border border-white/10 p-2 text-panther-muted transition hover:border-panther-gold hover:text-panther-gold"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
            <a
              href={club.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-white/10 p-2 text-panther-muted transition hover:border-panther-gold hover:text-panther-gold"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-panther-cream">
            Quick Links
          </p>
          <ul className="space-y-2 text-sm text-panther-muted">
            <li><Link href="/squad" className="hover:text-panther-gold">Squad</Link></li>
            <li><Link href="/fixtures" className="hover:text-panther-gold">Fixtures &amp; Results</Link></li>
            <li><Link href="/gallery" className="hover:text-panther-gold">Events &amp; Gallery</Link></li>
            <li><Link href="/sponsors" className="hover:text-panther-gold">Sponsors</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-panther-cream">
            Club
          </p>
          <ul className="space-y-2 text-sm text-panther-muted">
            <li><Link href="/about" className="hover:text-panther-gold">About Us</Link></li>
            <li><Link href="/committee" className="hover:text-panther-gold">Leadership</Link></li>
            <li><Link href="/contact" className="hover:text-panther-gold">Membership Inquiry</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-panther-cream">
            Contact
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
              <span>{club.homeGround.name}</span>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10 py-6 text-center text-xs text-panther-muted">
        © {new Date().getFullYear()} {club.name}. All rights reserved.
      </div>
    </footer>
  );
}
