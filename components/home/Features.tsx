const features = [
  {
    number: "01",
    title: "GitHub Integration",
    description:
      "Connect your GitHub account and automatically import repositories.",
    icon: "⌘",
    label: "CONNECTED",
  },
  {
    number: "02",
    title: "Verified Projects",
    description:
      "Showcase selected repositories backed by real GitHub data and contribution evidence.",
    icon: "✓",
    label: "VERIFIED",
  },
  {
    number: "03",
    title: "Recruiter Ready",
    description:
      "Share one clean developer profile instead of sending multiple project links.",
    icon: "↗",
    label: "SHAREABLE",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-t border-white/[0.06] px-6 py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-medium tracking-[0.2em] text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            BUILT FOR TRUST
          </div>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Everything recruiters need.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Turn your GitHub work into one professional profile that proves
            what you have actually built.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="
                group relative min-h-[320px] overflow-hidden
                rounded-[28px] border border-white/[0.08]
                bg-zinc-900/60 p-8
                transition-all duration-500 ease-out

                hover:-translate-y-2
                hover:border-blue-500/30
                hover:bg-zinc-900
                hover:shadow-[0_30px_80px_-30px_rgba(59,130,246,0.35)]
              "
            >
              {/* Hover glow */}
              <div
                className="
                  pointer-events-none absolute -right-24 -top-24
                  h-56 w-56 rounded-full
                  bg-blue-500/[0.08] blur-3xl
                  opacity-0 transition-opacity duration-500
                  group-hover:opacity-100
                "
              />

              {/* Moving shine */}
              <div
                className="
                  pointer-events-none absolute
                  left-[-70%] top-0 h-full w-[35%]
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent via-white/[0.04] to-transparent
                  transition-all duration-1000
                  group-hover:left-[130%]
                "
              />

              <div className="relative z-10 flex h-full flex-col">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div
                    className="
                      flex h-12 w-12 items-center justify-center
                      rounded-2xl border border-zinc-700
                      bg-zinc-950 text-xl text-blue-400
                      transition-all duration-300
                      group-hover:scale-110
                      group-hover:border-blue-500/40
                      group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
                    "
                  >
                    {feature.icon}
                  </div>

                  <span className="text-sm font-medium tracking-widest text-zinc-700 transition-colors group-hover:text-zinc-500">
                    {feature.number}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="mt-4 max-w-sm leading-7 text-zinc-400">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom status */}
                <div className="mt-auto pt-8">
                  <div className="h-px w-full bg-gradient-to-r from-zinc-700/70 to-transparent" />

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs font-medium tracking-[0.18em] text-zinc-500">
                      {feature.label}
                    </span>

                    <span
                      className="
                        translate-x-[-8px] text-xl text-blue-400
                        opacity-0 transition-all duration-300
                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-zinc-500">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            GitHub-backed data
          </span>

          <span>•</span>

          <span>Real contribution evidence</span>

          <span>•</span>

          <span>One shareable developer profile</span>
        </div>
      </div>
    </section>
  );
}