export function HomeHeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[40rem]">
      <div className="absolute -left-6 top-10 h-36 w-36 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative rounded-[2.2rem] border border-white/10 bg-[linear-gradient(155deg,rgba(15,23,42,0.96),rgba(7,17,31,0.94))] p-5 shadow-[0_36px_90px_-40px_rgba(0,0,0,0.75)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/70">
              Conversion workspace
            </p>
            <p className="font-display mt-2 text-2xl font-semibold text-white">
              Resume in, local-ready draft out
            </p>
          </div>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            Live preview
          </span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Upload
              </p>
              <div className="mt-4 rounded-[1.3rem] border border-dashed border-emerald-300/40 bg-emerald-300/8 px-4 py-5">
                <p className="text-sm font-semibold text-white">PDF or DOCX file</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Start with your current CV. The system handles extraction, cleanup,
                  rewriting, and export.
                </p>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Controls
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-slate-200">
                  Country: Canada
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-slate-200">
                  Output language: English
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-slate-200">
                  Result: ATS-friendly PDF
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white p-5 text-slate-900 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.35)]">
            <div className="border-b border-slate-200 pb-4">
              <p className="font-display text-2xl font-semibold tracking-tight">
                Alex Morgan
              </p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                Operations and Project Lead
              </p>
              <p className="mt-2 text-xs text-slate-500">
                alex@example.com | +1 416 555 0176 | Toronto, ON
              </p>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Summary
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  AI-powered conversion improves clarity, structure, and country fit while
                  keeping the final resume readable, professional, and export-ready.
                </p>
              </div>

              <div className="rounded-[1.3rem] bg-slate-50 px-4 py-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-950">
                  Project Lead - Northlane, Toronto (Jan 2022 - Present)
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>Led delivery planning across multiple client programs.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>Improved reporting quality with clearer operating cadences.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>Coordinated stakeholders across product, ops, and support teams.</span>
                  </li>
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    ATS signal
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Clean structure and readable experience blocks
                  </p>
                </div>
                <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Export
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Browser preview with downloadable PDF
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
