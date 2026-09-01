import { Mail } from "lucide-react";
import { InstagramIcon } from "@/components/social-icons";
import { Avatar } from "@/components/avatar";
import type { CommitteeMember } from "@/lib/content";

export function CommitteeCard({ member }: { member: CommitteeMember }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-panther-charcoal p-6 text-center transition hover:border-panther-gold/40">
      <Avatar name={member.name} size="lg" />
      <p className="mt-4 text-lg font-bold text-panther-cream">{member.name}</p>
      <p className="text-sm font-semibold text-panther-gold">{member.designation}</p>
      <p className="mt-3 text-sm leading-relaxed text-panther-muted">{member.bio}</p>
      {(member.email || member.instagram) && (
        <div className="mt-4 flex gap-3">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="rounded-full border border-white/10 p-2 text-panther-muted transition hover:border-panther-gold hover:text-panther-gold"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="rounded-full border border-white/10 p-2 text-panther-muted transition hover:border-panther-gold hover:text-panther-gold"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
