"use client";

import { useState, FormEvent } from "react";
import StoreNavbar from "../components/StoreNavbar";
import StoreFooter from "../components/StoreFooter";
import Link from "next/link";

type ReclStatus = "idle" | "loading" | "success" | "error";

export default function LibroReclamacionesPage() {
  const [status, setStatus] = useState<ReclStatus>("idle");
  const [codigoReclamo, setCodigoReclamo] = useState("");
  const [form, setForm] = useState({
    tipoDoc: "DNI",
    numDoc: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    tipoReclamo: "Reclamo",
    producto: "Prostacare",
    montoReclamado: "",
    detalle: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    // Genera un código correlativo único
    const codigo = `IH-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;

    // Arma el mensaje de WhatsApp para el equipo
    const msg = [
      `📋 NUEVO ${form.tipoReclamo.toUpperCase()} — ${codigo}`,
      `Documento: ${form.tipoDoc} ${form.numDoc}`,
      `Nombre: ${form.nombres} ${form.apellidos}`,
      `Teléfono: ${form.telefono}`,
      `Email: ${form.email}`,
      `Producto: ${form.producto}`,
      form.montoReclamado ? `Monto: S/ ${form.montoReclamado}` : "",
      `Detalle: ${form.detalle}`,
    ].filter(Boolean).join("\n");

    // Simula procesamiento breve
    await new Promise((r) => setTimeout(r, 800));

    // Notifica al equipo por WhatsApp
    window.open(
      `https://wa.me/51935381231?text=${encodeURIComponent(msg)}`,
      "_blank"
    );

    setCodigoReclamo(codigo);
    setStatus("success");
  }

  return (
    <div className="store-page">
      <StoreNavbar />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Cabecera */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-black text-amber-800 mb-4">
            <span>📖</span>
            Conforme a Ley N° 29571 — Código del Consumidor
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Libro de Reclamaciones Virtual</h1>
          <p className="text-sm text-slate-500">
            Completa el formulario para registrar tu queja o reclamo. Nos comunicaremos contigo en un máximo de <strong>15 días hábiles</strong>.
          </p>
        </div>

        {status === "success" ? (
          <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-xl font-black text-emerald-900 mb-1">Reclamo Registrado</h2>
            <p className="text-sm text-emerald-800 mb-3">
              Tu {form.tipoReclamo.toLowerCase()} ha sido recibido. Guarda este código de seguimiento:
            </p>
            <div className="inline-block rounded-xl bg-white border-2 border-emerald-300 px-6 py-3 font-black text-xl text-emerald-700 tracking-widest">
              {codigoReclamo}
            </div>
            <p className="mt-4 text-xs text-emerald-700">
              Nos comunicaremos contigo a <strong>{form.email}</strong> o al <strong>{form.telefono}</strong> en un máximo de 15 días hábiles.
            </p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-500 transition"
            >
              Volver al inicio
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Datos del Reclamante */}
            <fieldset className="rounded-2xl border border-slate-200 p-5 space-y-4">
              <legend className="text-sm font-extrabold text-slate-800 px-1">Datos del Reclamante</legend>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Tipo de Documento *</label>
                  <select name="tipoDoc" value={form.tipoDoc} onChange={handleChange} required
                    className="w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none">
                    <option>DNI</option>
                    <option>CE (Carnet de Extranjería)</option>
                    <option>Pasaporte</option>
                    <option>RUC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Número de Documento *</label>
                  <input name="numDoc" value={form.numDoc} onChange={handleChange} required type="text" placeholder="Ej: 12345678"
                    className="w-full rounded-xl border-2 border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Nombres *</label>
                  <input name="nombres" value={form.nombres} onChange={handleChange} required type="text" placeholder="Tus nombres"
                    className="w-full rounded-xl border-2 border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Apellidos *</label>
                  <input name="apellidos" value={form.apellidos} onChange={handleChange} required type="text" placeholder="Tus apellidos"
                    className="w-full rounded-xl border-2 border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Teléfono / Celular *</label>
                  <input name="telefono" value={form.telefono} onChange={handleChange} required type="tel" placeholder="Ej: 987654321"
                    className="w-full rounded-xl border-2 border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Correo Electrónico *</label>
                  <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="tu@correo.com"
                    className="w-full rounded-xl border-2 border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                </div>
              </div>
            </fieldset>

            {/* Detalle del Reclamo */}
            <fieldset className="rounded-2xl border border-slate-200 p-5 space-y-4">
              <legend className="text-sm font-extrabold text-slate-800 px-1">Detalle del Reclamo</legend>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Tipo *</label>
                  <select name="tipoReclamo" value={form.tipoReclamo} onChange={handleChange} required
                    className="w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none">
                    <option>Reclamo</option>
                    <option>Queja</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Producto / Servicio *</label>
                  <select name="producto" value={form.producto} onChange={handleChange} required
                    className="w-full rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none">
                    <option>Prostacare</option>
                    <option>Servicio de Envío</option>
                    <option>Atención al Cliente</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Monto Reclamado (S/) — Opcional</label>
                <input name="montoReclamado" value={form.montoReclamado} onChange={handleChange} type="number" min="0" step="0.01" placeholder="Ej: 124.00"
                  className="w-full rounded-xl border-2 border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Descripción del Reclamo *</label>
                <textarea name="detalle" value={form.detalle} onChange={handleChange} required rows={4}
                  placeholder="Describe detalladamente tu queja o reclamo..."
                  className="w-full rounded-xl border-2 border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none resize-none" />
              </div>
            </fieldset>

            <p className="text-xs text-slate-400">
              Al enviar, aceptas que tus datos sean tratados para la gestión de tu reclamo conforme a nuestra{" "}
              <Link href="/privacidad" className="text-emerald-700 underline">Política de Privacidad</Link>.
            </p>

            <button type="submit" disabled={status === "loading"}
              className="w-full rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-60">
              {status === "loading" ? "Registrando reclamo..." : "📝 Enviar Reclamo"}
            </button>
          </form>
        )}

        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap gap-4 text-sm">
          <Link href="/" className="font-bold text-emerald-700 hover:underline">← Inicio</Link>
          <a href="https://www.indecopi.gob.pe" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-500 hover:underline">Indecopi →</a>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
}
