"use client";

import { type ComponentType } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, BookOpen, Circle, Phone, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Meteors } from "@/components/ui/meteors";

interface Feature {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  gradient: string;
}

const features: Feature[] = [
  {
    title: "Namaz Vakitleri",
    description: "Konumunuza özel namaz vakitleri ile günü kaçırmayın.",
    icon: Clock,
    href: "/prayer-times",
    gradient: "from-cyan-400/80 via-sky-500/80 to-blue-500/70",
  },
  {
    title: "Kıble Yönü",
    description: "Nerede olursanız olun, Kıble yönünü saniyeler içinde bulun.",
    icon: Compass,
    href: "/qibla",
    gradient: "from-emerald-400/75 via-lime-400/60 to-emerald-500/70",
  },
  {
    title: "Kuran-ı Kerim",
    description: "Okuyun, dinleyin ve ayetler arasında hızlıca gezin.",
    icon: BookOpen,
    href: "/quran",
    gradient: "from-violet-400/80 via-purple-500/70 to-fuchsia-500/70",
  },
  {
    title: "Tesbihat",
    description: "Dijital tesbihat ile zikirlerinizi kaydedin ve paylaşın.",
    icon: Circle,
    href: "/tasbih",
    gradient: "from-orange-400/80 via-amber-400/70 to-red-400/70",
  },
  {
    title: "En Yakın Cami",
    description: "Çevrenizdeki camileri keşfedin ve yol tarifi alın.",
    icon: MapPin,
    href: "/mosques",
    gradient: "from-indigo-400/80 via-blue-500/70 to-indigo-600/70",
  },
  {
    title: "İletişim",
    description: "Geri bildiriminiz için her zaman buradayız.",
    icon: Phone,
    href: "/contact",
    gradient: "from-rose-500/75 via-pink-500/70 to-rose-400/70",
  },
];

export function FeaturesGrid() {
  return (
    <section className="relative py-24">
      <div className="section-shell space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="section-heading text-center"
        >
          <span className="section-eyebrow text-primary/75">Modüller</span>
          <h2 className="section-title text-center">
            İslami yaşam için her şey tek bir ekranda
          </h2>
          <p className="section-subtitle mx-auto max-w-2xl text-center">
            Takvapp, ibadet pratiğini kolaylaştırmak için modern bileşenler sunar. Her özellik, günlük ritminize uyum sağlamak için tasarlandı.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <Link key={feature.title} href={feature.href} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="relative"
              >
                <div
                  className={cn(
                    "absolute inset-0 -z-10 rounded-[32px] opacity-60 blur-3xl transition duration-500 group-hover:opacity-90",
                    `bg-gradient-to-br ${feature.gradient}`,
                  )}
                />
                <div className="relative overflow-hidden rounded-[32px] border dark:border-white/10 border-gray-200 dark:bg-slate-950/75 bg-white/75 p-8 dark:shadow-[0_30px_80px_-45px_rgba(8,47,73,0.65)] shadow-[0_30px_80px_-45px_rgba(0,0,0,0.1)] backdrop-blur-2xl transition duration-300 dark:group-hover:border-white/20 group-hover:border-gray-300">
                  <div className="pointer-events-none absolute inset-0 dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)] dark:opacity-60 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_60%)] opacity-40" />
                  <Meteors number={18} />

                  <div className="relative flex h-full flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex size-12 items-center justify-center rounded-full border dark:border-white/15 border-gray-300 dark:bg-white/10 bg-gray-100 dark:text-white text-gray-800 backdrop-blur-xl">
                        <feature.icon className="size-6" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.35em] dark:text-white/55 text-gray-700">
                        Keşfet
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-semibold dark:text-white text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm dark:text-white/65 text-gray-600">
                        {feature.description}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-2 text-sm font-medium text-primary transition group-hover:translate-x-1">
                      Detayları gör
                      <span className="inline-flex size-6 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
