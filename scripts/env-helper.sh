#!/bin/bash

# Environment Helper Script
# This script helps manage environment files and validate configurations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to validate environment file
validate_env_file() {
    local env_file=$1
    
    if [[ ! -f "$env_file" ]]; then
        print_status $RED "❌ Environment file $env_file does not exist"
        return 1
    fi
    
    print_status $BLUE "🔍 Validating $env_file..."
    
    # Check for required variables
    local missing_vars=()
    
    # Source the file to check variables
    set -a
    source "$env_file"
    set +a
    
    # Check required variables (DB_PASSWORD is optional)
    [[ -z "$DB_USER" ]] && missing_vars+=("DB_USER")
    [[ -z "$DB_NAME" ]] && missing_vars+=("DB_NAME")
    [[ -z "$DB_HOST" ]] && missing_vars+=("DB_HOST")
    [[ -z "$DB_PORT" ]] && missing_vars+=("DB_PORT")
    
    if [[ ${#missing_vars[@]} -gt 0 ]]; then
        print_status $RED "❌ Missing required variables in $env_file:"
        for var in "${missing_vars[@]}"; do
            echo "   - $var"
        done
        return 1
    fi
    
    print_status $GREEN "✅ $env_file is valid"
    return 0
}

# Function to show environment info
show_env_info() {
    local env_file=$1
    
    if [[ ! -f "$env_file" ]]; then
        print_status $YELLOW "⚠️  Environment file $env_file does not exist"
        return
    fi
    
    print_status $BLUE "📋 Environment information for $env_file:"
    
    # Source the file
    set -a
    source "$env_file"
    set +a
    
    echo "   Database User: $DB_USER"
    echo "   Database Name: $DB_NAME"
    echo "   Database Host: $DB_HOST"
    echo "   Database Port: $DB_PORT"
    echo "   Environment: ${NODE_ENV:-development}"
    
    # Show password status
    if [[ -n "$DB_PASSWORD" ]]; then
        echo "   Password: Set (${#DB_PASSWORD} characters)"
    else
        echo "   Password: Not set (using passwordless authentication)"
    fi
    
    # Show if DATABASE_URL is set
    if [[ -n "$DATABASE_URL" ]]; then
        echo "   DATABASE_URL: Set (direct)"
    else
        echo "   DATABASE_URL: Will be constructed from components"
    fi
}

# Function to create environment file from template
create_env_file() {
    local env_file=$1
    local template_file=$2
    
    if [[ -f "$env_file" ]]; then
        print_status $YELLOW "⚠️  Environment file $env_file already exists"
        read -p "Do you want to overwrite it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            return
        fi
    fi
    
    if [[ -f "$template_file" ]]; then
        cp "$template_file" "$env_file"
        print_status $GREEN "✅ Created $env_file from template"
    else
        print_status $RED "❌ Template file $template_file not found"
        return 1
    fi
}

# Function to test database connection
test_db_connection() {
    local env_file=$1
    
    if [[ ! -f "$env_file" ]]; then
        print_status $RED "❌ Environment file $env_file does not exist"
        return 1
    fi
    
    print_status $BLUE "🔍 Testing database connection..."
    
    # Source the file
    set -a
    source "$env_file"
    set +a
    
    # Construct DATABASE_URL if not provided
    if [[ -z "$DATABASE_URL" ]]; then
        if [[ -n "$DB_PASSWORD" ]]; then
            DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
        else
            DATABASE_URL="postgresql://$DB_USER@$DB_HOST:$DB_PORT/$DB_NAME"
        fi
    fi
    
    # Test connection
    if command -v psql &> /dev/null; then
        if psql "$DATABASE_URL" -c "SELECT 1;" &> /dev/null; then
            print_status $GREEN "✅ Database connection successful"
            return 0
        else
            print_status $RED "❌ Database connection failed"
            return 1
        fi
    else
        print_status $YELLOW "⚠️  psql not found, cannot test connection"
        return 1
    fi
}

# Main script logic
case "${1:-help}" in
    "validate")
        if [[ -n "$2" ]]; then
            validate_env_file "$2"
        else
            # Validate all environment files
            for env_file in .env .env.local .env.prod; do
                if [[ -f "$env_file" ]]; then
                    validate_env_file "$env_file"
                    echo
                fi
            done
        fi
        ;;
    "info")
        if [[ -n "$2" ]]; then
            show_env_info "$2"
        else
            # Show info for all environment files
            for env_file in .env .env.local .env.prod; do
                if [[ -f "$env_file" ]]; then
                    show_env_info "$env_file"
                    echo
                fi
            done
        fi
        ;;
    "create")
        if [[ -n "$2" ]]; then
            case "$2" in
                "local")
                    create_env_file ".env.local" "env.example"
                    ;;
                "prod")
                    create_env_file ".env.prod" "env.prod.example"
                    ;;
                *)
                    print_status $RED "❌ Unknown environment type: $2"
                    print_status $YELLOW "Available types: local, prod"
                    exit 1
                    ;;
            esac
        else
            print_status $YELLOW "Usage: $0 create <local|prod>"
            exit 1
        fi
        ;;
    "test")
        if [[ -n "$2" ]]; then
            test_db_connection "$2"
        else
            # Test connection for .env.local by default
            test_db_connection ".env.local"
        fi
        ;;
    "help"|*)
        echo "Environment Helper Script"
        echo ""
        echo "Usage: $0 <command> [options]"
        echo ""
        echo "Commands:"
        echo "  validate [file]     Validate environment file(s)"
        echo "  info [file]         Show environment information"
        echo "  create <local|prod> Create environment file from template"
        echo "  test [file]         Test database connection"
        echo "  help                Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0 validate                    # Validate all env files"
        echo "  $0 validate .env.local         # Validate specific file"
        echo "  $0 info .env.prod              # Show production env info"
        echo "  $0 create local                # Create .env.local from template"
        echo "  $0 create prod                 # Create .env.prod from template"
        echo "  $0 test .env.local             # Test database connection"
        ;;
esac 