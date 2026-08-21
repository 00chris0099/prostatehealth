"use client";

import { useEffect } from "react";
import Link from "next/link";
import StoreNavbar from "./components/StoreNavbar";
import StoreFooter from "./components/StoreFooter";
import { PRODUCTS, CATEGORIES, STORE_TESTIMONIALS } from "./data/products";
import { trackViewContent } from "./lib/meta-pixel";
import {
  TruckIcon,
  BanknoteIcon,
  LeafIcon,
  ShieldCheckIcon,
  MaleIcon,
  BoneIcon,
  ZapIcon,
  HeartPulseIcon,
  StarIcon,
  FlaskIcon,
  AwardIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparkleIcon,
  CartIcon,
  ChevronRightIcon,
  WhatsAppIcon,
  TagIcon,
} from "./store-icons";

const WHATSAPP_URL =
  "https://wa.me/51935381231?text=" +
  encodeURIComponent("Hola, quiero información sobre los productos de ImportHealth");

// Icono de categoría por id
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  male: MaleIcon,
  bone: BoneIcon,
  zap: ZapIcon,
  shield: HeartPulseIcon,
};

export default function StorePage() {
  useEffect(() => {
    trackViewContent("IMPORTHEALTH-HOME", "ImportHealth Tienda Principal", 124);
  }, []);

  return (
    <div className="store-page">
      <StoreNavbar />

      <main>
        {/* ========================================================== */}
        {/* 1. HERO SECTION                                             */}
        {/* ========================================================== */}
        <section className="store-hero">
          <div className="store-hero-bg" aria-hidden="true">
            <div className="store-hero-glow store-hero-glow--1" />
            <div className="store-hero-glow store-hero-glow--2" />
          </div>

          <div className="store-hero-inner">
            {/* Left Content */}
            <div className="store-hero-content">
              <span className="store-hero-eyebrow">
                <SparkleIcon className="h-3.5 w-3.5" />
                Envíos a todo el Perú · Pago Contra Entrega
              </span>

              <h1 className="store-hero-title">
                Soluciones naturales
                <span className="store-hero-title-accent"> de grado clínico</span>
                {" "}para tu bienestar
              </h1>

              <p className="store-hero-subtitle">
                ImportHealth: Tu salud en manos expertas. Fórmulas 100% naturales
                seleccionadas con rigor científico. Envíos a todo el Perú con pago
                contra entrega.
              </p>

              <div className="store-hero-actions">
                <Link href="/productos" className="store-hero-btn-primary">
                  <CartIcon className="h-5 w-5" />
                  Ver Catálogo Completo
                </Link>
                <Link href="/prostacare" className="store-hero-btn-secondary">
                  Prostacare — Nuestro N.º 1
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link href="/nadplus" className="store-hero-btn-secondary">
                  NAD+ Ultimate — Nuevo
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="store-hero-trust-mini">
                <span className="store-hero-trust-item">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                  Pago al recibir
                </span>
                <span className="store-hero-trust-item">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                  Envío gratis
                </span>
                <span className="store-hero-trust-item">
                  <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                  100% Natural
                </span>
              </div>
            </div>

            {/* Right: Product Image */}
            <div className="store-hero-image-wrap">
              <div className="store-hero-image-glow" aria-hidden="true" />
              <div className="store-hero-badge-float store-hero-badge-float--top">
                <StarIcon className="h-3.5 w-3.5 text-amber-400" />
                <StarIcon className="h-3.5 w-3.5 text-amber-400" />
                <StarIcon className="h-3.5 w-3.5 text-amber-400" />
                <StarIcon className="h-3.5 w-3.5 text-amber-400" />
                <StarIcon className="h-3.5 w-3.5 text-amber-400" />
                <span className="ml-1 text-xs font-bold text-white">4.9 / 5</span>
              </div>
              <img
                src="/seccion2.png"
                alt="Prostacare — Producto estrella de ImportHealth"
                className="store-hero-img"
              />
              <div className="store-hero-badge-float store-hero-badge-float--bottom">
                <span className="store-hero-badge-price">
                  <span className="text-[10px] text-slate-400 line-through">S/ 190</span>
                  <span className="text-base font-black text-white">S/ 124</span>
                </span>
                <span className="store-hero-badge-label">Desde</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 2. TRUST BAR                                                */}
        {/* ========================================================== */}
        <section className="trust-bar">
          <div className="trust-bar-inner">
            {[
              { Icon: TruckIcon, label: "Envío a todo el Perú", color: "var(--brand-navy)" },
              { Icon: BanknoteIcon, label: "Pago Contra Entrega", color: "var(--brand-gold)" },
              { Icon: LeafIcon, label: "Fórmulas 100% Naturales", color: "#059669" },
              { Icon: ShieldCheckIcon, label: "Compra Segura", color: "var(--brand-navy)" },
            ].map(({ Icon, label, color }) => (
              <div key={label} className="trust-item">
                <span className="trust-icon-wrap" style={{ color }}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="trust-label">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================== */}
        {/* 3. CATEGORÍAS POR SOLUCIÓN                                  */}
        {/* ========================================================== */}
        <section className="store-section store-section--light">
          <div className="store-section-inner">
            <div className="store-section-header">
              <span className="store-section-eyebrow">Navega por tu necesidad</span>
              <h2 className="store-section-title">Encuentra tu solución ideal</h2>
              <p className="store-section-subtitle">
                No busques por nombre de producto. Busca por lo que quieres mejorar.
              </p>
            </div>

            <div className="store-categories-grid">
              {CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.icon] || ShieldCheckIcon;
                return (
                  <div
                    key={cat.id}
                    className={`store-category-card${!cat.available ? " store-category-card--coming" : ""}`}
                  >
                    <div className="store-category-icon-wrap">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="store-category-content">
                      <h3 className="store-category-title">{cat.label}</h3>
                      <p className="store-category-desc">{cat.description}</p>
                    </div>
                    {cat.available ? (
                      <Link href={cat.id === "energia" ? "/nadplus" : "/productos"} className="store-category-cta">
                        Ver productos
                        <ChevronRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <span className="store-category-soon">Próximamente</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 4. LOS MÁS VENDIDOS                                         */}
        {/* ========================================================== */}
        <section className="store-section store-section--white">
          <div className="store-section-inner">
            <div className="store-section-header">
              <span className="store-section-eyebrow">Lo que más llevan nuestros clientes</span>
              <h2 className="store-section-title">Nuestros Productos Estrella</h2>
            </div>

            <div className="store-products-grid">
              {PRODUCTS.map((product) => (
                <article key={product.id} className={`store-product-card${product.isBestSeller ? " store-product-card--popular" : ""}`}>
                  {/* Badge */}
                  {product.badge && (
                    <div className={`store-product-badge store-product-badge--${product.badgeType}`}>
                      {product.badgeType === "popular" && <SparkleIcon className="h-3 w-3" />}
                      {product.badge}
                    </div>
                  )}

                  {/* Image */}
                  <div className="store-product-image-wrap">
                    <img
                      src={product.image}
                      alt={`${product.name} — ${product.subtitle}`}
                      loading="lazy"
                      className="store-product-image"
                    />
                  </div>

                  {/* Info */}
                  <div className="store-product-info">
                    <span className="store-product-category">{product.categoryLabel}</span>
                    <h3 className="store-product-name">{product.name}</h3>
                    <p className="store-product-subtitle">{product.subtitle}</p>

                    {/* Stars */}
                    <div className="store-product-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="h-3.5 w-3.5" />
                      ))}
                      <span className="store-product-rating">
                        {product.rating.toFixed(1)} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="store-product-price-wrap">
                      <span className="store-product-price-normal">S/ {product.normalPrice}</span>
                      <span className="store-product-price-sale">S/ {product.price}</span>
                      <span className="store-product-savings">
                        <TagIcon className="h-3 w-3" />
                        Ahorras S/ {product.savings}
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={product.landingPage}
                      className="store-product-btn"
                    >
                      <CartIcon className="h-4 w-4" />
                      Comprar Ahora
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="store-section-footer-cta">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/productos" className="store-link-more">
                  Ver todos los productos
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link href="/nadplus" className="store-link-more">
                  Descubrir NAD+ Ultimate
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5. BANNER DE PROMOCIÓN                                      */}
        {/* ========================================================== */}
        <section className="store-promo-banner">
          <div className="store-promo-banner-inner">
            <div className="store-promo-content">
              <span className="store-promo-eyebrow">
                <SparkleIcon className="h-4 w-4" />
                Promoción del Mes
              </span>
              <h2 className="store-promo-title">
                Lleva 2 meses de tratamiento
                <span className="store-promo-title-accent"> y el envío es GRATIS</span>
              </h2>
              <p className="store-promo-desc">
                Arma tu pack de salud y obtén el mayor ahorro disponible. Dos meses de
                Prostacare al precio más bajo del año, con envío cubierto a cualquier
                parte del Perú.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/prostacare" className="store-promo-btn">
                  Aprovechar Promo
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <Link href="/nadplus" className="store-promo-btn" style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)" }}>
                  Ver NAD+ Ultimate
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="store-promo-image-col">
              <div className="store-promo-image-wrap">
                <img
                  src="/pack%202.png"
                  alt="2 Packs Prostacare — Promoción especial"
                  loading="lazy"
                  className="store-promo-img"
                />
              </div>
              <div className="store-promo-price-tag">
                <span className="text-xs text-white/60 line-through">S/ 380</span>
                <span className="text-2xl font-black text-white">S/ 214</span>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">60 días</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 6. ¿POR QUÉ IMPORTHEALTH?                                   */}
        {/* ========================================================== */}
        <section className="store-section store-section--light">
          <div className="store-section-inner">
            <div className="store-section-header">
              <span className="store-section-eyebrow">Nuestra diferencia</span>
              <h2 className="store-section-title">¿Por qué elegir ImportHealth?</h2>
              <p className="store-section-subtitle">
                Calidad que se siente. Trabajamos con ingredientes seleccionados de primera,
                fórmulas respaldadas y soporte continuo. Tu salud es nuestra prioridad.
              </p>
            </div>

            <div className="store-why-grid">
              {[
                {
                  Icon: FlaskIcon,
                  title: "Calidad Verificada",
                  desc: "Fórmulas 100% naturales elaboradas con ingredientes de primera línea, seleccionados con criterios de grado clínico para garantizar resultados reales.",
                },
                {
                  Icon: ShieldCheckIcon,
                  title: "Cero Riesgo para Ti",
                  desc: "Implementamos Pago Contra Entrega en todo el país. No desembolsas un solo sol hasta tener el producto en tus manos. Tu inversión siempre protegida.",
                },
                {
                  Icon: AwardIcon,
                  title: "Acompañamiento Real",
                  desc: "Un equipo humano disponible para guiarte antes, durante y después de tu compra. No somos un bot: somos personas que se preocupan por tu bienestar.",
                },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="store-why-card">
                  <div className="store-why-icon">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="store-why-title">{title}</h3>
                  <p className="store-why-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 7. PRUEBA SOCIAL                                            */}
        {/* ========================================================== */}
        <section className="store-section store-section--dark">
          <div className="store-section-inner">
            <div className="store-section-header store-section-header--dark">
              <span className="store-section-eyebrow store-section-eyebrow--light">Testimonios reales</span>
              <h2 className="store-section-title store-section-title--white">
                Lo que dicen nuestros clientes en todo el Perú
              </h2>
            </div>

            <div className="store-testimonials-grid">
              {STORE_TESTIMONIALS.map((t, i) => (
                <div key={i} className="store-testimonial-card">
                  <div className="store-testimonial-header">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt=""
                        className="store-testimonial-avatar"
                      />
                    ) : (
                      <span className="store-testimonial-initials">{t.initials}</span>
                    )}
                    <div>
                      <p className="store-testimonial-name">{t.name}</p>
                      <p className="store-testimonial-detail">{t.detail}</p>
                      <div className="store-testimonial-stars">
                        {Array.from({ length: t.rating }).map((_, s) => (
                          <StarIcon key={s} className="h-3.5 w-3.5 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="store-testimonial-quote">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="store-testimonial-verified">
                    <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-400" />
                    Compra verificada — ImportHealth
                  </div>
                </div>
              ))}
            </div>

            <div className="store-section-footer-cta">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-whatsapp-large"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Consulta ahora por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
