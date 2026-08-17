import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Reembolso y Devoluciones | ImportHealth Perú",
  description: "Conoce nuestra política de devoluciones y reembolsos. En ImportHealth tu satisfacción está garantizada.",
};

export default function ReembolsosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
