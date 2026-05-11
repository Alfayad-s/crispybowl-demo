import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { cache } from "react";

/** New client for browser providers (`useState(() => createQueryClient())`). */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

const getServerQueryClient = cache(createQueryClient);

/**
 * Server: one client per request (React `cache`) for prefetch/dehydrate.
 * Browser: singleton for any code outside the provider that still calls this during migration.
 * Root `QueryClientProvider` should **not** use this — use `createQueryClient()` + `useState` instead
 * so SSR and hydration share the same client instance for that subtree.
 */
export function getQueryClient() {
  if (isServer) {
    return getServerQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
}
