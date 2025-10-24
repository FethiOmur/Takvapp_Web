"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";

// Sample surahs (first 10)
const surahs = [
  { number: 1, name: "Fatiha", arabicName: "الفاتحة", ayahCount: 7, revelationType: "Mecci" },
  { number: 2, name: "Bakara", arabicName: "البقرة", ayahCount: 286, revelationType: "Medeni" },
  { number: 3, name: "Âl-i İmran", arabicName: "آل عمران", ayahCount: 200, revelationType: "Medeni" },
  { number: 4, name: "Nisa", arabicName: "النساء", ayahCount: 176, revelationType: "Medeni" },
  { number: 5, name: "Maide", arabicName: "المائدة", ayahCount: 120, revelationType: "Medeni" },
  { number: 6, name: "En'am", arabicName: "الأنعام", ayahCount: 165, revelationType: "Mecci" },
  { number: 7, name: "A'raf", arabicName: "الأعراف", ayahCount: 206, revelationType: "Mecci" },
  { number: 8, name: "Enfal", arabicName: "الأنفال", ayahCount: 75, revelationType: "Medeni" },
  { number: 9, name: "Tevbe", arabicName: "التوبة", ayahCount: 129, revelationType: "Medeni" },
  { number: 10, name: "Yunus", arabicName: "يونس", ayahCount: 109, revelationType: "Mecci" },
];

export default function QuranPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="px-4 pb-20 pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Kuran-ı Kerim
            </h1>
            <p className="text-xl text-foreground/70">
              Kuran-ı Kerim&apos;i okuyun ve dinleyin
            </p>
          </div>

          {/* Search */}
          <div className="mx-auto mb-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
              <Input
                placeholder="Sure veya ayet ara..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Surah List */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {surahs.map((surah) => (
              <Link
                key={surah.number}
                href={`/quran/${surah.number}`}
                className="glass-card rounded-2xl p-6 hover:bg-muted/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {/* Number Badge */}
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold">{surah.number}</span>
                  </div>

                  {/* Surah Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold group-hover:text-primary transition-colors">
                        {surah.name}
                      </h3>
                      <span className="text-2xl">{surah.arabicName}</span>
                    </div>
                    <p className="text-sm text-foreground/60">
                      {surah.ayahCount} Ayet • {surah.revelationType}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 text-center">
            <p className="text-foreground/60">
              Tüm sureler ve detaylı okuma özellikleri yakında eklenecek...
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
