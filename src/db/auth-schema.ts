import { pgTable, text, timestamp, integer, boolean, index, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Updated users table with authentication fields
export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(''),
  role: text("role").notNull().default('client'), // 'admin' (tutor) or 'client' (student)
  isVerified: boolean("is_verified").notNull().default(false),
  avatarUrl: text("avatar_url"),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Sessions table for authentication
export const sessions = pgTable("sessions", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  tokenIdx: index("session_token_idx").on(table.token),
  userIdx: index("session_user_idx").on(table.userId),
  expiresIdx: index("session_expires_idx").on(table.expiresAt),
}));

// Relations for sessions
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Updated users relations
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert; 