import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import EditProjectForm from "@/components/dashboard/EditForm";
import ShareProfileButton from "@/components/dashboard/ShareProfileButton";
import EditProfileForm from "@/components/dashboard/EditProfileForm";

type SavedRepository = {
  id: string;
  repoId: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  userId: string;

  customDescription?: string | null;
  techStack?: string | null;
  liveUrl?: string | null;
};

export default async function SavedRepositoriesPage() {
  const session = await auth();

  // User login kakapothe home page ki redirect
  if (!session?.user?.id) {
    redirect("/");
  }

  // Logged-in GitHub user ni database lo find cheyyi
  const user = await prisma.user.findUnique({
    where: {
      githubId: session.user.id,
    },

    include: {
      repositories: true,
    },
  });

  // DB lo user lekapothe dashboard ki redirect
  if (!user) {
    redirect("/dashboard");
  }

  const repositories = user.repositories;

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">

      {/* ================================= */}
      {/* BACKGROUND EFFECTS */}
      {/* ================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-[-300px]
          h-[700px] w-[900px]
          -translate-x-1/2
          rounded-full
          bg-blue-600/10
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-64 top-[500px]
          h-[600px] w-[600px]
          rounded-full
          bg-violet-600/10
          blur-[150px]
        "
      />

      {/* Grid */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #52525b 1px, transparent 1px),
            linear-gradient(to bottom, #52525b 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <section className="mb-14">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            {/* Left */}

            <div>

              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-zinc-800
                  bg-zinc-900/60
                  px-4 py-2
                  text-xs font-medium
                  uppercase tracking-[0.16em]
                  text-blue-400
                  backdrop-blur-xl
                "
              >
                <span className="relative flex h-2 w-2">

                  <span
                    className="
                      absolute inline-flex
                      h-full w-full
                      animate-ping
                      rounded-full
                      bg-blue-400
                      opacity-50
                    "
                  />

                  <span
                    className="
                      relative inline-flex
                      h-2 w-2
                      rounded-full
                      bg-blue-400
                    "
                  />

                </span>

                DevProof Showcase
              </div>

              <h1
                className="
                  mt-6
                  text-4xl font-semibold
                  tracking-[-0.04em]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Your developer
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-white
                    via-zinc-300
                    to-zinc-600
                    bg-clip-text
                    text-transparent
                  "
                >
                  showcase.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                Curate your strongest projects, add meaningful context,
                and share proof of the work you actually built.
              </p>

            </div>

            {/* Right status */}

            <div
              className="
                min-w-[280px]
                rounded-2xl
                border border-zinc-800
                bg-zinc-900/50
                p-5
                backdrop-blur-xl
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p
                    className="
                      text-xs font-medium
                      uppercase tracking-[0.15em]
                      text-zinc-500
                    "
                  >
                    Showcase status
                  </p>

                  <p className="mt-2 font-medium text-zinc-200">
                    {repositories.length} of 5 projects selected
                  </p>

                </div>

                <span
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    border border-blue-500/30
                    bg-blue-500/10
                    text-sm font-semibold
                    text-blue-400
                  "
                >
                  {repositories.length}/5
                </span>

              </div>

              {/* Progress dots */}

              <div className="mt-5 flex gap-2">

                {[1, 2, 3, 4, 5].map((item) => (

                  <div
                    key={item}
                    className={`
                      h-1.5 flex-1 rounded-full
                      transition-all duration-500
                      ${
                        item <= repositories.length
                          ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.45)]"
                          : "bg-zinc-800"
                      }
                    `}
                  />

                ))}

              </div>

            </div>

          </div>

          {/* ================================= */}
          {/* ACTION BAR */}
          {/* ================================= */}

          <div
            className="
              mt-10
              flex flex-col gap-5
              rounded-2xl
              border border-zinc-800
              bg-zinc-900/40
              p-5
              backdrop-blur-xl
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>

              <p className="font-medium text-white">
                Your profile is ready to share
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Keep your profile and project details updated for recruiters.
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">

              {user.username && (
                <ShareProfileButton username={user.username} />
              )}

            </div>

          </div>

          {/* ================================= */}
          {/* EDIT DEVELOPER PROFILE */}
          {/* ================================= */}

          <div className="mt-5">
            <EditProfileForm
              initialBio={user.bio}
              initialSkills={user.skills}
            />
          </div>

        </section>

        {/* ================================= */}
        {/* PROJECT SECTION HEADING */}
        {/* ================================= */}

        <section>

          <div
            className="
              mb-8
              flex flex-col gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs font-medium
                  uppercase tracking-[0.18em]
                  text-zinc-600
                "
              >
                Selected work
              </p>

              <h2
                className="
                  mt-2
                  text-2xl font-semibold
                  tracking-tight
                  sm:text-3xl
                "
              >
                Featured Projects
              </h2>

            </div>

            <p className="text-sm text-zinc-500">
              Hover over a project to explore
            </p>

          </div>

          {/* ================================= */}
          {/* PROJECT CARDS */}
          {/* ================================= */}

          <div className="grid gap-6 md:grid-cols-2">

            {repositories.map((repo: SavedRepository) => {

              const technologies = (
                repo.techStack ||
                repo.language ||
                ""
              )
                .split(",")
                .map((tech) => tech.trim())
                .filter(Boolean);

              return (

                <article
                  key={repo.id}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[24px]
                    border border-zinc-800
                    bg-zinc-900/60
                    p-7
                    backdrop-blur-xl

                    transition-all
                    duration-500
                    ease-out

                    hover:-translate-y-2
                    hover:border-zinc-700
                    hover:bg-zinc-900/80

                    hover:shadow-[0_30px_80px_-30px_rgba(59,130,246,0.35)]
                  "
                >

                  {/* Animated blue orb */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-28
                      -top-28
                      h-60
                      w-60
                      rounded-full
                      bg-blue-500/0
                      blur-[90px]

                      transition-all
                      duration-700

                      group-hover:
                      -translate-x-8

                      group-hover:
                      translate-y-8

                      group-hover:
                      scale-125

                      group-hover:
                      bg-blue-500/10
                    "
                  />

                  {/* Moving shine */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-[-70%]
                      top-0
                      h-px
                      w-[60%]

                      bg-gradient-to-r
                      from-transparent
                      via-blue-400/80
                      to-transparent

                      transition-all
                      duration-700

                      group-hover:left-[120%]
                    "
                  />

                  {/* Inner highlight */}

                  <div
                    className="
                      pointer-events-none
                      absolute inset-0
                      rounded-[24px]
                      opacity-0
                      ring-1
                      ring-inset
                      ring-white/10

                      transition-opacity
                      duration-500

                      group-hover:opacity-100
                    "
                  />

                  {/* ========================== */}
                  {/* CARD CONTENT */}
                  {/* ========================== */}

                  <div className="relative z-10">

                    {/* Top */}

                    <div className="flex items-start justify-between gap-5">

                      <div>

                        <p
                          className="
                            mb-2
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.18em]
                            text-zinc-600
                          "
                        >
                          Featured Project
                        </p>

                        <h3
                          className="
                            text-2xl
                            font-semibold
                            tracking-tight

                            transition-colors
                            duration-300

                            group-hover:text-blue-100
                          "
                        >
                          {repo.name}
                        </h3>

                      </div>

                      {/* Live indicator */}

                      <div
                        className="
                          flex items-center gap-2
                          rounded-full
                          border border-zinc-800
                          bg-zinc-950/60
                          px-3 py-1.5
                          text-[10px]
                          text-zinc-500
                        "
                      >

                        <span
                          className="
                            h-1.5 w-1.5
                            rounded-full
                            bg-green-400
                          "
                        />

                        GitHub-linked

                      </div>

                    </div>

                    {/* Description */}

                    <p
                      className="
                        mt-5
                        min-h-[56px]
                        leading-7
                        text-zinc-400

                        transition-colors
                        duration-300

                        group-hover:text-zinc-300
                      "
                    >
                      {repo.customDescription ||
                        repo.description ||
                        "No project description available yet."}
                    </p>

                    {/* ================================= */}
                    {/* TECH STACK */}
                    {/* ================================= */}

                    <div className="mt-6 flex flex-wrap gap-2">

                      {technologies.length > 0 ? (

                        technologies.map((tech) => (

                          <span
                            key={tech}
                            className="
                              rounded-lg
                              border border-zinc-800
                              bg-zinc-950/70
                              px-3 py-1.5

                              text-xs
                              text-zinc-400

                              transition-all
                              duration-300

                              group-hover:
                              border-zinc-700

                              group-hover:
                              text-zinc-300
                            "
                          >
                            {tech}
                          </span>

                        ))

                      ) : (

                        <span
                          className="
                            rounded-lg
                            border border-zinc-800
                            bg-zinc-950/70
                            px-3 py-1.5
                            text-xs
                            text-zinc-500
                          "
                        >
                          Unknown stack
                        </span>

                      )}

                    </div>

                    {/* ================================= */}
                    {/* REPOSITORY STATS */}
                    {/* ================================= */}

                    <div
                      className="
                        mt-6
                        flex flex-wrap
                        items-center
                        gap-5
                        text-sm
                        text-zinc-500
                      "
                    >

                      <span
                        className="
                          transition-colors
                          group-hover:text-zinc-300
                        "
                      >
                        ⭐ {repo.stars}
                      </span>

                      <span
                        className="
                          transition-colors
                          group-hover:text-zinc-300
                        "
                      >
                        🍴 {repo.forks}
                      </span>

                    </div>

                    {/* ================================= */}
                    {/* LINKS */}
                    {/* ================================= */}

                    <div
                      className="
                        mt-7
                        flex flex-wrap
                        items-center
                        gap-3
                        border-t
                        border-zinc-800/80
                        pt-6
                      "
                    >

                     <a
  href={repo.url}
  target="_blank"
  rel="noopener noreferrer"
  className="
    group/github
    relative inline-flex items-center gap-3
    overflow-hidden rounded-xl
    border border-zinc-700
    bg-zinc-950/60
    px-5 py-3
    text-sm font-medium text-zinc-300

    transition-all duration-300 ease-out

    hover:-translate-y-1
    hover:border-zinc-500
    hover:bg-zinc-800
    hover:text-white
    hover:shadow-[0_12px_30px_-12px_rgba(255,255,255,0.18)]

    active:translate-y-0
    active:scale-[0.98]
  "
>
  <span
    className="
      pointer-events-none absolute inset-0
      -translate-x-full
      bg-gradient-to-r
      from-transparent via-white/5 to-transparent
      transition-transform duration-700
      group-hover/github:translate-x-full
    "
  />

  <span className="relative z-10">
    GitHub Repository
  </span>

  <span
    className="
      relative z-10
      transition-transform duration-300
      group-hover/github:translate-x-1
      group-hover/github:-translate-y-1
    "
  >
    ↗
  </span>
</a>

                      

                       {repo.liveUrl && (
  <a
    href={repo.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="
      group/live
      relative inline-flex items-center gap-3
      overflow-hidden rounded-xl
      bg-blue-600
      px-5 py-3
      text-sm font-semibold text-white

      transition-all duration-300 ease-out

      hover:-translate-y-1
      hover:scale-[1.03]
      hover:bg-blue-500
      hover:shadow-[0_15px_40px_-10px_rgba(59,130,246,0.65)]

      active:translate-y-0
      active:scale-[0.98]
    "
  >
    {/* Moving light */}
    <span
      className="
        pointer-events-none absolute
        left-[-80%] top-0
        h-full w-[50%]
        skew-x-[-20deg]
        bg-gradient-to-r
        from-transparent via-white/20 to-transparent

        transition-all duration-700
        group-hover/live:left-[130%]
      "
    />

    {/* Glow */}
    <span
      className="
        pointer-events-none absolute inset-0
        opacity-0
        shadow-[inset_0_0_20px_rgba(255,255,255,0.15)]
        transition-opacity duration-300
        group-hover/live:opacity-100
      "
    />

    <span className="relative z-10">
      Live Demo
    </span>

    <span
      className="
        relative z-10
        transition-transform duration-300
        group-hover/live:translate-x-1
        group-hover/live:-translate-y-1
      "
    >
      ↗
    </span>
  </a>
)}

                      

                    </div>

                    {/* ================================= */}
                    {/* EDIT PROJECT */}
                    {/* ================================= */}

                    <div className="mt-5">

                      <EditProjectForm
                        repositoryId={repo.id}
                        initialDescription={repo.customDescription}
                        initialTechStack={repo.techStack}
                        initialLiveUrl={repo.liveUrl}
                      />

                    </div>

                  </div>

                </article>

              );
            })}

          </div>

          {/* Empty state */}

          {repositories.length === 0 && (

            <div
              className="
                rounded-3xl
                border border-dashed
                border-zinc-800
                bg-zinc-900/30
                px-6 py-20
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  border border-zinc-800
                  bg-zinc-900
                  text-xl
                "
              >
                ◇
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                No projects selected yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-zinc-500">
                Go back to your dashboard and select up to five projects
                that best represent your work.
              </p>

            </div>

          )}

        </section>

      </div>

    </main>
  );
}