type Repository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};

type Props = {
  repo: Repository;
  selected: boolean;
  onSelect: (repoId: number) => void;
};

export default function RepositoryCard({
  repo,
  selected,
  onSelect,
}: Props) {
  return (
    <div
      onClick={() => onSelect(repo.id)}
      className={`
        group relative cursor-pointer overflow-hidden rounded-2xl
        border p-7
        transition-all duration-500 ease-out
        hover:-translate-y-2
        hover:shadow-[0_25px_70px_-25px_rgba(59,130,246,0.35)]
        ${
          selected
            ? "border-blue-500/70 bg-zinc-900/90 shadow-[0_0_40px_-15px_rgba(59,130,246,0.45)]"
            : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
        }
      `}
    >
      {/* =============================== */}
      {/* Animated background glow */}
      {/* =============================== */}

      <div
        className={`
          pointer-events-none absolute -right-24 -top-24
          h-52 w-52 rounded-full blur-[90px]
          transition-all duration-700
          group-hover:-translate-x-6
          group-hover:translate-y-6
          group-hover:scale-125
          ${
            selected
              ? "bg-blue-500/20"
              : "bg-blue-500/0 group-hover:bg-blue-500/10"
          }
        `}
      />

      {/* =============================== */}
      {/* Moving top shine */}
      {/* =============================== */}

      <div
        className="
          pointer-events-none absolute left-[-60%] top-0
          h-px w-[60%]
          bg-gradient-to-r
          from-transparent via-blue-400/80 to-transparent
          transition-all duration-700
          group-hover:left-[110%]
        "
      />

      {/* =============================== */}
      {/* Subtle inner glow */}
      {/* =============================== */}

      <div
        className="
          pointer-events-none absolute inset-0
          rounded-2xl opacity-0
          ring-1 ring-inset ring-white/10
          transition-opacity duration-500
          group-hover:opacity-100
        "
      />

      {/* =============================== */}
      {/* Card content */}
      {/* =============================== */}

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-start justify-between gap-5">

          <div className="min-w-0">

            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">
              GitHub Repository
            </p>

            <h3
              className="
                truncate text-xl font-semibold tracking-tight text-white
                transition-colors duration-300
                group-hover:text-blue-100
              "
            >
              {repo.name}
            </h3>

          </div>

          {/* Custom selection indicator */}

          <button
            type="button"
            aria-label={
              selected
                ? `Deselect ${repo.name}`
                : `Select ${repo.name}`
            }
            onClick={(event) => {
              event.stopPropagation();
              onSelect(repo.id);
            }}
            className={`
              relative flex h-7 w-7 shrink-0
              items-center justify-center rounded-full border
              transition-all duration-300
              ${
                selected
                  ? "scale-110 border-blue-400 bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.45)]"
                  : "border-zinc-700 bg-zinc-950 text-transparent group-hover:border-zinc-500"
              }
            `}
          >
            <span
              className={`
                text-sm font-bold
                transition-all duration-300
                ${
                  selected
                    ? "scale-100 opacity-100"
                    : "scale-50 opacity-0"
                }
              `}
            >
              ✓
            </span>

          </button>

        </div>

        {/* Description */}

        <p className="mt-5 min-h-[52px] line-clamp-2 leading-7 text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
          {repo.description || "No description available"}
        </p>

        {/* Metadata */}

        <div className="mt-6 flex flex-wrap gap-2">

          <span
            className="
              rounded-lg border border-zinc-800
              bg-zinc-950/70 px-3 py-1.5
              text-xs text-zinc-400
              transition-all duration-300
              group-hover:border-zinc-700
            "
          >
            💻 {repo.language || "Unknown"}
          </span>

          <span
            className="
              rounded-lg border border-zinc-800
              bg-zinc-950/70 px-3 py-1.5
              text-xs text-zinc-400
              transition-all duration-300
              group-hover:border-zinc-700
            "
          >
            ⭐ {repo.stargazers_count}
          </span>

          <span
            className="
              rounded-lg border border-zinc-800
              bg-zinc-950/70 px-3 py-1.5
              text-xs text-zinc-400
              transition-all duration-300
              group-hover:border-zinc-700
            "
          >
            🍴 {repo.forks_count}
          </span>

        </div>

        {/* Footer */}

        <div className="mt-8 flex items-center justify-between border-t border-zinc-800/80 pt-5">

          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="
              flex items-center gap-2
              text-sm font-medium text-zinc-400
              transition-colors duration-300
              hover:text-white
            "
          >
            View Repository

            <span
              className="
                transition-transform duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-0.5
              "
            >
              ↗
            </span>

          </a>

          {/* Selection status */}

          <div
            className={`
              flex items-center gap-2 text-xs
              transition-all duration-300
              ${
                selected
                  ? "translate-x-0 opacity-100 text-blue-400"
                  : "translate-x-2 opacity-0"
              }
            `}
          >
            <span className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />

            </span>

            Selected
          </div>

        </div>

      </div>
    </div>
  );
}