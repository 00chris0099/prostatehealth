import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Productos | ImportHealth Perú",
  description: "Explora nuestras soluciones naturales e innovadoras de grado clínico. Compra de manera segura con envío gratis y pago contra entrega en todo el Perú.",
};

export default function ProductosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
