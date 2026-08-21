"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackContact } from "../lib/meta-pixel";
import {
  HomeIcon,
  PackageIcon,
  UsersIcon,
  MenuIcon,
  XIcon,
  WhatsAppIcon,
  CartIcon,
} from "../store-icons";

const WHATSAPP_URL =
  "https://wa.me/51935381231?text=" +
  encodeURIComponent("Hola, quiero información sobre los productos de ImportHealth");

const NAV_LINKS = [
  { href: "/", label: "Inicio", Icon: HomeIcon },
  { href: "/productos", label: "Productos", Icon: PackageIcon },
  { href: "/nosotros", label: "Nosotros", Icon: UsersIcon },
];

export default function StoreNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleWhatsAppClick = () => {
    trackContact("WhatsApp Navbar");
    setMobileOpen(false);
  };

  return (
    <>
      {/* ─── Desktop / Mobile Navbar ─────────────────────────── */}
      <header className="store-navbar">
        <div className="store-navbar-inner">

          {/* ── Logo ── */}
          <Link href="/" className="store-logo-link" onClick={() => setMobileOpen(false)}>
            <img
              src="/logo.png"
              alt="ImportHealth — Global Health Import Excellence"
              className="store-logo-img"
            />
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="store-nav-desktop" aria-label="Navegación principal">
            {NAV_LINKS.map(({ href, label, Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`store-nav-link${active ? " store-nav-link--active" : ""}`}
                >
                  <Icon className="store-nav-icon" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop WhatsApp ── */}
          <div className="store-navbar-actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
              className="store-whatsapp-btn"
              onClick={handleWhatsAppClick}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="store-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* ─── Mobile Menu ─────────────────────────────────────── */}
        {mobileOpen && (
          <div className="store-mobile-menu">
            <nav className="store-mobile-nav">
              {NAV_LINKS.map(({ href, label, Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`store-mobile-link${active ? " store-mobile-link--active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {label}
                  </Link>
                );
              })}

              <div className="store-mobile-divider" />

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-mobile-whatsapp"
                onClick={handleWhatsAppClick}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Escribir por WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
