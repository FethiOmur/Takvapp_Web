"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Pause, Bookmark } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getSurahDetail } from "@/lib/api/quran-api";
import type { SurahDetail, Ayah } from "@/types/quran";

interface SurahDetailClientProps {
  id: string;
}

export function SurahDetailClient({ id }: SurahDetailClientProps) {
  const router = useRouter();
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchSurah = async () => {
      if (!id) return;

      try {
        const surahNumber = parseInt(id, 10);
        if (Number.isNaN(surahNumber)) {
          setLoading(false);
          return;
        }
        const data = await getSurahDetail(surahNumber);
        setSurah(data);
      } catch (error) {
        console.error("Failed to fetch surah:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-foreground/60">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60">Sure bulunamadı</p>
          <Button onClick={() => router.push("/quran")} className="mt-4">
            Geri Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="px-4 pb-20 pt-32">
        <div className="mx-auto max-w-4xl">
          <Button
            onClick={() => router.push("/quran")}
            variant="outline"
            className="mb-6 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>

          <div className="glass-card rounded-3xl p-8 mb-8 text-center">
            <div className="mb-4">
              <span className="text-sm text-foreground/60">
                {surah.revelationType} • {surah.numberOfAyahs} Ayet
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {surah.englishName}
            </h1>
            <p className="text-foreground/70 mb-6">
              {surah.englishNameTranslation}
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-black rounded-full"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Durdur
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Dinle
                  </>
                )}
              </Button>
            </div>
          </div>

          {surah.number !== 1 && surah.number !== 9 && (
            <div className="text-center mb-8 p-6 glass-card rounded-2xl">
              <p className="text-3xl font-arabic">
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّح۪يمِ
              </p>
              <p className="text-sm text-foreground/60 mt-2">
                Bismillahirrahmanirrahim
              </p>
            </div>
          )}

          <div className="space-y-6">
            {surah.ayahs?.map((ayah: Ayah) => (
              <div
                key={ayah.number}
                className="glass-card rounded-2xl p-6 hover:bg-muted/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-sm">
                      {ayah.numberInSurah}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-right mb-4">
                  <p className="text-2xl md:text-3xl leading-loose font-arabic">
                    {ayah.text}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-foreground/70">
                    Meal: (Türkçe meal yakında eklenecek...)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
