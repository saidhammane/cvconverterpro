import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata(
  "About",
  "Learn what CVConverterPro is building and which countries the tool is designed to support.",
  "/about"
);

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8 lg:px-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">About</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
          Built to make international job applications less confusing
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          CVConverterPro is a SaaS concept focused on turning one resume into formats that
          better match country-specific expectations for Canada, Germany, Australia, the
          USA, the UK, and France.
        </p>
      </div>
    </section>
  );
}
