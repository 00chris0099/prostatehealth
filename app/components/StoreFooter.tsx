import Link from "next/link";
import {
  WhatsAppIcon,
  FacebookIcon,
  TikTokIcon,
  MailIcon,
  MapPinIcon,
  HomeIcon,
  PackageIcon,
  UsersIcon,
  ShieldCheckIcon,
} from "../store-icons";

const WHATSAPP_URL =
  "https://wa.me/51935381231?text=" +
  encodeURIComponent("Hola, quiero información sobre los productos de ImportHealth");

export default function StoreFooter() {
  return (
    <footer className="store-footer">
      {/* ─── Main Footer Grid ─── */}
      <div className="store-footer-grid">

        {/* Col 1: Brand */}
        <div className="store-footer-brand">
          <Link href="/">
            <img
              src="/logo.png"
              alt="ImportHealth"
              className="store-footer-logo"
            />
          </Link>
          <p className="store-footer-tagline">
            Tu salud en manos expertas. Soluciones naturales de grado clínico
            con envío a todo el Perú.
          </p>
          <div className="store-footer-social">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="store-social-btn"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61593045105656"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="store-social-btn"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.tiktok.com/@healthbeatsimport"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="store-social-btn"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="store-footer-col">
          <h4 className="store-footer-col-title">Navegación</h4>
          <ul className="store-footer-links">
            <li>
              <Link href="/" className="store-footer-link">
                <HomeIcon className="h-3.5 w-3.5" />
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/productos" className="store-footer-link">
                <PackageIcon className="h-3.5 w-3.5" />
                Productos
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="store-footer-link">
                <UsersIcon className="h-3.5 w-3.5" />
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/prostacare" className="store-footer-link">
                <ShieldCheckIcon className="h-3.5 w-3.5" />
                Prostacare
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal */}
        <div className="store-footer-col">
          <h4 className="store-footer-col-title">Legal</h4>
          <ul className="store-footer-links">
            <li>
              <span className="store-footer-link-text">Política de Privacidad</span>
            </li>
            <li>
              <span className="store-footer-link-text">Términos y Condiciones</span>
            </li>
            <li>
              <span className="store-footer-link-text">Política de Reembolso</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Contacto */}
        <div className="store-footer-col">
          <h4 className="store-footer-col-title">Contacto</h4>
          <ul className="store-footer-links">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-footer-link"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                +51 935 381 231
              </a>
            </li>
            <li>
              <a
                href="mailto:contacto@importhealth.pe"
                className="store-footer-link"
              >
                <MailIcon className="h-3.5 w-3.5" />
                contacto@importhealth.pe
              </a>
            </li>
            <li>
              <span className="store-footer-link store-footer-link--no-hover">
                <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
                Lima, Perú
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="store-footer-bottom">
        <p className="store-footer-copy">
          © {new Date().getFullYear()} ImportHealth Perú. Todos los derechos reservados.
        </p>
        <p className="store-footer-disclaimer">
          Productos de complementación natural. No sustituyen consulta médica. Resultados pueden variar.
        </p>
      </div>
    </footer>
  );
}
