"use client";

import { FormEvent, useState, useEffect, useRef } from "react";
import { PERU_DEPARTMENTS } from "../data/peru-locations";
import {
  trackViewContent,
  trackAddToCart,
  trackInitiateCheckout,
  trackAddPaymentInfo,
  trackLead,
  trackPurchase,
  trackContact,
} from "../lib/meta-pixel";
import {
  CartIcon,
  CheckIcon,
  FlameIcon,
  FlaskIcon,
  LeafIcon,
  LightbulbIcon,
  LockIcon,
  LogoShieldIcon,
  MedalIcon,
  ShieldCheckIcon,
  SirenIcon,
  SnowflakeIcon,
  SparkleIcon,
  SpinnerIcon,
  StarIcon,
  TruckIcon,
  WarningIcon,
  WhatsAppIcon,
  XIcon,
} from "../icons";

// WhatsApp del comercio: +51 935 381 231 (código de país + número, sin espacios ni símbolos)
const WHATSAPP_NUMBER = "51935381231";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero información sobre Prostacare")}`;

// Pack offer options definitions
const PACK_OPTIONS = [
  {
    id: 1,
    quantity: 1,
    title: "1 Pack Prostacare (Tratamiento 30 Días)",
    badge: "PRUEBA INICIAL",
    badgeIcon: "none",
    image: "/seccion2.png",
    basePrice: 124,
    normalPrice: 190,
    savingsText: "Ahorras S/ 66",
    desc: "1 Frasco Cápsulas Saw Palmetto + 1 Sobre Parches Transdérmicos (30 Parches)"
  },
  {
    id: 2,
    quantity: 2,
    title: "2 Packs Prostacare (Tratamiento 60 Días)",
    badge: "MÁS POPULAR",
    badgeIcon: "flame",
    image: "/pack%202.png",
    basePrice: 214,
    normalPrice: 380,
    savingsText: "Ahorras S/ 166",
    desc: "2 Frascos Cápsulas Saw Palmetto + 2 Sobres Parches Transdérmicos (60 Parches)",
    isPopular: true
  },
  {
    id: 3,
    quantity: 3,
    title: "3 Packs Prostacare (Tratamiento 90 Días)",
    badge: "MEJOR AHORRO",
    badgeIcon: "star",
    image: "/pack%203.png",
    basePrice: 314,
    normalPrice: 570,
    savingsText: "Ahorras S/ 256",
    desc: "3 Frascos Cápsulas Saw Palmetto + 3 Sobres Parches Transdérmicos (90 Parches)"
  }
];

// Notificaciones de compra en vivo (social proof). Fotos en /perfil/*.jpg, sin repetir.
const PURCHASE_EVENTS: {
  name: string;
  city: string;
  pack: number; // id del pack (1, 2 o 3)
  packLabel: string;
  time: string;
  initials: string;
  image: string | null;
}[] = [
  { name: "Rosa M. de Sánchez", city: "Arequipa", pack: 2, packLabel: "2 Packs (60 días)", time: "hace 2 min", initials: "RS", image: null },
  { name: "Pedro Gutiérrez", city: "Lima", pack: 1, packLabel: "1 Pack (30 días)", time: "hace 5 min", initials: "PG", image: "/perfil/diego.jpg" },
  { name: "Manuel Quispe", city: "Cusco", pack: 3, packLabel: "3 Packs (90 días)", time: "hace 8 min", initials: "MQ", image: "/perfil/fernando.jpg" },
  { name: "Carmen Tapia", city: "Trujillo", pack: 2, packLabel: "2 Packs (60 días)", time: "hace 12 min", initials: "CT", image: null },
  { name: "Jorge Ramírez", city: "Chiclayo", pack: 1, packLabel: "1 Pack (30 días)", time: "hace 15 min", initials: "JR", image: "/perfil/jorge.jpg" },
  { name: "Luis Flores", city: "Huancayo", pack: 3, packLabel: "3 Packs (90 días)", time: "hace 18 min", initials: "LF", image: "/perfil/mario.jpg" },
  { name: "María Elena Díaz", city: "Piura", pack: 2, packLabel: "2 Packs (60 días)", time: "hace 22 min", initials: "MD", image: null },
  { name: "Roberto Chávez", city: "Iquitos", pack: 1, packLabel: "1 Pack (30 días)", time: "hace 26 min", initials: "RC", image: "/perfil/vicente.jpg" }
];

// Identificadores de contenido para el Meta Pixel
const PACK_CONTENT_IDS: Record<number, string> = {
  1: "PROSTACARE-30D",
  2: "PROSTACARE-60D",
  3: "PROSTACARE-90D",
};

export default function Home() {
  // Stock counter urgency state
  const [stock, setStock] = useState(14);
  const [stockAnimated, setStockAnimated] = useState(false);
  // Controla si ViewContent ya se disparó
  const viewContentFired = useRef(false);

  // Notificaciones de compra en vivo: idle → visible (4.5s) → leaving (0.35s) → idle
  const [notifIndex, setNotifIndex] = useState(0);
  const [notifState, setNotifState] = useState<"idle" | "visible" | "leaving">("idle");

  // Disparar ViewContent al cargar la página del producto
  useEffect(() => {
    if (!viewContentFired.current) {
      viewContentFired.current = true;
      const pack = PACK_OPTIONS.find((p) => p.id === 2) || PACK_OPTIONS[0];
      trackViewContent(PACK_CONTENT_IDS[2], pack.title, pack.basePrice);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const cycle = (first: boolean) => {
      // Primera aparición a los 5s; luego cada 8s (visible 4.5s + pausa 8s)
      t1 = setTimeout(
        () => {
          if (cancelled) return;
          setNotifIndex((i) => (first ? i : (i + 1) % PURCHASE_EVENTS.length));
          setNotifState("visible");
          t2 = setTimeout(() => {
            if (cancelled) return;
            setNotifState("leaving");
            t3 = setTimeout(() => {
              if (cancelled) return;
              setNotifState("idle");
              cycle(false);
            }, 350);
          }, 4500);
        },
        first ? 5000 : 8000
      );
    };

    cycle(true);
    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Modals visibility control
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Ocultar la notificación mientras hay un modal abierto
  useEffect(() => {
    if (isCheckoutOpen) setNotifState("idle");
  }, [isCheckoutOpen]);

  // Selected pack option
  const [selectedPackId, setSelectedPackId] = useState(2); // Default to 2-pack (popular)

  // Form inputs state
  const [selectedDept, setSelectedDept] = useState("Lima");
  const [selectedProv, setSelectedProv] = useState("Lima");
  const [selectedDist, setSelectedDist] = useState("Miraflores");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Stock decrement simulation
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStock(12);
      setStockAnimated(true);
      setTimeout(() => setStockAnimated(false), 800);
    }, 6000);

    const timer2 = setTimeout(() => {
      setStock(11);
      setStockAnimated(true);
      setTimeout(() => setStockAnimated(false), 800);
    }, 14000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Department / Province / District helpers
  const currentDeptObj = PERU_DEPARTMENTS.find((d) => d.name === selectedDept) || PERU_DEPARTMENTS[0];
  const currentProvinces = currentDeptObj.provinces;
  const currentProvObj = currentProvinces.find((p) => p.name === selectedProv) || currentProvinces[0];
  const currentDistricts = currentProvObj ? currentProvObj.districts : [];

  const handleDeptChange = (deptName: string) => {
    setSelectedDept(deptName);
    const dept = PERU_DEPARTMENTS.find((d) => d.name === deptName);
    if (dept && dept.provinces.length > 0) {
      const firstProv = dept.provinces[0];
      setSelectedProv(firstProv.name);
      if (firstProv.districts.length > 0) {
        setSelectedDist(firstProv.districts[0]);
      } else {
        setSelectedDist("");
      }
    }
  };

  const handleProvChange = (provName: string) => {
    setSelectedProv(provName);
    const prov = currentProvinces.find((p) => p.name === provName);
    if (prov && prov.districts.length > 0) {
      setSelectedDist(prov.districts[0]);
    } else {
      setSelectedDist("");
    }
  };

  // Open checkout modal from any CTA button + dispara eventos pixel
  const openCheckout = (packIdChoice?: number) => {
    const targetPackId = packIdChoice || selectedPackId;
    if (packIdChoice) {
      setSelectedPackId(packIdChoice);
    }
    // Meta Pixel: AddToCart cuando selecciona un pack, InitiateCheckout al abrir modal
    const pack = PACK_OPTIONS.find((p) => p.id === targetPackId) || PACK_OPTIONS[1];
    trackAddToCart(PACK_CONTENT_IDS[targetPackId], pack.title, pack.basePrice, pack.quantity);
    trackInitiateCheckout(PACK_CONTENT_IDS[targetPackId], pack.title, pack.basePrice, pack.quantity);
    setIsCheckoutOpen(true);
  };

  // Close checkout modal (sin pantalla de retención)
  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  // Selected pack price
  const activePack = PACK_OPTIONS.find((p) => p.id === selectedPackId) || PACK_OPTIONS[1];
  const finalPrice = activePack.basePrice;

  // Valida en tiempo real si todos los campos obligatorios están completos
  const isFormValid =
    fullName.trim().length > 0 &&
    /^9\d{8}$/.test(phone.replace(/\D/g, "")) &&
    selectedDept.length > 0 &&
    selectedProv.length > 0 &&
    selectedDist.length > 0 &&
    address.trim().length > 0;

  // Submit checkout form
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const cleanPhone = phone.replace(/\D/g, "");
    if (!/^9\d{8}$/.test(cleanPhone)) {
      setStatus("error");
      setMessage("Ingresa un número de celular peruano válido de 9 dígitos (debe empezar con 9).");
      return;
    }

    if (!fullName.trim() || !address.trim() || !selectedDept || !selectedProv || !selectedDist) {
      setStatus("error");
      setMessage("Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: cleanPhone,
          department: selectedDept,
          province: selectedProv,
          district: selectedDist,
          address: address.trim(),
          reference: reference.trim(),
          packPrice: finalPrice,
          packTitle: activePack.title,
          quantity: activePack.quantity
        })
      });

      const data = await response.json();
      if (!response.ok && status !== "success") {
        throw new Error(data.message || "No pudimos registrar tu pedido. Por favor inténtalo de nuevo.");
      }

      setStatus("success");
      setMessage(data.message || "¡Felicidades! Tu pedido ha sido registrado con éxito. Te llamaremos por teléfono para coordinar la entrega.");
      
      // Meta Pixel — Eventos Lead, AddPaymentInfo & Purchase para máxima conversión en campañas de Meta Ads
      trackLead("Formulario COD Completado", finalPrice);
      trackAddPaymentInfo(PACK_CONTENT_IDS[activePack.id] || "PROSTACARE-30D", finalPrice);
      trackPurchase(
        PACK_CONTENT_IDS[activePack.id] || "PROSTACARE-30D",
        activePack.title,
        finalPrice,
        activePack.quantity
      );

      // Envía el pedido automáticamente al WhatsApp del comercio
      const orderMsg = [
        "NUEVO PEDIDO - PROSTACARE PERU",
        `Nombre: ${fullName.trim()}`,
        `Celular: ${cleanPhone}`,
        `Departamento: ${selectedDept}`,
        `Provincia: ${selectedProv}`,
        `Distrito: ${selectedDist}`,
        `Direccion: ${address.trim()}`,
        reference.trim() ? `Referencia: ${reference.trim()}` : "",
        `Pack: ${activePack.title}`,
        `Total: S/ ${finalPrice} (pago contra entrega)`
      ]
        .filter(Boolean)
        .join("\n");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMsg)}`, "_blank");

      setFullName("");
      setPhone("");
      setAddress("");
      setReference("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Ocurrió un error inesperado al procesar tu pedido.");
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-emerald-200 selection:text-emerald-950 pb-24 sm:pb-0 font-sans overflow-x-clip">
      
      {/* Cintillo verde (fijo arriba, siempre visible al bajar) — PAGO CONTRA ENTREGA */}
      <div className="sticky top-0 z-40">
        <div className="bg-emerald-600 text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-1.5 px-2.5 py-1.5 sm:gap-3 sm:px-6 sm:py-2">
            <SirenIcon className="h-3.5 w-3.5 shrink-0 text-white sm:h-4 sm:w-4" />
            <p className="text-center text-[9px] xs:text-[10px] sm:text-xs font-extrabold uppercase tracking-wide leading-tight">
              ENVÍO GRATIS A TODO EL PERÚ — PAGA EN CASA AL RECIBIR
            </p>
            <SirenIcon className="h-3.5 w-3.5 shrink-0 text-white sm:h-4 sm:w-4" />
          </div>
        </div>
      </div>

      {/* Header (Logo + WhatsApp: se van con el scroll, solo el cintillo se queda) */}
      <header className="bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="relative mx-auto flex max-w-6xl items-center px-3 py-2 sm:px-6 sm:py-3">
          {/* Logo centrado */}
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2">
            <LogoShieldIcon className="h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11" />
            <div className="text-left leading-none">
              <span className="block text-sm xs:text-base sm:text-lg font-black tracking-tight text-blue-950">PROSTATE</span>
              <span className="mt-1 block text-[9px] xs:text-[10px] sm:text-xs font-black tracking-[0.2em] text-emerald-600">HEALTH</span>
            </div>
          </div>

          {/* WhatsApp a la derecha */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
            onClick={() => trackContact("WhatsApp")}
            className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/40 transition hover:bg-emerald-600 active:scale-95"
          >
            <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        </div>
      </header>



      {/* SECCIÓN 1 HERO (Responsivo: texto izq. + imagen der. en todas las pantallas) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-6 pb-10 sm:pt-14 sm:pb-20">
        <div className="mx-auto max-w-6xl px-3.5 sm:px-6 relative z-10">
          
          {/* Filas lado a lado: texto a la izquierda, imagen a la derecha (igual en móvil y web) */}
          <div className="grid grid-cols-12 items-center gap-3 sm:gap-6">
            
            {/* Columna Izquierda: Encabezado, Subtítulo, Badges */}
            <div className="col-span-7 space-y-3 sm:space-y-5 text-left">
              
              {/* Título Principal: en móvil se achica para mantener la vista lateral */}
              <h1 className="animate-fadeInUp text-[15px] xs:text-base sm:text-2xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-blue-950 leading-[1.06]">
                FÓRMULA NATURAL <span className="text-emerald-600">PARA EL</span><br />
                BIENESTAR <br className="sm:hidden" />MASCULINO<br />
                DE ACCIÓN DUAL
              </h1>

              {/* 4 Iconos Circulares Verdes en Fila Ultra Compacta */}
              <div className="animate-fadeInUp grid grid-cols-4 gap-1 xs:gap-1.5 sm:gap-4 py-0.5 sm:py-1.5 max-w-md" style={{ animationDelay: "200ms" }}>
                {[
                  { Icon: LeafIcon, lines: ["INGREDIENTES", "NATURALES"] },
                  { Icon: ShieldCheckIcon, lines: ["FÓRMULA", "AVANZADA"] },
                  { Icon: FlaskIcon, lines: ["SIN QUÍMICOS", "DAÑINOS"] },
                  { Icon: MedalIcon, lines: ["CALIDAD", "PREMIUM"] }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="flex h-8 w-8 xs:h-9 xs:w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-2 border-emerald-600 bg-white text-emerald-600 shadow-sm">
                      <item.Icon className="h-4 w-4 xs:h-[18px] xs:w-[18px] sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={2.2} />
                    </div>
                    <span className="mt-1 text-[6px] xs:text-[6.5px] sm:text-[9px] md:text-[11px] font-black leading-tight text-blue-950 uppercase">
                      {item.lines[0]}
                      <br />
                      {item.lines[1]}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA (solo escritorio: dentro de la columna, como en la vista web) */}
              <div className="animate-fadeInUp hidden md:flex flex-col items-start gap-2.5 pt-1" style={{ animationDelay: "300ms" }}>
                {/* AVISO: PAGA EN CASA AL RECIBIR — estilo notificación, NO parece botón */}
                <div className="animate-fadeInUp w-full rounded-lg border-2 border-dashed border-emerald-400 bg-emerald-50 px-4 py-2.5">
                  <p className="text-center text-xs sm:text-sm font-black uppercase tracking-wide text-emerald-800 leading-tight">
                    ✅ PAGA EN CASA AL RECIBIR
                  </p>
                  <p className="text-center text-[10px] sm:text-[11px] font-semibold text-emerald-600 mt-0.5">
                    No pagas nada por adelantado — solo cuando el repartidor te entregue el paquete
                  </p>
                </div>

                <button onClick={() => openCheckout(2)} className="btn-primary-cta btn-beat">
                  <CartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  PEDIR AHORA — PAGO EN CASA (DESDE S/ 124)
                </button>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <CheckIcon className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>Sin tarjeta. Sin transferencia. Solo cash al recibir.</span>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Imagen seccion1.png Superpuesta Responsiva */}
            <div className="col-span-5 flex justify-center relative">
              <div className="animate-hero-img relative w-full max-w-[150px] xs:max-w-[175px] sm:max-w-xs md:max-w-md">
                {/* Resplandor decorativo de fondo */}
                <div className="absolute -inset-2 sm:-inset-4 rounded-full bg-emerald-200/40 blur-2xl -z-10" />
                
                {/* Imagen seccion1.png responsiva */}
                <img
                  src="/seccion1.png"
                  alt="Sección 1 - Prostacare Tratamiento Natural"
                  className="w-full h-auto object-contain drop-shadow-xl hover:scale-[1.01] transition-transform duration-300 mx-auto"
                />
              </div>
            </div>

          </div>

          {/* CTA (móvil): botón abajo a lo ancho, debajo de las dos columnas */}
          <div className="animate-fadeInUp mt-4 flex flex-col items-center gap-2.5 md:hidden" style={{ animationDelay: "300ms" }}>
            {/* AVISO: PAGA EN CASA AL RECIBIR — estilo notificación, NO parece botón */}
            <div className="animate-fadeInUp w-full rounded-lg border-2 border-dashed border-emerald-400 bg-emerald-50 px-4 py-2.5">
              <p className="text-center text-sm font-black uppercase tracking-wide text-emerald-800 leading-tight">
                ✅ PAGA EN CASA AL RECIBIR
              </p>
              <p className="text-center text-[10px] font-semibold text-emerald-600 mt-0.5">
                No pagas nada por adelantado — solo cuando el repartidor te entregue
              </p>
            </div>

            <button onClick={() => openCheckout(2)} className="btn-primary-cta btn-beat">
              <CartIcon className="h-5 w-5" />
              PEDIR AHORA — PAGO EN CASA (DESDE S/ 124)
            </button>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white">
                <CheckIcon className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span>Sin tarjeta. Sin transferencia. Solo cash al recibir.</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN 2: EL GANCHO A LA YUGULAR */}
      <section className="relative overflow-hidden bg-blue-950 text-white py-10 sm:py-20">
        <div className="mx-auto max-w-6xl px-3.5 sm:px-6 grid gap-8 md:grid-cols-12 items-center">
          
          {/* Columna Izquierda: Sobretítulo, Título, Subtítulo, Botón */}
          <div className="md:col-span-7 space-y-4 sm:space-y-6 text-center md:text-left">
            
            {/* Sobretítulo */}
            <span className="animate-fadeInUp inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[10px] xs:text-[11px] sm:text-sm font-black uppercase tracking-widest text-emerald-300">
              <SparkleIcon className="h-3.5 w-3.5 shrink-0" />
              Tratamiento Natural de Acción Rápida
            </span>

            {/* Título Principal */}
            <h2 className="animate-fadeInUp text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.08]" style={{ animationDelay: "100ms" }}>
              Apoyo Natural para <span className="text-emerald-400">Noches de Descanso Completo</span>
            </h2>

            {/* CTA con latido suave */}
            <div className="animate-fadeInUp pt-1 flex flex-col items-center md:items-start gap-2.5" style={{ animationDelay: "300ms" }}>
              <button onClick={() => openCheckout(1)} className="btn-primary-cta btn-beat px-7 py-4 sm:px-10 sm:py-5 text-lg sm:text-2xl">
                <CartIcon className="h-5 w-5 sm:h-7 sm:w-7" />
                QUIERO PAGAR EN CASA (S/ 124)
              </button>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-300">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>PAGO CONTRA ENTREGA EN TODO EL PERÚ</span>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Mockup seccion2.png (combo cápsulas + parches) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="animate-hero-img relative w-full max-w-[300px] xs:max-w-xs sm:max-w-sm md:max-w-md">
              {/* Resplandor decorativo */}
              <div className="absolute -inset-8 rounded-full bg-emerald-500/20 blur-3xl -z-10" />
              
              <img
                src="/seccion2.png"
                alt="Pack Prostacare: cápsulas y parches"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN 3: AGITACIÓN DEL DOLOR (El dedo en la llaga) */}
      <section className="bg-slate-50 py-8 sm:py-16 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-3.5 sm:px-6 text-center">
          <span className="text-[10px] xs:text-xs font-extrabold tracking-widest text-red-600 uppercase bg-red-100 px-2 py-1 rounded-md">
            SEÑALES COMUNES DEL DESGASTE NATURAL
          </span>
          <h2 className="mt-2.5 text-lg xs:text-xl sm:text-3xl font-black tracking-tight text-slate-950">
            Después de los 45, el cuerpo puede experimentar cambios como:
          </h2>

          <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 text-left">
            {[
              { img: "/Ganas%20urgentes%20(2).png", text: "Frecuencia urinaria que puede interrumpir el descanso nocturno." },
              { img: "/Flujo%20d%C3%A9bil.png", text: "Cambios en el flujo urinario que generan incomodidad." },
              { img: "/Ardor%20y%20dolor.png", text: "Molestias en la zona baja que afectan la comodidad diaria." },
              { img: "/Cansancio.png", text: "Fatiga derivada de interrupciones del descanso nocturno." }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col overflow-hidden rounded-2xl bg-white border border-red-100 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.text}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="flex flex-1 items-start gap-2 p-3 sm:p-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <XIcon className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <p className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2.5 rounded-2xl bg-blue-950 p-3.5 sm:p-4 text-white text-xs sm:text-base font-bold">
            <LightbulbIcon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-300" />
            <span>La fórmula dual Prostacare fue diseñada para apoyar el bienestar del tracto urinario y el descanso masculino.</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: LA SOLUCIÓN Y BENEFICIOS (Con seccion4.png responsivo) */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-3.5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[10px] xs:text-xs font-extrabold tracking-widest text-emerald-700 uppercase bg-emerald-100 px-2 py-1 rounded-md">
              ACCIÓN DUAL PROSTACARE
            </span>
            <h2 className="mt-2.5 text-xl sm:text-3xl font-black tracking-tight text-slate-950">
              La Doble Acción que tu Cuerpo Necesita:
            </h2>
          </div>

          <div className="mt-6 sm:mt-8 grid gap-6 md:grid-cols-12 items-center">
            {/* Imagen seccion4.png */}
            <div className="md:col-span-5 flex justify-center">
              <div className="rounded-2xl sm:rounded-3xl bg-slate-50 p-3 sm:p-4 border border-slate-200 shadow-lg max-w-xs sm:max-w-md w-full">
                <img
                  src="/seccion4.png"
                  alt="Pack Prostacare: cápsulas y parches"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Lista de beneficios */}
            <div className="md:col-span-7 space-y-3 sm:space-y-4">
              {[
                {
                  title: "Desde Adentro (Cápsulas)",
                  desc: "Fórmula con Saw Palmetto que ayuda a desinflamar los conductos."
                },
                {
                  title: "Desde Afuera (Parches)",
                  desc: "Tecnología transdérmica que alivia la pesadez del bajo vientre en horas."
                },
                {
                  title: "100% Natural",
                  desc: "Sin recetas médicas ni efectos secundarios pesados."
                }
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-3.5 sm:p-5 shadow-sm hover:border-emerald-500 transition">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                      <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
                    </span>
                    <h3 className="text-sm sm:text-lg font-extrabold text-slate-950">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-normal pl-9">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: PRUEBA SOCIAL (Reseñas tipo Amazon / Facebook) */}
      <section className="bg-slate-950 text-white py-10 sm:py-20">
        <div className="mx-auto max-w-5xl px-3.5 sm:px-6">
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Opiniones de hombres que ya descansan de corrido
            </h2>

          </div>

          <div className="mt-6 sm:mt-8 grid gap-3.5 sm:gap-4 md:grid-cols-3">
            {[
              {
                name: "Don Lucho",
                detail: "58 años, Arequipa",
                initials: "DL",
                image: "/perfil/juan.jpg",
                time: "Hace 2 semanas",
                quote: "Llevo 15 días usando los parches y tomando las cápsulas. Por fin pude dormir 6 horas seguidas sin ir al baño. Recomendado y el motorizado muy amable."
              },
              {
                name: "Sr. Carlos",
                detail: "62 años, Lima",
                initials: "SC",
                image: "/perfil/carlos.jpg",
                time: "Hace 1 semana",
                quote: "Tenía dudas, pero como se paga al recibir, pedí. Excelente servicio y ya no siento esa pesadez."
              },
              {
                name: "Don Manuel",
                detail: "57 años, Cusco",
                initials: "DM",
                image: "/perfil/emanuel.jpg",
                time: "Hace 3 días",
                quote: "Con el frío sentía más molestias al despertar. A la semana de usar el pack ya dormía de corrido y la entrega fue rápida y discreta."
              }
            ].map((testi, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col">
                <div className="flex items-center gap-3">
                  {testi.image ? (
                    <img
                      src={testi.image}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-full border-2 border-emerald-400/60 object-cover"
                    />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white uppercase">
                      {testi.initials}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-white">
                      {testi.name} <span className="font-medium text-slate-400">({testi.detail})</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="h-3.5 w-3.5" />
                      ))}
                      <span className="ml-1 text-[10px] font-medium text-slate-400">5.0</span>
                    </div>
                  </div>
                </div>
                <blockquote className="mt-3 flex-1 text-xs sm:text-sm text-slate-200 leading-snug">
                  “{testi.quote}”
                </blockquote>
                <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] sm:text-[11px]">
                  <span className="flex items-center gap-1 font-bold text-emerald-300">
                    <CheckIcon className="h-3 w-3" strokeWidth={3} />
                    Compra verificada
                  </span>
                  <span className="text-slate-400">{testi.time}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-center text-[10px] sm:text-[11px] leading-relaxed text-slate-500">
            * Los testimonios representan experiencias individuales de clientes. Los resultados pueden variar de persona a persona. Este producto no diagnostica, trata, cura ni previene ninguna enfermedad. Es un complemento alimenticio de venta libre.
          </p>
        </div>
      </section>

      {/* SECCIÓN 6: LA OFERTA Y GATILLOS DE URGENCIA */}
      <section className="py-10 sm:py-20 bg-gradient-to-b from-blue-50 to-slate-100">
        <div className="mx-auto max-w-3xl px-3.5 sm:px-6">
          <div className="rounded-2xl sm:rounded-3xl border-2 border-dashed border-emerald-500 bg-white p-5 sm:p-8 shadow-xl text-center space-y-5">

            {/* Imagen del pack (seccion2.png) */}
            <div className="mx-auto w-full max-w-[210px] xs:max-w-[230px] sm:max-w-xs">
              <img
                src="/seccion2.png"
                alt="Pack Prostacare: cápsulas y parches"
                loading="lazy"
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>

            {/* Gatillo 1: Escasez de inventario */}
            <div className={`flex items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 ${stockAnimated ? 'bg-red-600 text-white scale-105' : 'bg-red-100 text-red-800'}`}>
              <WarningIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>ATENCIÓN: Solo quedan <span className="underline text-sm sm:text-lg">{stock} packs</span> en nuestro almacén de Lima.</span>
            </div>

            {/* Gatillo 2: Urgencia por temporada */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-blue-900 text-white font-bold text-xs sm:text-sm">
              <div className="flex items-center justify-center gap-2">
                <SnowflakeIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-cyan-300" />
                <span>PROMOCIÓN ESPECIAL POR INVIERNO</span>
              </div>
              <p className="mt-1 text-[10px] sm:text-xs font-semibold text-slate-300">
                El frío empeora los síntomas. Protégete hoy.
              </p>
            </div>

            {/* Gatillo 3: Contraste de precio */}
            <div className="space-y-1">
              <p className="text-slate-400 line-through text-xs sm:text-base font-bold">Precio Normal: S/ 190.00</p>
              <div className="text-2xl xs:text-3xl sm:text-5xl font-black text-emerald-600 leading-tight">
                PRECIO HOY: S/ 124.00
              </div>
              <p className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] sm:text-xs font-black uppercase text-amber-700">
                Ahorras S/ 66 + Envío Gratis
              </p>
              <p className="flex items-center justify-center gap-1.5 flex-wrap pt-1 text-emerald-700 font-extrabold text-xs sm:text-sm">
                <TruckIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                <span>INCLUYE ENVÍO GRATIS A TODO EL PERÚ Y PAGO CONTRA ENTREGA</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <button onClick={() => openCheckout(2)} className="btn-primary-cta btn-beat">
                <CartIcon className="h-5 w-5 sm:h-6 sm:h-6" />
                SELECCIONAR PAQUETE Y PEDIR (DESDE S/ 124)
              </button>
            </div>

            {/* Gatillo 4: Garantía de cero riesgo */}
            <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 sm:p-3 text-left text-xs sm:text-sm text-emerald-950 font-bold">
              <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-emerald-700" />
              <span><strong>Compra Segura:</strong> Tu pedido llega en un paquete 100% discreto. Pagas en efectivo o Yape solo cuando lo tienes en tus manos.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8: FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-6 sm:py-8 px-4 text-center text-[11px] sm:text-xs space-y-3 border-t border-slate-800">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-slate-400 leading-relaxed">
            <strong>DESCARGO DE RESPONSABILIDAD:</strong> Este producto es un complemento alimenticio natural de venta libre y no sustituye la consulta médica profesional. No diagnostica, trata, cura ni previene ninguna enfermedad. Los resultados individuales pueden variar.
          </p>
          <p className="text-slate-500 leading-relaxed">
            Este sitio web no es parte de Facebook ni está respaldado por Meta, Inc. Facebook es una marca registrada de Meta, Inc.
          </p>
          <p className="text-slate-600 font-semibold">
            © {new Date().getFullYear()} ImportHealth Perú · Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* NOTIFICACIÓN DE COMPRA EN VIVO (social proof automática) — compacta para no chocar con WhatsApp */}
      {notifState !== "idle" && (
        <div
          role="status"
          aria-live="polite"
          onClick={() => openCheckout(PURCHASE_EVENTS[notifIndex].pack)}
          className={`fixed bottom-36 sm:bottom-8 left-3 sm:left-6 z-30 w-[220px] sm:w-[260px] cursor-pointer select-none ${
            notifState === "visible" ? "notif-in" : "notif-out pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 backdrop-blur p-2 shadow-lg shadow-slate-900/10 hover:border-emerald-300 transition-colors">
            {/* Avatar */}
            {PURCHASE_EVENTS[notifIndex].image ? (
              <img
                src={PURCHASE_EVENTS[notifIndex].image as string}
                alt=""
                className="h-8 w-8 shrink-0 rounded-full border-2 border-emerald-200 object-cover"
              />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white">
                {PURCHASE_EVENTS[notifIndex].initials}
              </span>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-black leading-tight text-slate-900">
                {PURCHASE_EVENTS[notifIndex].name}{" "}
                <span className="font-bold text-slate-500">· {PURCHASE_EVENTS[notifIndex].city}</span>
              </p>
              <p className="truncate text-[9px] font-bold leading-snug text-slate-700">
                compró <span className="font-black text-emerald-700">{PURCHASE_EVENTS[notifIndex].packLabel}</span>
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-[8px] font-bold text-slate-400">
                {PURCHASE_EVENTS[notifIndex].time}
                <CheckIcon className="h-2 w-2 text-emerald-600" strokeWidth={4} />
                <span>Verificado</span>
              </p>
            </div>

            {/* Mini imagen del pack comprado */}
            <img
              src={PACK_OPTIONS.find((p) => p.id === PURCHASE_EVENTS[notifIndex].pack)?.image}
              alt=""
              className="h-7 w-7 shrink-0 rounded-md border border-slate-200 bg-white object-contain"
            />
          </div>
        </div>
      )}

      {/* STICKY BOTTOM MOBILE BAR (Siempre visible en celular) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-emerald-600/95 backdrop-blur-md p-2.5 border-t-2 border-white shadow-2xl flex items-center justify-between gap-2">
        <div className="text-white pl-1">
          <div className="text-[10px] font-black text-white">🛵 PAGA EN CASA AL RECIBIR</div>
          <div className="text-sm font-black text-white">S/ 124 <span className="text-[9px] text-emerald-100 font-normal">Envío gratis</span></div>
        </div>
        <button onClick={() => openCheckout(2)} className="btn-primary-cta btn-beat py-2.5 px-4 text-xs font-black uppercase w-auto">
          <CartIcon className="h-4 w-4" />
          PEDIR AHORA
        </button>
      </div>


      {/* ========================================================================= */}
      {/* MODAL 1: VENTANA DE CHECKOUT CON MULTI-PACKS (1 x 124, 2 x 214, 3 x 314) */}
      {/* ========================================================================= */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto modal-backdrop animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-blue-950 text-white p-3.5 sm:p-5 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base sm:text-xl font-black tracking-tight text-white">Reserva tu Pack Prostacare</h3>
                <p className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-300 font-bold">
                  <TruckIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span>Envío Gratis · Pago Contra Entrega en todo Perú</span>
                </p>
              </div>
              <button
                onClick={handleCloseCheckout}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                title="Cerrar"
                aria-label="Cerrar"
              >
                <XIcon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-3.5 sm:p-6 overflow-y-auto modal-scroll space-y-5">

              {/* BUNDLE PACK SELECTOR */}
              <div>
                <label className="block text-xs sm:text-base font-extrabold text-slate-900 mb-2.5">
                  Paso 1: Selecciona tu Promoción *
                </label>

                <div className="space-y-2.5">
                  {PACK_OPTIONS.map((pack) => {
                    const isSelected = pack.id === selectedPackId;
                    const displayPrice = pack.basePrice;

                    return (
                      <div
                        key={pack.id}
                        onClick={() => setSelectedPackId(pack.id)}
                        className={`cursor-pointer rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border-2 transition-all duration-200 relative ${
                          isSelected
                            ? "border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-200"
                            : "border-slate-200 bg-white hover:border-emerald-300"
                        }`}
                      >
                        {pack.badge && (
                          <span
                            className={`absolute -top-2.5 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-wider shadow-sm ${
                              pack.isPopular
                                ? "bg-amber-400 text-slate-950"
                                : "bg-blue-900 text-white"
                            }`}
                          >
                            {pack.badgeIcon === "flame" && <FlameIcon className="h-3 w-3" />}
                            {pack.badgeIcon === "star" && <StarIcon className="h-3 w-3" />}
                            {pack.badge}
                          </span>
                        )}

                        <div className="flex items-center gap-2 sm:gap-3">
                          {/* Imagen del pack */}
                          {pack.image && (
                            <div className="w-12 xs:w-14 sm:w-16 shrink-0">
                              <img
                                src={pack.image}
                                alt={pack.title}
                                loading="lazy"
                                className="w-full h-auto rounded-lg border border-slate-200 bg-white object-contain"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-1.5">
                              <input
                                type="radio"
                                name="packSelection"
                                checked={isSelected}
                                onChange={() => setSelectedPackId(pack.id)}
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="font-extrabold text-[11px] sm:text-sm leading-tight text-slate-950">
                                  {pack.title}
                                </div>
                                <div className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-snug line-clamp-2">
                                  {pack.desc}
                                </div>
                                {(() => {
                                  const perPack = displayPrice / pack.quantity;
                                  const perPackLabel = `S/ ${perPack % 1 === 0 ? perPack.toFixed(0) : perPack.toFixed(2)} por pack`;
                                  return (
                                    <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-700 mt-0.5">
                                      <SparkleIcon className="h-2.5 w-2.5 shrink-0" />
                                      <span>{perPackLabel}</span>
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-[9px] sm:text-[11px] text-slate-400 line-through font-bold">
                              S/ {pack.normalPrice}
                            </div>
                            <div className="text-sm sm:text-lg font-black text-emerald-600 leading-tight">
                              S/ {displayPrice}
                            </div>
                            <div className="mt-0.5 text-[7px] sm:text-[8px] font-extrabold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">
                              {pack.savingsText}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CHECKOUT FORM */}
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-2 border-t border-slate-200">
                <div className="text-xs sm:text-base font-extrabold text-slate-900">
                  Paso 2: Datos para el Envío a Domicilio
                </div>

                {/* Full Name */}
                <div>
                  <label className="field-label">Nombre y Apellidos completos *</label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej: Juan Carlos Pérez"
                    className="field-input"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="field-label">Número de Celular (9 dígitos) *</label>
                  <input
                    required
                    type="tel"
                    maxLength={9}
                    value={phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
                      // Solo permite números que empiecen con 9 (celular peruano), máx. 9 dígitos
                      if (digits === "" || digits.startsWith("9")) setPhone(digits);
                    }}
                    placeholder="Ej: 987654321"
                    className="field-input"
                  />
                </div>

                {/* Department, Province, District — SELECTORES DEL PERÚ COMPLETO */}
                <div className="grid gap-2.5 sm:grid-cols-3">
                  <div>
                    <label className="field-label">Departamento *</label>
                    <select
                      value={selectedDept}
                      onChange={(e) => handleDeptChange(e.target.value)}
                      className="field-input cursor-pointer"
                    >
                      {PERU_DEPARTMENTS.map((dept) => (
                        <option key={dept.name} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="field-label">Provincia *</label>
                    <select
                      value={selectedProv}
                      onChange={(e) => handleProvChange(e.target.value)}
                      className="field-input cursor-pointer"
                    >
                      {currentProvinces.map((prov) => (
                        <option key={prov.name} value={prov.name}>
                          {prov.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="field-label">Distrito *</label>
                    {currentDistricts.length > 0 ? (
                      <select
                        value={selectedDist}
                        onChange={(e) => setSelectedDist(e.target.value)}
                        className="field-input cursor-pointer"
                      >
                        {currentDistricts.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        required
                        type="text"
                        value={selectedDist}
                        onChange={(e) => setSelectedDist(e.target.value)}
                        placeholder="Tu distrito"
                        className="field-input"
                      />
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="field-label">Dirección Exacta (Calle, Av., Nro, Dpto) *</label>
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej: Av. Larco 1234, Dpto 302"
                    className="field-input"
                  />
                </div>

                {/* Reference */}
                <div>
                  <label className="field-label">Referencia (Opcional)</label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="Ej: Frente al parque central"
                    className="field-input"
                  />
                </div>

                {/* Message banner */}
                {message && (
                  <div
                    role="status"
                    className={`flex items-start gap-2 rounded-xl p-3 text-xs sm:text-sm font-extrabold ${
                      status === "success"
                        ? "bg-emerald-100 text-emerald-950 border border-emerald-400"
                        : "bg-red-100 text-red-950 border border-red-300"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3} />
                    ) : (
                      <WarningIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    <span>{message}</span>
                  </div>
                )}

                {/* Banner de PAGO EN CASA encima del botón — estilo notificación, NO parece botón */}
                <div className="rounded-lg border-2 border-dashed border-emerald-400 bg-emerald-50 px-4 py-2.5 text-center">
                  <p className="text-sm sm:text-base font-black uppercase text-emerald-800 tracking-tight">
                    ✅ PAGA EN CASA AL RECIBIR
                  </p>
                  <p className="text-[10px] sm:text-xs font-semibold text-emerald-600">
                    No pagas nada hoy — solo cuando el repartidor llegue a tu puerta
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading" || !isFormValid}
                  className={`btn-primary-cta w-full text-center py-3.5 text-base sm:text-xl uppercase transition-all duration-200 ${
                    !isFormValid
                      ? "opacity-40 cursor-not-allowed grayscale"
                      : "opacity-100"
                  }`}
                >
                  {status === "loading" ? (
                    <>
                      <SpinnerIcon className="h-5 w-5 animate-spin" />
                      <span>REGISTRANDO PEDIDO...</span>
                    </>
                  ) : !isFormValid ? (
                    <>
                      <LockIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span>COMPLETA TUS DATOS PARA CONFIRMAR</span>
                    </>
                  ) : (
                    <>
                      <CheckIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={3} />
                      <span>CONFIRMAR MI PEDIDO (S/ {finalPrice})</span>
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-[10px] sm:text-xs font-bold text-slate-500">
                  <LockIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>Pago en efectivo o Yape solo cuando recibes el paquete en tus manos.</span>
                </p>
              </form>

            </div>

          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE DE WHATSAPP — Siempre visible, grande, para señores que no confían en formularios */}
      {!isCheckoutOpen && (
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp para hacer tu pedido"
          onClick={() => trackContact("WhatsApp")}
          className="fixed bottom-24 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2 sm:gap-3 rounded-full bg-[#25D366] px-4 sm:px-5 py-3 sm:py-4 shadow-xl shadow-[#25D366]/40 transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-[#25D366]/50 active:scale-95 group"
        >
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white shrink-0" />
          <span className="hidden sm:block max-w-[180px] text-left">
            <span className="block text-[11px] sm:text-xs font-black text-white leading-tight">
              ¿Dudas?
            </span>
            <span className="block text-[10px] sm:text-[11px] font-bold text-white/90 leading-tight">
              Haz tu pedido por WhatsApp aquí
            </span>
          </span>
          <span className="sm:hidden text-xs font-black text-white">
            WhatsApp
          </span>
        </a>
      )}

    </main>
  );
}
