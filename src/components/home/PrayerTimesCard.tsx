"use client";

import { motion } from "framer-motion";
import { Cloud, Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { PrayerTimes } from "@/types/prayer";

interface PrayerTimesCardProps {
  prayerTimes: PrayerTimes;
  currentPrayer?: string;
}

const prayerMeta = {
  Fajr: { label: "İmsak", icon: Sunrise },
  Dhuhr: { label: "Öğle", icon: Sun },
  Asr: { label: "İkindi", icon: Cloud },
  Maghrib: { label: "Akşam", icon: Sunset },
  Isha: { label: "Yatsı", icon: Moon },
} as const;

export function PrayerTimesCard({
  prayerTimes,
  currentPrayer = "Dhuhr",
}: PrayerTimesCardProps) {
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="surface-card relative mx-auto w-full max-w-6xl overflow-hidden rounded-[48px] border border-white/12 bg-white/14 px-6 py-8 backdrop-blur-2xl sm:px-10 dark:border-white/15 dark:bg-white/[0.05]"
    >
      <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/20" />
      <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
        <div>
          <p className="text-xs uppercase tracking-[0.42em] text-foreground/55">
            Takvapp Takvimi
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
            Bugünün namaz vakitleri
          </h2>
        </div>
        <div className="pill border-black/5 bg-white/18 text-[0.65rem] tracking-[0.42em] text-foreground/60 backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.07] dark:text-white/70">
          {currentPrayer === "Dhuhr" ? "Günün ortası" : "Günün akışı"}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-5">
        {prayers.map((key, index) => {
          const meta = prayerMeta[key];
          const Icon = meta.icon;
          const isActive = key === currentPrayer;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 * index }}
              className="group relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activePrayerGlow"
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/40 via-primary/5 to-transparent"
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                />
              )}
              <div
                className={`relative flex h-full flex-col gap-4 rounded-3xl border border-white/12 bg-white/12 px-5 py-6 transition-all duration-300 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.04] ${
                  isActive
                    ? "shadow-[0_25px_60px_-30px_rgba(34,211,238,0.6)]"
                    : "hover:border-primary/30 hover:bg-white/18 dark:hover:bg-white/[0.08]"
                }`}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-foreground/55">
                  <span>{meta.label}</span>
                  <Icon
                    className={`size-5 transition ${
                      isActive ? "text-primary" : "text-foreground/45"
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className={`text-2xl font-semibold ${isActive ? "text-primary" : "text-foreground dark:text-white"}`}>
                    {prayerTimes[key]}
                  </span>
                  <span className="text-xs text-foreground/55">
                    {index === 0
                      ? "Günün ilk ışığı"
                      : index === prayers.length - 1
                      ? "Gece huzuru"
                      : "Ritmine odaklan"}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
