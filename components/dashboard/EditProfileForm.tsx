"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  initialBio?: string | null;
  initialSkills?: string | null;
};

export default function EditProfileForm({
  initialBio,
  initialSkills,
}: Props) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(initialBio ?? "");
  const [skills, setSkills] = useState(initialSkills ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage("");

      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio,
          skills,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to update profile.");
        return;
      }

      setMessage("Profile updated successfully 🚀");
      setIsEditing(false);

      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 font-medium text-white transition hover:border-blue-500 hover:bg-zinc-800"
        >
          Edit Developer Profile
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
    <div className="mt-6 max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-bold">
        Edit Developer Profile
      </h2>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Professional Bio
        </label>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          maxLength={500}
          placeholder="Full Stack Developer passionate about building scalable web applications..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none transition focus:border-blue-500"
        />

        <p className="mt-1 text-right text-xs text-zinc-500">
          {bio.length}/500
        </p>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Skills
        </label>

        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, Next.js, TypeScript, Node.js, PostgreSQL"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none transition focus:border-blue-500"
        />

        <p className="mt-2 text-xs text-zinc-500">
          Separate each skill with a comma.
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Profile"}
        </button>

        <button
          type="button"
          onClick={() => setIsEditing(false)}
          disabled={isSaving}
          className="rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>

      {message && (
        <p className="mt-4 text-sm text-red-400">
          {message}
        </p>
      )}
    </div>
  );
}