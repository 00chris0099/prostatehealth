import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | ImportHealth Perú",
  description: "Lee los términos y condiciones de compra en ImportHealth. Conoce las reglas de pedido, pago contra entrega y límites de responsabilidad.",
};

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
