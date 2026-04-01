interface HomeSectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
}

export function HomeSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default"
}: HomeSectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p
        className={`font-display text-sm font-semibold uppercase tracking-[0.22em] ${
          tone === "inverse" ? "text-cyan-200/85" : "text-emerald-700"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display mt-4 text-3xl font-semibold tracking-tight sm:text-4xl ${
          tone === "inverse" ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 text-base leading-8 ${
          tone === "inverse" ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
