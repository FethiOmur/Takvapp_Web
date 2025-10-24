"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PrayerTimesCard } from "@/components/home/PrayerTimesCard";
import { LocationSelector } from "@/components/prayer/LocationSelector";
import { MonthlyCalendar } from "@/components/prayer/MonthlyCalendar";
import { usePrayerTimes } from "@/lib/hooks/usePrayerTimes";
import { useLocation } from "@/lib/hooks/useLocation";
import { PrayerTimes, LocationData } from "@/types/prayer";
import { useState } from "react";

export default function PrayerTimesPage() {
  const { location: autoLocation, requestLocation } = useLocation();
  const [selectedLocation, setSelectedLocation] =
    useState<LocationData>(autoLocation);
  const { data: prayerData } = usePrayerTimes(selectedLocation);

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

      <main className="px-4 pb-20 pt-32">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold md:text-5xl">Namaz Vakitleri</h1>
            <p className="text-xl text-foreground/70">
              {selectedLocation.city}, {selectedLocation.country}
            </p>
          </div>

          <LocationSelector
            currentLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            onUseCurrentLocation={requestLocation}
          />

          <div className="mt-16">
            <PrayerTimesCard prayerTimes={mockPrayerTimes} />
          </div>

          <MonthlyCalendar location={selectedLocation} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
