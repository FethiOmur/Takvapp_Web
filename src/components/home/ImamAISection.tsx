/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const suggestedQuestions = [
  "Namaz nasıl kılınır?",
  "Abdest nasıl alınır?",
  "Zekât nedir?",
  "Ramazan orucu nasıl tutulur?",
];

export function ImamAISection() {
  return (
    <section className="relative py-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="section-heading text-center sm:text-left"
        >
          <span className="section-eyebrow text-primary/75">Akıllı Asistan</span>
          <h2 className="section-title">
            Imam AI ile sorularınıza anında cevap alın
          </h2>
          <p className="section-subtitle max-w-2xl">
            İslami sorularınızı güvenilir kaynaklara dayanan yapay zekamıza sorun.
            Kur&apos;an ve Sünnet ışığında rehberlik her zaman parmaklarınızın ucunda.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative mt-12 overflow-hidden rounded-[44px] border border-black/5 bg-white/85 px-8 py-10 backdrop-blur-2xl shadow-[0_30px_90px_-45px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_30px_90px_-45px_rgba(0,0,0,0.55)]"
        >
          <div className="absolute -top-24 -right-28 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-32 h-48 w-48 rounded-full bg-rose-500/15 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white/85 px-4 py-2 text-sm text-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.08] dark:text-white">
                <Sparkles className="size-5 text-primary" />
                <span className="font-medium tracking-[0.2em] uppercase text-foreground/70 dark:text-white/70">
                  Sohbeti Başlat
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-semibold text-foreground dark:text-white sm:text-4xl">
                  Sadece sorunuzu yazın, Imam AI yanınızda.
                </h3>
                <p className="text-base text-foreground/65 sm:text-lg">
                  Takvapp&apos;ın yapay zekası, kaynak göstererek rehberlik sağlar. İbadetinizde emin olmanızı sağlar.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {suggestedQuestions.map((question, index) => (
                  <motion.span
                    key={question}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: 0.08 * index }}
                    className="rounded-full border border-black/5 bg-white/85 px-4 py-2 text-sm text-foreground/70 backdrop-blur-xl transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/[0.06] dark:text-white/75"
                  >
                    {question}
                  </motion.span>
                ))}
              </div>


            </div>

            <div className="relative ml-auto w-full max-w-[480px] overflow-hidden rounded-[36px] border border-black/5 bg-white/90 p-6 text-left shadow-[0_30px_90px_-50px_rgba(15,23,42,0.25)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/30 dark:shadow-[0_30px_90px_-45px_rgba(0,0,0,0.6)]">
              <div className="space-y-5 text-sm text-foreground/80 dark:text-white/80">
                <p className="text-xs uppercase tracking-[0.35em] text-primary/70">
                  Canlı demo
                </p>
                <div className="rounded-2xl bg-white/85 p-4 text-foreground backdrop-blur-xl dark:bg-white/[0.05] dark:text-white/80">
                  <p>
                    <span className="font-semibold text-primary">Kullanıcı:</span> &ldquo;Ramazan orucu hangi durumlarda bozulur?&rdquo;
                  </p>
                </div>
                <div className="rounded-2xl border border-black/5 bg-white/85 p-5 text-foreground backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-white/85">
                  <p>
                    <span className="font-semibold text-foreground dark:text-white/90">Imam AI:</span> &ldquo;Ramazan orucu, Meryemu Suresi 185. ayete göre zorunlu hallerde bozulabilir. Hastalık, yolculuk, hayız gibi durumlarda oruç ertelenir ve sonradan kaza edilir.&rdquo;
                  </p>
                </div>
                <div className="rounded-xl bg-primary/15 p-4 text-xs text-primary">
                  Hadis Referansı: &ldquo;Şüphesiz Allah, ümmetimden yanılarak, unutarak ve zorla yaptıkları şeyleri kaldırmıştır.&rdquo; (İbn Mâce)
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
