"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Mostrar después de 1.5 segundos para no interrumpir el primer render
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies y privacidad"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white shadow-2xl shadow-slate-900/15 animate-fadeInUp sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:rounded-2xl sm:border"
    >
      <div className="p-4 sm:p-5">
        <p className="text-xs text-slate-700 leading-relaxed">
          Usamos <strong>cookies y el Meta Pixel</strong> para mejorar tu experiencia y mostrarte anuncios relevantes. Al continuar navegando, aceptas nuestra{" "}
          <Link href="/privacidad" className="font-bold text-emerald-700 underline underline-offset-2">
            Política de Privacidad
          </Link>
          .
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={accept}
            className="flex-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white transition hover:bg-emerald-500 active:scale-95"
          >
            Aceptar
          </button>
          <button
            onClick={decline}
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 active:scale-95"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
