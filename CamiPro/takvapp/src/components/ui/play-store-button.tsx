import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayStoreButtonProps = React.ComponentProps<typeof Button> & {
  href?: string;
  target?: string;
  rel?: string;
};

export function PlayStoreButton({
  className,
  href,
  target,
  rel,
  ...props
}: Omit<PlayStoreButtonProps, "children">) {
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
    "relative h-12 gap-3 overflow-hidden rounded-[22px] border border-white/12 bg-background/78 px-4 py-3 text-foreground shadow-[0_28px_65px_-48px_rgba(16,185,129,0.85)] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-background/85 hover:shadow-[0_32px_80px_-48px_rgba(45,212,191,0.95)]";

  const gradientShells = (
    <span
      className="pointer-events-none absolute inset-0 -z-30 rounded-[22px] opacity-0 blur-[26px] transition duration-700 ease-out animate-halo-pulse transform-gpu scale-[1.02] group-hover:scale-[1.06] group-hover:opacity-55"
      style={{
        background:
          "radial-gradient(120% 120% at 18% 22%, rgba(45,212,191,0.42), transparent 68%), radial-gradient(140% 140% at 82% 70%, rgba(56,189,248,0.32), transparent 72%)",
      }}
    />
  );

  const content = (
    <>
      <PlayStoreIcon className="size-5" />
      <div className="flex flex-col items-start justify-center pr-1 text-left">
        <span className="text-[10px] font-light leading-none tracking-tight uppercase">
          Get it on
        </span>
        <p className="text-base font-bold leading-none">Google Play</p>
      </div>
    </>
  );

  const buttonChildren = (
    <>
      <span
        className="pointer-events-none absolute -inset-px -z-10 rounded-[22px] opacity-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(220px circle at ${glow.x}px ${glow.y}px, rgba(45,212,191,0.28), rgba(56,189,248,0.12) 58%, rgba(4,47,46,0) 82%)`,
        }}
      />
      <span className="pointer-events-none absolute inset-0 -z-20 rounded-[22px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.28),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.22),transparent_60%)] opacity-80" />
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

function PlayStoreIcon({ fill = "currentColor", ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} {...props}>
      <path d="m21.762,9.942L4.67.378c-.721-.466-1.635-.504-2.393-.099-.768.411-1.246,1.208-1.246,2.08v19.282c0,.872.477,1.668,1.246,2.079.755.404,1.668.37,2.393-.098l17.092-9.564c.756-.423,1.207-1.192,1.207-2.058s-.451-1.635-1.207-2.058Zm-5.746-1.413l-2.36,2.36L5.302,2.534l10.714,5.995ZM2.604,21.906V2.094l9.941,9.906L2.604,21.906Zm2.698-.439l8.355-8.355,2.36,2.36-10.714,5.995Zm15.692-8.78l-3.552,1.987-2.674-2.674,2.674-2.674,3.552,1.987c.363.203.402.548.402.686s-.039.483-.402.686Z" />
    </svg>
  );
}
