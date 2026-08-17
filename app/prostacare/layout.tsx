import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prostacare Perú | Tratamiento Natural y Acción Dual",
  description: "Fórmula dual Prostacare: Cápsulas Saw Palmetto + Parches Transdérmicos. Recupera tu descanso. Envío gratis a todo el Perú y pago contra entrega.",
};

export default function ProstacareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
