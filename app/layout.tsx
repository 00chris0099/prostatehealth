import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import MetaPixel from "./components/MetaPixel";
import CookieConsent from "./components/CookieConsent";

const PIXEL_ID = "1600215718203667";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "ImportHealth | Soluciones Naturales de Grado Clínico para tu Bienestar",
  description: "ImportHealth acerca las mejores soluciones naturales e innovadoras de grado clínico. Envíos gratis a todo el Perú y pago contra entrega.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={manrope.variable}>
        {/* Meta Pixel Base Code — inyectado desde el Server Component para máxima fiabilidad */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* MetaPixel: solo maneja el tracking de rutas en navegación SPA */}
        <MetaPixel />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
