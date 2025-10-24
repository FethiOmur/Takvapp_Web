"use client";

import { useEffect, useState } from "react";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("relative", className)}
        aria-label="Tema seçici"
        disabled
      >
        <Sun className="size-4" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative", className)}
      aria-label={isDark ? "Aydınlık moda geç" : "Karanlık moda geç"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun
        className={`size-4 transition-all ${
          isDark
            ? "scale-0 opacity-0 -rotate-90"
            : "scale-100 opacity-100 rotate-0"
        }`}
      />
      <MoonStar
        className={`absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 transition-all ${
          isDark
            ? "scale-100 opacity-100 rotate-0"
            : "scale-0 opacity-0 rotate-90"
        }`}
      />
    </Button>
  );
}
