"use client";

export function BackgroundFlicker() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f3f7ff] dark:bg-[#03040a]">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            pointer-events-none absolute -inset-[12px] opacity-60 will-change-transform
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,rgba(9,14,24,0.85)_0%,rgba(9,14,24,0.85)_7%,transparent_12%,transparent_14%,rgba(9,14,24,0.85)_18%)]
            [--aurora:repeating-linear-gradient(110deg,rgba(29,78,216,0.35)_10%,rgba(56,189,248,0.3)_18%,rgba(147,197,253,0.28)_24%,rgba(236,72,153,0.32)_30%,rgba(14,165,233,0.28)_36%)]
            [background-image:var(--aurora),var(--white-gradient)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[14px]
            after:content-[''] after:absolute after:inset-0
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:220%,_120%]
            after:[background-position:50%_50%,50%_50%]
            after:animate-aurora after:[background-attachment:fixed]
            after:mix-blend-difference
            [mask-image:radial-gradient(ellipse_at_80%_0%,black_8%,transparent_70%)]
          "
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(circle_at_80%_10%,rgba(165,243,252,0.25),transparent_65%),radial-gradient(circle_at_50%_90%,rgba(186,230,253,0.3),transparent_75%)] dark:bg-[radial-gradient(circle_at_18%_22%,rgba(34,197,236,0.18),transparent_52%),radial-gradient(circle_at_80%_34%,rgba(14,165,233,0.16),transparent_58%),radial-gradient(circle_at_52%_88%,rgba(59,130,246,0.14),transparent_68%)]" />
    </div>
  );
}
