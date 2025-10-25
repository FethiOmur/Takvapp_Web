"use client";

import { ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // React Query provider'ı olmadan basit wrapper
  // Eğer ileride React Query eklemek isterseniz buraya ekleyebilirsiniz
  return <>{children}</>;
}

