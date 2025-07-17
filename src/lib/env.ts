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

// Type for the parsed environment
type ParsedEnv = z.infer<typeof envSchema> & { DATABASE_URL: string };

// Parse and validate environment variables
function parseEnv(): ParsedEnv {
  try {
    // Check if we're in a build context where env vars might not be available
    if (typeof process === 'undefined' || !process.env) {
      throw new Error('Environment not available during build');
    }

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
    
    return env as ParsedEnv;
  } catch (error) {
    // During build time, return a mock environment
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      console.warn('Environment variables not available during build, using mock values');
      return {
        DB_USER: 'mock_user',
        DB_PASSWORD: 'mock_password',
        DB_NAME: 'mock_db',
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DATABASE_URL: 'postgresql://mock_user:mock_password@localhost:5432/mock_db',
        NODE_ENV: 'production' as const,
        EMAIL_USER: undefined,
        EMAIL_PASS: undefined,
      } as ParsedEnv;
    }
    
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err: z.ZodIssue) => err.path.join(".")).join(", ");
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

// Lazy evaluation - only parse when actually accessed
let _env: ParsedEnv | null = null;

function getEnv(): ParsedEnv {
  if (!_env) {
    _env = parseEnv();
  }
  return _env;
}

// Export validated environment variables
export const env = new Proxy({} as ParsedEnv, {
  get(target, prop) {
    return getEnv()[prop as keyof ParsedEnv];
  }
});

// Export types for TypeScript
export type Env = ParsedEnv; 