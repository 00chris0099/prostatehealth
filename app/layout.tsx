import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
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
      <head>
        {/* Meta Pixel Base Code — Inyectado síncronamente en HEAD */}
        <script
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
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className={manrope.variable}>
        {/* MetaPixel: Maneja el tracking de rutas en navegación SPA */}
        <MetaPixel />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
