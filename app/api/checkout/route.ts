import { NextResponse } from "next/server";

// Webhook n8n donde se registra cada pedido (URL con espacio codificado)
const N8N_WEBHOOK_URL = "https://aimachristian-n8n.ajcxjb.easypanel.host/webhook/registrar%20pedido";

// WhatsApp del comercio: +51 935 381 231
const MERCHANT_WHATSAPP = "51935381231";

type Checkout = {
  fullName?: string;
  phone?: string;
  department?: string;
  province?: string;
  district?: string;
  address?: string;
  reference?: string;
  packPrice?: number;
  packTitle?: string;
  quantity?: number;
};

export async function POST(request: Request) {
  let input: Checkout;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "Datos de formulario inválidos." }, { status: 400 });
  }

  const required = ["fullName", "phone", "department", "province", "district", "address"] as const;
  if (required.some((key) => !input[key]?.trim())) {
    return NextResponse.json({ message: "Por favor completa todos los campos requeridos (*)." }, { status: 400 });
  }

  const cleanPhone = input.phone!.replace(/\D/g, "");
  if (!/^9\d{8}$/.test(cleanPhone)) {
    return NextResponse.json({ message: "Ingresa un número de celular peruano válido de 9 dígitos (debe empezar con 9)." }, { status: 400 });
  }

  const token = process.env.DROPI_INTEGRATION_KEY;
  const baseUrl = process.env.DROPI_API_BASE_URL;
  const productId = Number(process.env.DROPI_PRODUCT_ID);
  
  // Use passed packPrice if valid, or fallback to env / 124
  const orderPrice = Number(input.packPrice) && input.packPrice! > 0 
    ? Number(input.packPrice) 
    : (Number(process.env.DROPI_PRODUCT_PRICE) || 124);

  const packQty = Number(input.quantity) || 1;

  // ── Notificación al webhook n8n (nunca bloquea el pedido, aunque falle) ──
  const webhookPayload = {
    event: "order_created",
    source: "landing-prostacare",
    merchantWhatsApp: `+${MERCHANT_WHATSAPP}`,
    order: {
      createdAt: new Date().toISOString(),
      customer: {
        fullName: input.fullName!.trim(),
        phone: `+51${cleanPhone}`,
        department: input.department!.trim(),
        province: input.province!.trim(),
        district: input.district!.trim(),
        address: input.address!.trim(),
        reference: input.reference?.trim() || ""
      },
      product: {
        title: input.packTitle || "Prostacare",
        quantity: packQty,
        unitPrice: Math.round((orderPrice / packQty) * 100) / 100,
        total: orderPrice
      }
    }
  };

  try {
    await Promise.race([
      fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
        cache: "no-store"
      }),
      new Promise((resolve) => setTimeout(resolve, 6000))
    ]);
  } catch {
    // Si el webhook falla, el pedido continúa (Dropi sigue siendo la fuente de verdad)
  }

  if (!token || !baseUrl || !Number.isInteger(productId) || productId <= 0) {
    return NextResponse.json({ 
      ok: true,
      message: `¡Pedido pre-registrado correctamente! Pack: ${input.packTitle || "Prostacare"} (Total: S/ ${orderPrice}). Nos comunicaremos a tu celular para la entrega.` 
    }, { status: 200 });
  }

  const [name, ...lastName] = input.fullName!.trim().split(/\s+/);
  const fullAddress = input.reference?.trim() 
    ? `${input.address!.trim()} (Ref: ${input.reference.trim()})`
    : input.address!.trim();

  const payload = {
    calculate_costs_and_shiping: true,
    state: input.department!.trim(),
    city: `${input.province!.trim()} - ${input.district!.trim()}`,
    name,
    surname: lastName.join(" ") || "-",
    dir: fullAddress,
    notes: `Pack: ${input.packTitle || "Standard"} | Qty: ${packQty} | Ref: ${input.reference?.trim() || "Sin ref"}`,
    payment_method_id: 1,
    phone: cleanPhone,
    rate_type: "CON RECAUDO",
    type: "FINAL_ORDER",
    total_order: orderPrice,
    products: [{ id: productId, price: orderPrice, variation_id: null, quantity: packQty }],
  };


  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/orders/myorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "dropi-integracion-key": token
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.isSuccess === false) {
      return NextResponse.json({ message: result.message || "No pudimos registrar tu pedido en el sistema. Inténtalo de nuevo." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, message: "¡Pedido registrado con éxito! Nos comunicaremos por teléfono para confirmar tu entrega." });
  } catch {
    return NextResponse.json({ message: "Ocurrió un inconveniente de conexión. Inténtalo nuevamente." }, { status: 502 });
  }
}

