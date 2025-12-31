#!/bin/bash

echo "Setting up Juniper Finance on Amazon Linux EC2..."

# Update system
sudo yum update -y

# Install Git
sudo yum install git -y

# Install Node.js and npm (Amazon Linux repo version)
sudo yum install nodejs npm -y

# Install Python 3 and pip (usually pre-installed on Amazon Linux)
sudo yum install python3 python3-pip python3-venv -y

# Install PM2 for process management
sudo npm install -g pm2

# Clone the repository
echo "Cloning repository..."
git clone https://github.com/zoemaddison050/juniperfinance.git
cd juniperfinance

# Set up backend
echo "Setting up Python backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ..

# Set up frontend
echo "Setting up React frontend..."
cd frontend
npm install
npm run build
cd ..

# Create startup scripts
echo "Creating startup scripts..."

# Backend startup script
cat > start_backend.sh << 'EOF'
#!/bin/bash
cd /home/ec2-user/juniperfinance/backend
source venv/bin/activate
python server.py
EOF

chmod +x start_backend.sh

# Frontend startup script
cat > start_frontend.sh << 'EOF'
#!/bin/bash
cd /home/ec2-user/juniperfinance/frontend
npx serve -s build -l 3000
EOF

chmod +x start_frontend.sh

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'juniper-backend',
      script: './start_backend.sh',
      interpreter: '/bin/bash',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'juniper-frontend',
      script: './start_frontend.sh',
      interpreter: '/bin/bash',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
EOF

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start both services:"
echo "pm2 start ecosystem.config.js"
echo ""
echo "📊 To monitor services:"
echo "pm2 status"
echo "pm2 logs"
echo ""
echo "🔄 To restart services:"
echo "pm2 restart all"
echo ""
echo "⚠️  Don't forget to:"
echo "1. Configure security groups for ports 3000 and 8000"
echo "2. Set up environment variables in backend/.env"
echo "3. Update REACT_APP_BACKEND_URL in frontend/.env if needed"
echo ""
echo "🌐 Your app will be available at:"
echo "Frontend: http://YOUR_EC2_IP:3000"
echo "Backend API: http://YOUR_EC2_IP:8000"