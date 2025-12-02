#!/bin/bash

echo "🚀 Room Radar Deployment Script"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "git init"
    echo "git add ."
    echo "git commit -m 'Initial commit'"
    echo "git remote add origin <your-github-repo-url>"
    echo "git push -u origin main"
    exit 1
fi

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend dependency installation failed"
    exit 1
fi

cd ..

# Update deployment timestamp
echo "Deploy: $(date +%s)" > .deploy

# Commit and push changes
echo "📤 Pushing to repository..."
git add .
git commit -m "Deploy: $(date)"
git push

echo ""
echo "🎉 Deployment initiated!"
echo ""
echo "Next steps:"
echo "1. Backend will auto-deploy on Render from your GitHub push"
echo "2. Frontend will auto-deploy on Netlify from your GitHub push"
echo ""
echo "Live URLs:"
echo "🌐 Frontend: https://room-radar-frontend.netlify.app"
echo "🔗 Backend:  https://room-radar-backend.onrender.com"
echo ""
echo "Monitor deployment status on your hosting platforms."