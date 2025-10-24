"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Clock4, MapPin, Sunrise } from "lucide-react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { TextEffect } from "@/components/ui/text-effect";
import { Button } from "@/components/ui/button";
import { AppStoreButton } from "@/components/ui/app-store-button";
import { PlayStoreButton } from "@/components/ui/play-store-button";
import CardSwap, { Card } from "@/components/ui/card-swap";

interface HeroSectionProps {
  city: string;
  country: string;
  nextPrayer: string;
  nextPrayerTime: string;
}

const introVariants = {
  container: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 240, damping: 32 },
    },
  },
} as const;

const previewVariants = {
  container: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.12 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 26 },
    },
  },
} as const;

const HeroStaticContent = memo(function HeroStaticContent({
  locationLabel,
  heading,
}: { locationLabel: string;
  heading: string;
}) {
  return (
    <AnimatedGroup variants={introVariants} className="space-y-10 lg:space-y-12">
      <div className="flex justify-center lg:justify-start">
        <Link
          href="#prayer-times"
          className="pill gap-3 border-black/5 bg-white/80 text-[0.65rem] tracking-[0.42em] text-foreground/60 dark:border-white/15 dark:bg-white/[0.06] dark:text-white/70"
        >
          <MapPin className="size-4 text-primary" />
          {locationLabel}
          <ChevronRight className="size-3" />
        </Link>
      </div>

      <div className="space-y-6 text-center lg:text-left">
        <TextEffect
          as="h1"
          per="line"
          preset="blur"
          delay={0.1}
          className="text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl xl:text-[4.75rem]"
        >
          {heading}
        </TextEffect>
        <TextEffect
          as="p"
          per="word"
          preset="fade"
          delay={0.3}
          className="mx-auto max-w-2xl text-base text-foreground/70 lg:mx-0"
        >
          Günlük ibadet düzenini planla, namaz vakitlerini kaçırma ve Takvapp ile şehrindeki ruhani akışı tek panelde yönet.
        </TextEffect>
      </div>



      <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <AppStoreButton
          href="https://apps.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
        />
        <PlayStoreButton
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </AnimatedGroup>
  );
});

function PrayerStats({
  countdown,
  nextPrayer,
  nextPrayerTime,
  formattedTime,
  formattedDay,
  formattedDate,
}: {
  countdown: string;
  nextPrayer: string;
  nextPrayerTime: string;
  formattedTime: string;
  formattedDay: string;
  formattedDate: string;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/12 px-6 py-6 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05]">
        <div className="absolute -top-16 -right-20 size-32 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em] text-primary/75">
            <span className="flex items-center gap-2 text-foreground/65 dark:text-primary/75">
              <Sunrise className="size-4" />
              Sıradaki Vakit
            </span>
            <span className="text-foreground/60 dark:text-white/70">Takvapp</span>
          </div>
                    <div>
                      <div className="flex items-baseline gap-4">
                        <span className="text-5xl font-semibold tracking-tight text-foreground dark:text-white sm:text-6xl">
                          {countdown || "--:--:--"}
                        </span>
                        <span className="text-sm tracking-[0.32em] text-foreground/60">
                          {nextPrayer || "Vakit"}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/60">
                        {nextPrayerTime ? `${nextPrayerTime} itibarıyla` : "Vakit hesaplanıyor"}
                      </p>
                    </div>        </div>
      </div>

      <div className="relative rounded-3xl border border-white/12 bg-white/12 px-6 py-6 backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-primary/70">
            <Clock4 className="size-4" />
            Şu an saat
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-semibold tracking-tight text-foreground dark:text-white sm:text-6xl">
              {formattedTime}
            </span>
            <span className="text-sm tracking-[0.32em] text-foreground/60">
              {formattedDay}
            </span>
          </div>
          <p className="text-sm text-foreground/60">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}

const heroScreens = [
  {
    title: "Giriş",
    image: "/images/mobile/cami-pro-01.png",
  },
  {
    title: "İbadet Akışı",
    image: "/images/mobile/cami-pro-02.png",
  },
  {
    title: "Gece Modu",
    image: "/images/mobile/cami-pro-03.png",
  },
  {
    title: "Kıble Pusulası",
    image: "/images/mobile/cami-pro-05.png",
  },
] as const;

const HeroPreview = memo(function HeroPreview() {
  return (
    <AnimatedGroup
      preset="zoom"
      variants={previewVariants}
      className="relative flex items-center justify-center lg:translate-x-6 lg:translate-y-6"
    >
      <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-primary/30 via-transparent to-rose-400/25 blur-3xl" />
      <div className="relative flex h-full w-full items-end justify-center pb-6">
        <div className="absolute -bottom-40 h-3/4 w-[460px] rounded-[50%] bg-gradient-to-t from-primary/20 to-transparent blur-3xl" />
        <div className="relative">
          <CardSwap
            width={320}
            height={640}
            cardDistance={44}
            verticalDistance={54}
            delay={2600}
            skewAmount={1.5}
            pauseOnHover
            easing="power"
          >
            {heroScreens.map((screen) => (
              <Card
                key={screen.title}
                className="border-none bg-transparent p-0 shadow-[0_40px_90px_-45px_rgba(4,8,18,0.8)]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[34px] border border-white/10 bg-black/30">
                  <Image
                    src={screen.image}
                    alt={screen.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                    loading="eager"
                  />
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </AnimatedGroup>
  );
});

export function HeroSection({
  city,
  country,
  nextPrayer,
  nextPrayerTime,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    // Pause time calculations while the hero is off-screen to keep scroll smooth.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    setCurrentTime(new Date());
    const interval = window.setInterval(() => setCurrentTime(new Date()), 1000);

    return () => window.clearInterval(interval);
  }, [isInView]);

  useEffect(() => {
    if (!nextPrayerTime) {
      setCountdown("");
      return;
    }

    if (!isInView) {
      return;
    }

    const updateCountdown = () => {
      const now = new Date();
      const [hours, minutes] = nextPrayerTime.split(":").map(Number);

      if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        setCountdown("");
        return;
      }

      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);

      if (prayerTime <= now) {
        prayerTime.setDate(prayerTime.getDate() + 1);
      }

      const diff = prayerTime.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        [h, m].map((value) => value.toString().padStart(2, "0")).join(":"),
      );
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [nextPrayerTime, isInView]);

  const locationLabel = useMemo(
    () => `${city || "Konum bulunamadı"}, ${country || "Türkiye"}`,
    [city, country],
  );

  const heading = useMemo(
    () => "Takvapp ile\nİbadet Ritmini Planla",
    [],
  );

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    [],
  );

  const dayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("tr-TR", {
        weekday: "short",
      }),
    [],
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    [],
  );

  const formattedTime = useMemo(
    () => timeFormatter.format(currentTime),
    [currentTime, timeFormatter],
  );

  const formattedDay = useMemo(() => {
    const value = dayFormatter.format(currentTime);
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }, [currentTime, dayFormatter]);

  const formattedDate = useMemo(
    () => dateFormatter.format(currentTime),
    [currentTime, dateFormatter],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-36 pb-24 sm:pt-40 lg:pb-32"
    >
      <div aria-hidden className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_60%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.18),transparent_65%),radial-gradient(120%_120%_at_50%_100%,rgba(2,3,15,0)_0%,rgba(2,3,15,0.95)_78%)]" />
      </div>

      <div className="section-shell">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-10 lg:space-y-12">
            <HeroStaticContent locationLabel={locationLabel} heading={heading} />
            <PrayerStats
              countdown={countdown}
              nextPrayer={nextPrayer}
              nextPrayerTime={nextPrayerTime}
              formattedTime={formattedTime}
              formattedDay={formattedDay}
              formattedDate={formattedDate}
            />
          </div>

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}