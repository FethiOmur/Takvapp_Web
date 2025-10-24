"use client";

import { MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QiblaCompass } from "@/components/qibla/QiblaCompass";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/lib/hooks/useLocation";

export default function QiblaPage() {
  const { coordinates, loading, error, requestLocation } = useLocation();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="px-4 pb-20 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Kıble Yönü
            </h1>
            <p className="text-xl text-foreground/70">
              Nerede olursanız olun, Kıble yönünü bulun
            </p>
          </div>

          <div className="glass-card rounded-3xl p-12">
            {!coordinates ? (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">
                  Konumunuza Erişim Gerekli
                </h2>
                <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                  Kıble yönünü hesaplamak için konumunuza erişmemiz gerekiyor.
                  Lütfen konum izni verin.
                </p>
                <Button
                  onClick={requestLocation}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-black"
                >
                  {loading ? "Konum Alınıyor..." : "Konum İzni Ver"}
                </Button>
                {error && (
                  <p className="text-red-500 mt-4 text-sm">{error}</p>
                )}
              </div>
            ) : (
              <div className="py-8">
                <QiblaCompass
                  userLat={coordinates.latitude}
                  userLng={coordinates.longitude}
                />
                <div className="text-center mt-20 pt-8 border-t border-border">
                  <p className="text-sm text-foreground/60">
                    Konumunuz: {coordinates.latitude.toFixed(4)},{" "}
                    {coordinates.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
