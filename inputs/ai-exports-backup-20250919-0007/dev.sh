#!/bin/bash

# Plink Mobile App Development Script
# This script sets up the development environment

set -e

echo "🛠️  Starting Plink Mobile App development environment..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env.local exists, if not copy from example
if [ ! -f ".env.local" ]; then
    echo "🔧 Setting up environment configuration..."
    cp environment/.env.local .env.local
    echo "✅ Created .env.local from template"
fi

# Start development server
echo "🚀 Starting development server..."
echo "📱 Open http://localhost:5173 to view the app"
echo "🎨 The app is optimized for mobile viewing (430px width)"
echo ""
echo "Press Ctrl+C to stop the development server"
echo ""

npm run dev