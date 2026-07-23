"use client";

import { useState } from "react";

type GitHubCommit = {
  sha: string;
  html_url: string;

  author: {
    login: string;
  } | null;

  commit: {
    message: string;

    author: {
      date: string | null;
    } | null;
  };
};

type Props = {
  commits: GitHubCommit[];
  username: string;
};

export default function ContributionProof({
  commits,
  username,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (commits.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 border-t border-zinc-800 pt-5">
      {/* Toggle Button */}

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-left transition hover:border-zinc-600 hover:bg-zinc-900"
      >
        <span className="font-medium text-zinc-200">
          {isOpen
            ? "Hide Contribution Proof"
            : "View Contribution Proof"}
        </span>

        <span className="text-blue-400">
          {isOpen ? "↑" : "↓"}
        </span>
      </button>

      {/* Expandable Commit Activity */}

      {isOpen && (
        <div className="mt-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-zinc-300">
              Recent GitHub Activity
            </p>

            <span className="text-xs text-green-400">
              ● Live from GitHub
            </span>
          </div>

          <div className="space-y-3">
            {commits.map((commit) => {
              const commitMessage =
                commit.commit.message.split("\n")[0];

              const commitDate =
                commit.commit.author?.date;

              const isDeveloperCommit =
                commit.author?.login?.toLowerCase() ===
                username.toLowerCase();

              return (
                <a
                  key={commit.sha}
                  href={commit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition hover:border-zinc-600"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="min-w-0 text-sm font-medium text-zinc-200">
                      {commitMessage}
                    </p>

                    {isDeveloperCommit && (
                      <span className="shrink-0 rounded-full border border-green-900 bg-green-950 px-2 py-1 text-[10px] font-medium text-green-400">
                        Your commit
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                    <span className="font-mono">
                      {commit.sha.slice(0, 7)}
                    </span>

                    {commit.author?.login && (
                      <>
                        <span>•</span>

                        <span>
                          @{commit.author.login}
                        </span>
                      </>
                    )}

                    {commitDate && (
                      <>
                        <span>•</span>

                        <span>
                          {new Date(
                            commitDate
                          ).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}