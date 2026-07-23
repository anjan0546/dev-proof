import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  getRepositoryCommits,
  type GitHubCommit,
} from "@/lib/github";
import ContributionProof from "@/components/profile/ContributionProof";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PublicProfilePage({
  params,
}: Props) {
  const { username } = await params;

  // =========================================
  // GET USER + FEATURED REPOSITORIES
  // =========================================

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      repositories: true,
    },
  });

  if (!user) {
    notFound();
  }

  // =========================================
  // FETCH RECENT COMMITS
  // =========================================

  const repositoriesWithCommits = await Promise.all(
    user.repositories.map(async (repo: (typeof user.repositories)[number]) => {
      try {
        const repoUrl = new URL(repo.url);

        const parts = repoUrl.pathname
          .split("/")
          .filter(Boolean);

        const owner = parts[0];

        const repoName = parts[1]?.replace(
          /\.git$/,
          ""
        );

        if (!owner || !repoName) {
          return {
            ...repo,
            commits: [] as GitHubCommit[],
          };
        }

        const commits = await getRepositoryCommits(
          owner,
          repoName
        );

        return {
          ...repo,
          commits,
        };
      } catch (error) {
        console.error(
          `Could not load commits for ${repo.name}:`,
          error
        );

        return {
          ...repo,
          commits: [] as GitHubCommit[],
        };
      }
    })
  );

  // =========================================
  // PROFILE SKILLS
  // =========================================

  const skills =
    user.skills
      ?.split(",")
      .map((skill: string) => skill.trim())
      .filter(Boolean) ?? [];

  const totalVerifiedCommits =
  repositoriesWithCommits.reduce(
    (total: number, repo) => {
      const verified =
        repo.commits.filter(
          (commit: GitHubCommit) =>
            commit.author?.login?.toLowerCase() ===
            user.username?.toLowerCase()
        ).length;

      return total + verified;
    },
    0
  );
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">

      {/* ================================= */}
      {/* BACKGROUND */}
      {/* ================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-[-350px]
          h-[750px] w-[1000px]
          -translate-x-1/2
          rounded-full
          bg-blue-600/10
          blur-[160px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-72 top-[650px]
          h-[650px] w-[650px]
          rounded-full
          bg-violet-600/10
          blur-[160px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.07]
        "
        style={{
          backgroundImage: `
            linear-gradient(to right, #52525b 1px, transparent 1px),
            linear-gradient(to bottom, #52525b 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* ================================= */}
        {/* PROFILE HERO */}
        {/* ================================= */}

        <section
          className="
            relative overflow-hidden
            rounded-[32px]
            border border-zinc-800
            bg-zinc-900/40
            p-7
            backdrop-blur-xl
            sm:p-10
            lg:p-12
          "
        >

          {/* Hero glow */}

          <div
            className="
              pointer-events-none
              absolute -right-40 -top-40
              h-[400px] w-[400px]
              rounded-full
              bg-blue-500/10
              blur-[110px]
            "
          />

          {/* Top shine */}

          <div
            className="
              pointer-events-none
              absolute left-[10%] top-0
              h-px w-[35%]
              bg-gradient-to-r
              from-transparent
              via-blue-400/70
              to-transparent
            "
          />

          <div className="relative z-10">

            {/* Top label */}

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-zinc-800
                  bg-zinc-950/60
                  px-4 py-2
                  text-xs font-medium
                  uppercase tracking-[0.16em]
                  text-blue-400
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

                DevProof Profile
              </div>

              <div
                className="
                  rounded-full
                  border border-green-900
                  bg-green-950/60
                  px-4 py-2
                  text-xs font-medium
                  text-green-400
                "
              >
                ✓ GitHub Connected
              </div>

            </div>

            {/* Identity */}

            <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-center">

              {user.avatar && (

                <div className="group/avatar relative w-fit">

                  {/* Avatar glow */}

                  <div
                    className="
                      absolute inset-0
                      rounded-full
                      bg-blue-500/20
                      blur-2xl
                      transition-all
                      duration-500
                      group-hover/avatar:scale-125
                      group-hover/avatar:bg-blue-500/30
                    "
                  />

                  <div
                    className="
                      relative rounded-full
                      bg-gradient-to-br
                      from-blue-400
                      via-violet-500
                      to-blue-700
                      p-[2px]

                      transition-transform
                      duration-500

                      group-hover/avatar:
                      scale-105
                    "
                  >

                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="
                        h-28 w-28
                        rounded-full
                        bg-zinc-950
                        object-cover
                        sm:h-32 sm:w-32
                      "
                    />

                  </div>

                  {/* Online dot */}

                  <span
                    className="
                      absolute bottom-2 right-2
                      h-5 w-5
                      rounded-full
                      border-4 border-zinc-950
                      bg-green-400
                    "
                  />

                </div>

              )}

              <div>

                <p
                  className="
                    text-xs font-medium
                    uppercase tracking-[0.18em]
                    text-zinc-500
                  "
                >
                  Verified Developer
                </p>

                <h1
                  className="
                    mt-2
                    text-4xl font-semibold
                    tracking-[-0.04em]
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  {user.name}
                </h1>

                <p className="mt-3 text-lg text-zinc-400">
                  @{user.username}
                </p>

              </div>

            </div>

            {/* Bio */}

            <div className="mt-9 max-w-4xl">

              {user.bio ? (

                <p
                  className="
                    text-lg leading-8
                    text-zinc-300
                    sm:text-xl
                    sm:leading-9
                  "
                >
                  {user.bio}
                </p>

              ) : (

                <p className="text-lg text-zinc-500">
                  Developer showcasing selected GitHub projects
                  through DevProof.
                </p>

              )}

            </div>

            {/* Skills */}

            {skills.length > 0 && (

              <div className="mt-9">

                <p
                  className="
                    mb-4
                    text-xs font-medium
                    uppercase tracking-[0.18em]
                    text-zinc-500
                  "
                >
                  Skills & Technologies
                </p>

                <div className="flex flex-wrap gap-2">

                  {skills.map((skill) => (

                    <span
                      key={skill}
                      className="
                        cursor-default
                        rounded-full
                        border border-zinc-700
                        bg-zinc-950/60
                        px-4 py-2
                        text-sm
                        text-zinc-300

                        transition-all
                        duration-300

                        hover:
                        -translate-y-1

                        hover:
                        border-blue-500/50

                        hover:
                        bg-blue-500/10

                        hover:
                        text-blue-200

                        hover:
                        shadow-[0_10px_30px_-12px_rgba(59,130,246,0.5)]
                      "
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

            )}

            {/* ================================= */}
            {/* PROFILE STATS */}
            {/* ================================= */}

            <div
              className="
                mt-10
                grid gap-3
                border-t border-zinc-800
                pt-7
                sm:grid-cols-3
              "
            >

              <div
                className="
                  rounded-2xl
                  border border-zinc-800
                  bg-zinc-950/40
                  p-4
                "
              >
                <p className="text-2xl font-semibold">
                  {repositoriesWithCommits.length}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Featured Projects
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border border-zinc-800
                  bg-zinc-950/40
                  p-4
                "
              >
                <p className="text-2xl font-semibold">
                  {skills.length}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Listed Skills
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border border-zinc-800
                  bg-zinc-950/40
                  p-4
                "
              >
                <p className="text-2xl font-semibold text-green-400">
                  {totalVerifiedCommits}
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Verified Recent Contributions
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ================================= */}
        {/* FEATURED PROJECTS */}
        {/* ================================= */}

        <section className="mt-20">

          <div
            className="
              mb-9
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
                  text-blue-400
                "
              >
                Selected Work
              </p>

              <h2
                className="
                  mt-3
                  text-3xl font-semibold
                  tracking-tight
                  sm:text-4xl
                "
              >
                Featured Projects
              </h2>

              <p className="mt-3 text-zinc-500">
                {repositoriesWithCommits.length} selected{" "}
                {repositoriesWithCommits.length === 1
                  ? "project"
                  : "projects"}{" "}
                backed by GitHub activity.
              </p>

            </div>

            <p className="text-sm text-zinc-600">
              Hover to explore
            </p>

          </div>

          {/* Empty */}

          {repositoriesWithCommits.length === 0 ? (

            <div
              className="
                rounded-3xl
                border border-dashed border-zinc-800
                bg-zinc-900/30
                p-16
                text-center
              "
            >

              <p className="text-zinc-400">
                No featured projects have been selected yet.
              </p>

            </div>

          ) : (

            <div className="grid gap-6 md:grid-cols-2">

              {repositoriesWithCommits.map((repo) => {

                const technologies =
  repo.techStack
    ?.split(",")
    .map((tech: string) => tech.trim())
    .filter(Boolean) ??
  (repo.language
    ? [repo.language]
    : []);

const developerCommits =
  repo.commits.filter(
    (commit: GitHubCommit) =>
      commit.author?.login?.toLowerCase() ===
      user.username?.toLowerCase()
  );
                const latestDeveloperCommit =
                  developerCommits.length > 0
                    ? developerCommits[0]
                    : null;

                return (

                  <article
                    key={repo.id}
                    className="
                      group/card
                      relative
                      flex flex-col
                      overflow-hidden
                      rounded-[26px]

                      border
                      border-zinc-800

                      bg-zinc-900/60
                      p-7

                      backdrop-blur-xl

                      transition-all
                      duration-500
                      ease-out

                      hover:
                      -translate-y-2

                      hover:
                      border-zinc-700

                      hover:
                      bg-zinc-900/80

                      hover:
                      shadow-[0_30px_80px_-30px_rgba(59,130,246,0.35)]
                    "
                  >

                    {/* Moving glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-32
                        -top-32
                        h-64 w-64
                        rounded-full

                        bg-blue-500/0
                        blur-[100px]

                        transition-all
                        duration-700

                        group-hover/card:
                        -translate-x-8

                        group-hover/card:
                        translate-y-8

                        group-hover/card:
                        scale-125

                        group-hover/card:
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

                        group-hover/card:
                        left-[120%]
                      "
                    />

                    <div className="relative z-10 flex h-full flex-col">

                      {/* Project header */}

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <p
                            className="
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
                              mt-3
                              text-2xl
                              font-semibold
                              tracking-tight

                              transition-colors
                              duration-300

                              group-hover/card:
                              text-blue-100
                            "
                          >
                            {repo.name}
                          </h3>

                        </div>

                        <span
                          className="
                            flex shrink-0
                            items-center gap-2
                            rounded-full
                            border border-zinc-800
                            bg-zinc-950/70
                            px-3 py-1.5
                            text-[10px]
                            text-zinc-500
                          "
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                          GitHub-linked
                        </span>

                      </div>

                      {/* Description */}

                      <p
                        className="
                          mt-5
                          leading-7
                          text-zinc-400

                          transition-colors
                          duration-300

                          group-hover/card:
                          text-zinc-300
                        "
                      >
                        {repo.customDescription ||
                          repo.description ||
                          "No project description available."}
                      </p>

                      {/* Tech */}

                      {technologies.length > 0 && (

                        <div className="mt-6 flex flex-wrap gap-2">

                          {technologies.map((tech) => (

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

                                hover:
                                -translate-y-0.5

                                hover:
                                border-blue-500/40

                                hover:
                                text-blue-200
                              "
                            >
                              {tech}
                            </span>

                          ))}

                        </div>

                      )}

                      {/* Stats */}

                      <div className="mt-6 flex gap-5 text-sm text-zinc-500">

                        <span className="transition-colors group-hover/card:text-zinc-300">
                          ⭐ {repo.stars}
                        </span>

                        <span className="transition-colors group-hover/card:text-zinc-300">
                          🍴 {repo.forks}
                        </span>

                      </div>

                      {/* ================================= */}
                      {/* CONTRIBUTION EVIDENCE */}
                      {/* ================================= */}

                      <div
                        className="
                          mt-7
                          rounded-2xl
                          border border-zinc-800
                          bg-zinc-950/70
                          p-5

                          transition-all
                          duration-300

                          group-hover/card:
                          border-zinc-700
                        "
                      >

                        {developerCommits.length > 0 ? (

                          <>

                            <div
                              className="
                                flex flex-wrap
                                items-start
                                justify-between
                                gap-4
                              "
                            >

                              <div>

                                <div className="flex items-center gap-2">

                                  <span className="relative flex h-2 w-2">

                                    <span
                                      className="
                                        absolute inline-flex
                                        h-full w-full
                                        animate-ping
                                        rounded-full
                                        bg-green-400
                                        opacity-40
                                      "
                                    />

                                    <span
                                      className="
                                        relative inline-flex
                                        h-2 w-2
                                        rounded-full
                                        bg-green-400
                                      "
                                    />

                                  </span>

                                  <p className="font-semibold text-green-400">
                                    Contribution Evidence
                                  </p>

                                </div>

                                <div className="mt-2">

                                  <p className="text-sm leading-6 text-zinc-400">
                                    {developerCommits.length} verified recent{" "}
                                    {developerCommits.length === 1
                                      ? "commit"
                                      : "commits"}{" "}
                                    found
                                  </p>

                                  <p className="mt-1 text-xs text-zinc-500">
                                    GitHub-linked contributions by @{user.username}
                                  </p>

                                </div>

                              </div>

                              <span
                                className="
                                  rounded-full
                                  border border-green-900
                                  bg-green-950/70
                                  px-3 py-1
                                  text-xs
                                  font-medium
                                  text-green-400
                                "
                              >
                                Verified
                              </span>

                            </div>

                            {latestDeveloperCommit
                              ?.commit.author
                              ?.date && (

                              <p className="mt-4 text-xs text-zinc-600">
                                Latest contribution:{" "}
                                {new Date(
                                  latestDeveloperCommit
                                    .commit.author.date
                                ).toLocaleDateString()}
                              </p>

                            )}

                          </>

                        ) : (

                          <>

                            <p className="font-medium text-zinc-300">
                              Contribution ownership not confirmed
                            </p>

                            <p className="mt-2 text-sm leading-6 text-zinc-500">
                              Recent commits could not be linked directly
                              to @{user.username}.
                            </p>

                          </>

                        )}

                      </div>

                      {/* ================================= */}
                      {/* RECENT GITHUB ACTIVITY */}
                      {/* ================================= */}

                      <ContributionProof
                        commits={repo.commits}
                        username={user.username!}
                      />

                      {/* ================================= */}
                      {/* LINKS */}
                      {/* ================================= */}

                      <div
                        className="
                          mt-auto
                          flex flex-wrap
                          gap-3
                          border-t border-zinc-800
                          pt-6
                        "
                      >

                        {/* GitHub */}

                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            group/github
                            relative
                            inline-flex
                            items-center
                            gap-2
                            overflow-hidden
                            rounded-xl

                            border
                            border-zinc-700

                            bg-zinc-950/60

                            px-5
                            py-3

                            text-sm
                            font-medium
                            text-zinc-300

                            transition-all
                            duration-300

                            hover:
                            -translate-y-1

                            hover:
                            border-zinc-500

                            hover:
                            bg-zinc-800

                            hover:
                            text-white

                            active:
                            translate-y-0

                            active:
                            scale-[0.98]
                          "
                        >

                          <span
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              -translate-x-full

                              bg-gradient-to-r
                              from-transparent
                              via-white/5
                              to-transparent

                              transition-transform
                              duration-700

                              group-hover/github:
                              translate-x-full
                            "
                          />

                          <span className="relative z-10">
                            GitHub Repository
                          </span>

                          <span
                            className="
                              relative z-10

                              transition-transform
                              duration-300

                              group-hover/github:
                              translate-x-1

                              group-hover/github:
                              -translate-y-1
                            "
                          >
                            ↗
                          </span>

                        </a>

                        {/* Live Demo */}

                        {repo.liveUrl && (

                          <a
                            href={repo.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              group/live
                              relative
                              inline-flex
                              items-center
                              gap-2
                              overflow-hidden
                              rounded-xl

                              bg-blue-600

                              px-5
                              py-3

                              text-sm
                              font-medium
                              text-white

                              transition-all
                              duration-300

                              hover:
                              -translate-y-1

                              hover:
                              scale-[1.03]

                              hover:
                              bg-blue-500

                              hover:
                              shadow-[0_15px_40px_-10px_rgba(59,130,246,0.6)]

                              active:
                              translate-y-0

                              active:
                              scale-[0.98]
                            "
                          >

                            {/* Light sweep */}

                            <span
                              className="
                                pointer-events-none
                                absolute
                                left-[-80%]
                                top-0
                                h-full
                                w-[50%]
                                skew-x-[-20deg]

                                bg-gradient-to-r
                                from-transparent
                                via-white/20
                                to-transparent

                                transition-all
                                duration-700

                                group-hover/live:
                                left-[130%]
                              "
                            />

                            <span className="relative z-10">
                              Live Demo
                            </span>

                            <span
                              className="
                                relative z-10

                                transition-transform
                                duration-300

                                group-hover/live:
                                translate-x-1

                                group-hover/live:
                                -translate-y-1
                              "
                            >
                              ↗
                            </span>

                          </a>

                        )}

                      </div>

                    </div>

                  </article>

                );
              })}

            </div>

          )}

        </section>

        {/* ================================= */}
        {/* FOOTER */}
        {/* ================================= */}

        <footer
          className="
            mt-20
            border-t
            border-zinc-800
            py-10
          "
        >

          <div
            className="
              flex flex-col
              items-center
              justify-between
              gap-4
              sm:flex-row
            "
          >

            <div>

              <p className="font-semibold text-zinc-300">
                DevProof
              </p>

              <p className="mt-1 text-sm text-zinc-600">
                Real projects. Real GitHub activity. Verifiable work.
              </p>

            </div>

            <p className="text-sm text-zinc-600">
              Developer profile powered by DevProof
            </p>

          </div>

        </footer>

      </div>

    </main>
  );
}