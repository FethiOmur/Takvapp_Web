import { PrayerTimesResponse, LocationData } from "@/types/prayer";

const ALADHAN_API_BASE = "http://api.aladhan.com/v1";

export async function getPrayerTimes(
  location: LocationData,
  method: number = 2,
  date?: string
): Promise<PrayerTimesResponse> {
  const { city, country } = location;
  const dateParam = date || new Date().toLocaleDateString("en-GB").replace(/\//g, "-");

  const url = `${ALADHAN_API_BASE}/timingsByCity/${dateParam}?city=${encodeURIComponent(
    city
  )}&country=${encodeURIComponent(country)}&method=${method}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch prayer times");
  }

  return response.json();
}

export async function getPrayerTimesByCoordinates(
  latitude: number,
  longitude: number,
  method: number = 2,
  date?: string
): Promise<PrayerTimesResponse> {
  const dateParam = date || Math.floor(Date.now() / 1000);

  const url = `${ALADHAN_API_BASE}/timings/${dateParam}?latitude=${latitude}&longitude=${longitude}&method=${method}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch prayer times");
  }

  return response.json();
}

export async function getMonthlyPrayerTimes(
  location: LocationData,
  month: number,
  year: number,
  method: number = 2
) {
  const { city, country } = location;

  const url = `${ALADHAN_API_BASE}/calendarByCity/${year}/${month}?city=${encodeURIComponent(
    city
  )}&country=${encodeURIComponent(country)}&method=${method}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch monthly prayer times");
  }

  return response.json();
}

