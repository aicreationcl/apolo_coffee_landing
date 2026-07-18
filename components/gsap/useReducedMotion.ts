"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Lee `prefers-reduced-motion` para bifurcar MARKUP (no solo timing) en
 * componentes que necesitan una estructura distinta bajo reduced-motion
 * (ver RoastShowcase). Para timing/gating de animaciones dentro de un
 * useGSAP, usar gsap.matchMedia() directamente en vez de este hook.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
