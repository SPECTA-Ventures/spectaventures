// src/app/api/contact/route.ts
export const runtime = "nodejs"; // needed for Nodemailer (sockets)

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO = "ventures.specta@gmail.com";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: true, // 465 = SSL
  auth: {
    user: process.env.SMTP_USER, // ventures.specta@gmail.com
    pass: process.env.SMTP_PASS, // Gmail App Password (see step 4)
  },
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") ?? "");
    const business = String(form.get("business") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const problem = String(form.get("problem") ?? "");

    const subject = `New inquiry — ${name || "Unnamed"}`;
    const text = [
      `Name: ${name}`,
      `Business: ${business}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Problem:",
      problem,
    ].join("\n");

    await transporter.sendMail({
      from: `"Specta Website" <${process.env.SMTP_USER}>`,
      to: TO,
      replyTo: email || undefined,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Email send failed:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
