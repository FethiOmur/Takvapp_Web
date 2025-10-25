"use client";

import { useState, useEffect } from "react";
import { getPrayerTimes } from "@/lib/api/aladhan";
import { PrayerTimes, LocationData } from "@/types/prayer";

export function usePrayerTimes(location: LocationData | null) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) {
      setLoading(false);
      return;
    }

    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPrayerTimes(location);
        setPrayerTimes(response.data.timings);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch prayer times");
        setPrayerTimes(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [location?.city, location?.country]);

  return { prayerTimes, loading, error };
}

