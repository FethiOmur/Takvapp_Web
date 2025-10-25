"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      storageKey="takvapp-theme"
      enableSystem
      enableColorScheme
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
