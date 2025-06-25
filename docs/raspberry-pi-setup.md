# Raspberry Pi Setup Documentation

## Current Configuration

### System Information
- **OS**: [Your OS version]
- **Node.js**: [Version]
- **npm**: [Version]
- **pnpm**: [Version]

### PM2 Configuration
```bash
# Current PM2 processes
pm2 list

# PM2 startup command
pm2 startup

# PM2 ecosystem file (if exists)
cat ~/.pm2/ecosystem.config.js
```

### nginx Configuration
```nginx
# Main nginx config
sudo cat /etc/nginx/sites-enabled/riyadshauk.com
```

### PostgreSQL Configuration
```bash
# PostgreSQL version
psql --version

# Database setup
# [Document your database setup commands]
```

### Environment Variables
```bash
# Current environment variables
env | grep -E "(NODE_ENV|DB_|GITHUB_)"

# .env files (Next.js conventions)
cat .env.production
```

### SSL Certificates
```bash
# Let's Encrypt certificates
sudo certbot certificates

# Certificate renewal cron job
crontab -l | grep certbot
```

### Firewall Configuration
```bash
# UFW status
sudo ufw status verbose

# iptables rules
sudo iptables -L -n -v
```

### Cron Jobs
```bash
# Current cron jobs
crontab -l
```

### Application Setup
```bash
# Installation commands
pnpm install --frozen-lockfile
pnpm run build

# PM2 start command
pm2 start npm --name "riyadshauk.com-nextjs" -- start
pm2 save
```

## Setup Script

Based on the above configuration, here's the setup script:

```bash
#!/bin/bash

# Raspberry Pi Setup Script for riyadshauk.com
# Based on current configuration

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# TODO: Add your specific setup commands here
# This should be populated with the actual commands from your system

print_status $BLUE "🚀 Setting up riyadshauk.com on Raspberry Pi..."

# Example commands (replace with your actual setup):
# sudo apt update && sudo apt upgrade -y
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# nvm install --lts
# nvm use --lts
# print_status $GREEN "✅ Node.js LTS installed and configured with nvm"
# sudo npm install -g pnpm pm2
# sudo apt install nginx postgresql postgresql-contrib -y
# sudo apt install certbot python3-certbot-nginx -y

print_status $GREEN "✅ Setup complete!"
```

## Notes

- [Add any specific notes about your setup]
- [Document any custom configurations]
- [List any manual steps that can't be automated] 