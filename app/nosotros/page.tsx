"use client";

import Link from "next/link";
import StoreNavbar from "../components/StoreNavbar";
import StoreFooter from "../components/StoreFooter";
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  AwardIcon,
  FlaskIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  SparkleIcon,
  StarIcon,
  HandshakeIcon,
} from "../store-icons";

const WHATSAPP_URL =
  "https://wa.me/51935381231?text=" +
  encodeURIComponent("Hola Christian, quiero más información sobre ImportHealth");

export default function NosotrosPage() {
  return (
    <div className="store-page">
      <StoreNavbar />

      <main>
        {/* ─── Page Header ─── */}
        <section className="store-page-header store-page-header--tall">
          <div className="store-section-inner">
            <span className="store-section-eyebrow store-section-eyebrow--light">
              Nuestra historia
            </span>
            <h1 className="store-page-header-title">
              Sobre ImportHealth
            </h1>
            <p className="store-page-header-desc">
              Tu bienestar es nuestra prioridad. Conoce quiénes somos, por qué lo
              hacemos y el compromiso que nos diferencia.
            </p>
          </div>
        </section>

        {/* ─── Misión ─── */}
        <section className="store-section store-section--white">
          <div className="store-section-inner">
            <div className="about-mission-grid">
              <div className="about-mission-content">
                <span className="store-section-eyebrow">Nuestra razón de ser</span>
                <h2 className="about-section-title">Nuestra Misión</h2>
                <p className="about-body">
                  En ImportHealth creemos que la salud de calidad no debería ser un
                  lujo ni un dolor de cabeza. Nacimos con un objetivo claro:{" "}
                  <strong>acercar las mejores soluciones naturales e innovadoras
                  a cada familia</strong>, rompiendo las barreras de la distancia y
                  la desconfianza en las compras por internet.
                </p>
                <p className="about-body">
                  Seleccionamos únicamente productos de grado clínico que realmente
                  marcan la diferencia en el día a día de nuestros clientes, con el
                  rigor de quien se preocupa por cada resultado.
                </p>
              </div>
              <div className="about-mission-image-col">
                <div className="about-mission-card">
                  <img
                    src="/logo.png"
                    alt="ImportHealth"
                    className="about-logo-display"
                  />
                  <div className="about-mission-stats">
                    {[
                      { value: "+500", label: "Clientes satisfechos" },
                      { value: "100%", label: "Pago al recibir" },
                      { value: "Todo", label: "El Perú" },
                    ].map(({ value, label }) => (
                      <div key={label} className="about-stat">
                        <span className="about-stat-value">{value}</span>
                        <span className="about-stat-label">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Historia ─── */}
        <section className="store-section store-section--light">
          <div className="store-section-inner">
            <div className="about-story-wrap">
              <span className="store-section-eyebrow">El origen</span>
              <h2 className="about-section-title">¿Por qué lo hacemos?</h2>

              <div className="about-story-quote-wrap">
                <div className="about-story-avatar">
                  <span className="about-story-initials">CH</span>
                </div>
                <div className="about-story-text">
                  <p className="about-story-quote">
                    Hola, soy Christian. Cuando fundé ImportHealth desde nuestra base en
                    Lima, me di cuenta de la cantidad de personas que sufren en silencio
                    por no encontrar tratamientos efectivos, o que han tenido malas
                    experiencias comprando en línea.
                  </p>
                  <p className="about-story-quote">
                    Por eso, decidí crear más que una simple tienda online:{" "}
                    <strong>construimos un puente de confianza.</strong> Investigamos y
                    seleccionamos únicamente productos de grado clínico, como nuestra
                    línea Prostate Health, que realmente marcan la diferencia en el día
                    a día.
                  </p>
                  <p className="about-story-author">— Christian, Fundador de ImportHealth</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3 Pilares / Diferenciadores ─── */}
        <section className="store-section store-section--white">
          <div className="store-section-inner">
            <div className="store-section-header">
              <span className="store-section-eyebrow">Lo que nos diferencia</span>
              <h2 className="store-section-title">No somos una página más</h2>
              <p className="store-section-subtitle">
                Nos enfocamos en tu tranquilidad total mediante tres pilares
                que construyen una relación de confianza duradera.
              </p>
            </div>

            <div className="about-pillars-grid">
              {[
                {
                  Icon: FlaskIcon,
                  number: "01",
                  title: "Calidad Verificada",
                  desc: "Fórmulas 100% naturales, respaldadas y elaboradas con ingredientes de primera línea. No comercializamos nada que no cumpla con los más altos estándares de calidad y efectividad.",
                },
                {
                  Icon: ShieldCheckIcon,
                  number: "02",
                  title: "Cero Riesgos",
                  desc: "Implementamos el sistema de Pago Contra Entrega en todo el país para que tu inversión esté siempre segura. Pagas únicamente cuando el producto llega a tus manos.",
                },
                {
                  Icon: HandshakeIcon,
                  number: "03",
                  title: "Acompañamiento Real",
                  desc: "Un equipo humano dispuesto a guiarte antes, durante y después de recibir tu pedido. Estamos contigo en cada paso del proceso, porque tu bienestar no termina con la compra.",
                },
              ].map(({ Icon, number, title, desc }) => (
                <div key={title} className="about-pillar-card">
                  <div className="about-pillar-number">{number}</div>
                  <div className="about-pillar-icon">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="about-pillar-title">{title}</h3>
                  <p className="about-pillar-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Nuestra Recompensa ─── */}
        <section className="store-section store-section--dark">
          <div className="store-section-inner">
            <div className="store-section-header store-section-header--dark">
              <span className="store-section-eyebrow store-section-eyebrow--light">
                Lo que nos mueve
              </span>
              <h2 className="store-section-title store-section-title--white">
                Nuestra Recompensa
              </h2>
            </div>

            <div className="about-reward-wrap">
              <AwardIcon className="about-reward-icon" />
              <p className="about-reward-text">
                El motor de ImportHealth es leer los mensajes de clientes que han
                recuperado su vitalidad, su descanso y su calidad de vida gracias a
                nuestras soluciones. Estamos aquí para{" "}
                <span className="about-reward-highlight">
                  acompañarte paso a paso hacia un bienestar integral.
                </span>
              </p>

              <div className="about-reward-reviews">
                {[
                  { stars: 5, quote: "Gracias a ImportHealth recuperé mis noches de descanso.", name: "Don Lucho — Arequipa" },
                  { stars: 5, quote: "El pago al recibir me dio la confianza que necesitaba.", name: "Sr. Carlos — Lima" },
                  { stars: 5, quote: "Llegó rápido y discreto. Volvería a pedir sin dudarlo.", name: "Don Manuel — Cusco" },
                ].map((r, i) => (
                  <div key={i} className="about-mini-review">
                    <div className="about-mini-stars">
                      {Array.from({ length: r.stars }).map((_, s) => (
                        <StarIcon key={s} className="h-3.5 w-3.5 text-amber-400" />
                      ))}
                    </div>
                    <p className="about-mini-quote">&ldquo;{r.quote}&rdquo;</p>
                    <p className="about-mini-author">{r.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA Final ─── */}
        <section className="store-section store-section--white">
          <div className="store-section-inner">
            <div className="about-cta-wrap">
              <SparkleIcon className="h-10 w-10 mx-auto mb-4" style={{ color: "var(--brand-gold)" }} />
              <h2 className="about-section-title text-center">
                Empieza hoy tu camino al bienestar
              </h2>
              <p className="about-body text-center max-w-xl mx-auto">
                Descubre nuestra línea Prostacare y únete a cientos de clientes en todo
                el Perú que ya confían en ImportHealth.
              </p>
              <div className="about-cta-actions">
                <Link href="/productos" className="store-promo-btn">
                  Ver Productos
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-whatsapp-large"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
