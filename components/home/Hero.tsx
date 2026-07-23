import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden px-6 pb-24 pt-32 lg:px-8">

      {/* Background glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-72 -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px]"
      />

      {/* Grid background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #52525b 1px, transparent 1px),
            linear-gradient(to bottom, #52525b 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto grid min-h-[75vh] max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

        {/* ========================= */}
        {/* LEFT CONTENT */}
        {/* ========================= */}

        <div className="text-center lg:text-left">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">

            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>

            GitHub-powered developer proof

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl lg:leading-[1.05]">

            Prove what

            <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              you actually build.
            </span>

          </h1>

          {/* Description */}

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400 lg:mx-0">

            Turn your real GitHub activity into a recruiter-ready
            developer profile backed by projects, commits, and
            contribution evidence.

          </p>

          {/* CTA Buttons */}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">

            {/* Get Started */}

            <Link
              href="/dashboard"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-black transition duration-300 hover:scale-[1.03] hover:bg-zinc-200 sm:w-auto"
            >
              Get Started

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* View Demo */}

            <Link
              href="/u/anjan0546"
              className="group flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/50 px-6 py-3.5 font-medium text-zinc-200 backdrop-blur-xl transition duration-300 hover:border-zinc-500 hover:bg-zinc-900 sm:w-auto"
            >
              <span className="text-xs">
                ▶
              </span>

              View Demo
            </Link>

          </div>

          {/* Small trust message */}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-zinc-500 lg:justify-start">

            <span>
              ✓ GitHub connected
            </span>

            <span>
              ✓ Contribution evidence
            </span>

            <span>
              ✓ Shareable profile
            </span>

          </div>

        </div>

        {/* ========================= */}
        {/* RIGHT PRODUCT PREVIEW */}
        {/* ========================= */}

        <div className="relative mx-auto w-full max-w-xl">

          {/* Glow behind card */}

          <div className="absolute inset-10 -z-10 rounded-full bg-blue-500/20 blur-[100px]" />

          {/* Floating badge */}

          <div className="absolute -left-5 top-16 z-20 hidden rotate-[-5deg] rounded-xl border border-zinc-700 bg-zinc-900/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">

            <p className="text-xs text-zinc-500">
              Developer identity
            </p>

            <p className="mt-1 text-sm font-medium text-green-400">
              ✓ GitHub Connected
            </p>

          </div>

          {/* Main preview card */}

          <div className="relative overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-3 shadow-2xl backdrop-blur-2xl">

            {/* Window header */}

            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">

              <div className="flex gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />

                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />

                <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />

              </div>

              <span className="text-xs text-zinc-500">
                devproof/profile
              </span>

            </div>

            {/* Profile preview */}

            <div className="p-6 sm:p-8">

              <div className="flex items-center gap-4">

                {/* Fake avatar */}

                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-br from-zinc-700 to-zinc-900 text-lg font-bold">
                  DP
                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <p className="font-semibold text-white">
                      Developer Profile
                    </p>

                    <span className="rounded-full border border-green-900 bg-green-950/60 px-2 py-1 text-[10px] font-medium text-green-400">
                      ✓ GitHub Connected
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-zinc-500">
                    @developer
                  </p>

                </div>

              </div>

              {/* Project */}

              <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-lg font-semibold">
                      Featured Project
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      Real project activity backed by
                      GitHub contribution data.
                    </p>

                  </div>

                  <span className="shrink-0 rounded-md border border-zinc-800 px-2 py-1 text-xs text-zinc-500">
                    Public
                  </span>

                </div>

                {/* Tech */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {[
                    "Next.js",
                    "TypeScript",
                    "PostgreSQL",
                  ].map((tech) => (

                    <span
                      key={tech}
                      className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400"
                    >
                      {tech}
                    </span>

                  ))}

                </div>

                {/* Contribution proof */}

                <div className="mt-6 rounded-xl border border-green-950 bg-green-950/20 p-4">

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <div>

                      <p className="text-sm font-medium text-green-400">
                        ✓ Contribution Evidence
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        GitHub-linked developer activity
                      </p>

                    </div>

                    <span className="rounded-full border border-green-900 px-2.5 py-1 text-[10px] text-green-400">
                      GitHub-linked
                    </span>

                  </div>

                </div>

                {/* Commit preview */}

                <div className="mt-4 space-y-2">

                  <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-3">

                    <div>

                      <p className="text-xs text-zinc-300">
                        Improve dashboard experience
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-zinc-600">
                        a81fd32 • recent
                      </p>

                    </div>

                    <span className="h-2 w-2 rounded-full bg-green-400" />

                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-3">

                    <div>

                      <p className="text-xs text-zinc-300">
                        Add contribution proof
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-zinc-600">
                        b42ac81 • recent
                      </p>

                    </div>

                    <span className="h-2 w-2 rounded-full bg-green-400" />

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Floating proof card */}

          <div className="absolute -bottom-8 -right-4 hidden rotate-[4deg] rounded-2xl border border-zinc-700 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur-xl sm:block">

            <p className="text-xs text-zinc-500">
              Contribution proof
            </p>

            <div className="mt-2 flex items-center gap-2">

              <span className="h-2 w-2 rounded-full bg-green-400" />

              <span className="text-sm font-medium text-zinc-200">
                Live from GitHub
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom statement */}

      <div className="mx-auto mt-20 max-w-7xl border-t border-zinc-900 pt-8">

        <p className="text-center text-xs uppercase tracking-[0.25em] text-zinc-600">
          Your work already tells a story — make recruiters see it
        </p>

      </div>

    </section>
  );
}