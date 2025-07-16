#!/bin/bash

# Database migration script for riyadshauk.com
# This script loads environment variables and runs database migrations
# Uses Next.js environment conventions: .env.local (development), .env.production (production)

set -e

echo "🚀 Setting up database for riyadshauk.com..."

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
    echo "ℹ️  No .env.local file found, using default values"
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

# Database setup section
echo "🗄️  Setting up database and permissions..."

# Check if PostgreSQL is accessible
if ! psql -U postgres -c "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Cannot connect to PostgreSQL as postgres user"
    echo "   Make sure PostgreSQL is running and postgres user is accessible"
    exit 1
fi

# Create user if it doesn't exist
echo "👤 Creating database user..."
if ! psql -U postgres -c "SELECT 1 FROM pg_user WHERE usename = '$DB_USER';" | grep -q "1 row"; then
    psql -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD' CREATEDB;"
    echo "✅ Database user created"
else
    echo "ℹ️  Database user already exists"
fi

# Create database if it doesn't exist
echo "🗃️  Creating database..."
if ! psql -U postgres -c "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME';" | grep -q "1 row"; then
    psql -U postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
    echo "✅ Database created"
else
    echo "ℹ️  Database already exists"
fi

# Grant permissions
echo "🔐 Setting up permissions..."
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;"
psql -U postgres -c "GRANT CREATE ON DATABASE $DB_NAME TO $DB_USER;"

# Connect to the database and grant schema permissions
psql -U postgres -d "$DB_NAME" -c "GRANT CREATE ON SCHEMA public TO $DB_USER;"
psql -U postgres -d "$DB_NAME" -c "GRANT ALL ON SCHEMA public TO $DB_USER;"

# Grant permissions on drizzle schema
echo " Setting up drizzle schema permissions..."
psql -U postgres -d "$DB_NAME" -c "GRANT ALL ON SCHEMA drizzle TO $DB_USER;" 2>/dev/null || echo "ℹ️  Drizzle schema doesn't exist yet, will be created during migration"
psql -U postgres -d "$DB_NAME" -c "GRANT CREATE ON SCHEMA public TO $DB_USER;"
psql -U postgres -d "$DB_NAME" -c "GRANT ALL ON SCHEMA public TO $DB_USER;"

echo "✅ Database and permissions setup complete"

# Test connection with the new user
echo "🔍 Testing database connection..."
if ! psql -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Cannot connect to database with user $DB_USER"
    echo "   Check your database credentials and permissions"
    exit 1
fi

echo "✅ Database connection test passed"

# Generate and run migrations
echo "🔄 Generating database migrations..."
if pnpm run db:generate; then
    echo "✅ Database migrations generated successfully"
else
    echo "⚠️  No schema changes detected or migration generation failed"
fi

echo "🔄 Running database migrations..."
if pnpm run db:migrate; then
    echo "✅ Database migrations applied successfully"
else
    echo "❌ Database migration failed"
    exit 1
fi

echo "🎉 Database setup complete!"
echo ""
echo "📋 Summary:"
echo "   Database: $DB_NAME"
echo "   User: $DB_USER"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo ""

echo "🔧 Useful commands:"
echo "   View database studio: pnpm run db:studio"
echo "   Generate migrations: pnpm run db:generate"
echo "   Run migrations: pnpm run db:migrate"
echo ""

echo "⚠️  Notes:"
echo "   - Make sure PostgreSQL is running and accessible"
echo "   - Check your .env.local file for correct database credentials"
echo "   - Use .env.production for production environment" 