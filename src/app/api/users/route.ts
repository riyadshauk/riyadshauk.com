import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getAuthenticatedUser, isAdmin } from "@/lib/auth";

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  avatarUrl: z.string().url().optional(),
});

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (email) {
      // Only allow users to search for their own email or admins to search for any
      if (email !== auth.user.email && !isAdmin(auth.user)) {
        return NextResponse.json(
          { error: "Access denied" },
          { status: 403 }
        );
      }

      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Return user without password
      const { passwordHash, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    }

    if (id) {
      // Only allow users to get their own profile or admins to get any
      if (id !== auth.user.id && !isAdmin(auth.user)) {
        return NextResponse.json(
          { error: "Access denied" },
          { status: 403 }
        );
      }

      const user = await db.query.users.findFirst({
        where: eq(users.id, id),
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Return user without password
      const { passwordHash, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    }

    // Only admins can list all users
    if (!isAdmin(auth.user)) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const allUsers = await db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });

    // Return users without passwords
    const usersWithoutPasswords = allUsers.map(({ passwordHash, ...user }) => user);
    return NextResponse.json(usersWithoutPasswords);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Require authentication
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Only allow users to update their own profile or admins to update any
    if (id !== auth.user.id && !isAdmin(auth.user)) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = updateUserSchema.parse(body);

    const updatedUser = await db
      .update(users)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return user without password
    const { passwordHash, ...userWithoutPassword } = updatedUser[0];
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 