"use client";

import { QueryProvider } from "@/lib/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { BackgroundFlicker } from "@/components/layout/BackgroundFlicker";
import { IntroOverlay } from "@/components/layout/IntroOverlay";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <IntroOverlay />
      <BackgroundFlicker />
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  );
}
