"use client";

import { QueryClient, QueryClientProvider as Provider } from "@tanstack/react-query";
import React from "react";

let client: QueryClient | null = null;

function getClient() {
  if (!client) {
    client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60_000,
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    });
  }
  return client;
}

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={getClient()}>{children}</Provider>;
}

