import StoreNavbar from "../components/StoreNavbar";
import StoreFooter from "../components/StoreFooter";
import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <div className="store-page">
      <StoreNavbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Política de Privacidad</h1>
        <p className="text-xs text-slate-400 mb-8">Última actualización: agosto 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">1. Responsable del Tratamiento</h2>
            <p>
              ImportHealth Perú, con dirección en Lima, Perú, correo electrónico{" "}
              <a href="mailto:contacto@importhealth.pe" className="text-emerald-700 underline">contacto@importhealth.pe</a>{" "}
              y teléfono +51 935 381 231, es la entidad responsable del tratamiento de tus datos personales recabados a través del sitio web <strong>importhealth.pe</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">2. Datos que Recopilamos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Datos de contacto y entrega:</strong> nombre completo, número de celular, departamento, provincia, distrito y dirección de entrega (proporcionados al realizar un pedido).</li>
              <li><strong>Datos de navegación:</strong> dirección IP, tipo de dispositivo, sistema operativo, navegador, páginas visitadas y duración de la visita.</li>
              <li><strong>Cookies de terceros:</strong> utilizamos el Meta Pixel (Facebook) para medir el rendimiento de nuestros anuncios y ofrecerte publicidad más relevante.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">3. Meta Pixel y Cookies de Terceros</h2>
            <p>
              Este sitio utiliza el <strong>Meta Pixel</strong> (ID: 1600215718203667), una tecnología de seguimiento de Meta Platforms, Inc. El Pixel recopila datos sobre las acciones que realizas en el sitio (visitas a páginas, inicio del proceso de pedido, compras) y los envía a Meta para:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Medir la efectividad de nuestros anuncios en Facebook e Instagram.</li>
              <li>Crear audiencias personalizadas para mostrarte anuncios relevantes.</li>
              <li>Optimizar nuestras campañas publicitarias.</li>
            </ul>
            <p className="mt-3">
              Puedes conocer más sobre cómo Meta usa estos datos en la{" "}
              <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">Política de Privacidad de Meta</a>.
              Puedes excluirte de la publicidad basada en intereses en{" "}
              <a href="https://aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">aboutads.info/choices</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">4. Finalidades del Tratamiento</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Procesar y entregar tu pedido con pago contra entrega.</li>
              <li>Comunicarnos contigo para coordinar la entrega y brindarte soporte postventa.</li>
              <li>Mejorar la experiencia en el sitio web.</li>
              <li>Cumplir con obligaciones legales y fiscales en Perú.</li>
              <li>Enviarte comunicaciones sobre ofertas (solo con tu consentimiento previo).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">5. Base Legal del Tratamiento</h2>
            <p>
              El tratamiento de tus datos se realiza al amparo de la <strong>Ley N° 29733 — Ley de Protección de Datos Personales del Perú</strong> y su Reglamento (D.S. 003-2013-JUS), con las siguientes bases:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Ejecución de contrato:</strong> para procesar tu pedido.</li>
              <li><strong>Consentimiento:</strong> para el uso de cookies y Meta Pixel.</li>
              <li><strong>Interés legítimo:</strong> para la seguridad del sitio y prevención de fraudes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">6. Tus Derechos (Derechos ARCO)</h2>
            <p>Conforme a la Ley 29733, tienes derecho a:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Acceso:</strong> conocer qué datos tuyos tenemos.</li>
              <li><strong>Rectificación:</strong> corregir datos incorrectos o desactualizados.</li>
              <li><strong>Cancelación:</strong> solicitar la eliminación de tus datos.</li>
              <li><strong>Oposición:</strong> oponerte a ciertos tratamientos.</li>
            </ul>
            <p className="mt-2">
              Para ejercer tus derechos, escríbenos a{" "}
              <a href="mailto:contacto@importhealth.pe" className="text-emerald-700 underline">contacto@importhealth.pe</a>{" "}
              con el asunto "Ejercicio de Derechos ARCO".
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">7. Conservación de Datos</h2>
            <p>
              Conservamos tus datos de pedido durante el tiempo necesario para la entrega y hasta 5 años para cumplir con obligaciones tributarias. Los datos de navegación se eliminan a los 13 meses.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">8. Cambios en esta Política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Te notificaremos de cambios significativos mediante un aviso en el sitio web. Te recomendamos revisarla regularmente.
            </p>
          </section>

          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm">
            <p className="font-bold text-emerald-900">¿Tienes preguntas sobre tu privacidad?</p>
            <p className="mt-1 text-emerald-800">Contáctanos a <a href="mailto:contacto@importhealth.pe" className="underline">contacto@importhealth.pe</a> o por WhatsApp al +51 935 381 231.</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200">
          <Link href="/" className="text-sm font-bold text-emerald-700 hover:underline">← Volver al inicio</Link>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
}
