"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PrayerTimesCard } from "@/components/home/PrayerTimesCard";
import { AppPreviewSection } from "@/components/home/AppPreviewSection";
import { ImamAISection } from "@/components/home/ImamAISection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { TestimonialsMarquee } from "@/components/home/TestimonialsMarquee";
import { usePrayerTimes } from "@/lib/hooks/usePrayerTimes";
import { useLocation } from "@/lib/hooks/useLocation";
import { PrayerTimes } from "@/types/prayer";

export default function HomePage() {
  const { location } = useLocation();
  const { data: prayerData, isLoading } = usePrayerTimes(location);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string }>({
    name: "Öğle",
    time: "12:30",
  });

  useEffect(() => {
    if (prayerData?.data?.timings) {
      const timings = prayerData.data.timings;
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const prayers = [
        { name: "İmsak", time: timings.Fajr, key: "Fajr" },
        { name: "Öğle", time: timings.Dhuhr, key: "Dhuhr" },
        { name: "İkindi", time: timings.Asr, key: "Asr" },
        { name: "Akşam", time: timings.Maghrib, key: "Maghrib" },
        { name: "Yatsı", time: timings.Isha, key: "Isha" },
      ];

      for (const prayer of prayers) {
        const [hour, minute] = prayer.time.split(":").map(Number);
        if (
          hour > currentHour ||
          (hour === currentHour && minute > currentMinute)
        ) {
          setNextPrayer({ name: prayer.name, time: prayer.time });
          break;
        }
      }
    }
  }, [prayerData]);

  const mockPrayerTimes: PrayerTimes = prayerData?.data?.timings || {
    Fajr: "05:30",
    Dhuhr: "12:45",
    Asr: "15:30",
    Maghrib: "18:15",
    Isha: "19:45",
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <HeroSection
          city={location.city}
          country={location.country}
          nextPrayer={nextPrayer.name}
          nextPrayerTime={nextPrayer.time}
        />

        <div className="relative z-10 -mt-24 sm:-mt-28">
          <PrayerTimesCard prayerTimes={mockPrayerTimes} currentPrayer="Dhuhr" />
        </div>

        <div className="relative z-0 mt-16 sm:mt-24 lg:mt-32">
          <AppPreviewSection />
        </div>

        <ImamAISection />

        <FeaturesGrid />

        <TestimonialsMarquee />
      </main>

      <Footer />
    </div>
  );
}
