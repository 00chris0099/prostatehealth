"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PIXEL_ID = "1600215718203667";

/**
 * MetaPixel — Client Component
 * Solo dispara PageView adicionales en navegación SPA (cambios de ruta).
 * La inicialización del pixel (fbq init + primer PageView) se hace en layout.tsx
 * para garantizar que funcione en TODAS las páginas, incluida la landing.
 */
export default function MetaPixel() {
  const pathname = usePathname();

  // Dispara PageView en cada cambio de ruta (navegación SPA)
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  // Noscript fallback para usuarios sin JavaScript
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
