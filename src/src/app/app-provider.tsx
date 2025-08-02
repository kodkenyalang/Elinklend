"use client";

import { ThirdwebProvider } from "thirdweb/react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}
