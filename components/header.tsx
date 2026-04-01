import Link from "next/link";
import { navigationLinks, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950">
          {siteConfig.name}
        </Link>

        <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600">
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-slate-950">
              {link.label}
            </Link>
          ))}
          <Link
            href="/convert"
            className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-800"
          >
            Start converting
          </Link>
        </nav>
      </div>
    </header>
  );
}
