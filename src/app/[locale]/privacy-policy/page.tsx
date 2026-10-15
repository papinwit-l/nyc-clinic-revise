import LegalPageView, { legalMetadata } from "@/components/legal/LegalPageView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return legalMetadata(locale, "privacy-policy");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LegalPageView locale={locale} slug="privacy-policy" />;
}
