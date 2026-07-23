import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getRepositories } from "@/lib/github";
import RepositoryList from "@/components/dashboard/RepositoryList";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const repos = await getRepositories(session.accessToken!);

  return (
    <main className="min-h-screen bg-zinc-950 p-10 text-white">
      <h1 className="text-4xl font-bold">
        Welcome {session.user.name} 🚀
      </h1>

      <p className="mt-2 text-zinc-400">
        {session.user.email}
      </p>

      <RepositoryList repos={repos} />
    </main>
  );
}