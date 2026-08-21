"use client";

import { useState, useEffect, useRef } from "react";
import {
  trackViewContent,
  trackAddToCart,
  trackContact,
} from "../lib/meta-pixel";
import {
  CheckIcon,
  FlaskIcon,
  LeafIcon,
  LightbulbIcon,
  LockIcon,
  ShieldCheckIcon,
  SirenIcon,
  SparkleIcon,
  SpinnerIcon,
  StarIcon,
  TruckIcon,
  WarningIcon,
  WhatsAppIcon,
  XIcon,
} from "../icons";

const WHATSAPP_NUMBER = "51935381231";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero informacion sobre Liposomal NAD+ Ultimate")}`;

const getWhatsAppOrderUrl = () => {
  const msg = "Hola, quiero pedir Liposomal NAD+ Ultimate (S/ 189). Por favor me brindan informacion para realizar mi pedido.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

const PURCHASE_EVENTS = [
  { name: "Rosa M. de Sanchez", city: "Arequipa", time: "hace 2 min", initials: "RS", image: null as string | null },
  { name: "Pedro Gutierrez", city: "Lima", time: "hace 5 min", initials: "PG", image: null as string | null },
  { name: "Manuel Quispe", city: "Cusco", time: "hace 8 min", initials: "MQ", image: null as string | null },
  { name: "Carmen Tapia", city: "Trujillo", time: "hace 12 min", initials: "CT", image: null as string | null },
  { name: "Jorge Ramirez", city: "Chiclayo", time: "hace 15 min", initials: "JR", image: null as string | null },
  { name: "Luis Flores", city: "Huancayo", time: "hace 18 min", initials: "LF", image: null as string | null },
];

const INGREDIENTS = [
  { name: "NAD+ (Nicotinamida Adenina Dinucleotido)", desc: "Coenzima esencial para la produccion de energia celular y reparacion de ADN.", icon: "flask" },
  { name: "Resveratrol", desc: "Potente antioxidante que apoya la salud cardiovascular y longevidad celular.", icon: "leaf" },
  { name: "Glutation", desc: "El antioxidante maestro del cuerpo, clave para la desintoxicacion y defensa celular.", icon: "shield" },
  { name: "Acido R-Alfa Lipoico", desc: "Antioxidante unico que funciona en agua y grasa, regenera otros antioxidantes.", icon: "sparkle" },
  { name: "Astaxantina", desc: "Antioxidante 6000x mas potente que la vitamina C, protege la piel y ojos.", icon: "star" },
  { name: "Quercetina", desc: "Flavonoide antiinflamatorio que apoya la salud inmunologica y respiratoria.", icon: "leaf" },
  { name: "Coenzima Q10", desc: "Fundamental para la produccion de energia en las mitocondrias celulares.", icon: "flask" },
  { name: "Vitamina B12", desc: "Apoya el sistema nervioso, la formacion de sangre y niveles de energia.", icon: "sparkle" },
  { name: "Vitamina D3", desc: "Esencial para huesos fuertes, sistema inmune y estado de animo.", icon: "shield" },
  { name: "BioPerina", desc: "Extracto de pimienta negra que aumenta la absorcion de nutrientes hasta 2000%.", icon: "star" },
];

const BENEFITS = [
  { title: "Energia Celular", desc: "Apoya la produccion de energia a nivel mitocondrial para sentirte activo todo el dia.", icon: "sparkle" },
  { title: "Mentalidad Clara", desc: "Favorece la funcion cognitiva, concentracion y claridad mental.", icon: "lightbulb" },
  { title: "Longevidad", desc: "Los ingredientes apoyan la reparacion celular y protegen contra el envejecimiento.", icon: "shield" },
  { title: "Antioxidantes Premium", desc: "Formula con los antioxidantes mas reconocidos a nivel mundial.", icon: "leaf" },
  { title: "Alta Absorcion", desc: "Tecnologia liposomal que aumenta la biodisponibilidad de cada ingrediente.", icon: "flask" },
  { title: "Estilo de Vida Saludable", desc: "Complemento ideal para quienes buscan mantenerse saludables y productivos.", icon: "star" },
];

export default function NadPlusLanding() {
  const [stock, setStock] = useState(18);
  const [stockAnimated, setStockAnimated] = useState(false);
  const viewContentFired = useRef(false);
  const [notifIndex, setNotifIndex] = useState(0);
  const [notifState, setNotifState] = useState<"idle" | "visible" | "leaving">("idle");
  const [isCheckoutOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!viewContentFired.current) {
      viewContentFired.current = true;
      trackViewContent("NADPLUS-60CAP", "Liposomal NAD+ Ultimate", 189);
    }
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  // Social proof notifications
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const cycle = (first: boolean) => {
      t1 = setTimeout(() => {
        if (cancelled) return;
        setNotifIndex((i) => (first ? i : (i + 1) % PURCHASE_EVENTS.length));
        setNotifState("visible");
        t2 = setTimeout(() => {
          if (cancelled) return;
          setNotifState("leaving");
          t3 = setTimeout(() => {
            if (!cancelled) { setNotifState("idle"); cycle(false); }
          }, 350);
        }, 4500);
      }, first ? 5000 : 8000);
    };
    cycle(true);
    return () => { cancelled = true; clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Stock countdown
  useEffect(() => {
    const timer1 = setTimeout(() => { setStock(16); setStockAnimated(true); setTimeout(() => setStockAnimated(false), 800); }, 6000);
    const timer2 = setTimeout(() => { setStock(14); setStockAnimated(true); setTimeout(() => setStockAnimated(false), 800); }, 14000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const renderIcon = (icon: string, className: string = "h-5 w-5") => {
    const props = { className, strokeWidth: 2 };
    switch (icon) {
      case "flask": return <FlaskIcon {...props} />;
      case "leaf": return <LeafIcon {...props} />;
      case "shield": return <ShieldCheckIcon {...props} />;
      case "sparkle": return <SparkleIcon {...props} />;
      case "star": return <StarIcon {...props} />;
      case "lightbulb": return <LightbulbIcon {...props} />;
      default: return <CheckIcon {...props} />;
    }
  };

  return (
    <main className="bg-white text-slate-900 selection:bg-indigo-200 selection:text-indigo-950 pb-20 sm:pb-0 font-sans overflow-x-clip">

      {/* CINTILLO STICKY */}
      <div className="sticky top-0 z-40 bg-indigo-700 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-3 py-1.5 sm:py-2">
          <SirenIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <p className="text-center text-[9px] xs:text-[10px] sm:text-xs font-extrabold uppercase tracking-wide">
            ENVIO GRATIS A TODO EL PERU - PAGA EN CASA AL RECIBIR
          </p>
          <SirenIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Placeholder: Logo de NutriIngredients o marca del producto */}
            <div className="h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-black border border-indigo-200">
              NI
            </div>
            <div className="text-left leading-none">
              <span className="block text-sm xs:text-base sm:text-lg font-black tracking-tight text-slate-900">NUTRI</span>
              <span className="mt-0.5 block text-[9px] xs:text-[10px] sm:text-xs font-black tracking-[0.2em] text-indigo-600">INGREDIENTS</span>
            </div>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={() => trackContact("WhatsApp")} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition hover:bg-[#1ebe5d] active:scale-95">
            <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        </div>
      </header>

      {/* ============================================================
          SECCION 1 - HERO
      ============================================================ */}
      <section ref={heroRef} className="min-h-[100svh] flex flex-col bg-white">
        {/* Placeholder: Imagen grande del producto (caja + frasco de NAD+ Ultimate sobre fondo limpio) */}
        <div className="relative w-full overflow-hidden bg-indigo-50 flex-1 flex items-center justify-center p-3 sm:p-4" style={{ minHeight: "34svh", maxHeight: "40svh" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 via-transparent to-white pointer-events-none z-10" />
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8 border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50/50 max-w-sm">
              <div className="text-4xl mb-3 text-indigo-400">
                <FlaskIcon className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-sm font-bold text-indigo-700">IMAGEN DEL PRODUCTO</p>
              <p className="text-xs text-indigo-500 mt-1">Coloca aqui la imagen de la caja y frasco de Liposomal NAD+ Ultimate sobre fondo blanco o degradado suave</p>
            </div>
          </div>
        </div>

        {/* Info del producto */}
        <div className="w-full bg-white px-4 pt-3 pb-4 sm:px-8 sm:pt-4 sm:pb-6 flex flex-col gap-2.5 sm:gap-3 max-w-2xl mx-auto">
          <div className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-indigo-700 uppercase">
              LONGEVIDAD Y ENERGIA CELULAR
            </span>
            <h1 className="mt-1 text-2xl sm:text-4xl font-black tracking-tight text-slate-950 leading-tight">
              Liposomal NAD+ <span className="text-indigo-600">Ultimate</span>
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-500 font-medium">
              Formula 10 en 1 - 1,000mg por servicio - 60 Capsulas Vegetarianas
            </p>
          </div>

          {/* Precio */}
          <div className="flex items-baseline gap-2 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <span className="text-3xl sm:text-4xl font-black text-slate-950">S/ 189</span>
            <span className="text-sm sm:text-base text-slate-400 line-through font-bold">S/ 299</span>
            <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] sm:text-xs font-black text-amber-700">Ahorras S/ 110</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            {[
              { icon: <TruckIcon className="h-3.5 w-3.5" />, text: "Envio gratis" },
              { icon: <ShieldCheckIcon className="h-3.5 w-3.5" />, text: "Pago al recibir" },
              { icon: <LeafIcon className="h-3.5 w-3.5" />, text: "100% Vegetariano" },
            ].map((b, i) => (
              <span key={i} className="flex items-center gap-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold">
                {b.icon}{b.text}
              </span>
            ))}
          </div>

          {/* CTA Principal */}
          <a
            href={getWhatsAppOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("WhatsApp Order")}
            className="btn-primary-cta btn-indigo btn-beat w-full justify-center text-sm sm:text-base py-3.5"
          >
            <WhatsAppIcon className="h-5 w-5" />
            PEDIR POR WHATSAPP - PAGO EN CASA (S/ 189)
          </a>

          <p className="flex items-center justify-center gap-1.5 text-center text-[10px] sm:text-xs font-bold text-slate-400">
            <LockIcon className="h-3 w-3 shrink-0" />
            Sin tarjeta. Sin transferencia. Solo efectivo o Yape al recibir.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECCION 2 - EL PROBLEMA (Senales despues de los 40)
      ============================================================ */}
      <section ref={(el) => { sectionRefs.current[0] = el; }} className="min-h-[100svh] flex flex-col justify-center bg-slate-50 border-y border-slate-200 py-10 sm:py-0 scroll-reveal">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-4 sm:space-y-5">
          <div className="text-center">
            <span className="inline-block text-[10px] xs:text-xs font-extrabold tracking-widest text-red-600 uppercase bg-red-100 px-2.5 py-1 rounded-md">
              SEÑALES DE BAJO RENDIMIENTO CELULAR
            </span>
            <h2 className="mt-2 text-xl sm:text-3xl font-black tracking-tight text-slate-950">
              ¿Te sientes menos de lo que deberias?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[
              { img: "/nadplus/placeholder-sueno.png", text: "Cansancio constante aunque duermas bien", label: "Imagen: Persona cansada / somnolienta" },
              { img: "/nadplus/placeholder-enfoque.png", text: "Dificultad para concentrarte y pensar rapido", label: "Imagen: Persona con confusion mental" },
              { img: "/nadplus/placeholder-energia.png", text: "Falta de energia para actividades diarias", label: "Imagen: Persona sin energia / agotada" },
              { img: "/nadplus/placeholder-envejecimiento.png", text: "Signos prematuros de envejecimiento", label: "Imagen: Persona mayor preocupada" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col overflow-hidden rounded-2xl bg-white border border-red-100 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition duration-200">
                {/* Placeholder para imagen */}
                <div className="w-full aspect-[4/5] bg-slate-100 flex items-center justify-center p-2 border-b border-red-50">
                  <div className="text-center">
                    <div className="text-2xl text-red-300 mb-1"><XIcon className="h-6 w-6 mx-auto" /></div>
                    <p className="text-[9px] text-slate-400 font-bold leading-tight">{item.label}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 mt-0.5">
                    <XIcon className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <p className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-800 leading-snug">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-indigo-950 p-3.5 sm:p-4 text-white">
            <LightbulbIcon className="h-6 w-6 shrink-0 text-amber-300" />
            <p className="text-xs sm:text-sm font-bold leading-snug">
              A partir de los 40, los niveles de NAD+ caen hasta un 50%. <strong>Liposomal NAD+ Ultimate</strong> te ayuda a recuperar esa energia vital desde la celula.
            </p>
          </div>

          <div className="text-center">
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("WhatsApp Order")}
              className="btn-primary-cta btn-indigo btn-beat mx-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              QUIERO RECUPERAR MI ENERGIA (S/ 189)
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECCION 3 - LA SOLUCION (Que es NAD+ y tecnologia liposomal)
      ============================================================ */}
      <section ref={(el) => { sectionRefs.current[1] = el; }} className="min-h-[100svh] flex flex-col justify-center bg-indigo-950 text-white py-10 sm:py-0 scroll-reveal">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-5 flex justify-center order-1 md:order-2">
              <div className="relative w-full max-w-[240px] sm:max-w-sm">
                <div className="absolute -inset-8 rounded-full bg-indigo-500/20 blur-3xl -z-10" />
                {/* Placeholder: Imagen del frasco NAD+ con efecto de brillo/celula */}
                <div className="w-full aspect-square rounded-2xl bg-indigo-900/50 border-2 border-dashed border-indigo-400/30 flex items-center justify-center p-4">
                  <div className="text-center">
                    <FlaskIcon className="h-16 w-16 mx-auto text-indigo-400/50 mb-3" />
                    <p className="text-xs font-bold text-indigo-300/70">IMAGEN DEL PRODUCTO</p>
                    <p className="text-[10px] text-indigo-400/50 mt-1">Frasco de NAD+ Ultimate con efecto de brillo o particulas de energia</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 order-2 md:order-1 space-y-4 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-indigo-300">
                <SparkleIcon className="h-3.5 w-3.5 shrink-0" />
                Ciencia de Vanguardia
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Que es el <span className="text-indigo-300">NAD+</span> y por que lo necesitas
              </h2>
              <div className="space-y-3">
                {[
                  { icon: <FlaskIcon className="h-5 w-5" />, title: "NAD+: El Combustible Celular", desc: "Nicotinamida Adenina Dinucleotido es una coenzima presente en cada celula de tu cuerpo, esencial para producir energia." },
                  { icon: <ShieldCheckIcon className="h-5 w-5" />, title: "Tecnologia Liposomal", desc: "Las particulas liposomales protegen los ingredientes y aumentan su absorcion hasta 5 veces mas que las formulas convencionales." },
                  { icon: <LeafIcon className="h-5 w-5" />, title: "10 Ingredientes Premium", desc: "NAD+ + Resveratrol + Glutation + Astaxantina + Quercetina y mas. Cada ingrediente potencia a los demas." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3.5 border border-white/10">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">{item.icon}</span>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center md:items-start gap-2">
                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact("WhatsApp Order")}
                  className="btn-primary-cta btn-indigo btn-beat px-7 py-4 sm:px-10 sm:py-5 text-base sm:text-xl"
                >
                  <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  PEDIR POR WHATSAPP - S/ 189
                </a>
                <p className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                  <CheckIcon className="h-4 w-4" strokeWidth={3} />
                  PAGO CONTRA ENTREGA EN TODO EL PERU
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECCION 4 - INGREDIENTES (Formula 10 en 1)
      ============================================================ */}
      <section ref={(el) => { sectionRefs.current[2] = el; }} className="min-h-[100svh] flex flex-col justify-center bg-white py-10 sm:py-0 scroll-reveal">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-5">
          <div className="text-center">
            <span className="inline-block text-[10px] xs:text-xs font-extrabold tracking-widest text-indigo-600 uppercase bg-indigo-100 px-2.5 py-1 rounded-md">
              FORMULA 10 EN 1
            </span>
            <h2 className="mt-2 text-xl sm:text-3xl font-black tracking-tight text-slate-950">
              Cada ingrediente tiene un proposito
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Ingredientes clinicamente estudiados, formulados en sinergia para maximizar resultados.
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {INGREDIENTS.map((ing, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                  {renderIcon(ing.icon)}
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-950 leading-tight">{ing.name}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">{ing.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("WhatsApp Order")}
              className="btn-primary-cta btn-indigo btn-beat mx-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              QUIERO PROBAR LA FORMULA (S/ 189)
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECCION 5 - BENEFICIOS
      ============================================================ */}
      <section ref={(el) => { sectionRefs.current[3] = el; }} className="min-h-[100svh] flex flex-col justify-center bg-slate-950 text-white py-10 sm:py-0 scroll-reveal">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-5">
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">Beneficios que se sienten</h2>
            <div className="mt-1.5 flex items-center justify-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-4 w-4" />)}
              <span className="ml-1.5 text-xs font-bold text-slate-400">4.9/5 - 287 clientes satisfechos</span>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col hover:bg-white/8 transition-colors">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 mb-3">
                  {renderIcon(benefit.icon)}
                </span>
                <h3 className="text-base font-extrabold text-white mb-1">{benefit.title}</h3>
                <p className="flex-1 text-xs sm:text-sm text-slate-300 leading-snug">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-[10px] text-slate-500 leading-relaxed max-w-2xl mx-auto">
            * Los beneficios descritos se basan en las propiedades conocidas de los ingredientes. Complemento alimenticio, no diagnostica ni trata enfermedades.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECCION 6 - TESTIMONIOS
      ============================================================ */}
      <section ref={(el) => { sectionRefs.current[4] = el; }} className="min-h-[100svh] flex flex-col justify-center bg-slate-900 text-white py-10 sm:py-0 scroll-reveal">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-5">
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">Lo que dicen nuestros clientes</h2>
            <div className="mt-1.5 flex items-center justify-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-4 w-4" />)}
              <span className="ml-1.5 text-xs font-bold text-slate-400">4.9/5 - Resenas verificadas</span>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {[
              { name: "Don Augusto", detail: "54 anos - Lima", initials: "DA", time: "Hace 2 semanas", quote: "Llevaba meses sintiome agotado. Despues de 15 dias con NAD+ Ultimate me siento con mas energia que antes. Duermo mejor y me concentro mucho mejor en el trabajo." },
              { name: "Sra. Carmen", detail: "48 anos - Arequipa", initials: "CA", time: "Hace 1 semana", quote: "Me lo recomendaron por los antioxidantes. La verdad es que noto mi piel mejor y mis habilidades mentales mas rapidas. Muy buen producto." },
              { name: "Don Roberto", detail: "61 anos - Cusco", initials: "RB", time: "Hace 3 dias", quote: "Como se paga al recibir me animé a pedir. A las dos semanas ya sentia diferencia. Mas animo, menos cansancio. Lo sigo pidiendo." },
            ].map((testi, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col">
                <div className="flex items-center gap-3">
                  {/* Placeholder: Foto de perfil del testimonio */}
                  <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-black text-white uppercase border-2 border-indigo-400/60">
                    {testi.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-white">{testi.name} <span className="font-medium text-slate-400">({testi.detail})</span></div>
                    <div className="mt-0.5 flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-3 w-3" />)}
                      <span className="ml-1 text-[10px] font-medium text-slate-400">5.0</span>
                    </div>
                  </div>
                </div>
                <blockquote className="mt-3 flex-1 text-xs sm:text-sm text-slate-200 leading-snug italic">&quot;{testi.quote}&quot;</blockquote>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] sm:text-[11px]">
                  <span className="flex items-center gap-1 font-bold text-indigo-300"><CheckIcon className="h-3 w-3" strokeWidth={3} />Compra verificada</span>
                  <span className="text-slate-400">{testi.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECCION 7 - OFERTA + URGENCIA
      ============================================================ */}
      <section ref={(el) => { sectionRefs.current[5] = el; }} className="min-h-[100svh] flex flex-col justify-center bg-gradient-to-b from-indigo-50 to-slate-100 py-10 sm:py-0 scroll-reveal">
        <div className="mx-auto w-full max-w-lg px-4 sm:px-6">
          <div className="rounded-2xl sm:rounded-3xl border-2 border-dashed border-indigo-500 bg-white p-5 sm:p-7 shadow-xl space-y-4 text-center">
            {/* Placeholder: Imagen del producto (frasco individual) */}
            <div className="mx-auto w-full max-w-[170px] sm:max-w-[210px]">
              <div className="w-full aspect-square rounded-xl bg-indigo-50 border-2 border-dashed border-indigo-200 flex items-center justify-center">
                <div className="text-center p-3">
                  <FlaskIcon className="h-10 w-10 mx-auto text-indigo-300 mb-2" />
                  <p className="text-[9px] font-bold text-indigo-500">IMAGEN DEL FRASCO</p>
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className={`flex items-center justify-center gap-2 p-2.5 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 ${stockAnimated ? "bg-red-600 text-white scale-105" : "bg-red-100 text-red-800"}`}>
              <WarningIcon className="h-4 w-4 shrink-0" />
              <span>Solo quedan <span className="underline text-sm sm:text-lg">{stock} frascos</span> en almacen Lima</span>
            </div>

            {/* Oferta */}
            <div className="space-y-1">
              <p className="text-slate-400 line-through text-xs sm:text-sm font-bold">Precio Normal: S/ 299.00</p>
              <div className="text-3xl sm:text-5xl font-black text-indigo-600 leading-tight">S/ 189.00 HOY</div>
              <p className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] sm:text-xs font-black uppercase text-amber-700">Ahorras S/ 110 + Envio Gratis</p>
            </div>

            {/* Beneficios rapidos */}
            <div className="space-y-2 text-left">
              {[
                "Formula 10 en 1 con ingredientes premium",
                "Tecnologia liposomal de alta absorcion",
                "60 capsulas vegetarianas (1 mes de tratamiento)",
                "Pago contra entrega en todo el Peru",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" strokeWidth={3} />
                  <span className="text-xs sm:text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("WhatsApp Order")}
              className="btn-primary-cta btn-indigo btn-beat w-full justify-center"
            >
              <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              PEDIR POR WHATSAPP (S/ 189)
            </a>

            {/* Garantia */}
            <div className="flex items-center justify-center gap-2 rounded-xl bg-indigo-50 border border-indigo-200 p-2.5 text-xs sm:text-sm text-indigo-950 font-bold text-left">
              <ShieldCheckIcon className="h-5 w-5 shrink-0 text-indigo-700" />
              <span><strong>Sin riesgo:</strong> Paquete discreto. Pagas en efectivo o Yape solo al recibirlo.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-6 px-4 text-center text-[11px] sm:text-xs space-y-2 border-t border-slate-800">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-slate-400 leading-relaxed"><strong>DESCARGO:</strong> Complemento alimenticio natural de venta libre. No sustituye la consulta medica. Resultados individuales pueden variar.</p>
          <p className="text-slate-500">Este sitio no es parte de Facebook ni esta respaldado por Meta, Inc.</p>
          <p className="text-slate-600 font-semibold">© {new Date().getFullYear()} ImportHealth Peru - Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* NOTIFICACION DE COMPRA EN VIVO */}
      {notifState !== "idle" && (
        <div role="status" aria-live="polite" className={`fixed bottom-36 sm:bottom-8 left-3 sm:left-6 z-30 w-[220px] sm:w-[260px] select-none ${notifState === "visible" ? "notif-in" : "notif-out pointer-events-none"}`}>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 backdrop-blur p-2 shadow-lg">
            {PURCHASE_EVENTS[notifIndex].image ? (
              <img src={PURCHASE_EVENTS[notifIndex].image as string} alt="" className="h-8 w-8 shrink-0 rounded-full border-2 border-indigo-200 object-cover" />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">{PURCHASE_EVENTS[notifIndex].initials}</span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-black leading-tight text-slate-900">{PURCHASE_EVENTS[notifIndex].name} <span className="font-bold text-slate-500">- {PURCHASE_EVENTS[notifIndex].city}</span></p>
              <p className="truncate text-[9px] font-bold leading-snug text-slate-700">compro <span className="font-black text-indigo-700">NAD+ Ultimate</span></p>
              <p className="mt-0.5 flex items-center gap-1 text-[8px] font-bold text-slate-400">{PURCHASE_EVENTS[notifIndex].time}<CheckIcon className="h-2 w-2 text-indigo-600" strokeWidth={4} /><span>Verificado</span></p>
            </div>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BAR MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-indigo-700/95 backdrop-blur-md p-2.5 border-t-2 border-white shadow-2xl flex items-center justify-between gap-2">
        <div className="text-white pl-1">
          <div className="text-[10px] font-black">PAGA EN CASA AL RECIBIR</div>
          <div className="text-sm font-black">S/ 189 <span className="text-[9px] text-indigo-100 font-normal">Envio gratis</span></div>
        </div>
        <a href={getWhatsAppOrderUrl()} target="_blank" rel="noopener noreferrer" onClick={() => trackContact("WhatsApp Order")} className="btn-primary-cta btn-indigo btn-beat py-2.5 px-4 text-xs font-black uppercase w-auto flex items-center gap-1.5">
          <WhatsAppIcon className="h-4 w-4" />PEDIR POR WHATSAPP
        </a>
      </div>

      {/* BOTON FLOTANTE WHATSAPP */}
      {!isCheckoutOpen && (
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={() => trackContact("WhatsApp")} className="fixed bottom-24 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2 sm:gap-3 rounded-full bg-[#25D366] px-4 sm:px-5 py-3 sm:py-4 shadow-xl shadow-[#25D366]/40 transition-all hover:scale-105 active:scale-95">
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white shrink-0" />
          <span className="hidden sm:block max-w-[180px] text-left">
            <span className="block text-xs font-black text-white leading-tight">¿Dudas?</span>
            <span className="block text-[10px] sm:text-[11px] font-bold text-white/90">Escrivenos por WhatsApp</span>
          </span>
          <span className="sm:hidden text-xs font-black text-white">WhatsApp</span>
        </a>
      )}

    </main>
  );
}
