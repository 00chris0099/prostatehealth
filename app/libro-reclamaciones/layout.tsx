import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones | ImportHealth Perú",
  description: "Presenta tu queja o reclamo a ImportHealth. Cumplimos con la Ley N° 29571 del Código de Protección y Defensa del Consumidor.",
};

export default function LibroReclamacionesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
