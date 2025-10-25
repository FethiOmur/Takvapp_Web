import { SurahDetailClient } from "./surah-detail-client";

export function generateStaticParams() {
  return Array.from({ length: 114 }, (_, index) => ({
    id: String(index + 1),
  }));
}

export const dynamicParams = false;

export default async function SurahDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SurahDetailClient id={id} />;
}
