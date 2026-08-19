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

const WHATSAPP_NUMBER = "51935381231";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero información sobre Prostacare")}`;

const PACK_OPTIONS = [
  {
    id: 1,
    quantity: 1,
    title: "1 Pack — 30 Días",
    badge: "PRUEBA INICIAL",
    badgeIcon: "none",
    image: "/seccion2.png",
    basePrice: 124,
    normalPrice: 190,
    savingsText: "Ahorras S/ 66",
    desc: "1 Frasco Saw Palmetto + 1 Sobre Parches (30 parches)"
  },
  {
    id: 2,
    quantity: 2,
    title: "2 Packs — 60 Días",
    badge: "MÁS POPULAR",
    badgeIcon: "flame",
    image: "/pack%202.png",
    basePrice: 214,
    normalPrice: 380,
    savingsText: "Ahorras S/ 166",
    desc: "2 Frascos Saw Palmetto + 2 Sobres Parches (60 parches)",
    isPopular: true
  },
  {
    id: 3,
    quantity: 3,
    title: "3 Packs — 90 Días",
    badge: "MEJOR AHORRO",
    badgeIcon: "star",
    image: "/pack%203.png",
    basePrice: 314,
    normalPrice: 570,
    savingsText: "Ahorras S/ 256",
    desc: "3 Frascos Saw Palmetto + 3 Sobres Parches (90 parches)"
  }
];

const PURCHASE_EVENTS: {
  name: string;
  city: string;
  pack: number;
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

const PACK_CONTENT_IDS: Record<number, string> = {
  1: "PROSTACARE-30D",
  2: "PROSTACARE-60D",
  3: "PROSTACARE-90D",
};

// Mapeo de nombres de regiones IP -> departamentos del Perú
const IP_REGION_MAP: Record<string, string> = {
  "Lima Region": "Lima", "Lima Province": "Lima", "Lima": "Lima", "Callao": "Lima",
  "Arequipa": "Arequipa", "La Libertad": "La Libertad", "Piura": "Piura",
  "Lambayeque": "Lambayeque", "Cusco": "Cusco", "Junin": "Junín", "Junín": "Junín",
  "Ancash": "Áncash", "Áncash": "Áncash", "Loreto": "Loreto", "Ica": "Ica",
  "Cajamarca": "Cajamarca", "Huanuco": "Huánuco", "Huánuco": "Huánuco",
  "San Martin": "San Martín", "San Martín": "San Martín", "Puno": "Puno",
  "Ayacucho": "Ayacucho", "Ucayali": "Ucayali", "Apurimac": "Apurímac",
  "Apurímac": "Apurímac", "Huancavelica": "Huancavelica", "Amazonas": "Amazonas",
  "Tumbes": "Tumbes", "Moquegua": "Moquegua", "Tacna": "Tacna",
  "Madre de Dios": "Madre de Dios", "Pasco": "Pasco",
};

export default function Home() {
  const [stock, setStock] = useState(14);
  const [stockAnimated, setStockAnimated] = useState(false);
  const viewContentFired = useRef(false);
  const [notifIndex, setNotifIndex] = useState(0);
  const [notifState, setNotifState] = useState<"idle" | "visible" | "leaving">("idle");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackId, setSelectedPackId] = useState(1); // Default to 1-pack (S/ 124)
  const [selectedDept, setSelectedDept] = useState("Lima");
  const [selectedProv, setSelectedProv] = useState("Lima");
  const [selectedDist, setSelectedDist] = useState("Miraflores");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const locationDetected = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
      t1 = setTimeout(() => {
        if (cancelled) return;
        setNotifIndex((i) => (first ? i : (i + 1) % PURCHASE_EVENTS.length));
        setNotifState("visible");
        t2 = setTimeout(() => {
          if (cancelled) return;
          setNotifState("leaving");
          t3 = setTimeout(() => { if (!cancelled) { setNotifState("idle"); cycle(false); } }, 350);
        }, 4500);
      }, first ? 5000 : 8000);
    };
    cycle(true);
    return () => { cancelled = true; clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => { if (isCheckoutOpen) setNotifState("idle"); }, [isCheckoutOpen]);

  useEffect(() => {
    const timer1 = setTimeout(() => { setStock(12); setStockAnimated(true); setTimeout(() => setStockAnimated(false), 800); }, 6000);
    const timer2 = setTimeout(() => { setStock(11); setStockAnimated(true); setTimeout(() => setStockAnimated(false), 800); }, 14000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  // Autodeteccion de ubicacion por IP (se ejecuta una sola vez al montar)
  useEffect(() => {
    if (locationDetected.current) return;
    locationDetected.current = true;
    setLocationLoading(true);
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const region: string = data.region || "";
        const city: string = data.city || "";
        const deptName = IP_REGION_MAP[region] || IP_REGION_MAP[region.trim()] || null;
        const dept = deptName ? PERU_DEPARTMENTS.find((d) => d.name === deptName) : null;
        if (dept) {
          setSelectedDept(dept.name);
          const cityLower = city.toLowerCase();
          const matchedProv = dept.provinces.find(
            (p) =>
              p.name.toLowerCase() === cityLower ||
              p.name.toLowerCase().includes(cityLower) ||
              cityLower.includes(p.name.toLowerCase())
          ) || dept.provinces[0];
          if (matchedProv) {
            setSelectedProv(matchedProv.name);
            if (matchedProv.districts.length > 0) setSelectedDist(matchedProv.districts[0]);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLocationLoading(false));
  }, []);

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
      setSelectedDist(firstProv.districts.length > 0 ? firstProv.districts[0] : "");
    }
  };

  const handleProvChange = (provName: string) => {
    setSelectedProv(provName);
    const prov = currentProvinces.find((p) => p.name === provName);
    setSelectedDist(prov && prov.districts.length > 0 ? prov.districts[0] : "");
  };

  const openCheckout = (packIdChoice?: number) => {
    const targetPackId = packIdChoice || selectedPackId;
    if (packIdChoice) setSelectedPackId(packIdChoice);
    const pack = PACK_OPTIONS.find((p) => p.id === targetPackId) || PACK_OPTIONS[1];
    trackAddToCart(PACK_CONTENT_IDS[targetPackId], pack.title, pack.basePrice, pack.quantity);
    trackInitiateCheckout(PACK_CONTENT_IDS[targetPackId], pack.title, pack.basePrice, pack.quantity);
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => setIsCheckoutOpen(false);

  const activePack = PACK_OPTIONS.find((p) => p.id === selectedPackId) || PACK_OPTIONS[1];
  const finalPrice = activePack.basePrice;

  const isFormValid =
    fullName.trim().length > 0 &&
    /^9\d{8}$/.test(phone.replace(/\D/g, "")) &&
    selectedDept.length > 0 &&
    selectedProv.length > 0 &&
    selectedDist.length > 0 &&
    address.trim().length > 0;

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
          fullName: fullName.trim(), phone: cleanPhone, department: selectedDept,
          province: selectedProv, district: selectedDist, address: address.trim(),
          reference: reference.trim(), packPrice: finalPrice, packTitle: activePack.title,
          quantity: activePack.quantity
        })
      });
      const data = await response.json();
      if (!response.ok && status !== "success") throw new Error(data.message || "No pudimos registrar tu pedido. Por favor inténtalo de nuevo.");
      setStatus("success");
      setMessage(data.message || "¡Felicidades! Tu pedido ha sido registrado. Te llamaremos para coordinar la entrega.");
      trackLead("Formulario COD Completado", finalPrice);
      trackAddPaymentInfo(PACK_CONTENT_IDS[activePack.id] || "PROSTACARE-30D", finalPrice);
      trackPurchase(PACK_CONTENT_IDS[activePack.id] || "PROSTACARE-30D", activePack.title, finalPrice, activePack.quantity);
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
      ].filter(Boolean).join("\n");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMsg)}`, "_blank");
      setFullName(""); setPhone(""); setAddress(""); setReference("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Ocurrió un error inesperado al procesar tu pedido.");
    }
  }

  return (
    <main className="bg-white text-slate-900 selection:bg-emerald-200 selection:text-emerald-950 pb-20 sm:pb-0 font-sans overflow-x-clip">

      {/* CINTILLO STICKY */}
      <div className="sticky top-0 z-40 bg-emerald-600 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-3 py-1.5 sm:py-2">
          <SirenIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <p className="text-center text-[9px] xs:text-[10px] sm:text-xs font-extrabold uppercase tracking-wide">
            ENVÍO GRATIS A TODO EL PERÚ · PAGA EN CASA AL RECIBIR
          </p>
          <SirenIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
        <div className="relative mx-auto flex max-w-6xl items-center px-3 py-2 sm:px-6 sm:py-3">
          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2">
            <LogoShieldIcon className="h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11" />
            <div className="text-left leading-none">
              <span className="block text-sm xs:text-base sm:text-lg font-black tracking-tight text-blue-950">PROSTATE</span>
              <span className="mt-0.5 block text-[9px] xs:text-[10px] sm:text-xs font-black tracking-[0.2em] text-emerald-600">HEALTH</span>
            </div>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={() => trackContact("WhatsApp")} className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md transition hover:bg-emerald-600 active:scale-95">
            <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        </div>
      </header>

      {/* ============================================================
          SECCIÓN 1 — HERO VISUAL-FIRST (imagen grande + info abajo)
      ============================================================ */}
      <section className="min-h-[100svh] flex flex-col bg-white">

        {/* Imagen del producto — ocupa la mayor parte de la pantalla */}
        <div className="relative w-full overflow-hidden bg-slate-50 flex-1" style={{ minHeight: "52svh", maxHeight: "62svh" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white pointer-events-none z-10" />
          <img
            src="/seccion1.png"
            alt="Prostacare — Tratamiento Natural para la Próstata"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>

        {/* Info del producto debajo de la imagen */}
        <div className="w-full bg-white px-4 pt-4 pb-6 sm:px-8 sm:pt-5 sm:pb-8 flex flex-col gap-3.5 max-w-2xl mx-auto">

          <div>
            <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-emerald-700 uppercase">
              PROSTATE HEALTH · Bienestar Masculino
            </span>
            <h1 className="mt-1 text-2xl sm:text-4xl font-black tracking-tight text-blue-950 leading-tight">
              Prostacare <span className="text-emerald-600">Acción Dual</span>
            </h1>
            <p className="mt-0.5 text-xs sm:text-sm text-slate-500 font-medium">
              Cápsulas Saw Palmetto + Parches Transdérmicos
            </p>
          </div>

          {/* Precio Fijo Oferta S/ 124 */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-950">S/ 124</span>
            <span className="text-sm sm:text-base text-slate-400 line-through font-bold">S/ 190</span>
            <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] sm:text-xs font-black text-amber-700">Ahorras S/ 66</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { icon: <TruckIcon className="h-3.5 w-3.5" />, text: "Envío gratis" },
              { icon: <ShieldCheckIcon className="h-3.5 w-3.5" />, text: "Pago al recibir" },
              { icon: <LeafIcon className="h-3.5 w-3.5" />, text: "100% Natural" },
            ].map((b, i) => (
              <span key={i} className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold">
                {b.icon}{b.text}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button onClick={() => openCheckout(1)} className="btn-primary-cta btn-beat w-full justify-center text-sm sm:text-base py-3.5">
            <CartIcon className="h-5 w-5" />
            PEDIR AHORA — PAGO EN CASA (S/ 124)
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-[10px] sm:text-xs font-bold text-slate-400">
            <LockIcon className="h-3 w-3 shrink-0" />
            Sin tarjeta. Sin transferencia. Solo efectivo o Yape al recibir.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN 2 — EL PROBLEMA (full-screen)
      ============================================================ */}
      <section className="min-h-[100svh] flex flex-col justify-center bg-slate-50 border-y border-slate-200 py-10 sm:py-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-4 sm:space-y-5">
          <div className="text-center">
            <span className="inline-block text-[10px] xs:text-xs font-extrabold tracking-widest text-red-600 uppercase bg-red-100 px-2.5 py-1 rounded-md">
              SEÑALES COMUNES DESPUÉS DE LOS 45
            </span>
            <h2 className="mt-2 text-xl sm:text-3xl font-black tracking-tight text-slate-950">
              ¿Te identificas con alguno de estos?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[
              { img: "/Ganas%20urgentes%20(2).png", text: "Ganas urgentes que interrumpen el sueño" },
              { img: "/Flujo%20d%C3%A9bil.png", text: "Flujo urinario débil o cortado" },
              { img: "/Ardor%20y%20dolor.png", text: "Ardor o pesadez en el bajo vientre" },
              { img: "/Cansancio.png", text: "Fatiga por no dormir de corrido" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col overflow-hidden rounded-2xl bg-white border border-red-100 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition duration-200">
                <img src={item.img} alt={item.text} loading="lazy" className="w-full aspect-[4/5] object-cover" />
                <div className="flex items-start gap-2 p-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 mt-0.5">
                    <XIcon className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <p className="text-[11px] xs:text-xs sm:text-sm font-bold text-slate-800 leading-snug">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-blue-950 p-3.5 sm:p-4 text-white">
            <LightbulbIcon className="h-6 w-6 shrink-0 text-amber-300" />
            <p className="text-xs sm:text-sm font-bold leading-snug">
              <strong>Prostacare</strong> ataca estos síntomas desde adentro (cápsulas) y afuera (parches) — sin efectos secundarios.
            </p>
          </div>

          <div className="text-center">
            <button onClick={() => openCheckout(2)} className="btn-primary-cta btn-beat mx-auto">
              <CartIcon className="h-5 w-5" />
              QUIERO PROBAR (S/ 124)
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN 3 — SOLUCIÓN (full-screen, fondo oscuro)
      ============================================================ */}
      <section className="min-h-[100svh] flex flex-col justify-center bg-blue-950 text-white py-10 sm:py-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-5 flex justify-center order-1 md:order-2">
              <div className="relative w-full max-w-[240px] sm:max-w-sm">
                <div className="absolute -inset-8 rounded-full bg-emerald-500/20 blur-3xl -z-10" />
                <img src="/seccion2.png" alt="Pack Prostacare" className="w-full h-auto object-contain drop-shadow-2xl" />
              </div>
            </div>
            <div className="md:col-span-7 order-2 md:order-1 space-y-4 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-300">
                <SparkleIcon className="h-3.5 w-3.5 shrink-0" />
                Fórmula de Acción Dual
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Ataca el problema <span className="text-emerald-400">desde adentro y afuera</span>
              </h2>
              <div className="space-y-3">
                {[
                  { icon: <FlaskIcon className="h-5 w-5" />, title: "Cápsulas Saw Palmetto", desc: "Ayudan a desinflamar los conductos urinarios desde adentro." },
                  { icon: <ShieldCheckIcon className="h-5 w-5" />, title: "Parches Transdérmicos", desc: "Alivio directo en la zona en cuestión de horas." },
                  { icon: <LeafIcon className="h-5 w-5" />, title: "100% Natural", desc: "Sin receta médica. Sin efectos secundarios pesados." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3.5 border border-white/10">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">{item.icon}</span>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center md:items-start gap-2">
                <button onClick={() => openCheckout(1)} className="btn-primary-cta btn-beat px-7 py-4 sm:px-10 sm:py-5 text-base sm:text-xl">
                  <CartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  PEDIR AHORA — S/ 124
                </button>
                <p className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <CheckIcon className="h-4 w-4" strokeWidth={3} />
                  PAGO CONTRA ENTREGA EN TODO EL PERÚ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN 4 — TESTIMONIOS (full-screen)
      ============================================================ */}
      <section className="min-h-[100svh] flex flex-col justify-center bg-slate-950 text-white py-10 sm:py-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 space-y-5">
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">Hombres que ya duermen de corrido</h2>
            <div className="mt-1.5 flex items-center justify-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-4 w-4" />)}
              <span className="ml-1.5 text-xs font-bold text-slate-400">4.9/5 · 312 reseñas</span>
            </div>
          </div>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {[
              { name: "Don Lucho", detail: "58 años · Arequipa", initials: "DL", image: "/perfil/juan.jpg", time: "Hace 2 semanas", quote: "15 días con los parches y las cápsulas. Por fin dormí 6 horas seguidas sin ir al baño. Muy recomendado." },
              { name: "Sr. Carlos", detail: "62 años · Lima", initials: "SC", image: "/perfil/carlos.jpg", time: "Hace 1 semana", quote: "Como se paga al recibir me animé a pedir. Excelente resultado y ya no siento esa pesadez de siempre." },
              { name: "Don Manuel", detail: "57 años · Cusco", initials: "DM", image: "/perfil/emanuel.jpg", time: "Hace 3 días", quote: "Con el frío sentía más molestias. A la semana de usar el pack dormí de corrido. La entrega fue rápida y discreta." },
            ].map((testi, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col">
                <div className="flex items-center gap-3">
                  {testi.image ? (
                    <img src={testi.image} alt="" className="h-10 w-10 shrink-0 rounded-full border-2 border-emerald-400/60 object-cover" />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white uppercase">{testi.initials}</span>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-white">{testi.name} <span className="font-medium text-slate-400">({testi.detail})</span></div>
                    <div className="mt-0.5 flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} className="h-3 w-3" />)}
                      <span className="ml-1 text-[10px] font-medium text-slate-400">5.0</span>
                    </div>
                  </div>
                </div>
                <blockquote className="mt-3 flex-1 text-xs sm:text-sm text-slate-200 leading-snug italic">"{testi.quote}"</blockquote>
                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] sm:text-[11px]">
                  <span className="flex items-center gap-1 font-bold text-emerald-300"><CheckIcon className="h-3 w-3" strokeWidth={3} />Compra verificada</span>
                  <span className="text-slate-400">{testi.time}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-slate-500 leading-relaxed max-w-2xl mx-auto">
            * Los testimonios representan experiencias individuales. Los resultados pueden variar. Complemento alimenticio, no diagnostica ni trata enfermedades.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECCIÓN 5 — OFERTA + URGENCIA (full-screen)
      ============================================================ */}
      <section className="min-h-[100svh] flex flex-col justify-center bg-gradient-to-b from-blue-50 to-slate-100 py-10 sm:py-0">
        <div className="mx-auto w-full max-w-lg px-4 sm:px-6">
          <div className="rounded-2xl sm:rounded-3xl border-2 border-dashed border-emerald-500 bg-white p-5 sm:p-7 shadow-xl space-y-4 text-center">
            <div className="mx-auto w-full max-w-[170px] sm:max-w-[210px]">
              <img src="/seccion2.png" alt="Pack Prostacare" loading="lazy" className="w-full h-auto object-contain drop-shadow-md" />
            </div>
            <div className={`flex items-center justify-center gap-2 p-2.5 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 ${stockAnimated ? "bg-red-600 text-white scale-105" : "bg-red-100 text-red-800"}`}>
              <WarningIcon className="h-4 w-4 shrink-0" />
              <span>Solo quedan <span className="underline text-sm sm:text-lg">{stock} packs</span> en almacén Lima</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-900 text-white font-bold text-xs sm:text-sm">
              <SnowflakeIcon className="h-4 w-4 shrink-0 text-cyan-300" />
              <span>PROMO INVIERNO — El frío empeora los síntomas</span>
            </div>
            <div className="space-y-1">
              <p className="text-slate-400 line-through text-xs sm:text-sm font-bold">Precio Normal: S/ 190.00</p>
              <div className="text-3xl sm:text-5xl font-black text-emerald-600 leading-tight">S/ 124.00 HOY</div>
              <p className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] sm:text-xs font-black uppercase text-amber-700">Ahorras S/ 66 + Envío Gratis</p>
            </div>
            <button onClick={() => openCheckout(2)} className="btn-primary-cta btn-beat w-full justify-center">
              <CartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              SELECCIONAR PAQUETE Y PEDIR
            </button>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs sm:text-sm text-emerald-950 font-bold text-left">
              <ShieldCheckIcon className="h-5 w-5 shrink-0 text-emerald-700" />
              <span><strong>Sin riesgo:</strong> Paquete discreto. Pagas en efectivo o Yape solo al recibirlo.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-6 px-4 text-center text-[11px] sm:text-xs space-y-2 border-t border-slate-800">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-slate-400 leading-relaxed"><strong>DESCARGO:</strong> Complemento alimenticio natural de venta libre. No sustituye la consulta médica. Resultados individuales pueden variar.</p>
          <p className="text-slate-500">Este sitio no es parte de Facebook ni está respaldado por Meta, Inc.</p>
          <p className="text-slate-600 font-semibold">© {new Date().getFullYear()} ImportHealth Perú · Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* NOTIFICACIÓN DE COMPRA EN VIVO */}
      {notifState !== "idle" && (
        <div role="status" aria-live="polite" onClick={() => openCheckout(PURCHASE_EVENTS[notifIndex].pack)} className={`fixed bottom-36 sm:bottom-8 left-3 sm:left-6 z-30 w-[220px] sm:w-[260px] cursor-pointer select-none ${notifState === "visible" ? "notif-in" : "notif-out pointer-events-none"}`}>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 backdrop-blur p-2 shadow-lg hover:border-emerald-300 transition-colors">
            {PURCHASE_EVENTS[notifIndex].image ? (
              <img src={PURCHASE_EVENTS[notifIndex].image as string} alt="" className="h-8 w-8 shrink-0 rounded-full border-2 border-emerald-200 object-cover" />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white">{PURCHASE_EVENTS[notifIndex].initials}</span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-black leading-tight text-slate-900">{PURCHASE_EVENTS[notifIndex].name} <span className="font-bold text-slate-500">· {PURCHASE_EVENTS[notifIndex].city}</span></p>
              <p className="truncate text-[9px] font-bold leading-snug text-slate-700">compró <span className="font-black text-emerald-700">{PURCHASE_EVENTS[notifIndex].packLabel}</span></p>
              <p className="mt-0.5 flex items-center gap-1 text-[8px] font-bold text-slate-400">{PURCHASE_EVENTS[notifIndex].time}<CheckIcon className="h-2 w-2 text-emerald-600" strokeWidth={4} /><span>Verificado</span></p>
            </div>
            <img src={PACK_OPTIONS.find((p) => p.id === PURCHASE_EVENTS[notifIndex].pack)?.image} alt="" className="h-7 w-7 shrink-0 rounded-md border border-slate-200 bg-white object-contain" />
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BAR MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-emerald-600/95 backdrop-blur-md p-2.5 border-t-2 border-white shadow-2xl flex items-center justify-between gap-2">
        <div className="text-white pl-1">
          <div className="text-[10px] font-black">🛵 PAGA EN CASA AL RECIBIR</div>
          <div className="text-sm font-black">S/ 124 <span className="text-[9px] text-emerald-100 font-normal">Envío gratis</span></div>
        </div>
        <button onClick={() => openCheckout(2)} className="btn-primary-cta btn-beat py-2.5 px-4 text-xs font-black uppercase w-auto">
          <CartIcon className="h-4 w-4" />PEDIR AHORA
        </button>
      </div>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      {!isCheckoutOpen && (
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" onClick={() => trackContact("WhatsApp")} className="fixed bottom-24 sm:bottom-6 right-3 sm:right-6 z-40 flex items-center gap-2 sm:gap-3 rounded-full bg-[#25D366] px-4 sm:px-5 py-3 sm:py-4 shadow-xl shadow-[#25D366]/40 transition-all hover:scale-105 active:scale-95">
          <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white shrink-0" />
          <span className="hidden sm:block max-w-[180px] text-left">
            <span className="block text-xs font-black text-white leading-tight">¿Dudas?</span>
            <span className="block text-[10px] sm:text-[11px] font-bold text-white/90">Escríbenos por WhatsApp</span>
          </span>
          <span className="sm:hidden text-xs font-black text-white">WhatsApp</span>
        </a>
      )}

      {/* ============================================================
          MODAL DE CHECKOUT
      ============================================================ */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto modal-backdrop animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">

            <div className="bg-blue-950 text-white p-3.5 sm:p-5 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-base sm:text-xl font-black tracking-tight">Reserva tu Pack Prostacare</h3>
                <p className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-300 font-bold">
                  <TruckIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>Envío Gratis · Pago Contra Entrega en todo Perú</span>
                </p>
              </div>
              <button onClick={handleCloseCheckout} className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Cerrar">
                <XIcon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
              </button>
            </div>

            <div className="p-3.5 sm:p-6 overflow-y-auto modal-scroll space-y-5">

              {/* PACK SELECTOR */}
              <div>
                <label className="block text-xs sm:text-base font-extrabold text-slate-900 mb-2.5">
                  Paso 1: Selecciona tu Promoción *
                </label>
                <div className="space-y-2.5">
                  {PACK_OPTIONS.map((pack) => {
                    const isSelected = pack.id === selectedPackId;
                    return (
                      <div key={pack.id} onClick={() => setSelectedPackId(pack.id)}
                        className={`cursor-pointer rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border-2 transition-all duration-200 relative ${isSelected ? "border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-200" : "border-slate-200 bg-white hover:border-emerald-300"}`}
                      >
                        {pack.badge && (
                          <span className={`absolute -top-2.5 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-wider shadow-sm ${pack.isPopular ? "bg-amber-400 text-slate-950" : "bg-blue-900 text-white"}`}>
                            {pack.badgeIcon === "flame" && <FlameIcon className="h-3 w-3" />}
                            {pack.badgeIcon === "star" && <StarIcon className="h-3 w-3" />}
                            {pack.badge}
                          </span>
                        )}
                        <div className="flex items-center gap-2 sm:gap-3">
                          {pack.image && (
                            <div className="w-12 xs:w-14 sm:w-16 shrink-0">
                              <img src={pack.image} alt={pack.title} loading="lazy" className="w-full h-auto rounded-lg border border-slate-200 bg-white object-contain" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-1.5">
                              <input type="radio" name="packSelection" checked={isSelected} onChange={() => setSelectedPackId(pack.id)} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 cursor-pointer" />
                              <div className="min-w-0 flex-1">
                                <div className="font-extrabold text-[11px] sm:text-sm leading-tight text-slate-950">{pack.title}</div>
                                <div className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-2">{pack.desc}</div>
                                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-700 mt-0.5">
                                  <SparkleIcon className="h-2.5 w-2.5 shrink-0" />
                                  <span>S/ {Math.round(pack.basePrice / pack.quantity)} por pack</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-[9px] sm:text-[11px] text-slate-400 line-through font-bold">S/ {pack.normalPrice}</div>
                            <div className="text-sm sm:text-lg font-black text-emerald-600 leading-tight">S/ {pack.basePrice}</div>
                            <div className="mt-0.5 text-[7px] sm:text-[8px] font-extrabold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded-full">{pack.savingsText}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-2 border-t border-slate-200">
                <div className="text-xs sm:text-base font-extrabold text-slate-900">Paso 2: Datos para el Envío a Domicilio</div>

                <div>
                  <label className="field-label">Nombre y Apellidos completos *</label>
                  <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ej: Juan Carlos Pérez" className="field-input" />
                </div>

                <div>
                  <label className="field-label">Número de Celular (9 dígitos) *</label>
                  <input required type="tel" maxLength={9} value={phone} onChange={(e) => { const digits = e.target.value.replace(/\D/g, "").slice(0, 9); if (digits === "" || digits.startsWith("9")) setPhone(digits); }} placeholder="Ej: 987654321" className="field-input" />
                </div>

                {/* Ubicación con autodetección */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="field-label mb-0">Ubicación de entrega *</span>
                    {locationLoading ? (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                        <SpinnerIcon className="h-3 w-3 animate-spin" />
                        Detectando ubicación...
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">📍 Autodetectado · editable</span>
                    )}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                      <label className="field-label">Departamento *</label>
                      <select value={selectedDept} onChange={(e) => handleDeptChange(e.target.value)} className="field-input cursor-pointer">
                        {PERU_DEPARTMENTS.map((dept) => <option key={dept.name} value={dept.name}>{dept.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="field-label">Provincia *</label>
                      <select value={selectedProv} onChange={(e) => handleProvChange(e.target.value)} className="field-input cursor-pointer">
                        {currentProvinces.map((prov) => <option key={prov.name} value={prov.name}>{prov.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="field-label">Distrito *</label>
                      {currentDistricts.length > 0 ? (
                        <select value={selectedDist} onChange={(e) => setSelectedDist(e.target.value)} className="field-input cursor-pointer">
                          {currentDistricts.map((dist) => <option key={dist} value={dist}>{dist}</option>)}
                        </select>
                      ) : (
                        <input required type="text" value={selectedDist} onChange={(e) => setSelectedDist(e.target.value)} placeholder="Tu distrito" className="field-input" />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="field-label">Dirección Exacta (Calle, Av., Nro, Dpto) *</label>
                  <input required type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Ej: Av. Larco 1234, Dpto 302" className="field-input" />
                </div>

                <div>
                  <label className="field-label">Referencia (Opcional)</label>
                  <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Ej: Frente al parque central" className="field-input" />
                </div>

                {message && (
                  <div role="status" className={`flex items-start gap-2 rounded-xl p-3 text-xs sm:text-sm font-extrabold ${status === "success" ? "bg-emerald-100 text-emerald-950 border border-emerald-400" : "bg-red-100 text-red-950 border border-red-300"}`}>
                    {status === "success" ? <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3} /> : <WarningIcon className="mt-0.5 h-4 w-4 shrink-0" />}
                    <span>{message}</span>
                  </div>
                )}

                <div className="rounded-lg border-2 border-dashed border-emerald-400 bg-emerald-50 px-4 py-2.5 text-center">
                  <p className="text-sm sm:text-base font-black uppercase text-emerald-800 tracking-tight">✅ PAGA EN CASA AL RECIBIR</p>
                  <p className="text-[10px] sm:text-xs font-semibold text-emerald-600">No pagas nada hoy — solo cuando el repartidor llegue a tu puerta</p>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || !isFormValid}
                  className={`btn-primary-cta w-full text-center py-3.5 text-base sm:text-xl uppercase transition-all duration-200 ${!isFormValid ? "opacity-40 cursor-not-allowed grayscale" : "opacity-100"}`}
                >
                  {status === "loading" ? (
                    <><SpinnerIcon className="h-5 w-5 animate-spin" /><span>REGISTRANDO PEDIDO...</span></>
                  ) : !isFormValid ? (
                    <><LockIcon className="h-5 w-5 sm:h-6 sm:w-6" /><span>COMPLETA TUS DATOS PARA CONFIRMAR</span></>
                  ) : (
                    <><CheckIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={3} /><span>CONFIRMAR MI PEDIDO (S/ {finalPrice})</span></>
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

    </main>
  );
}
