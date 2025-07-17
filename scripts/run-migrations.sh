#!/bin/bash

# Database migration runner for riyadshauk.com
# This script loads environment variables and runs database migrations
# Uses existing database credentials from .env.local

set -e

echo "🔄 Running database migrations for riyadshauk.com..."

# Load environment variables from .env.local if it exists
if [[ -f .env.local ]]; then
    echo "📄 Loading configuration from .env.local..."
    
    # Check if file is readable
    if [[ ! -r .env.local ]]; then
        echo "❌ Cannot read .env.local file. Check permissions."
        exit 1
    fi
    
    # Load environment variables, properly handling comments and empty lines
    while IFS= read -r line; do
        # Skip empty lines and lines starting with #
        if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
            # Extract variable name and value (everything before #)
            var_part=$(echo "$line" | cut -d'#' -f1 | xargs)
            if [[ -n "$var_part" && "$var_part" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
                export "$var_part"
            else
                echo "⚠️  Skipping malformed line: $line"
            fi
        fi
    done < .env.local
    
    echo "✅ Environment variables loaded from .env.local"
else
    echo "❌ No .env.local file found. Please create one with your database credentials."
    exit 1
fi

# Database configuration with environment variable fallbacks
DB_USER="${DB_USER:-riyadshauk_user}"
DB_PASSWORD="${DB_PASSWORD:-riyadshauk_secure_password_2025}"
DB_NAME="${DB_NAME:-riyadshauk_tutoring}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

echo "📋 Using configuration:"
echo "   User: $DB_USER"
echo "   Database: $DB_NAME"
echo "   Host: $DB_HOST:$DB_PORT"

# Validate required variables
if [[ -z "$DB_USER" || -z "$DB_NAME" || -z "$DB_HOST" || -z "$DB_PORT" ]]; then
    echo "❌ Missing required database configuration variables"
    echo "   DB_USER: $DB_USER"
    echo "   DB_NAME: $DB_NAME" 
    echo "   DB_HOST: $DB_HOST"
    echo "   DB_PORT: $DB_PORT"
    exit 1
fi

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first."
    exit 1
fi

# Check if drizzle-kit is available
if ! pnpm list drizzle-kit &> /dev/null; then
    echo "❌ drizzle-kit is not installed. Please run 'pnpm install' first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Test connection with the application user
echo "🔍 Testing database connection..."
# Set PGPASSWORD for psql to use
export PGPASSWORD="$DB_PASSWORD"
if ! psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Cannot connect to database with user $DB_USER"
    echo "   Check your database credentials in .env.local"
    echo "   Make sure the database and user exist"
    exit 1
fi
# Clear the password from environment for security
unset PGPASSWORD

echo "✅ Database connection test passed"

# Generate migrations if needed
echo "🔄 Generating database migrations..."
if pnpm run db:generate; then
    echo "✅ Database migrations generated successfully"
else
    echo "ℹ️  No schema changes detected or migration generation failed"
fi

# Run migrations
echo "🔄 Running database migrations..."
if pnpm run db:migrate; then
    echo "✅ Database migrations applied successfully"
else
    echo "❌ Database migration failed"
    exit 1
fi

echo "🎉 Database migrations completed successfully!" 
