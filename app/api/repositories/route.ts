import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Check authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Read selected repositories
    const body = await request.json();
    const repositories = body.repositories;

    if (!Array.isArray(repositories)) {
      return NextResponse.json(
        { error: "Repositories must be an array" },
        { status: 400 }
      );
    }

    if (repositories.length > 5) {
      return NextResponse.json(
        { error: "You can select only up to 5 repositories" },
        { status: 400 }
      );
    }

    const githubId = session.user.id;
    const email = session.user.email;

    if (!email) {
      return NextResponse.json(
        { error: "GitHub account email is required" },
        { status: 400 }
      );
    }

    console.log("USERNAME:", session.user.username);
    console.log(
      "REPOSITORIES RECEIVED:",
      repositories.length
    );

    // 3. Find existing user
    // First try GitHub ID
    let user = await prisma.user.findUnique({
      where: {
        githubId,
      },
    });

    // If GitHub ID doesn't match, try email
    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
    }

    // 4. Update existing user or create new user
    if (user) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          githubId,

          username:
            session.user.username ??
            user.username,

          name:
            session.user.name ??
            user.name,

          avatar:
            session.user.image ??
            user.avatar,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          githubId,

          username: session.user.username ?? session.user.name ?? githubId,

          name:
            session.user.name ??
            "GitHub User",

          email,

          avatar:
            session.user.image ?? null,
        },
      });
    }

    console.log(
      "USER RESOLVED:",
      user.id
    );

    // 5. Get selected GitHub repository IDs
    const selectedRepoIds = repositories.map(
      (repo) => repo.id
    );

    /*
      6. Delete ONLY repositories that
      are no longer selected.

      IMPORTANT:
      We DO NOT delete repositories that
      are still selected.

      This preserves:
      - customDescription
      - techStack
      - liveUrl
    */

    await prisma.repository.deleteMany({
      where: {
        userId: user.id,

        repoId: {
          notIn: selectedRepoIds,
        },
      },
    });

    console.log(
      "UNSELECTED REPOSITORIES REMOVED"
    );

    /*
      7. Update existing repositories
      OR create new repositories.

      Existing custom fields are NOT touched.
    */

    for (const repo of repositories) {
      const existingRepository =
        await prisma.repository.findFirst({
          where: {
            userId: user.id,
            repoId: repo.id,
          },
        });

      if (existingRepository) {
        // Update only GitHub-controlled data.
        // Do NOT update customDescription,
        // techStack or liveUrl.
        await prisma.repository.update({
          where: {
            id: existingRepository.id,
          },

          data: {
            name: repo.name,

            description:
              repo.description ?? null,

            language:
              repo.language ?? null,

            stars:
              repo.stargazers_count ?? 0,

            forks:
              repo.forks_count ?? 0,

            url:
              repo.html_url,
          },
        });

        console.log(
          "UPDATED EXISTING REPO:",
          repo.name
        );
      } else {
        // New selected repository
        await prisma.repository.create({
          data: {
            repoId: repo.id,

            name: repo.name,

            description:
              repo.description ?? null,

            language:
              repo.language ?? null,

            stars:
              repo.stargazers_count ?? 0,

            forks:
              repo.forks_count ?? 0,

            url:
              repo.html_url,

            userId:
              user.id,
          },
        });

        console.log(
          "CREATED NEW REPO:",
          repo.name
        );
      }
    }

    console.log(
      "REPOSITORIES SAVED SUCCESSFULLY"
    );

    return NextResponse.json(
      {
        message:
          "Repositories Saved Successfully 🚀",

        count:
          repositories.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "🔥 SAVE REPOSITORIES ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to save repositories",

        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}