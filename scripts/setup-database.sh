#!/bin/bash

# Unified setup script for PostgreSQL database
# This script detects the OS and sets up PostgreSQL for riyadshauk.com
# Works on macOS (with Homebrew) and Linux/Raspberry Pi
# Uses Next.js environment conventions: .env.local (development), .env.production (production)

set -e

# Load environment variables from .env.local if it exists
if [[ -f .env.local ]]; then
    echo "📄 Loading configuration from .env.local..."
    export $(grep -v '^#' .env.local | xargs)
fi

# Database configuration with environment variable fallbacks
DB_USER="${DB_USER:-riyadshauk_user}"
DB_PASSWORD="${DB_PASSWORD:-riyadshauk_secure_password_2025}"
DB_NAME="${DB_NAME:-riyadshauk_tutoring}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"

echo "🚀 Setting up PostgreSQL database for riyadshauk.com..."
echo "📋 Using configuration:"
echo "   User: $DB_USER"
echo "   Database: $DB_NAME"
echo "   Host: $DB_HOST:$DB_PORT"

# Detect operating system
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Detected macOS"
    OS="macos"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 Detected Linux"
    OS="linux"
else
    echo "❌ Unsupported operating system: $OSTYPE"
    exit 1
fi

# Function to execute SQL commands
execute_sql() {
    local sql_command="$1"
    local error_message="$2"
    
    if [[ "$OS" == "macos" ]]; then
        psql postgres -c "$sql_command" 2>/dev/null || echo "$error_message"
    elif [[ "$OS" == "linux" ]]; then
        sudo -u postgres psql -c "$sql_command" 2>/dev/null || echo "$error_message"
    fi
}

# Function to setup database and user
setup_database() {
    echo "🗄️  Creating database and user..."
    
    # Create user (escape single quotes in password)
    local escaped_password=$(echo "$DB_PASSWORD" | sed "s/'/''/g")
    execute_sql "CREATE USER $DB_USER WITH PASSWORD '$escaped_password';" "User already exists"
    
    # Create database
    execute_sql "CREATE DATABASE $DB_NAME OWNER $DB_USER;" "Database already exists"
    
    # Grant privileges
    execute_sql "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" "Privileges already granted"
}

# macOS setup
if [[ "$OS" == "macos" ]]; then
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew is not installed. Please install it first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi

    # Install PostgreSQL if not already installed
    if ! command -v psql &> /dev/null; then
        echo "📦 Installing PostgreSQL..."
        brew install postgresql@15
        
        # Start PostgreSQL service
        echo "🔄 Starting PostgreSQL service..."
        brew services start postgresql@15
        
        # Wait a moment for the service to start
        sleep 3
    else
        echo "✅ PostgreSQL is already installed"
    fi

    # Setup database
    setup_database

# Linux/Raspberry Pi setup
elif [[ "$OS" == "linux" ]]; then
    # Update system
    echo "📦 Updating system packages..."
    sudo apt update && sudo apt upgrade -y

    # Install PostgreSQL
    echo "📦 Installing PostgreSQL..."
    sudo apt install postgresql postgresql-contrib -y

    # Start and enable PostgreSQL service
    echo "🔄 Starting PostgreSQL service..."
    sudo systemctl start postgresql
    sudo systemctl enable postgresql

    # Wait a moment for the service to start
    sleep 3

    # Setup database
    setup_database
fi

echo "✅ Database setup complete!"

# Update .env.local file
echo "📝 Updating .env.local file..."

# Create or update .env.local with database configuration
cat > .env.local << EOF
# Environment Configuration (Development)
# Database configuration (individual components for special character support)
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT

# Environment
NODE_ENV=development

# Email configuration (optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Note: DATABASE_URL will be automatically constructed from the individual components
# This approach supports special characters in passwords and usernames
EOF

echo "✅ Environment variables updated in .env.local"

# Generate and run migrations
echo "🔄 Generating database migrations..."
pnpm run db:generate

echo "🔄 Running database migrations..."
pnpm run db:migrate

echo "🎉 Database setup complete!"
echo ""
echo "📋 Summary:"
echo "   Database: $DB_NAME"
echo "   User: $DB_USER"
echo "   Password: $DB_PASSWORD"
echo "   Host: $DB_HOST"
echo "   Port: $DB_PORT"
echo ""

# OS-specific commands
if [[ "$OS" == "macos" ]]; then
    echo "🔧 Useful commands (macOS):"
    echo "   Start PostgreSQL: brew services start postgresql@15"
    echo "   Stop PostgreSQL: brew services stop postgresql@15"
    echo "   Connect to database: psql -U $DB_USER -d $DB_NAME"
elif [[ "$OS" == "linux" ]]; then
    echo "🔧 Useful commands (Linux/Raspberry Pi):"
    echo "   Start PostgreSQL: sudo systemctl start postgresql"
    echo "   Stop PostgreSQL: sudo systemctl stop postgresql"
    echo "   Check status: sudo systemctl status postgresql"
    echo "   Connect to database: psql -U $DB_USER -d $DB_NAME -h $DB_HOST"
fi

echo "   View database studio: pnpm run db:studio"
echo ""
echo "⚠️  Security Notes:"
echo "   - .env.local is already in .gitignore and won't be committed"
echo "   - Change the default password in production"
echo "   - Use .env.production for production environment"
echo "   - Special characters in passwords are automatically URL-encoded"

if [[ "$OS" == "linux" ]]; then
    echo "⚠️  Consider setting up a firewall and securing the database for production use!"
fi 