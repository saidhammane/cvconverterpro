import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata(
  "Contact",
  "Contact the CVConverterPro team for feedback, questions, or partnership inquiries.",
  "/contact"
);

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8 lg:px-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          Contact
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          A simple contact route is ready for future updates
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Use this placeholder page for future support details, product questions, or
          request forms. No contact processing or backend integrations are connected yet.
        </p>
      </div>
    </section>
  );
}
