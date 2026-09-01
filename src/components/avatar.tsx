import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Placeholder avatar used until real photos are uploaded to /public. */
export function Avatar({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-12 w-12 text-sm",
    md: "h-20 w-20 text-xl",
    lg: "h-32 w-32 text-3xl",
  };
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-panther-gold/30 bg-gradient-to-br from-panther-charcoal-light to-panther-black font-bold text-panther-gold",
        sizes[size],
        className
      )}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
