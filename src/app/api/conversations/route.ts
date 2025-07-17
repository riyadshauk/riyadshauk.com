import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { conversations, conversationParticipants, users } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { getAuthenticatedUser, isAdmin } from "@/lib/auth";

const createConversationSchema = z.object({
  name: z.string().optional(),
  type: z.enum(["private", "group"]).default("private"),
  participantIds: z.array(z.string()).min(1),
});

const updateConversationSchema = z.object({
  name: z.string().optional(),
});

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

    const body = await request.json();
    const validatedData = createConversationSchema.parse(body);

    // Ensure current user is included in participants
    if (!validatedData.participantIds.includes(auth.user.id)) {
      validatedData.participantIds.push(auth.user.id);
    }

    // Verify all participants exist
    const participants = await db.query.users.findMany({
      where: inArray(users.id, validatedData.participantIds),
    });

    if (participants.length !== validatedData.participantIds.length) {
      return NextResponse.json(
        { error: "One or more participants not found" },
        { status: 404 }
      );
    }

    // For private conversations, check if one already exists
    if (validatedData.type === "private" && validatedData.participantIds.length === 2) {
      const existingConversation = await db.query.conversations.findFirst({
        where: eq(conversations.type, "private"),
        with: {
          participants: {
            where: inArray(conversationParticipants.userId, validatedData.participantIds),
          },
        },
      });

      if (existingConversation && existingConversation.participants.length === 2) {
        return NextResponse.json(existingConversation, { status: 200 });
      }
    }

    // Create conversation
    const newConversation = await db.insert(conversations).values({
      name: validatedData.name,
      type: validatedData.type,
    }).returning();

    // Add participants
    const participantData = validatedData.participantIds.map((userId) => ({
      conversationId: newConversation[0].id,
      userId,
      role: userId === auth.user.id ? "admin" : "member", // Creator is admin
    }));

    await db.insert(conversationParticipants).values(participantData);

    // Return conversation with participants
    const conversationWithParticipants = await db.query.conversations.findFirst({
      where: eq(conversations.id, newConversation[0].id),
      with: {
        participants: {
          with: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(conversationWithParticipants, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
    const id = searchParams.get("id");

    if (id) {
      const conversation = await db.query.conversations.findFirst({
        where: eq(conversations.id, id),
        with: {
          participants: {
            with: {
              user: true,
            },
          },
        },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }

      // Check if user has access to this conversation
      const hasAccess = isAdmin(auth.user) || 
        conversation.participants.some(p => p.userId === auth.user.id);

      if (!hasAccess) {
        return NextResponse.json(
          { error: "Access denied" },
          { status: 403 }
        );
      }

      return NextResponse.json(conversation);
    }

    // Get conversations for the authenticated user
    const userConversations = await db.query.conversationParticipants.findMany({
      where: eq(conversationParticipants.userId, auth.user.id),
      with: {
        conversation: {
          with: {
            participants: {
              with: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: (conversationParticipants, { desc }) => [desc(conversationParticipants.joinedAt)],
    });

    const userConversationsList = userConversations.map(uc => uc.conversation);
    return NextResponse.json(userConversationsList);
  } catch (error) {
    console.error("Error fetching conversations:", error);
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
        { error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    // Check if user has admin access to this conversation
    const conversation = await db.query.conversations.findFirst({
      where: eq(conversations.id, id),
      with: {
        participants: true,
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    const userParticipant = conversation.participants.find(p => p.userId === auth.user.id);
    if (!userParticipant || (userParticipant.role !== "admin" && !isAdmin(auth.user))) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = updateConversationSchema.parse(body);

    const updatedConversation = await db
      .update(conversations)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(conversations.id, id))
      .returning();

    return NextResponse.json(updatedConversation[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating conversation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 