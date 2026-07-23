"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RepositoryCard from "./RepositoryCard";

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
  repos: Repository[];
};

export default function RepositoryList({ repos }: Props) {
  const router = useRouter();

  const [selectedRepos, setSelectedRepos] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Select / unselect repository
  const handleSelect = (repoId: number) => {
    if (selectedRepos.includes(repoId)) {
      setSelectedRepos((currentRepos) =>
        currentRepos.filter((id) => id !== repoId)
      );
      return;
    }

    // Maximum 5 repositories
    if (selectedRepos.length >= 5) {
      alert("You can select only 5 repositories.");
      return;
    }

    setSelectedRepos((currentRepos) => [
      ...currentRepos,
      repoId,
    ]);
  };

  // Save selected repositories
  const handleSave = async () => {
    if (selectedRepos.length === 0) {
      return;
    }

    try {
      setIsSaving(true);

      // Get complete repository objects for selected IDs
      const repositoriesToSave = repos.filter((repo) =>
        selectedRepos.includes(repo.id)
      );

      const response = await fetch("/api/repositories", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          repositories: repositoriesToSave,
        }),
      });
if (!response.ok) {
  const errorData = await response.json();

  console.error("BACKEND ERROR DETAILS:", errorData);

  throw new Error(
    errorData.details ||
    errorData.error ||
    "Failed to save selected repositories"
  );
}

      // After successful DB save → Saved Repositories page
      router.push("/dashboard/saved");
    } catch (error) {
      console.error(
        "Error saving repositories:",
        error
      );

      alert(
        "Something went wrong while saving repositories."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">
            Your GitHub Repositories
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Choose up to 5 projects for your DevProof showcase.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {/* Selection counter */}
          <p className="font-semibold text-blue-400">
            Selected {selectedRepos.length} / 5
          </p>

          {/* Save button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={
              selectedRepos.length === 0 || isSaving
            }
            className={`rounded-lg px-6 py-3 font-medium transition ${
              selectedRepos.length === 0 || isSaving
                ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSaving
              ? "Saving..."
              : "Save Selected Repositories"}
          </button>
        </div>
      </div>

      {/* Repository cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {repos.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repo={repo}
            selected={selectedRepos.includes(repo.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </>
  );
}