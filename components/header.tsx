import Link from "next/link";
import { navigationLinks, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pb-3 pt-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-[0_18px_60px_-30px_rgba(8,17,31,0.35)] backdrop-blur-xl sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-300">
              CV
            </div>
            <div className="min-w-0">
              <p className="font-display text-base font-semibold tracking-tight text-slate-950 sm:text-lg">
                {siteConfig.name}
              </p>
              <p className="hidden text-xs text-slate-500 sm:block">
                Country-ready resume rewrites
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-slate-950">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-950 sm:inline-flex"
            >
              Contact
            </Link>
            <Link
              href="/convert"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_32px_-18px_rgba(8,17,31,0.85)] hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Start converting
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
