"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export const useHydrateStore = () => {
  const hydrate = useAppStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);
};
