#!/bin/bash

# Production startup script for riyadshauk.com
# This script loads environment variables from .env.production and starts PM2

set -e

echo "🚀 Starting riyadshauk.com in production mode..."

# Check if .env.production exists
if [[ ! -f .env.production ]]; then
    echo "❌ .env.production file not found!"
    echo "Please create .env.production with your production environment variables."
    exit 1
fi

# Load environment variables from .env.production
echo "📄 Loading environment variables from .env.production..."

# Function to load env file and export variables
load_env_file() {
    local env_file="$1"
    if [[ -f "$env_file" ]]; then
        while IFS= read -r line; do
            # Skip empty lines and lines starting with #
            if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
                # Extract variable name and value (everything before #)
                var_part=$(echo "$line" | cut -d'#' -f1 | xargs)
                if [[ -n "$var_part" && "$var_part" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
                    export "$var_part"
                fi
            fi
        done < "$env_file"
        echo "✅ Environment variables loaded from $env_file"
    else
        echo "⚠️  $env_file not found"
    fi
}

# Load the production environment file
load_env_file ".env.production"

# Validate required environment variables
required_vars=("DB_USER" "DB_PASSWORD" "DB_NAME" "DB_HOST" "DB_PORT" "NODE_ENV")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [[ -z "${!var}" ]]; then
        missing_vars+=("$var")
    fi
done

if [[ ${#missing_vars[@]} -gt 0 ]]; then
    echo "❌ Missing required environment variables:"
    printf '   %s\n' "${missing_vars[@]}"
    echo "Please check your .env.production file."
    exit 1
fi

echo "📋 Environment configuration:"
echo "   NODE_ENV: $NODE_ENV"
echo "   DB_USER: $DB_USER"
echo "   DB_NAME: $DB_NAME"
echo "   DB_HOST: $DB_HOST:$DB_PORT"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 is not installed. Please install it first:"
    echo "   npm install -g pm2"
    exit 1
fi

# Stop existing PM2 process if running
echo "🛑 Stopping existing PM2 processes..."
pm2 stop riyadshauk.com-nextjs 2>/dev/null || true
pm2 delete riyadshauk.com-nextjs 2>/dev/null || true

# Start PM2 with environment variables
echo "🚀 Starting PM2 with production environment..."
pm2 start ecosystem.config.js

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

echo "✅ Production startup complete!"
echo ""
echo "📋 PM2 Status:"
pm2 status
echo ""
echo "📋 Useful commands:"
echo "   View logs: pm2 logs riyadshauk.com-nextjs"
echo "   Monitor: pm2 monit"
echo "   Restart: pm2 restart riyadshauk.com-nextjs"
echo "   Stop: pm2 stop riyadshauk.com-nextjs" 