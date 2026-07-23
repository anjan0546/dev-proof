"use client";

import { useState } from "react";

type Props = {
  username: string;
};

export default function ShareProfileButton({ username }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const profileUrl = `${window.location.origin}/u/${username}`;

    try {
      await navigator.clipboard.writeText(profileUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("Could not copy profile link.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      {copied ? "✓ Link Copied!" : "Share Profile"}
    </button>
  );
}