"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface PreloaderContextValue {
  isDone: boolean;
  markDone: () => void;
}

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isDone, setIsDone] = useState(false);
  const markDone = useCallback(() => setIsDone(true), []);

  return (
    <PreloaderContext.Provider value={{ isDone, markDone }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloaderContext() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) throw new Error("usePreloaderContext must be used inside PreloaderProvider");
  return ctx;
}
