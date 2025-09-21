#!/bin/bash

# Plink Mobile App Build Script
# This script handles the build process for the Plink mobile application

set -e

echo "🚀 Starting Plink Mobile App build process..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run TypeScript type checking
echo "🔍 Running TypeScript type check..."
npm run type-check

# Run linting
echo "🧹 Running ESLint..."
npm run lint

# Build the application
echo "🏗️  Building application..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output available in ./dist/"
    
    # Show build size
    echo "📊 Build size:"
    du -sh dist/
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Plink Mobile App build process completed!"