import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "./client-layout";

export const metadata: Metadata = {
  title: "Takvapp - Namaz Vakitleri ve İslami İçerikler",
  description:
    "Modern İslami yaşam platformu. Namaz vakitleri, Kıble yönü, Kuran-ı Kerim okuma, Tesbihat ve Imam AI ile İslami sorularınıza anında cevap bulun.",
  keywords: [
    "namaz vakti",
    "kıble",
    "kuran",
    "islam",
    "takvim",
    "ezan",
    "tesbihat",
    "imam ai",
  ],
  authors: [{ name: "Takvapp Team" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://takvapp.com",
    title: "Takvapp - Namaz Vakitleri ve İslami İçerikler",
    description:
      "Modern İslami yaşam platformu. Namaz vakitleri, Kıble yönü, Kuran-ı Kerim okuma, Tesbihat ve Imam AI.",
    siteName: "Takvapp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
