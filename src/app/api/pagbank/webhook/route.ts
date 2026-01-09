import { NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const TIMESTAMP_TOLERANCE_SEC = 300;

function safeCompare(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: Request) {
  try {
    const signatureHeader = req.headers.get("x-signature");
    const timestampHeader = req.headers.get("x-timestamp");
    const secret = process.env.PAGBANK_WEBHOOK_SECRET;

    if (!secret) {
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const rawBody = await req.text();

    // 1) Validate timestamp
    if (timestampHeader) {
      const now = Math.floor(Date.now() / 1000);
      const ts = parseInt(timestampHeader, 10);
      if (isNaN(ts) || Math.abs(now - ts) > TIMESTAMP_TOLERANCE_SEC) {
        return NextResponse.json({ error: "Timestamp too old" }, { status: 400 });
      }
    }

    // 2) Validate HMAC signature
    const payload = timestampHeader ? `${timestampHeader}.${rawBody}` : rawBody;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (!safeCompare(expectedSignature, signatureHeader ?? "")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 3) Parse JSON
    const event = JSON.parse(rawBody);

    const order = event.order;
    if (!order || !order.id) {
      return NextResponse.json({ error: "Missing order info" }, { status: 400 });
    }

    const status = order.status ?? "UNKNOWN";

    // --- IDEMPOTÊNCIA ---
    // Criar uma chave única para este evento
    const providerEventId = `${order.id}-${status}-${timestampHeader}`;

    try {
      await db.webhookEvent.create({
        data: {
          providerEventId,
          orderId: order.id,
          status,
          payload: event,
        },
      });
    } catch (e: any) {
      // Se der erro de UNIQUE, significa que já processamos esse evento
      if (e.code === "P2002") {
        console.log("⚠ Webhook duplicado ignorado:", providerEventId);
        return NextResponse.json({ ok: true, duplicated: true });
      }
      throw e;
    }

    // 4) Atualizar o pedido no sistema somente uma vez
    await db.order.upsert({
      where: { pagbankId: order.id },
      update: { status },
      create: {
        pagbankId: order.id,
        status,
      },
    });

    // Aqui você poderia liberar acesso, enviar email, etc.
    // if (status === "PAID") await grantAccess(order.id)

    return NextResponse.json({ ok: true, processed: true });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message ?? "Internal error" }, { status: 500 });
  }
}
