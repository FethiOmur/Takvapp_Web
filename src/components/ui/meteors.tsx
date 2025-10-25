import { cn } from "@/lib/utils";
import React, { useMemo } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number, className }: MeteorsProps) => {
  const count = number ?? 20;

  const meteors = useMemo(
    () =>
      Array.from({ length: count }, (_, idx) => {
        const seed = idx + 1;
        const pseudoRandom = (offset: number, min: number, max: number) => {
          const value = Math.sin(seed * 9301 + offset * 49297) * 233280;
          const normalized = value - Math.floor(value);
          return min + normalized * (max - min);
        };

        return {
          left: pseudoRandom(0.7, -400, 400),
          delay: pseudoRandom(1.3, 0.2, 0.8),
          duration: pseudoRandom(2.1, 2, 10),
        };
      }),
    [count],
  );

  return (
    <>
      {meteors.map((meteor, idx) => (
        <span
          key={`meteor-${idx}`}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] dark:bg-slate-500 bg-gray-300 dark:shadow-[0_0_0_1px_#ffffff10] shadow-[0_0_0_1px_#00000010]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-1/2 dark:before:bg-gradient-to-r dark:before:from-[#64748b] before:bg-gradient-to-r before:from-[#9ca3af] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: 0,
            left: `${meteor.left.toFixed(0)}px`,
            animationDelay: `${meteor.delay.toFixed(3)}s`,
            animationDuration: `${meteor.duration.toFixed(2)}s`,
          }}
        />
      ))}
    </>
  );
};
