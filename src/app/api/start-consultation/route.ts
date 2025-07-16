import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { conversations, conversationParticipants, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAuthenticatedUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const auth = await getAuthenticatedUser(request);
    if (!auth) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Find the admin user
    const adminUser = await db.query.users.findFirst({
      where: eq(users.email, "riyad.shauk@gmail.com"),
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: "Admin user not found" },
        { status: 404 }
      );
    }

    // Check if a conversation already exists between this user and admin
    const existingConversations = await db.query.conversations.findMany({
      with: {
        participants: {
          with: {
            user: true,
          },
        },
      },
    });

    // Find existing conversation with admin
    const existingConversation = existingConversations.find(conv => {
      if (conv.type !== 'private') return false;
      
      const participantIds = conv.participants.map(p => p.user.id);
      return participantIds.includes(adminUser.id) && participantIds.includes(auth.user.id);
    });

    // If conversation exists, return it
    if (existingConversation) {
      return NextResponse.json(existingConversation);
    }

    // Create new conversation
    const newConversation = await db.insert(conversations).values({
      name: `Consultation with ${auth.user.name}`,
      type: "private",
    }).returning();

    const conversationId = newConversation[0].id;

    // Add both users to the conversation
    await db.insert(conversationParticipants).values([
      {
        conversationId,
        userId: auth.user.id,
        role: "client",
      },
      {
        conversationId,
        userId: adminUser.id,
        role: "consultant",
      },
    ]);

    // Return a simple conversation object
    const conversation = {
      id: conversationId,
      name: `Consultation with ${auth.user.name}`,
      type: "private",
      createdAt: newConversation[0].createdAt,
      updatedAt: newConversation[0].updatedAt,
      participants: [
        {
          conversationId,
          userId: auth.user.id,
          role: "client",
          joinedAt: new Date(),
          user: auth.user,
        },
        {
          conversationId,
          userId: adminUser.id,
          role: "consultant",
          joinedAt: new Date(),
          user: adminUser,
        },
      ],
    };

    return NextResponse.json(conversation);
  } catch (error) {
    console.error("Error starting consultation session:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 