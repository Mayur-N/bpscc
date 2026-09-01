import { NextResponse } from "next/server";

const INQUIRY_TYPES = [
  "Join as a Player",
  "Sponsorship",
  "General Query",
  "Match Challenge",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, inquiryType, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Please provide a valid name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }
  if (phone !== undefined && phone !== "" && (typeof phone !== "string" || phone.length > 30)) {
    return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
  }
  if (
    typeof inquiryType !== "string" ||
    !INQUIRY_TYPES.includes(inquiryType as (typeof INQUIRY_TYPES)[number])
  ) {
    return NextResponse.json({ error: "Please select a valid inquiry type." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length < 10 || message.length > 2000) {
    return NextResponse.json(
      { error: "Please provide a message of at least 10 characters." },
      { status: 400 }
    );
  }

  // In production this would forward to an email service, CRM, or the CMS inbox.
  console.log("New membership inquiry:", { name, email, phone, inquiryType });

  return NextResponse.json({ ok: true });
}
