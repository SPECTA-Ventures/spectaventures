// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const name = String(form.get("name") || "");
    const business = String(form.get("business") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const problem = String(form.get("problem") || "");

    await resend.emails.send({
      // Start simple: use Resend's default sender (no domain setup needed).
      from: "Website Form <onboarding@resend.dev>",
      to: "ventures.specta@gmail.com",
      reply_to: email || undefined,
      subject: `New inquiry — ${name || "Unnamed"}`,
      text: [
        `Name: ${name}`,
        `Business: ${business}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Problem:",
        problem,
      ].join("\n"),
    });

    // Redirect to a thank-you page
    return NextResponse.redirect(new URL("/thanks", req.url), 303);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
