import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | ImportHealth Perú",
  description: "Conoce cómo ImportHealth recopila, usa y protege tus datos personales, incluyendo el uso de cookies y el Meta Pixel de seguimiento.",
};

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
