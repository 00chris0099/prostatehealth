import StoreNavbar from "../components/StoreNavbar";
import StoreFooter from "../components/StoreFooter";
import Link from "next/link";

export default function ReembolsosPage() {
  return (
    <div className="store-page">
      <StoreNavbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Política de Reembolso y Devoluciones</h1>
        <p className="text-xs text-slate-400 mb-8">Última actualización: agosto 2026</p>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">

          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
            <p className="font-extrabold text-emerald-900">Tu satisfacción es nuestra prioridad</p>
            <p className="mt-1 text-emerald-800 text-sm">Si no estás satisfecho con tu compra, contáctanos y buscamos la mejor solución para ti.</p>
          </div>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">1. Plazo para Solicitar Devolución</h2>
            <p>
              Tienes hasta <strong>7 días calendario</strong> desde la fecha de recepción de tu pedido para solicitar una devolución o cambio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">2. Condiciones para Devolución</h2>
            <p>Aceptamos devoluciones cuando:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>El producto llegó dañado o en mal estado (presenta fotos al contactarnos).</li>
              <li>El producto recibido no coincide con el pedido realizado.</li>
              <li>El paquete llegó incompleto.</li>
              <li>El producto tiene el sello de seguridad intacto y no ha sido abierto.</li>
            </ul>
            <p className="mt-3 text-slate-500 text-xs">
              Por razones de higiene y bioseguridad, no aceptamos devoluciones de suplementos que hayan sido abiertos o utilizados, salvo defecto de fabricación comprobado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">3. Proceso de Devolución</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Contáctanos por WhatsApp al <strong>+51 935 381 231</strong> o a <a href="mailto:contacto@importhealth.pe" className="text-emerald-700 underline">contacto@importhealth.pe</a> dentro de los 7 días.</li>
              <li>Describe el motivo de la devolución y, si el producto llegó dañado, adjunta fotografías.</li>
              <li>Nuestro equipo evaluará tu caso y te responderá en un máximo de <strong>48 horas hábiles</strong>.</li>
              <li>Si la devolución procede, coordinamos el recojo del producto a través de nuestro servicio de courier.</li>
              <li>Una vez recibido e inspeccionado el producto, procesamos el reembolso o cambio.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">4. Reembolsos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Los reembolsos se realizan dentro de los <strong>5 días hábiles</strong> siguientes a la aprobación de la devolución.</li>
              <li>El reembolso se realiza por el mismo medio (transferencia bancaria o efectivo según sea el caso).</li>
              <li>En pedidos de Pago Contra Entrega: si aún no has recibido el producto, simplemente recházalo en la puerta y no abones ningún monto.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">5. Costos de Envío en Devoluciones</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Si el error es de ImportHealth (producto dañado o incorrecto): cubrimos 100% del costo de recojo y reenvío.</li>
              <li>Si la devolución es por cambio de opinión (producto sin daño ni defecto): el cliente asume el costo de envío de retorno.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">6. Reclamaciones</h2>
            <p>
              Si tu solicitud no fue resuelta satisfactoriamente, puedes recurrir a nuestro{" "}
              <Link href="/libro-reclamaciones" className="text-emerald-700 underline">Libro de Reclamaciones Virtual</Link>{" "}
              o contactar a <a href="https://www.indecopi.gob.pe" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">Indecopi</a>.
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
