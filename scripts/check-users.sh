#!/bin/bash

# Check users in database script
# This script loads environment variables and checks for existing users

set -e

echo "🔍 Checking database users for riyadshauk.com..."

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

# Set PGPASSWORD for psql to use
export PGPASSWORD="$DB_PASSWORD"

echo "🔍 Testing database connection..."
if ! psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Cannot connect to database with user $DB_USER"
    echo "   Check your database credentials in .env.local"
    echo "   Make sure the database and user exist"
    exit 1
fi

echo "✅ Database connection test passed"

echo "👥 Checking for existing users..."
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "
SELECT 
    id,
    email,
    name,
    role,
    is_verified,
    created_at
FROM users
ORDER BY created_at DESC;
"

echo "🔐 Checking sessions table..."
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "
SELECT 
    s.id,
    s.user_id,
    u.email,
    s.expires_at,
    s.created_at
FROM sessions s
JOIN users u ON s.user_id = u.id
ORDER BY s.created_at DESC
LIMIT 5;
"

# Clear the password from environment for security
unset PGPASSWORD

echo "✅ Database check completed!" 