import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros | ImportHealth",
  description: "Conoce ImportHealth. Misión, historia y nuestro compromiso de brindar soluciones naturales de la más alta calidad con cero riesgos.",
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
