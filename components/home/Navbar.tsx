import { signIn } from "@/auth";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold tracking-wide">
          Dev<span className="text-blue-500">Proof</span>
        </h1>

        <div className="flex items-center gap-8 text-sm text-zinc-300">
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>

          <form
            action={async () => {
              "use server";
              await signIn("github", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <button
              type="submit"
              className="rounded-lg bg-white px-5 py-2 font-medium text-black transition hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}