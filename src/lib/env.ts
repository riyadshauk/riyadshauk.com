import { z } from "zod";

// Environment variable schema with validation
const envSchema = z.object({
  // Database configuration
  DB_USER: z.string().min(1, "Database user is required"),
  DB_PASSWORD: z.string().optional(),
  DB_NAME: z.string().min(1, "Database name is required"),
  DB_HOST: z.string().min(1, "Database host is required"),
  DB_PORT: z.string().transform((val: string) => parseInt(val, 10)).pipe(z.number().min(1).max(65535)),
  
  // Optional: Direct DATABASE_URL (will be constructed if not provided)
  DATABASE_URL: z.string().optional(),
  
  // Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  
  // Email configuration (optional)
  EMAIL_USER: z.string().email().optional(),
  EMAIL_PASS: z.string().optional(),
});

// Function to load environment variables based on NODE_ENV
function loadEnvConfig() {
  const nodeEnv = process.env.NODE_ENV || "development";
  
  // Load environment files in order of precedence
  if (nodeEnv === "production") {
    // In production, load .env.prod first, then .env
    require("dotenv").config({ path: ".env.prod" });
    require("dotenv").config({ path: ".env" });
  } else {
    // In development, load .env.local first, then .env
    require("dotenv").config({ path: ".env.local" });
    require("dotenv").config({ path: ".env" });
  }
}

// Load environment configuration
loadEnvConfig();

// Parse and validate environment variables
function parseEnv() {
  try {
    const env = envSchema.parse(process.env);
    
    // Construct DATABASE_URL if not provided
    if (!env.DATABASE_URL) {
      const encodedUser = encodeURIComponent(env.DB_USER);
      const encodedHost = encodeURIComponent(env.DB_HOST);
      const encodedName = encodeURIComponent(env.DB_NAME);
      
      // Construct URL with or without password
      if (env.DB_PASSWORD) {
        const encodedPassword = encodeURIComponent(env.DB_PASSWORD);
        env.DATABASE_URL = `postgresql://${encodedUser}:${encodedPassword}@${encodedHost}:${env.DB_PORT}/${encodedName}`;
      } else {
        // No password - use format: postgresql://user@host:port/database
        env.DATABASE_URL = `postgresql://${encodedUser}@${encodedHost}:${env.DB_PORT}/${encodedName}`;
      }
    }
    
    return env as typeof env & { DATABASE_URL: string };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err: z.ZodIssue) => err.path.join(".")).join(", ");
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

// Export validated environment variables
export const env = parseEnv();

// Export types for TypeScript
export type Env = z.infer<typeof envSchema> & { DATABASE_URL: string }; 