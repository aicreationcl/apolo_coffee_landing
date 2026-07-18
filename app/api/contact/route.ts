import { NextResponse } from "next/server";
import { contactFormSchema } from "@/types/contact";
import { businessInfo } from "@/lib/business-info";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  const body = await request.json();

  // Honeypot: si el campo oculto viene relleno, es un bot — se descarta
  // silenciosamente devolviendo 200 sin llegar a Zod ni a Resend.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;

  try {
    await resend.emails.send({
      from: "Apolo Coffee <onboarding@resend.dev>",
      to: businessInfo.email,
      replyTo: email,
      subject: `Nuevo mensaje de ${name} — Apolo Coffee`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "No pudimos enviar tu mensaje. Intenta nuevamente más tarde." },
      { status: 500 }
    );
  }
}
