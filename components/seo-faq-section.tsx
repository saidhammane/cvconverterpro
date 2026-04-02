type FaqItem = {
  question: string;
  answer: string;
};

interface SeoFaqSectionProps {
  title?: string;
  description?: string;
  items: readonly FaqItem[];
}

export function SeoFaqSection({
  title = "Frequently asked questions",
  description = "Helpful answers to common formatting questions for this market.",
  items
}: SeoFaqSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="max-w-3xl">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
          FAQ
        </p>
        <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
      </div>

      <div className="mt-10 space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_50px_-36px_rgba(8,17,31,0.18)]"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:hidden">
              <span className="inline-flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>{item.question}</span>
              </span>
            </summary>
            <p className="mt-4 pl-5 text-sm leading-7 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export type { FaqItem };
