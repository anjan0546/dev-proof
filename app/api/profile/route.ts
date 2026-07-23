import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { bio, skills } = await request.json();

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

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        bio: bio?.trim() || null,
        skills: skills?.trim() || null,
      },
    });

    return NextResponse.json({
      message: "Developer profile updated successfully 🚀",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);

    return NextResponse.json(
      { error: "Failed to update developer profile" },
      { status: 500 }
    );
  }
}