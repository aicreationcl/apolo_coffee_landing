"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * true solo después de la hidratación en el cliente. Usado para evitar
 * mismatches de hidratación con next-themes (el tema resuelto solo se
 * conoce en el cliente) sin caer en setState() síncrono dentro de un efecto.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
