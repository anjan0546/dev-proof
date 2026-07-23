export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-sm text-zinc-400 md:flex-row">
        <div>
          <h2 className="text-lg font-bold text-white">
            Dev<span className="text-blue-500">Proof</span>
          </h2>

          <p className="mt-2">
            Build Trust. Not Just Projects.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">
            GitHub
          </a>

          <a href="#" className="hover:text-white transition">
            LinkedIn
          </a>

          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-zinc-500">
        © 2026 DevProof. All rights reserved.
      </div>
    </footer>
  );
}