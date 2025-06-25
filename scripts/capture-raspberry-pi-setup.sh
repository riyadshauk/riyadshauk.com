#!/bin/bash

# Capture Raspberry Pi Setup Script
# Run this on your Raspberry Pi to capture your current configuration
# and generate a setup script for this repository

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

# Function to capture system information
capture_system_info() {
    print_status $BLUE "🔍 Capturing system information..."
    
    echo "# System Information" > captured-setup.md
    echo "Generated on: $(date)" >> captured-setup.md
    echo "" >> captured-setup.md
    
    echo "## OS Information" >> captured-setup.md
    cat /etc/os-release >> captured-setup.md
    echo "" >> captured-setup.md
    
    echo "## Hardware Information" >> captured-setup.md
    echo "CPU: $(cat /proc/cpuinfo | grep 'Model' | head -1 | cut -d: -f2 | xargs)" >> captured-setup.md
    echo "Memory: $(free -h | grep Mem | awk '{print $2}')" >> captured-setup.md
    echo "Disk: $(df -h / | tail -1 | awk '{print $2}')" >> captured-setup.md
    echo "" >> captured-setup.md
}

# Function to capture Node.js and pnpm versions
capture_nodejs_info() {
    print_status $BLUE "📦 Capturing Node.js information..."
    
    echo "## Node.js Information" >> captured-setup.md
    echo "Node.js version: $(node --version)" >> captured-setup.md
    echo "npm version: $(npm --version)" >> captured-setup.md
    echo "pnpm version: $(pnpm --version)" >> captured-setup.md
    echo "" >> captured-setup.md
    
    echo "## Global Packages" >> captured-setup.md
    npm list -g --depth=0 >> captured-setup.md
    echo "" >> captured-setup.md
}

# Function to capture PM2 configuration
capture_pm2_config() {
    print_status $BLUE "🔄 Capturing PM2 configuration..."
    
    echo "## PM2 Configuration" >> captured-setup.md
    pm2 list >> captured-setup.md
    echo "" >> captured-setup.md
    
    echo "## PM2 Startup Configuration" >> captured-setup.md
    pm2 startup >> captured-setup.md 2>&1 || echo "No startup configuration found"
    echo "" >> captured-setup.md
    
    # Capture PM2 ecosystem file if it exists
    if [[ -f ~/.pm2/ecosystem.config.js ]]; then
        echo "## PM2 Ecosystem File" >> captured-setup.md
        echo '```javascript' >> captured-setup.md
        cat ~/.pm2/ecosystem.config.js >> captured-setup.md
        echo '```' >> captured-setup.md
        echo "" >> captured-setup.md
    fi
}

# Function to capture nginx configuration
capture_nginx_config() {
    print_status $BLUE "🌐 Capturing nginx configuration..."
    
    echo "## nginx Configuration" >> captured-setup.md
    echo "### Main Configuration" >> captured-setup.md
    echo '```nginx' >> captured-setup.md
    cat /etc/nginx/nginx.conf >> captured-setup.md
    echo '```' >> captured-setup.md
    echo "" >> captured-setup.md
    
    echo "### Site Configurations" >> captured-setup.md
    for config in /etc/nginx/sites-enabled/*; do
        if [[ -f "$config" ]]; then
            echo "#### $(basename "$config")" >> captured-setup.md
            echo '```nginx' >> captured-setup.md
            cat "$config" >> captured-setup.md
            echo '```' >> captured-setup.md
            echo "" >> captured-setup.md
        fi
    done
}

# Function to capture PostgreSQL configuration
capture_postgresql_config() {
    print_status $BLUE "🗄️ Capturing PostgreSQL configuration..."
    
    echo "## PostgreSQL Configuration" >> captured-setup.md
    echo "### Version" >> captured-setup.md
    psql --version >> captured-setup.md
    echo "" >> captured-setup.md
    
    echo "### Configuration Files" >> captured-setup.md
    if [[ -f /etc/postgresql/*/main/postgresql.conf ]]; then
        echo "#### postgresql.conf" >> captured-setup.md
        echo '```conf' >> captured-setup.md
        cat /etc/postgresql/*/main/postgresql.conf >> captured-setup.md
        echo '```' >> captured-setup.md
        echo "" >> captured-setup.md
    fi
    
    if [[ -f /etc/postgresql/*/main/pg_hba.conf ]]; then
        echo "#### pg_hba.conf" >> captured-setup.md
        echo '```conf' >> captured-setup.md
        cat /etc/postgresql/*/main/pg_hba.conf >> captured-setup.md
        echo '```' >> captured-setup.md
        echo "" >> captured-setup.md
    fi
}

# Function to capture firewall configuration
capture_firewall_config() {
    print_status $BLUE "🔥 Capturing firewall configuration..."
    
    echo "## Firewall Configuration" >> captured-setup.md
    echo "### UFW Status" >> captured-setup.md
    sudo ufw status verbose >> captured-setup.md
    echo "" >> captured-setup.md
    
    echo "### iptables Rules" >> captured-setup.md
    sudo iptables -L -n -v >> captured-setup.md
    echo "" >> captured-setup.md
}

# Function to capture SSL certificates
capture_ssl_config() {
    print_status $BLUE "🔒 Capturing SSL configuration..."
    
    echo "## SSL Configuration" >> captured-setup.md
    
    # Check for Let's Encrypt certificates
    if [[ -d /etc/letsencrypt ]]; then
        echo "### Let's Encrypt Certificates" >> captured-setup.md
        sudo certbot certificates >> captured-setup.md
        echo "" >> captured-setup.md
    fi
    
    # Check for other SSL certificates
    if [[ -d /etc/ssl/certs ]]; then
        echo "### SSL Certificates Directory" >> captured-setup.md
        ls -la /etc/ssl/certs/ | grep -E "(riyadshauk|your-domain)" >> captured-setup.md || echo "No domain-specific certificates found"
        echo "" >> captured-setup.md
    fi
}

# Function to capture environment variables
capture_env_vars() {
    print_status $BLUE "🔧 Capturing environment variables..."
    
    echo "## Environment Variables" >> captured-setup.md
    echo "### System Environment" >> captured-setup.md
    env | grep -E "(NODE_ENV|DB_|GITHUB_|EMAIL_)" >> captured-setup.md || echo "No relevant environment variables found"
    echo "" >> captured-setup.md
    
    # Check for .env files
    if [[ -f ~/.env ]]; then
        echo "### ~/.env file" >> captured-setup.md
        echo '```bash' >> captured-setup.md
        cat ~/.env >> captured-setup.md
        echo '```' >> captured-setup.md
        echo "" >> captured-setup.md
    fi
}

# Function to capture cron jobs
capture_cron_jobs() {
    print_status $BLUE "⏰ Capturing cron jobs..."
    
    echo "## Cron Jobs" >> captured-setup.md
    echo "### User Cron Jobs" >> captured-setup.md
    crontab -l >> captured-setup.md 2>&1 || echo "No user cron jobs found"
    echo "" >> captured-setup.md
    
    echo "### System Cron Jobs" >> captured-setup.md
    ls -la /etc/cron.d/ >> captured-setup.md 2>&1 || echo "No system cron jobs found"
    echo "" >> captured-setup.md
}

# Function to capture application-specific information
capture_app_info() {
    print_status $BLUE "🚀 Capturing application information..."
    
    echo "## Application Information" >> captured-setup.md
    
    # Check if we're in the application directory
    if [[ -f package.json ]]; then
        echo "### Package.json" >> captured-setup.md
        echo '```json' >> captured-setup.md
        cat package.json >> captured-setup.md
        echo '```' >> captured-setup.md
        echo "" >> captured-setup.md
        
        echo "### Installed Dependencies" >> captured-setup.md
        pnpm list >> captured-setup.md
        echo "" >> captured-setup.md
    fi
    
    # Check for environment files
    for env_file in .env*; do
        if [[ -f "$env_file" ]]; then
            echo "### $env_file" >> captured-setup.md
            echo '```bash' >> captured-setup.md
            cat "$env_file" >> captured-setup.md
            echo '```' >> captured-setup.md
            echo "" >> captured-setup.md
        fi
    done
}

# Function to capture systemd services
capture_systemd_services() {
    print_status $BLUE "⚙️ Capturing systemd services..."
    
    echo "## Systemd Services" >> captured-setup.md
    echo "### Active Services" >> captured-setup.md
    systemctl list-units --type=service --state=active | grep -E "(nginx|postgresql|pm2)" >> captured-setup.md || echo "No relevant services found"
    echo "" >> captured-setup.md
    
    echo "### Enabled Services" >> captured-setup.md
    systemctl list-unit-files --type=service --state=enabled | grep -E "(nginx|postgresql)" >> captured-setup.md || echo "No relevant services found"
    echo "" >> captured-setup.md
}

# Function to generate setup script
generate_setup_script() {
    print_status $BLUE "📝 Generating setup script..."
    
    cat > captured-setup.sh << 'EOF'
#!/bin/bash

# Generated Setup Script for riyadshauk.com
# This script was generated from your current Raspberry Pi configuration
# Run this script to recreate your setup on a new system

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

print_status $BLUE "🚀 Starting setup based on captured configuration..."

# TODO: Add your specific setup commands here based on the captured configuration
# This will be populated with the actual commands from your system

print_status $GREEN "✅ Setup script generated. Please review and customize as needed."
EOF
    
    chmod +x captured-setup.sh
}

# Main function
main() {
    print_status $BLUE "🔍 Starting Raspberry Pi configuration capture..."
    
    # Create output directory
    mkdir -p captured-config
    
    # Change to output directory
    cd captured-config
    
    # Capture all configurations
    capture_system_info
    capture_nodejs_info
    capture_pm2_config
    capture_nginx_config
    capture_postgresql_config
    capture_firewall_config
    capture_ssl_config
    capture_env_vars
    capture_cron_jobs
    capture_app_info
    capture_systemd_services
    
    # Generate setup script
    generate_setup_script
    
    print_status $GREEN "✅ Configuration capture complete!"
    print_status $BLUE "📁 Files generated in: $(pwd)"
    echo "  - captured-setup.md (detailed configuration report)"
    echo "  - captured-setup.sh (generated setup script template)"
    echo ""
    print_status $YELLOW "⚠️ Please review the captured configuration and customize the setup script as needed."
}

# Handle script arguments
case "${1:-capture}" in
    "capture")
        main
        ;;
    "help"|*)
        echo "Raspberry Pi Configuration Capture Script"
        echo ""
        echo "Usage: $0 <command>"
        echo ""
        echo "Commands:"
        echo "  capture    Capture current configuration (default)"
        echo "  help       Show this help message"
        echo ""
        echo "This script will capture:"
        echo "  - System information and hardware"
        echo "  - Node.js and pnpm versions"
        echo "  - PM2 configuration and processes"
        echo "  - nginx configuration files"
        echo "  - PostgreSQL configuration"
        echo "  - Firewall settings"
        echo "  - SSL certificates"
        echo "  - Environment variables"
        echo "  - Cron jobs"
        echo "  - Application configuration"
        echo "  - Systemd services"
        ;;
esac 