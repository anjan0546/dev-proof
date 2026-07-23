"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  repositoryId: string;
  initialDescription?: string | null;
  initialTechStack?: string | null;
  initialLiveUrl?: string | null;
};

export default function EditProjectForm({
  repositoryId,
  initialDescription,
  initialTechStack,
  initialLiveUrl,
}: Props) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [customDescription, setCustomDescription] = useState(
    initialDescription ?? ""
  );
  const [techStack, setTechStack] = useState(initialTechStack ?? "");
  const [liveUrl, setLiveUrl] = useState(initialLiveUrl ?? "");

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage("");

      const response = await fetch(
        `/api/repositories/${repositoryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customDescription,
            techStack,
            liveUrl,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to update project.");
        return;
      }

      setMessage("Project updated successfully 🚀");
      setIsEditing(false);

      // Refresh server component data
      router.refresh();
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="mt-5">
        <button
  onClick={() => setIsEditing(true)}
  className="
    group/edit
    relative inline-flex items-center gap-2
    overflow-hidden rounded-xl
    bg-blue-600
    px-5 py-3
    font-medium text-white
    transition-all duration-300 ease-out

    hover:-translate-y-1
    hover:bg-blue-500
    hover:shadow-[0_15px_40px_-12px_rgba(59,130,246,0.6)]

    active:translate-y-0
    active:scale-[0.98]
  "
>
  <span
    className="
      pointer-events-none absolute
      left-[-70%] top-0
      h-full w-[40%]
      skew-x-[-20deg]
      bg-gradient-to-r
      from-transparent via-white/20 to-transparent
      transition-all duration-700
      group-hover/edit:left-[130%]
    "
  />

  <span className="relative z-10">
    Edit Project Details
  </span>

  <span
    className="
      relative z-10
      -translate-x-2 opacity-0
      transition-all duration-300
      group-hover/edit:translate-x-0
      group-hover/edit:opacity-100
    "
  >
    →
  </span>
</button>
        {message && (
          <p className="mt-3 text-sm text-green-400">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-4 rounded-xl border border-zinc-700 bg-zinc-950 p-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Project Description
        </label>

        <textarea
          value={customDescription}
          onChange={(e) => setCustomDescription(e.target.value)}
          placeholder="Explain what this project does..."
          rows={4}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Tech Stack
        </label>

        <input
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="Next.js, TypeScript, Prisma, PostgreSQL"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Live Demo URL
        </label>

        <input
          type="url"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="https://your-project.vercel.app"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={() => setIsEditing(false)}
          disabled={isSaving}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>

      {message && (
        <p className="text-sm text-red-400">
          {message}
        </p>
      )}
    </div>
  );
}
