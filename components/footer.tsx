import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:px-8 lg:px-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-slate-950">{siteConfig.name}</p>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
            A clean Next.js starter for a country-aware CV conversion SaaS landing page.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-950">
              {link.label}
            </Link>
          ))}
          <span className="text-slate-400">
            {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
