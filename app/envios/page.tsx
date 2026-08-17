import StoreNavbar from "../components/StoreNavbar";
import StoreFooter from "../components/StoreFooter";
import Link from "next/link";

export default function EnviosPage() {
  return (
    <div className="store-page">
      <StoreNavbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Política de Envíos</h1>
        <p className="text-xs text-slate-400 mb-8">Última actualización: agosto 2026</p>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">

          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
            <p className="font-extrabold text-blue-900">📦 Envío Gratis a Todo el Perú</p>
            <p className="mt-1 text-blue-800 text-sm">Todos los pedidos incluyen envío gratuito. No hay cargos ocultos.</p>
          </div>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">1. Cobertura de Envío</h2>
            <p>
              Hacemos envíos a todos los departamentos del Perú, incluyendo Lima Metropolitana, provincias y zonas alejadas atendidas por courier nacional.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">2. Tiempos de Entrega Estimados</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="text-left p-3 font-extrabold text-slate-800 border border-slate-200">Zona</th>
                    <th className="text-left p-3 font-extrabold text-slate-800 border border-slate-200">Tiempo Estimado</th>
                    <th className="text-left p-3 font-extrabold text-slate-800 border border-slate-200">Método</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-200">Lima Metropolitana</td>
                    <td className="p-3 border border-slate-200">24 a 48 horas hábiles</td>
                    <td className="p-3 border border-slate-200">Motorizado / Courier local</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 border border-slate-200">Ciudades principales de provincias</td>
                    <td className="p-3 border border-slate-200">2 a 4 días hábiles</td>
                    <td className="p-3 border border-slate-200">Olva Courier / Shalom</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-200">Zonas alejadas o rurales</td>
                    <td className="p-3 border border-slate-200">4 a 7 días hábiles</td>
                    <td className="p-3 border border-slate-200">Courier nacional</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-400">* Los tiempos son referenciales y pueden variar por factores externos (feriados, huelgas, clima).</p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">3. Proceso de Pago Contra Entrega (COD)</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Realizas tu pedido completando el formulario con tus datos de entrega.</li>
              <li>Nuestro equipo te contactará por teléfono o WhatsApp para confirmar el pedido y verificar tu dirección.</li>
              <li>Preparamos y despachamos tu pedido en un paquete discreto y seguro.</li>
              <li>El transportista te llama antes de llegar para coordinar la entrega.</li>
              <li>Recibes el paquete y pagas en efectivo, Yape o Plin. Sin cobros anticipados.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">4. Seguimiento del Pedido</h2>
            <p>
              Una vez despachado tu pedido, te enviamos el número de guía por WhatsApp para que puedas rastrearlo en tiempo real. Para consultas, escríbenos al <strong>+51 935 381 231</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">5. Pedido No Entregado</h2>
            <p>
              Si no pudimos entregarte el pedido (dirección incorrecta, no se encontraba nadie en el domicilio), te contactaremos para reprogramar la entrega sin costo adicional. Realizamos hasta 2 intentos de entrega.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">6. Embalaje</h2>
            <p>
              Todos los pedidos se envían en embalaje discreto, sin indicación del contenido del paquete en el exterior.
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
