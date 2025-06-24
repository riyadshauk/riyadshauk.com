import { pgTable, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role"),
  subject: text("subject"),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  photoUrl: text("photo_url"),
});

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert; 