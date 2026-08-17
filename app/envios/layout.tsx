import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Envíos | ImportHealth Perú",
  description: "Conoce los tiempos de entrega, cobertura nacional y el proceso de pago contra entrega de ImportHealth. Envíos a todo el Perú.",
};

export default function EnviosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
