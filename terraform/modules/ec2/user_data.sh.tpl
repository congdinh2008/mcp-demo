#!/bin/bash

# Update system
apt-get update
apt-get upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Install Nginx
apt-get install -y nginx

# Install Git
apt-get install -y git

# Create app directory
mkdir -p /var/www/${app_name}

# Clone the application
git clone https://github.com/congdinh2008/mcp-demo.git /tmp/app

# Install dependencies and build
cd /tmp/app/mcp-demo
npm install
npm run build

# Copy built files to nginx directory
cp -r dist/* /var/www/${app_name}/

# Configure Nginx
cat > /etc/nginx/sites-available/default << 'EOF'
server {
    listen ${app_port} default_server;
    listen [::]:${app_port} default_server;
    
    root /var/www/${app_name};
    index index.html;
    
    server_name _;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Restart Nginx
systemctl restart nginx