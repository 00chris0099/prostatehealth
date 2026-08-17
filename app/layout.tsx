import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "ImportHealth | Soluciones Naturales de Grado Clínico para tu Bienestar",
  description: "ImportHealth acerca las mejores soluciones naturales e innovadoras de grado clínico. Envíos gratis a todo el Perú y pago contra entrega.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={manrope.variable}>{children}</body></html>;
}
