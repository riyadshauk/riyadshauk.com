import { db } from "@/db";
import { users, sessions } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Type definitions
export interface User {
  id: string;
  email: string;
  name: string;
  role: string; // Database returns string, not union type
  isVerified: boolean;
  avatarUrl?: string | null;
  lastLogin?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResult {
  user: User;
  session: { id: string; token: string; userId: string; expiresAt: string | Date; createdAt: string | Date };
}

// Password hashing utilities
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  const [salt, hash] = hashedPassword.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

// Session management
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createSession(userId: string): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
  });

  return token;
}

export async function validateSession(token: string): Promise<AuthResult | null> {
  const session = await db.query.sessions.findFirst({
    where: and(
      eq(sessions.token, token),
      gt(sessions.expiresAt, new Date())
    ),
    with: {
      user: {
        columns: {
          id: true,
          email: true,
          name: true,
          role: true,
          isVerified: true,
          avatarUrl: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  return { user: session.user, session };
}

export async function deleteSession(token: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.token, token));
}

export async function cleanupExpiredSessions(): Promise<void> {
  await db.delete(sessions).where(
    gt(sessions.expiresAt, new Date())
  );
}

// Authentication middleware
export async function getAuthenticatedUser(request: NextRequest): Promise<AuthResult | null> {
  const token = request.cookies.get('session')?.value;

  if (!token) {
    return null;
  }

  return await validateSession(token);
}

// User registration
export async function registerUser(email: string, name: string, password: string, role: 'admin' | 'client' = 'client') {
  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const passwordHash = hashPassword(password);

  // Create user
  const newUser = await db.insert(users).values({
    email,
    name,
    passwordHash,
    role,
  }).returning();

  return newUser[0];
}

// User login
export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
  // Find user
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  if (!verifyPassword(password, user.passwordHash)) {
    throw new Error('Invalid credentials');
  }

  // Update last login
  await db.update(users)
    .set({ lastLogin: new Date() })
    .where(eq(users.id, user.id));

  // Create session
  const token = await createSession(user.id);

  return { user, token };
}

// Logout user
export async function logoutUser(token: string): Promise<void> {
  await deleteSession(token);
}

// Cookie utilities for API routes
export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.delete('session');
}

// Authorization helpers
export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}

export function isClient(user: User): boolean {
  return user.role === 'client';
}

export function canAccessConversation(user: User, conversation: unknown): boolean {
  if (isAdmin(user)) {
    return true; // Admin (tutor) can access all conversations
  }
  
  // Client can only access conversations they're a participant in
  const conv = conversation as { participants?: { userId: string }[] };
  const usr = user as { id?: string };
  return conv.participants?.some((p) => p.userId === usr.id) ?? false;
} 