-- Migration: Add authentication system
-- Created at: 2024-01-01

-- Add authentication fields to users table
ALTER TABLE "users" ADD COLUMN "password_hash" text NOT NULL DEFAULT '';
ALTER TABLE "users" ADD COLUMN "role" text NOT NULL DEFAULT 'client';
ALTER TABLE "users" ADD COLUMN "is_verified" boolean NOT NULL DEFAULT false;
ALTER TABLE "users" ADD COLUMN "last_login" timestamp;

-- Create sessions table for authentication
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
	"token" text NOT NULL UNIQUE,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create indexes for sessions table
CREATE INDEX IF NOT EXISTS "session_token_idx" ON "sessions"("token");
CREATE INDEX IF NOT EXISTS "session_user_idx" ON "sessions"("user_id");
CREATE INDEX IF NOT EXISTS "session_expires_idx" ON "sessions"("expires_at");

-- Update default role for existing users (assuming you're the admin)
UPDATE "users" SET "role" = 'admin' WHERE "email" = 'riyad.shauk@gmail.com';

-- Add comment to clarify roles
COMMENT ON COLUMN "users"."role" IS 'User role: admin (tutor), client (student)'; 