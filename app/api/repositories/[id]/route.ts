import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Check authentication
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Get repository ID from URL
    const { id } = await params;

    
   // 3. Get edited values from frontend
const {
  customDescription,
  techStack,
  liveUrl,
} = await request.json();

// Clean Live Demo URL
const cleanedLiveUrl = liveUrl?.trim() || null;

// Validate Live Demo URL
if (cleanedLiveUrl) {
  try {
    const url = new URL(cleanedLiveUrl);

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      throw new Error("Invalid protocol");
    }
  } catch {
    return NextResponse.json(
      {
        error: "Please enter a valid Live Demo URL",
      },
      { status: 400 }
    );
  }
}

// 4. Find logged-in user
const user = await prisma.user.findUnique({
  where: {
    githubId: session.user.id,
  },
});

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 5. Make sure repository belongs to this user
    const repository = await prisma.repository.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!repository) {
      return NextResponse.json(
        { error: "Repository not found" },
        { status: 404 }
      );
    }

    // 6. Update showcase details
    const updatedRepository =
      await prisma.repository.update({
        where: {
          id,
        },

        data: {
          customDescription:
            customDescription?.trim() || null,

          techStack:
            techStack?.trim() || null,

          liveUrl:
            liveUrl?.trim() || null,
        },
      });

    return NextResponse.json({
      message: "Project details updated successfully 🚀",
      repository: updatedRepository,
    });
  } catch (error) {
    console.error(
      "Error updating repository:",
      error
    );

    return NextResponse.json(
      { error: "Failed to update project details" },
      { status: 500 }
    );
  }
}