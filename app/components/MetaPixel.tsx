"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * MetaPixel — Client Component
 * Dispara PageView en cambios de ruta SPA.
 * La inicialización principal (fbq init + primer PageView) se hace en layout.tsx <head>.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Evitar duplicar el primer PageView que se dispara desde el <head>
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
