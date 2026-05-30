#!/bin/bash
# CoxStay Project Setup Script

echo "🚀 CoxStay Installation Script"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo ""
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push database schema
echo ""
echo "🗄️  Setting up database..."
npx prisma db push

# Seed database
echo ""
echo "🌱 Seeding database with sample data..."
npm run seed

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎯 Quick Start:"
echo "  npm run dev        - Start development server"
echo "  npm run build      - Build for production"
echo "  npm run start      - Start production server"
echo ""
echo "📊 Default Credentials:"
echo "  Admin:  admin@coxstay.com / admin123456"
echo "  User:   user@coxstay.com / user123456"
echo ""
echo "🌐 Open http://localhost:3000 in your browser"
