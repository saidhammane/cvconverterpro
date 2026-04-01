import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata(
  "Privacy Policy",
  "Read the current privacy placeholder for the CVConverterPro landing page scaffold.",
  "/privacy-policy"
);

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8 lg:px-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          Privacy Policy
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          Privacy details can be added here when product features go live
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          This starter does not include uploads, authentication, payments, or persistent
          storage. As the app evolves, this page can be expanded with final privacy,
          retention, and processing details.
        </p>
      </div>
    </section>
  );
}
