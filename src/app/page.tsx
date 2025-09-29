"use client";

import * as React from "react";
import Image from "next/image";

type FormState = {
  name: string;
  email: string;
  phone: string;
  business: string;
  problem: string;
};

const GMAIL_TO = "ventures.specta@gmail.com"; // <- your email

export default function Page() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    business: "",
    problem: "",
  });
  const [sent, setSent] = React.useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const subject = encodeURIComponent(
      `New Website Inquiry${form.name ? ` — ${form.name}` : ""}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Business: ${form.business}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        "",
        "Problem:",
        form.problem,
      ].join("\n")
    );

    // Open the user's mail app in a new tab/window so we stay on the page

    // Show thank-you UI
    setSent(true);

    // Fire confetti (loaded client-side only)
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
      setTimeout(
        () =>
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          }),
        150
      );
      setTimeout(
        () =>
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          }),
        300
      );
    } catch {
      // ignore if confetti fails to load
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b from-black via-[#0a0a2a] to-black">
        <Image
          src="/logo.png"
          alt="Specta Logo"
          width={128}
          height={128}
          className="w-32 h-auto mb-6"
          priority
        />
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
          Scale Your Business Without The Stress Of Marketing.
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl text-gray-300">
          You do what you do best – running your business. We’ll do what we do
          best – getting you more clients, guaranteed.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-2xl shadow-xl"
        >
          Yes, I Want More Clients
        </a>
      </section>

      {/* Problem / Agitate / Solve */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why You Need Specta
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="rounded-2xl bg-[#0f0f1f] border border-white/10 shadow-lg">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">The Problem</h3>
              <p className="text-gray-300">
                You didn’t start your business to become a marketing expert. But
                you know without strong marketing, growth stalls. You’re already
                wearing too many hats – and marketing keeps falling through the
                cracks.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0f0f1f] border border-white/10 shadow-lg">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">The Pain</h3>
              <p className="text-gray-300">
                Every missed client is lost revenue. Trying to DIY marketing
                takes valuable time away from your craft. Hiring staff is
                expensive and risky. Big agencies treat small businesses as low
                priority. The result? Stress, wasted money, and stagnant growth.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#0f0f1f] border border-white/10 shadow-lg">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">The Solution</h3>
              <p className="text-gray-300">
                That’s where Specta comes in. We’re selective, local, and
                laser-focused on results. No fluff, no wasted time – just more
                of the right clients for your business. We carry the burden with
                you and guarantee growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#0a0a1a] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Let’s Grow Together
          </h2>
          <p className="text-gray-300 mb-10">
            Tell us about your biggest challenge, and we’ll show you how Specta
            can solve it.
          </p>

          {!sent ? (
            <form className="grid gap-6 text-left" onSubmit={handleSubmit}>
              <input
                id="name"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
              />

              <input
                id="business"
                name="business"
                placeholder="Business Name"
                value={form.business}
                onChange={handleChange}
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
              />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
              />

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
              />

              <textarea
                id="problem"
                name="problem"
                placeholder="What’s the biggest problem your business is facing right now?"
                value={form.problem}
                onChange={handleChange}
                rows={5}
                required
                className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-black"
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-lg py-4 rounded-2xl shadow-xl"
              >
                Submit
              </button>
            </form>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#0f0f1f] p-8"
            >
              <h3 className="text-2xl font-bold mb-2">Thanks! 🎉</h3>
              <p className="text-gray-300">
                We got your message and will reach out soon.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                If your mail app didn’t open, you can email us directly at{" "}
                <a
                  className="underline hover:no-underline"
                >
                  {GMAIL_TO}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-10 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Specta Marketing Agency. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
