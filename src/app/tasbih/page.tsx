"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TasbihCounter } from "@/components/tasbih/TasbihCounter";

export default function TasbihPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="px-4 pb-20 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Dijital Tesbihat
            </h1>
            <p className="text-xl text-foreground/70">
              Zikirlerinizi sayın, Allah&apos;ı anın
            </p>
          </div>

          <div className="glass-card rounded-3xl p-12">
            <TasbihCounter />
          </div>

          {/* Common Dhikr */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { text: "سُبْحَانَ اللّٰهِ", meaning: "Subhanallah" },
              { text: "الْحَمْدُ لِلّٰهِ", meaning: "Alhamdulillah" },
              { text: "اللّٰهُ أَكْبَرُ", meaning: "Allahu Ekber" },
            ].map((dhikr, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <p className="text-3xl mb-2">{dhikr.text}</p>
                <p className="text-foreground/70">{dhikr.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
