"use client";

import dynamic from "next/dynamic";

const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then((m) => m.ReactQueryDevtools),
  { ssr: false },
);

export function ReactQueryDevtoolsLazy() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }
  return (
    <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
  );
}
