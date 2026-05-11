"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState, type ReactNode } from "react";

import { CartFab } from "@/components/cart/cart-fab";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { createQueryClient } from "@/lib/query/get-query-client";

import { ReactQueryDevtoolsLazy } from "./react-query-devtools-lazy";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <CartFab />
        <CartSidebar />
      </ThemeProvider>
      <ReactQueryDevtoolsLazy />
    </QueryClientProvider>
  );
}
