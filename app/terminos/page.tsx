import StoreNavbar from "../components/StoreNavbar";
import StoreFooter from "../components/StoreFooter";
import Link from "next/link";

export default function TerminosPage() {
  return (
    <div className="store-page">
      <StoreNavbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Términos y Condiciones</h1>
        <p className="text-xs text-slate-400 mb-8">Última actualización: agosto 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">1. Aceptación de los Términos</h2>
            <p>
              Al realizar un pedido en ImportHealth (en adelante "la Tienda"), aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, te pedimos que no realices ningún pedido.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">2. Identificación del Vendedor</h2>
            <p>
              ImportHealth Perú opera desde Lima, Perú. Contacto: <a href="mailto:contacto@importhealth.pe" className="text-emerald-700 underline">contacto@importhealth.pe</a> · Tel: +51 935 381 231.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">3. Productos y Disponibilidad</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Los productos ofrecidos son suplementos alimenticios de venta libre. No son medicamentos y no requieren receta médica.</li>
              <li>La disponibilidad del stock puede variar. Nos reservamos el derecho de cancelar un pedido si el producto no está disponible, notificándote inmediatamente.</li>
              <li>Las imágenes de los productos son referenciales.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">4. Precios y Método de Pago</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Todos los precios están expresados en Soles peruanos (S/) e incluyen IGV cuando corresponda.</li>
              <li>El método de pago exclusivo es <strong>Pago Contra Entrega (COD)</strong>: pagas en efectivo, Yape o Plin en el momento de recibir tu pedido en la puerta de tu domicilio.</li>
              <li>No se realizan cobros anticipados por ningún concepto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">5. Proceso de Pedido y Confirmación</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Completas el formulario de pedido con tus datos de entrega.</li>
              <li>Recibes una confirmación de recepción del pedido (puede ser por WhatsApp o llamada telefónica).</li>
              <li>Nuestro equipo valida la dirección y confirma el tiempo de entrega estimado.</li>
              <li>El transportista o motorizado entrega el producto en tu domicilio y cobras en el acto.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">6. Envíos</h2>
            <p>Consulta nuestra <Link href="/envios" className="text-emerald-700 underline">Política de Envíos</Link> para conocer tiempos de entrega, cobertura y procedimientos.</p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">7. Devoluciones y Reembolsos</h2>
            <p>Consulta nuestra <Link href="/reembolsos" className="text-emerald-700 underline">Política de Reembolso y Devoluciones</Link> para conocer los plazos y condiciones aplicables.</p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">8. Descargo de Responsabilidad Médica</h2>
            <p>
              Los productos de ImportHealth son <strong>complementos alimenticios de venta libre</strong>. No están diseñados para diagnosticar, tratar, curar ni prevenir ninguna enfermedad. Los resultados pueden variar de persona a persona. Se recomienda consultar con un médico antes de iniciar cualquier suplementación, especialmente si tienes condiciones de salud preexistentes o tomas medicamentos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">9. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio (textos, imágenes, logos, diseño) es propiedad de ImportHealth Perú o de sus proveedores y está protegido por las leyes de propiedad intelectual vigentes en Perú. Queda prohibida su reproducción sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">10. Ley Aplicable y Jurisdicción</h2>
            <p>
              Estos Términos se rigen por las leyes de la República del Perú. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales de Lima, Perú.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">11. Reclamaciones</h2>
            <p>
              Para presentar una queja o reclamo formal, accede a nuestro <Link href="/libro-reclamaciones" className="text-emerald-700 underline">Libro de Reclamaciones Virtual</Link>.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200">
          <Link href="/" className="text-sm font-bold text-emerald-700 hover:underline">← Volver al inicio</Link>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
}
