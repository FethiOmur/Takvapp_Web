import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppStoreButtonProps = React.ComponentProps<typeof Button> & {
  href?: string;
  target?: string;
  rel?: string;
};

export function AppStoreButton({
  className,
  href,
  target,
  rel,
  ...props
}: Omit<AppStoreButtonProps, "children">) {
  const [glow, setGlow] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setGlow({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    });
  };

  const handlePointerLeave = () => {
    setGlow((prev) => ({ ...prev, active: false }));
  };

  const baseClasses =
    "relative h-12 gap-3 overflow-hidden rounded-[22px] border border-white/12 bg-background/78 px-4 py-3 text-foreground shadow-[0_28px_65px_-48px_rgba(99,102,241,0.95)] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-background/85 hover:shadow-[0_32px_80px_-48px_rgba(148,163,255,1)]";

  const gradientShells = (
    <span
      className="pointer-events-none absolute inset-0 -z-30 rounded-[22px] opacity-0 blur-[26px] transition duration-700 ease-out animate-halo-pulse transform-gpu scale-[1.02] group-hover:scale-[1.06] group-hover:opacity-55"
      style={{
        background:
          "radial-gradient(120% 120% at 15% 20%, rgba(129,140,248,0.45), transparent 68%), radial-gradient(140% 140% at 82% 70%, rgba(236,72,153,0.35), transparent 72%)",
      }}
    />
  );

  const content = (
    <>
      <AppleIcon className="size-5" />
      <div className="flex flex-col items-start justify-center pr-1 text-left">
        <span className="text-[10px] font-light leading-none tracking-tight uppercase">
          Download on the
        </span>
        <p className="text-base font-bold leading-none">App Store</p>
      </div>
    </>
  );

  const buttonChildren = (
    <>
      <span
        className="pointer-events-none absolute -inset-px -z-10 rounded-[22px] opacity-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(220px circle at ${glow.x}px ${glow.y}px, rgba(129,140,248,0.28), rgba(56,189,248,0.12) 58%, rgba(15,23,42,0) 82%)`,
        }}
      />
      <span className="pointer-events-none absolute inset-0 -z-20 rounded-[22px] bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.22),transparent_60%)] opacity-80" />
      {content}
    </>
  );

  if (href) {
    return (
      <span className="group relative inline-flex items-center justify-center">
        {gradientShells}
        <Button
          asChild
          variant="outline"
          className={cn(baseClasses, className)}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          {...props}
        >
          <a href={href} target={target} rel={rel} className="flex items-center gap-3">
            {buttonChildren}
          </a>
        </Button>
      </span>
    );
  }

  return (
    <span className="group relative inline-flex items-center justify-center">
      {gradientShells}
      <Button
        variant="outline"
        className={cn(baseClasses, className)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {buttonChildren}
      </Button>
    </span>
  );
}

function AppleIcon({ fill = "currentColor", ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} {...props}>
      <g>
        <g>
          <path d="M18.546,12.763c0.024-1.87,1.004-3.597,2.597-4.576c-1.009-1.442-2.64-2.323-4.399-2.378 c-1.851-0.194-3.645,1.107-4.588,1.107c-0.961,0-2.413-1.088-3.977-1.056C6.122,5.927,4.25,7.068,3.249,8.867 c-2.131,3.69-0.542,9.114,1.5,12.097c1.022,1.461,2.215,3.092,3.778,3.035c1.529-0.063,2.1-0.975,3.945-0.975 c1.828,0,2.364,0.975,3.958,0.938c1.64-0.027,2.674-1.467,3.66-2.942c0.734-1.041,1.299-2.191,1.673-3.408 C19.815,16.788,18.548,14.879,18.546,12.763z" />
          <path d="M15.535,3.847C16.429,2.773,16.87,1.393,16.763,0c-1.366,0.144-2.629,0.797-3.535,1.829 c-0.895,1.019-1.349,2.351-1.261,3.705C13.352,5.548,14.667,4.926,15.535,3.847z" />
        </g>
      </g>
    </svg>
  );
}
