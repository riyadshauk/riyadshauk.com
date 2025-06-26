#!/bin/bash

# Deployment Script for riyadshauk.com
# This script can be run as a cron job to automatically deploy updates
# when they are pushed to the main branch and pass CI tests
# Configured for Raspberry Pi with PM2 and nginx

set -e

# Configuration
REPO_OWNER="your-github-username"
REPO_NAME="riyadshauk.com"
BRANCH="main"
DEPLOY_DIR="/home/riyad/repos/riyadshauk.com"
BACKUP_DIR="/home/riyad/backups/riyadshauk.com"
LOG_FILE="/home/riyad/logs/riyadshauk-deploy.log"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"  # Set this as environment variable
PM2_APP_NAME="riyadshauk.com-nextjs"

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
    echo "$(date): ${message}" >> "$LOG_FILE"
}

# Function to check if GitHub token is set
check_github_token() {
    if [[ -z "$GITHUB_TOKEN" ]]; then
        print_status $RED "❌ GITHUB_TOKEN environment variable is not set"
        print_status $YELLOW "Please set it with: export GITHUB_TOKEN=your_token"
        exit 1
    fi
}

# Function to get the latest commit SHA from GitHub
get_latest_commit() {
    local response
    response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/commits/$BRANCH")
    
    if [[ $? -ne 0 ]]; then
        print_status $RED "❌ Failed to fetch latest commit from GitHub"
        return 1
    fi
    
    echo "$response" | grep -o '"sha":"[^"]*"' | cut -d'"' -f4
}

# Function to check if CI tests are passing
check_ci_status() {
    local commit_sha=$1
    local response
    local status
    
    print_status $BLUE "🔍 Checking CI status for commit $commit_sha..."
    
    # Wait a bit for CI to complete
    sleep 30
    
    response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
        "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/commits/$commit_sha/status")
    
    if [[ $? -ne 0 ]]; then
        print_status $RED "❌ Failed to fetch CI status"
        return 1
    fi
    
    status=$(echo "$response" | grep -o '"state":"[^"]*"' | cut -d'"' -f4)
    
    if [[ "$status" == "success" ]]; then
        print_status $GREEN "✅ CI tests are passing"
        return 0
    elif [[ "$status" == "pending" ]]; then
        print_status $YELLOW "⏳ CI tests are still running"
        return 1
    else
        print_status $RED "❌ CI tests failed or are incomplete"
        return 1
    fi
}

# Function to backup current deployment
backup_current_deployment() {
    if [[ -d "$DEPLOY_DIR" ]]; then
        local backup_name="backup-$(date +%Y%m%d-%H%M%S)"
        local backup_path="$BACKUP_DIR/$backup_name"
        
        print_status $BLUE "📦 Creating backup of current deployment..."
        
        mkdir -p "$BACKUP_DIR"
        cp -r "$DEPLOY_DIR" "$backup_path"
        
        # Keep only last 5 backups
        cd "$BACKUP_DIR"
        ls -t | tail -n +6 | xargs -r rm -rf
        
        print_status $GREEN "✅ Backup created: $backup_path"
    fi
}

# Function to deploy the application
deploy_application() {
    local commit_sha=$1
    
    print_status $BLUE "🚀 Starting deployment..."
    
    # Navigate to deployment directory
    cd "$DEPLOY_DIR"
    
    # Check if this is a git repository
    if [[ ! -d ".git" ]]; then
        print_status $RED "❌ Not a git repository. Please clone the repository first."
        exit 1
    fi
    
    # Fetch latest changes
    print_status $BLUE "📥 Fetching latest changes..."
    git fetch origin
    
    # Check if we're on the correct branch
    local current_branch=$(git branch --show-current)
    if [[ "$current_branch" != "$BRANCH" ]]; then
        print_status $BLUE "🔄 Switching to $BRANCH branch..."
        git checkout "$BRANCH"
    fi
    
    # Reset to latest commit
    print_status $BLUE "🔄 Updating to latest commit..."
    git reset --hard "origin/$BRANCH"
    
    # Install dependencies
    print_status $BLUE "📦 Installing dependencies..."
    pnpm install --frozen-lockfile
    
    # Build the application
    print_status $BLUE "🔨 Building application..."
    pnpm run build
    
    # Run database migrations
    print_status $BLUE "🗄️ Running database migrations..."
    pnpm run db:migrate
    
    # Restart the PM2 application
    print_status $BLUE "🔄 Restarting PM2 application..."
    if pm2 list | grep -q "$PM2_APP_NAME"; then
        pm2 restart "$PM2_APP_NAME"
    else
        print_status $YELLOW "⚠️ PM2 app not found, starting new instance..."
        pm2 start npm --name "$PM2_APP_NAME" -- start
    fi
    
    # Save PM2 configuration
    pm2 save
    
    # Reload nginx configuration
    print_status $BLUE "🔄 Reloading nginx configuration..."
    sudo nginx -t && sudo systemctl reload nginx
    
    print_status $GREEN "✅ Deployment completed successfully!"
}

# Function to check if deployment is needed
check_deployment_needed() {
    local latest_commit=$1
    local current_commit_file="$DEPLOY_DIR/.current-commit"
    
    if [[ ! -f "$current_commit_file" ]]; then
        print_status $YELLOW "⚠️ No previous deployment found, deploying..."
        return 0
    fi
    
    local current_commit=$(cat "$current_commit_file")
    
    if [[ "$current_commit" == "$latest_commit" ]]; then
        print_status $BLUE "ℹ️ No new commits to deploy"
        return 1
    else
        print_status $YELLOW "🔄 New commit detected: $latest_commit"
        return 0
    fi
}

# Function to update current commit file
update_commit_file() {
    local commit_sha=$1
    echo "$commit_sha" > "$DEPLOY_DIR/.current-commit"
}

# Function to check system health
check_system_health() {
    print_status $BLUE "🔍 Checking system health..."
    
    # Check PM2 status
    if pm2 list | grep -q "$PM2_APP_NAME"; then
        local pm2_status=$(pm2 jlist | jq -r ".[] | select(.name == \"$PM2_APP_NAME\") | .pm2_env.status")
        if [[ "$pm2_status" == "online" ]]; then
            print_status $GREEN "✅ PM2 app is running"
        else
            print_status $RED "❌ PM2 app is not running properly"
            return 1
        fi
    else
        print_status $RED "❌ PM2 app not found"
        return 1
    fi
    
    # Check nginx status
    if sudo systemctl is-active --quiet nginx; then
        print_status $GREEN "✅ nginx is running"
    else
        print_status $RED "❌ nginx is not running"
        return 1
    fi
    
    # Check disk space
    local disk_usage=$(df "$DEPLOY_DIR" | tail -1 | awk '{print $5}' | sed 's/%//')
    if [[ $disk_usage -gt 90 ]]; then
        print_status $RED "❌ Low disk space: ${disk_usage}%"
        return 1
    else
        print_status $GREEN "✅ Disk space OK: ${disk_usage}%"
    fi
    
    # Check memory usage
    local mem_usage=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
    if [[ $mem_usage -gt 90 ]]; then
        print_status $YELLOW "⚠️ High memory usage: ${mem_usage}%"
    else
        print_status $GREEN "✅ Memory usage OK: ${mem_usage}%"
    fi
}

# Function to send notification
send_notification() {
    local message=$1
    local status=$2
    
    # You can customize this to send notifications via email, Slack, etc.
    print_status $BLUE "📧 Sending notification: $message"
    
    # Example: Send email notification
    # echo "$message" | mail -s "Deployment $status" your-email@example.com
    
    # Example: Send Slack notification
    # curl -X POST -H 'Content-type: application/json' \
    #     --data "{\"text\":\"$message\"}" \
    #     https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
}

# Main deployment logic
main() {
    print_status $BLUE "🚀 Starting deployment check for $REPO_OWNER/$REPO_NAME"
    
    # Create log directory if it doesn't exist
    mkdir -p "$(dirname "$LOG_FILE")"
    
    # Check if GitHub token is available
    check_github_token
    
    # Get the latest commit
    local latest_commit
    latest_commit=$(get_latest_commit)
    
    if [[ $? -ne 0 ]]; then
        print_status $RED "❌ Failed to get latest commit"
        exit 1
    fi
    
    print_status $BLUE "📋 Latest commit: $latest_commit"
    
    # Check if deployment is needed
    if ! check_deployment_needed "$latest_commit"; then
        print_status $GREEN "✅ No deployment needed"
        exit 0
    fi
    
    # Check CI status
    if ! check_ci_status "$latest_commit"; then
        print_status $RED "❌ CI tests are not passing, skipping deployment"
        send_notification "Deployment skipped: CI tests failed for commit $latest_commit" "FAILED"
        exit 1
    fi
    
    # Backup current deployment
    backup_current_deployment
    
    # Deploy the application
    if deploy_application "$latest_commit"; then
        update_commit_file "$latest_commit"
        
        # Check system health after deployment
        if check_system_health; then
            send_notification "Deployment successful: $latest_commit" "SUCCESS"
            print_status $GREEN "🎉 Deployment completed successfully!"
        else
            send_notification "Deployment completed but system health check failed: $latest_commit" "WARNING"
            print_status $YELLOW "⚠️ Deployment completed but system health check failed"
        fi
    else
        print_status $RED "❌ Deployment failed"
        send_notification "Deployment failed for commit $latest_commit" "FAILED"
        exit 1
    fi
}

# Handle script arguments
case "${1:-deploy}" in
    "deploy")
        main
        ;;
    "check")
        # Just check for updates without deploying
        check_github_token
        latest_commit=$(get_latest_commit)
        if check_deployment_needed "$latest_commit"; then
            print_status $YELLOW "🔄 Updates available: $latest_commit"
            exit 0
        else
            print_status $GREEN "✅ No updates available"
            exit 1
        fi
        ;;
    "status")
        # Show deployment status
        if [[ -f "$DEPLOY_DIR/.current-commit" ]]; then
            current_commit=$(cat "$DEPLOY_DIR/.current-commit")
            print_status $BLUE "📋 Current deployment: $current_commit"
        else
            print_status $YELLOW "⚠️ No deployment found"
        fi
        
        # Show system health
        check_system_health
        ;;
    "health")
        # Check system health only
        check_system_health
        ;;
    "restart")
        # Restart the application
        print_status $BLUE "🔄 Restarting application..."
        cd "$DEPLOY_DIR"
        pm2 restart "$PM2_APP_NAME"
        sudo systemctl reload nginx
        print_status $GREEN "✅ Application restarted"
        ;;
    "help"|*)
        echo "Deployment Script for riyadshauk.com (Raspberry Pi)"
        echo ""
        echo "Usage: $0 <command>"
        echo ""
        echo "Commands:"
        echo "  deploy    Check for updates and deploy if needed (default)"
        echo "  check     Check for updates without deploying"
        echo "  status    Show current deployment status and system health"
        echo "  health    Check system health only"
        echo "  restart   Restart the application (PM2 + nginx)"
        echo "  help      Show this help message"
        echo ""
        echo "Environment Variables:"
        echo "  GITHUB_TOKEN    GitHub personal access token (required)"
        echo ""
        echo "Cron Job Example:"
        echo "  */15 * * * * /home/riyad/repos/riyadshauk.com/scripts/deploy.sh deploy"
        echo ""
        echo "Setup Instructions:"
        echo "  1. Set GITHUB_TOKEN: export GITHUB_TOKEN=your_token"
        echo "  2. Update REPO_OWNER in this script"
        echo "  3. Ensure PM2 app is configured: pm2 start npm --name riyadshauk -- start"
        echo "  4. Add to crontab: crontab -e"
        ;;
esac 