"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@lioarcade/api-client";
import { useState, type ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
