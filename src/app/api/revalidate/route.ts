/**
 * POST /api/revalidate — called by the CMS when content changes.
 *
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "tags": ["service", "site"] }
 *
 * Sender: mu-plugin nyc-clinic-core, inc/revalidate.php (cms/README.md §5).
 * Each tag expires immediately ({ expire: 0 }), so the next visit renders
 * fresh content — an editor who saves and reloads sees the change.
 *
 * Env:
 *   REVALIDATE_SECRET   same value as NYC_REVALIDATE_SECRET in wp-config.php
 */

import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { WP_TAGS, type WpTag } from "@/lib/wp";

export const runtime = "nodejs";

function secretMatches(given: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET ?? "";
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!secretMatches(request.headers.get("x-revalidate-secret"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const requested = (body as { tags?: unknown })?.tags;
  if (!Array.isArray(requested)) {
    return NextResponse.json({ error: "Expected { tags: string[] }" }, { status: 400 });
  }

  // Only known tags: a typo or a new CMS type shouldn't silently do nothing.
  const tags = requested.filter((t): t is WpTag =>
    (WP_TAGS as readonly string[]).includes(t as string),
  );
  const ignored = requested.filter((t) => !tags.includes(t as WpTag));

  for (const tag of tags) {
    revalidateTag(tag, { expire: 0 });
  }

  return NextResponse.json({ revalidated: tags, ignored });
}
