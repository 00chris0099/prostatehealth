// ============================================================
// Meta Pixel — Helper de Eventos Estándar para ImportHealth
// Pixel ID: 1600215718203667
// ============================================================

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

/** Genera un event_id único para deduplicación con CAPI */
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/** Verifica que el Pixel esté disponible */
function pixelReady(): boolean {
  return typeof window !== "undefined" && typeof window.fbq === "function";
}

// ─── Eventos Estándar ──────────────────────────────────────

/** ViewContent — Disparar cuando el usuario ve la página del producto */
export function trackViewContent(
  contentId: string,
  contentName: string,
  value: number
): string {
  const eventId = generateEventId();
  if (!pixelReady()) return eventId;
  window.fbq("track", "ViewContent", {
    content_ids: [contentId],
    content_name: contentName,
    content_category: "Suplementos Nutricionales",
    content_type: "product",
    value,
    currency: "PEN",
  }, { eventID: eventId });
  return eventId;
}

/** AddToCart — Disparar cuando el usuario selecciona un pack */
export function trackAddToCart(
  contentId: string,
  contentName: string,
  value: number,
  quantity: number
): string {
  const eventId = generateEventId();
  if (!pixelReady()) return eventId;
  window.fbq("track", "AddToCart", {
    content_ids: [contentId],
    content_name: contentName,
    content_category: "Suplementos Nutricionales",
    content_type: "product",
    value,
    currency: "PEN",
    num_items: quantity,
    contents: [{ id: contentId, quantity, item_price: value / quantity }],
  }, { eventID: eventId });
  return eventId;
}

/** InitiateCheckout — Disparar cuando el usuario abre el modal de pedido */
export function trackInitiateCheckout(
  contentId: string,
  contentName: string,
  value: number,
  quantity: number
): string {
  const eventId = generateEventId();
  if (!pixelReady()) return eventId;
  window.fbq("track", "InitiateCheckout", {
    content_ids: [contentId],
    content_name: contentName,
    content_type: "product",
    value,
    currency: "PEN",
    num_items: quantity,
    contents: [{ id: contentId, quantity, item_price: value / quantity }],
  }, { eventID: eventId });
  return eventId;
}

/** Purchase — Disparar cuando el pedido se registra exitosamente */
export function trackPurchase(
  contentId: string,
  contentName: string,
  value: number,
  quantity: number
): string {
  const eventId = generateEventId();
  if (!pixelReady()) return eventId;
  window.fbq("track", "Purchase", {
    content_ids: [contentId],
    content_name: contentName,
    content_category: "Suplementos Nutricionales",
    content_type: "product",
    value,
    currency: "PEN",
    num_items: quantity,
    contents: [{ id: contentId, quantity, item_price: value / quantity }],
  }, { eventID: eventId });
  return eventId;
}

/** Contact — Disparar cuando el usuario hace clic en WhatsApp */
export function trackContact(method: string = "WhatsApp"): string {
  const eventId = generateEventId();
  if (!pixelReady()) return eventId;
  window.fbq("track", "Contact", {
    content_name: `Contacto por ${method}`,
    currency: "PEN",
  }, { eventID: eventId });
  return eventId;
}

/** PageView manual — para cambios de ruta en SPA */
export function trackPageView(): void {
  if (!pixelReady()) return;
  window.fbq("track", "PageView");
}
