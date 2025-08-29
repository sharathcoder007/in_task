#!/bin/bash

echo "🚀 Deploying Cloud IDE to Cloud Platform..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Build the frontend
echo "📦 Building frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo "✅ Frontend built successfully"

# Check if backend environment is configured
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env file not found"
    echo "Please create it with your OpenAI API key:"
    echo "OPENAI_API_KEY=your_api_key_here"
    echo "PORT=3001"
fi

echo ""
echo "🎉 Deployment preparation completed!"
echo ""
echo "Next steps:"
echo "1. Set your OpenAI API key in backend/.env"
echo "2. Choose your deployment platform:"
echo ""
echo "Option 1: Render.com (Recommended)"
echo "   - Push to GitHub"
echo "   - Connect repository to Render"
echo "   - Set environment variables"
echo "   - Deploy automatically"
echo ""
echo "Option 2: Heroku"
echo "   - heroku create your-app-name"
echo "   - git push heroku main"
echo ""
echo "Option 3: Vercel"
echo "   - vercel --prod"
echo ""
echo "The render.yaml file is already configured for Render.com deployment!"
