import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "../lib/env";

// Lazy database connection
let _sql: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

function getSql() {
  if (!_sql) {
    _sql = postgres(env.DATABASE_URL);
  }
  return _sql;
}

function getDb() {
  if (!_db) {
    _db = drizzle(getSql(), { schema });
  }
  return _db;
}

// Create a properly typed proxy that includes the schema
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(target, prop) {
    const dbInstance = getDb();
    return dbInstance[prop as keyof typeof dbInstance];
  }
}); 