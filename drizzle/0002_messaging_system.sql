-- Migration: Add messaging system tables
-- Created at: 2024-01-01

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS "conversations" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text,
	"type" text NOT NULL DEFAULT 'private',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create conversation_participants table
CREATE TABLE IF NOT EXISTS "conversation_participants" (
	"conversation_id" text NOT NULL REFERENCES "conversations"("id") ON DELETE CASCADE,
	"user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
	"role" text DEFAULT 'member',
	"joined_at" timestamp DEFAULT now() NOT NULL,
	PRIMARY KEY("conversation_id", "user_id")
);

-- Create messages table
CREATE TABLE IF NOT EXISTS "messages" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"conversation_id" text NOT NULL REFERENCES "conversations"("id") ON DELETE CASCADE,
	"sender_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
	"content" text NOT NULL,
	"message_type" text DEFAULT 'text',
	"metadata" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create indexes for messages table
CREATE INDEX IF NOT EXISTS "conversation_idx" ON "messages"("conversation_id");
CREATE INDEX IF NOT EXISTS "sender_idx" ON "messages"("sender_id");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "messages"("created_at");

-- Create message_reads table
CREATE TABLE IF NOT EXISTS "message_reads" (
	"message_id" text NOT NULL REFERENCES "messages"("id") ON DELETE CASCADE,
	"user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
	"read_at" timestamp DEFAULT now() NOT NULL,
	PRIMARY KEY("message_id", "user_id")
); 