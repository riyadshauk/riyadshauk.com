import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { messages, messageReads, conversations, conversationParticipants } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { getAuthenticatedUser } from "@/lib/auth";

const createMessageSchema = z.object({
  conversationId: z.string(),
  content: z.string().min(1),
  messageType: z.enum(["text", "image", "file"]).default("text"),
  metadata: z.string().optional(),
});

const markAsReadSchema = z.object({
  messageId: z.string(),
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
    const validatedData = createMessageSchema.parse(body);

    // Verify sender is a participant in the conversation
    const participant = await db.query.conversationParticipants.findFirst({
      where: and(
        eq(conversationParticipants.conversationId, validatedData.conversationId),
        eq(conversationParticipants.userId, auth.user.id)
      ),
    });

    if (!participant) {
      return NextResponse.json(
        { error: "You are not a participant in this conversation" },
        { status: 403 }
      );
    }

    // Create message
    const newMessage = await db.insert(messages).values({
      conversationId: validatedData.conversationId,
      senderId: auth.user.id,
      content: validatedData.content,
      messageType: validatedData.messageType,
      metadata: validatedData.metadata,
    }).returning();

    // Update conversation's updatedAt timestamp
    await db.update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, validatedData.conversationId));

    // Return message with sender info
    const messageWithSender = await db.query.messages.findFirst({
      where: eq(messages.id, newMessage[0].id),
      with: {
        sender: true,
      },
    });

    return NextResponse.json(messageWithSender, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating message:", error);
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
    const conversationId = searchParams.get("conversationId");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!conversationId) {
      return NextResponse.json(
        { error: "Conversation ID is required" },
        { status: 400 }
      );
    }

    // Verify user is a participant in the conversation
    const participant = await db.query.conversationParticipants.findFirst({
      where: and(
        eq(conversationParticipants.conversationId, conversationId),
        eq(conversationParticipants.userId, auth.user.id)
      ),
    });

    if (!participant) {
      return NextResponse.json(
        { error: "You are not a participant in this conversation" },
        { status: 403 }
      );
    }

    // Get messages for the conversation
    const conversationMessages = await db.query.messages.findMany({
      where: eq(messages.conversationId, conversationId),
      with: {
        sender: true,
        reads: {
          with: {
            user: true,
          },
        },
      },
      orderBy: [desc(messages.createdAt)],
      limit,
      offset,
    });

    // Mark messages as read for the authenticated user
    const unreadMessages = conversationMessages.filter(
      message => !message.reads.some(read => read.userId === auth.user.id)
    );

    if (unreadMessages.length > 0) {
      const readData = unreadMessages.map(message => ({
        messageId: message.id,
        userId: auth.user.id,
      }));

      await db.insert(messageReads).values(readData).onConflictDoNothing();
    }

    return NextResponse.json(conversationMessages.reverse()); // Return in chronological order
  } catch (error) {
    console.error("Error fetching messages:", error);
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

    const body = await request.json();
    const validatedData = markAsReadSchema.parse(body);

    // Mark message as read
    await db.insert(messageReads).values({
      messageId: validatedData.messageId,
      userId: auth.user.id,
    }).onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error marking message as read:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 