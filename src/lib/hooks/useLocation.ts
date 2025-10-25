"use client";

import { useState, useEffect } from "react";
import { LocationData } from "@/types/prayer";

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>({
    city: "Istanbul",
    country: "Turkey",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getLocationFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      // Reverse geocoding ile şehir ve ülke bilgisi al
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to get location information");
      }

      const data = await response.json();
      const city = data.address.city || data.address.town || data.address.village || "Istanbul";
      const country = data.address.country || "Turkey";

      setLocation({
        city,
        country,
        latitude,
        longitude,
      });
    } catch (err) {
      console.error("Error getting location:", err);
      // Fallback to default
      setLocation({
        city: "Istanbul",
        country: "Turkey",
      });
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getLocationFromCoordinates(latitude, longitude);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
        // Keep default location
      }
    );
  };

  return { location, loading, error, requestLocation, setLocation };
}

