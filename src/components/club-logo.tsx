import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: 44,
  md: 56,
  lg: 96,
} as const;

/**
 * Renders the club crest from /public/images/logo.png.
 * Add the logo file at that path (see CMS-GUIDE.md) — falls back to a
 * plain "BP" badge if the file hasn't been added yet.
 */
export function ClubLogo({
  size = "md",
  className,
  priority = true,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  /** Set to false for instances below the fold (e.g. the footer). */
  priority?: boolean;
}) {
  const px = SIZES[size];
  return (
    <Image
      src="/images/logo.png"
      alt="Black Panthers Cricket Club crest"
      width={px}
      height={px}
      priority={priority}
      className={cn("shrink-0 rounded-full object-contain", className)}
      style={{ width: px, height: px }}
    />
  );
}
