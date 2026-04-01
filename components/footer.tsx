import Link from "next/link";
import { footerLinks, siteConfig, supportedCountries } from "@/lib/site";

const productLinks = [
  { href: "/convert", label: "CV Converter" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#faq", label: "FAQ" }
];

export function Footer() {
  return (
    <footer className="border-t border-white/80 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(79,209,165,0.16),rgba(255,255,255,0.92),rgba(125,211,252,0.12))] p-6 shadow-[0_18px_55px_-35px_rgba(8,17,31,0.35)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                CV
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-slate-950">
                  {siteConfig.name}
                </p>
                <p className="text-sm text-slate-600">Country-ready resume rewrites</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
              Convert your resume into a cleaner, more credible version for the market you
              are targeting, with language control and ATS-friendly structure built in.
            </p>
            <Link
              href="/convert"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Launch the converter
            </Link>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Product
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {productLinks.map((link) => (
                <div key={link.href}>
                  <Link href={link.href} className="hover:text-slate-950">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Company
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {footerLinks.map((link) => (
                <div key={link.href}>
                  <Link href={link.href} className="hover:text-slate-950">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Supported countries
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {supportedCountries.map((country) => (
                <span
                  key={country}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {new Date().getFullYear()} {siteConfig.name}. Designed for cleaner global job
            applications.
          </p>
          <p>No stored payment data. No hardcoded secrets. Built for modern resume workflows.</p>
        </div>
      </div>
    </footer>
  );
}
