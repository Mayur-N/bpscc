import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { ADMIN_COLLECTIONS } from "@/lib/admin-collections";

export const runtime = "nodejs";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

function fileFor(collection: string) {
  return path.join(CONTENT_DIR, `${collection}.json`);
}

function validatePayload(shape: "array" | "object", data: unknown): string | null {
  if (shape === "array") {
    if (!Array.isArray(data)) return "Expected a list of entries.";
    const ids = new Set<string>();
    for (const entry of data) {
      if (typeof entry !== "object" || entry === null) {
        return "Every entry must be an object.";
      }
      const id = (entry as Record<string, unknown>).id;
      if (typeof id !== "string" || id.length === 0) {
        return 'Every entry needs a non-empty string "id" field.';
      }
      if (ids.has(id)) return `Duplicate id "${id}".`;
      ids.add(id);
    }
    return null;
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return "Expected a single JSON object.";
  }
  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const meta = ADMIN_COLLECTIONS[collection];
  if (!meta) {
    return NextResponse.json({ error: "Unknown content collection." }, { status: 404 });
  }

  try {
    const raw = await fs.readFile(fileFor(collection), "utf-8");
    return NextResponse.json({ data: JSON.parse(raw) });
  } catch {
    return NextResponse.json({ error: "Could not read content file." }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  const meta = ADMIN_COLLECTIONS[collection];
  if (!meta) {
    return NextResponse.json({ error: "Unknown content collection." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const data = (body as { data?: unknown } | null)?.data;
  const validationError = validatePayload(meta.shape, data);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    await fs.writeFile(fileFor(collection), `${JSON.stringify(data, null, 2)}\n`, "utf-8");
  } catch {
    return NextResponse.json({ error: "Could not write content file." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
