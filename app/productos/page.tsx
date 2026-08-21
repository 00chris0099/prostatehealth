"use client";

import { useEffect } from "react";
import Link from "next/link";
import StoreNavbar from "../components/StoreNavbar";
import StoreFooter from "../components/StoreFooter";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { trackViewContent } from "../lib/meta-pixel";
import {
  StarIcon,
  CartIcon,
  TagIcon,
  SparkleIcon,
  MaleIcon,
  BoneIcon,
  ZapIcon,
  HeartPulseIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  TruckIcon,
  BanknoteIcon,
  LeafIcon,
  ChevronRightIcon,
} from "../store-icons";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  male: MaleIcon,
  bone: BoneIcon,
  zap: ZapIcon,
  shield: HeartPulseIcon,
};

export default function ProductosPage() {
  useEffect(() => {
    trackViewContent("IMPORTHEALTH-CATALOG", "Catálogo Completo ImportHealth", 124);
  }, []);

  return (
    <div className="store-page">
      <StoreNavbar />

      <main>
        {/* ─── Page Header ─── */}
        <section className="store-page-header">
          <div className="store-section-inner">
            <span className="store-section-eyebrow store-section-eyebrow--light">
              ImportHealth
            </span>
            <h1 className="store-page-header-title">Nuestro Catálogo</h1>
            <p className="store-page-header-desc">
              Soluciones naturales de grado clínico para cada etapa de tu bienestar.
              Todos nuestros productos llegan a tu puerta en todo el Perú, con pago al recibir.
            </p>
          </div>
        </section>

        {/* ─── Trust Bar ─── */}
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

        {/* ─── Categorías ─── */}
        <section className="store-section store-section--light">
          <div className="store-section-inner">
            <div className="store-section-header">
              <h2 className="store-section-title">Categorías</h2>
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
                        {cat.productCount} producto{cat.productCount !== 1 ? "s" : ""}
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

        {/* ─── Products Grid ─── */}
        <section className="store-section store-section--white">
          <div className="store-section-inner">
            <div className="store-section-header">
              <span className="store-section-eyebrow">Todos nuestros productos</span>
              <h2 className="store-section-title">Catálogo ImportHealth</h2>
              <p className="store-section-subtitle">
                Soluciones naturales para cada necesidad. Todos llegan a tu puerta
                en todo el Perú con pago contra entrega.
              </p>
            </div>

            <div className="store-products-grid store-products-grid--full">
              {PRODUCTS.map((product) => (
                <article
                  key={product.id}
                  className={`store-product-card${product.isBestSeller ? " store-product-card--popular" : ""}`}
                >
                  {product.badge && (
                    <div className={`store-product-badge store-product-badge--${product.badgeType}`}>
                      {product.badgeType === "popular" && <SparkleIcon className="h-3 w-3" />}
                      {product.badge}
                    </div>
                  )}

                  <div className="store-product-image-wrap">
                    <img
                      src={product.image}
                      alt={`${product.name} — ${product.subtitle}`}
                      loading="lazy"
                      className="store-product-image"
                    />
                  </div>

                  <div className="store-product-info">
                    <span className="store-product-category">{product.categoryLabel}</span>
                    <h3 className="store-product-name">{product.name}</h3>
                    <p className="store-product-subtitle">{product.subtitle}</p>

                    <p className="store-product-desc-full">{product.desc}</p>

                    <div className="store-product-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="h-3.5 w-3.5" />
                      ))}
                      <span className="store-product-rating">
                        {product.rating.toFixed(1)} ({product.reviewCount} reseñas)
                      </span>
                    </div>

                    <div className="store-product-price-wrap">
                      <span className="store-product-price-normal">S/ {product.normalPrice}</span>
                      <span className="store-product-price-sale">S/ {product.price}</span>
                      <span className="store-product-savings">
                        <TagIcon className="h-3 w-3" />
                        Ahorras S/ {product.savings}
                      </span>
                    </div>

                    <div className="store-product-feature-list">
                      <span className="store-product-feature">
                        <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-600" />
                        Envío gratis
                      </span>
                      <span className="store-product-feature">
                        <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-600" />
                        Pago contra entrega
                      </span>
                    </div>

                    <Link
                      href={product.landingPage}
                      className="store-product-btn"
                    >
                      <CartIcon className="h-4 w-4" />
                      Ver Oferta
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Coming Soon ─── */}
        <section className="store-section store-section--light">
          <div className="store-section-inner">
            <div className="store-coming-soon-box">
              <SparkleIcon className="h-10 w-10 mx-auto mb-4" style={{ color: "var(--brand-gold)" }} />
              <h2 className="store-coming-title">Más productos en camino</h2>
              <p className="store-coming-desc">
                Estamos preparando nuevas líneas: Articulaciones y Huesos y Sistema
                Inmune. Escríbenos por WhatsApp para ser el primero en enterarte.
              </p>
              <a
                href="https://wa.me/51935381231?text=Quiero%20saber%20cu%C3%A1ndo%20hay%20nuevos%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="store-promo-btn store-coming-btn"
              >
                Avisarme de nuevos productos
              </a>
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
