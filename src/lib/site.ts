/** Absolute site origin — used for canonical URLs. Set NEXT_PUBLIC_SITE_URL on Vercel. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nycclinic.net"
).replace(/\/$/, "");

export const LINE_URL = "https://lin.ee/7oJgymx";
