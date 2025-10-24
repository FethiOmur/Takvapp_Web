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
  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-16 sm:py-24 md:py-32",
        className,
      )}
    >
      <div className="mx-auto flex max-w-container flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-6">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="max-w-[600px] text-base font-medium text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div
            className={cn(
              "cards-scroller group relative flex w-full overflow-hidden p-2 [--duration:38s] [--gap:1.75rem]",
              "bg-transparent border-0 shadow-none ring-0 outline-none rounded-none",
              "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
              "[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
            )}
          >
            <div className="flex shrink-0 flex-row gap-[var(--gap)] animate-[marquee-continuous_var(--duration)_linear_infinite] group-hover:[animation-play-state:paused]">
              {Array.from({ length: 2 }).map((_, setIndex) =>
                testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${setIndex}-${index}-${testimonial.author.handle}`}
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
