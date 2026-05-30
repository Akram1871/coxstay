@echo off
REM CoxStay Project Setup Script for Windows

echo.
echo 🚀 CoxStay Installation Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
echo.

REM Generate Prisma client
echo 🔧 Generating Prisma client...
call npx prisma generate
echo.

REM Push database schema
echo 🗄️  Setting up database...
call npx prisma db push
echo.

REM Seed database
echo 🌱 Seeding database with sample data...
call npm run seed
echo.

echo ✅ Installation complete!
echo.
echo 🎯 Quick Start:
echo   npm run dev        - Start development server
echo   npm run build      - Build for production
echo   npm run start      - Start production server
echo.
echo 📊 Default Credentials:
echo   Admin:  admin@coxstay.com / admin123456
echo   User:   user@coxstay.com / user123456
echo.
echo 🌐 Open http://localhost:3000 in your browser
echo.
pause
