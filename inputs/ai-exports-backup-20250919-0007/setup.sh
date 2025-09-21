#!/bin/bash

# Plink Mobile App Setup Script
# This script sets up the project for first-time development

set -e

echo "🎯 Setting up Plink Mobile App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set up environment files
echo "🔧 Setting up environment configuration..."
if [ ! -f ".env.local" ]; then
    cp environment/.env.local .env.local
    echo "✅ Created .env.local"
fi

if [ ! -f ".env" ]; then
    cp environment/.env.example .env
    echo "✅ Created .env from example"
fi

# Make scripts executable
echo "🔐 Making scripts executable..."
chmod +x scripts/*.sh

# Run initial type check
echo "🔍 Running initial type check..."
npm run type-check

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo "  or"
echo "  ./scripts/dev.sh"
echo ""
echo "To build for production:"
echo "  npm run build"
echo "  or"
echo "  ./scripts/build.sh"
echo ""
echo "📱 The app is optimized for mobile devices (430px width)"
echo "🎨 Visit http://localhost:5173 when running the dev server"
echo ""
echo "📚 Check out the Guidelines.md for development standards"