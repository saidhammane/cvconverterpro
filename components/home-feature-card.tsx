interface HomeFeatureCardProps {
  badge: string;
  title: string;
  description: string;
  accent?: "mint" | "cyan" | "slate";
  tone?: "light" | "dark";
}

const accentStyles: Record<NonNullable<HomeFeatureCardProps["accent"]>, string> = {
  mint: "bg-emerald-100 text-emerald-700",
  cyan: "bg-sky-100 text-sky-700",
  slate: "bg-slate-100 text-slate-700"
};

const darkAccentStyles: Record<NonNullable<HomeFeatureCardProps["accent"]>, string> = {
  mint: "bg-emerald-300/12 text-emerald-200",
  cyan: "bg-sky-300/12 text-sky-200",
  slate: "bg-white/10 text-slate-200"
};

export function HomeFeatureCard({
  badge,
  title,
  description,
  accent = "mint",
  tone = "light"
}: HomeFeatureCardProps) {
  return (
    <article
      className={
        tone === "dark"
          ? "relative overflow-hidden rounded-[1.9rem] border border-slate-900/70 bg-[linear-gradient(145deg,#08111f,#13273a_58%,#1d3d54)] p-6 shadow-[0_26px_65px_-34px_rgba(8,17,31,0.75)]"
          : "rounded-[1.9rem] border border-slate-200 bg-white/85 p-6 shadow-[0_18px_55px_-36px_rgba(8,17,31,0.28)] backdrop-blur"
      }
    >
      {tone === "dark" ? (
        <>
          <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-emerald-400/12 blur-3xl" />
          <div className="absolute -bottom-10 left-0 h-28 w-28 rounded-full bg-sky-400/12 blur-3xl" />
        </>
      ) : null}

      <div
        className={`inline-flex h-11 min-w-11 items-center justify-center rounded-2xl px-3 text-sm font-semibold ${
          tone === "dark" ? darkAccentStyles[accent] : accentStyles[accent]
        }`}
      >
        {badge}
      </div>
      <h3
        className={`font-display mt-5 text-xl font-semibold tracking-tight ${
          tone === "dark" ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-3 text-sm leading-7 ${tone === "dark" ? "text-slate-300" : "text-slate-600"}`}>
        {description}
      </p>
    </article>
  );
}
