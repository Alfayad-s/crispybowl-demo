"use client";

import { useEffect } from "react";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-4 font-sans">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-xl font-semibold">Application error</h1>
          <p className="text-muted-foreground text-sm">
            {error.message || "A critical error occurred. Please try again."}
          </p>
          <button
            type="button"
            className="border-border bg-card hover:bg-muted rounded-lg border px-4 py-2 text-sm font-medium shadow-sm transition"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
