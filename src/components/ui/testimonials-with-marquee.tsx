import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  TestimonialCard,
  type TestimonialAuthor,
} from "@/components/ui/testimonial-card";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      return;
    }

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-testimonial-card]"),
    );
    if (!cards.length) {
      return;
    }

    let frameId: number;

    const update = () => {
      const rootRect = root.getBoundingClientRect();
      if (!rootRect.width) {
        frameId = requestAnimationFrame(update);
        return;
      }
      const rootCenter = rootRect.left + rootRect.width / 2;
      const maxDistance = rootRect.width * 0.48;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distanceRaw = Math.abs(rootCenter - cardCenter);
        const distance = Math.min(distanceRaw / maxDistance, 1);
        const intensity = 1 - distance;
        const eased = Math.pow(intensity, 1.4);
        const opacity = 0.1 + eased * 0.9;
        card.style.setProperty(
          "--testimonial-opacity",
          opacity.toFixed(3),
        );
        card.style.removeProperty("--testimonial-scale");
      });

      frameId = requestAnimationFrame(update);
    };

    cards.forEach((card) => {
      card.style.setProperty("--testimonial-opacity", "0.1");
      card.style.removeProperty("--testimonial-scale");
    });

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [testimonials.length]);

  return (
    <section
      className={cn(
        "relative overflow-hidden text-foreground",
        "py-12 sm:py-24 md:py-32",
        className,
      )}
    >
      <div className="relative mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-6">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div
            ref={scrollRef}
            className={cn(
              "cards-scroller group relative flex w-full overflow-hidden p-2 [--gap:1.75rem] [gap:var(--gap)]",
              "bg-transparent border-0 shadow-none ring-0 outline-none rounded-none",
              "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
              "[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
            )}
          >
            <div className="flex shrink-0 flex-row gap-[var(--gap)] animate-[marquee-continuous_var(--duration)_linear_infinite] group-hover:[animation-play-state:paused] [--duration:20s]">
              {Array.from({ length: 2 }).map((_, setIndex) =>
                testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${setIndex}-${index}-${testimonial.author.handle}`}
                    data-testimonial-card
                    {...testimonial}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
