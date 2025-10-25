"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const tabs = [
  "Ana Sayfa",
  "Namaz Vakitleri",
  "Imam AI",
  "Kıble",
  "Kuran",
  "Tesbihat",
  "İletişim",
] as const;

const screens = [
  {
    title: "Hoş Geldin Ekranı",
    description:
      "Kullanıcıyı şehir silueti ile karşılayıp Apple, Google veya e-posta ile hızlı giriş seçenekleri sunuyor.",
    image: "/images/mobile/cami-pro-01.png",
  },
  {
    title: "İç Mekân Karşılama",
    description:
      "Kubbe motifleri eşliğinde marka kimliğini güçlendirerek oturum açma adımını tutarlı kılıyor.",
    image: "/images/mobile/cami-pro-02.png",
  },
  {
    title: "Gece Modu",
    description:
      "Koyu temalı giriş ekranı gece kullanımlarında yüksek kontrastlı bir deneyim sağlıyor.",
    image: "/images/mobile/cami-pro-03.png",
  },
  {
    title: "Ana Sayfa Panelleri",
    description:
      "Namaz vakitleri, Imam AI kısayolu ve hikâye halkaları ile günlük ibadet akışını tek yerde topluyor.",
    image: "/images/mobile/cami-pro-04.png",
  },
  {
    title: "Kıble Pusulası",
    description:
      "Minimal pusula animasyonu Kâbe yönünü hassas şekilde göstererek ibadet hazırlığını kolaylaştırıyor.",
    image: "/images/mobile/cami-pro-05.png",
  },
] as const;

export function AppPreviewSection({ className }: { className?: string }) {
  return (
    <section className={cn("relative py-24 sm:py-28 lg:py-36", className)}>      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="section-shell space-y-12 lg:space-y-16"
      >
        <div className="section-heading">
          <span className="section-eyebrow text-primary/75">Mobil Uygulama</span>
          <h2 className="section-title">
            Takvapp mobil deneyimini yakından keşfedin
          </h2>
          <p className="section-subtitle max-w-3xl">
            Giriş ekranından kıble pusulasına kadar tasarladığımız akışı inceleyin; Takvapp her adımda ibadet rutinlerinizi modern ve sezgisel hale getirir.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <span
              key={tab}
              className="pill border-black/5 bg-white/80 px-5 py-2 text-[0.7rem] tracking-[0.3em] text-foreground/60 dark:border-white/15 dark:bg-white/[0.07] dark:text-white/70"
            >
              <span className="inline-flex size-2 rounded-full bg-primary/70" />
              {tab}
            </span>
          ))}
        </div>

        <div className="surface-card space-y-6 rounded-3xl px-6 py-8 dark:border-white/10">
          {screens.map((screen, index) => (
            <motion.div
              key={screen.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="flex gap-4"
            >
              <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-black/5 bg-white/80 dark:border-white/10 dark:bg-white/5">
                <Image
                  src={screen.image}
                  alt={screen.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground dark:text-white">
                  {screen.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {screen.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
