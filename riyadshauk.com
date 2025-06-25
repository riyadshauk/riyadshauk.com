# Localhost server for testing
server {
    listen 80;
    server_name localhost 127.0.0.1;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy
        "default-src 'self' http: https: data: blob: 'unsafe-inline'"
        always;

    # Proxy to Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Serve static files directly
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle uploaded photos
    location /uploads/ {
        proxy_pass http://localhost:3000;
        expires 1d;
        add_header Cache-Control "public";
    }
}

# Production server for domain
server {
    listen 80;
    server_name riyadshauk.com www.riyadshauk.com;

    # SSL configuration (will be added by certbot)
    # ssl_certificate /etc/letsencrypt/live/riyadshauk.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/riyadshauk.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy
        "default-src 'self' http: https: data: blob: 'unsafe-inline'"
        always;

    # Proxy to Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Serve static files directly
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle uploaded photos
    location /uploads/ {
        proxy_pass http://localhost:3000;
        expires 1d;
        add_header Cache-Control "public";
    }
} 