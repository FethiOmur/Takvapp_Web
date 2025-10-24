"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LocationData } from "@/types/prayer";

interface LocationSelectorProps {
  currentLocation: LocationData;
  onLocationChange: (location: LocationData) => void;
  onUseCurrentLocation?: () => void;
}

// Popular Turkish cities
const popularCities = [
  { city: "Istanbul", country: "Turkey" },
  { city: "Ankara", country: "Turkey" },
  { city: "Izmir", country: "Turkey" },
  { city: "Bursa", country: "Turkey" },
  { city: "Antalya", country: "Turkey" },
  { city: "Konya", country: "Turkey" },
  { city: "Adana", country: "Turkey" },
  { city: "Gaziantep", country: "Turkey" },
  { city: "Kayseri", country: "Turkey" },
  { city: "Trabzon", country: "Turkey" },
];

export function LocationSelector({
  currentLocation,
  onLocationChange,
  onUseCurrentLocation,
}: LocationSelectorProps) {
  const [customCity, setCustomCity] = useState("");
  const [customCountry, setCustomCountry] = useState("Turkey");

  const handleCitySelect = (value: string) => {
    const selected = popularCities.find(
      (loc) => `${loc.city}, ${loc.country}` === value
    );
    if (selected) {
      onLocationChange(selected);
    }
  };

  const handleCustomLocation = () => {
    if (customCity.trim()) {
      onLocationChange({
        city: customCity.trim(),
        country: customCountry,
      });
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Konum Seçin</h2>
        {onUseCurrentLocation && (
          <Button
            onClick={onUseCurrentLocation}
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Konumumu Kullan
          </Button>
        )}
      </div>

      {/* Current Location Display */}
      <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
        <p className="text-sm text-foreground/60 mb-1">Mevcut Konum</p>
        <p className="font-semibold text-primary">
          {currentLocation.city}, {currentLocation.country}
        </p>
      </div>

      {/* Popular Cities Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Popüler Şehirler</label>
        <Select
          value={`${currentLocation.city}, ${currentLocation.country}`}
          onValueChange={handleCitySelect}
        >
          <SelectTrigger>
            <SelectValue placeholder="Şehir seçin" />
          </SelectTrigger>
          <SelectContent>
            {popularCities.map((loc, index) => (
              <SelectItem key={index} value={`${loc.city}, ${loc.country}`}>
                {loc.city}, {loc.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Custom Location Input */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-foreground/60">VEYA</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Özel Konum</label>
            <Input
              placeholder="Şehir adı girin..."
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCustomLocation()}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ülke</label>
            <Input
              placeholder="Ülke adı"
              value={customCountry}
              onChange={(e) => setCustomCountry(e.target.value)}
            />
          </div>

          <Button
            onClick={handleCustomLocation}
            disabled={!customCity.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-black rounded-full"
          >
            <Search className="w-4 h-4 mr-2" />
            Ara
          </Button>
        </div>
      </div>
    </div>
  );
}

