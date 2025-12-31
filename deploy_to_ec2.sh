#!/bin/bash

# EC2 Deployment Script
# Replace these variables with your actual values
EC2_USER="ec2-user"  # or ubuntu for Ubuntu instances
EC2_HOST="your-ec2-public-ip"
KEY_PATH="path/to/your-key.pem"
REMOTE_PATH="/home/ec2-user/juniperfinance"

echo "Deploying Juniper Finance to EC2..."

# Create remote directory
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_HOST" "mkdir -p $REMOTE_PATH"

# Copy all files except node_modules and .git
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '*.log' \
  -e "ssh -i $KEY_PATH" \
  ./ "$EC2_USER@$EC2_HOST:$REMOTE_PATH/"

echo "Files transferred. Now setting up on EC2..."

# SSH and set up the application
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_HOST" << 'EOF'
cd /home/ec2-user/juniperfinance

# Set up backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Set up frontend
cd ../frontend
npm install
npm run build

echo "Setup complete!"
echo "To start the backend: cd backend && source venv/bin/activate && python server.py"
echo "Frontend build is in frontend/build/ - serve with nginx or your preferred web server"
EOF

echo "Deployment complete!"