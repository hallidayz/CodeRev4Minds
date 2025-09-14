#!/bin/bash

# Code Rev Minds - Production Build Script
# This script builds the application for production deployment

echo "🚀 Code Rev Minds - Production Build"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ to continue."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm to continue."
    exit 1
fi

print_success "npm version: $(npm -v)"

# Step 1: Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/.vite/
print_success "Clean completed"

# Step 2: Install dependencies
print_status "Installing dependencies..."
npm ci --silent
if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi
print_success "Dependencies installed"

# Step 3: Run linting
print_status "Running ESLint..."
npm run lint
if [ $? -ne 0 ]; then
    print_warning "ESLint found issues. Please fix them before building for production."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    print_success "ESLint passed"
fi

# Step 4: Type checking
print_status "Running TypeScript type checking..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    print_error "TypeScript type checking failed"
    exit 1
fi
print_success "TypeScript type checking passed"

# Step 5: Build for production
print_status "Building for production..."
NODE_ENV=production npm run build
if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi
print_success "Build completed successfully"

# Step 6: Analyze bundle size
print_status "Analyzing bundle size..."
if [ -d "dist" ]; then
    TOTAL_SIZE=$(du -sh dist/ | cut -f1)
    JS_SIZE=$(du -sh dist/assets/*.js 2>/dev/null | awk '{sum+=$1} END {print sum "K"}' || echo "N/A")
    CSS_SIZE=$(du -sh dist/assets/*.css 2>/dev/null | awk '{sum+=$1} END {print sum "K"}' || echo "N/A")
    
    print_success "Build size analysis:"
    echo "  📦 Total build size: $TOTAL_SIZE"
    echo "  📄 JavaScript files: $JS_SIZE"
    echo "  🎨 CSS files: $CSS_SIZE"
    
    # Check if bundle is too large
    if [ -f "dist/assets" ]; then
        LARGEST_JS=$(find dist/assets -name "*.js" -exec du -h {} + | sort -rh | head -1 | cut -f1)
        echo "  📊 Largest JS chunk: $LARGEST_JS"
    fi
else
    print_error "Build directory not found"
    exit 1
fi

# Step 7: Test production build
print_status "Testing production build..."
npm run preview &
PREVIEW_PID=$!

# Wait for preview server to start
sleep 5

# Check if preview server is running
if ps -p $PREVIEW_PID > /dev/null; then
    print_success "Preview server started successfully"
    echo "  🌐 Preview URL: https://localhost:4173"
    echo "  🔍 Test your application in the browser"
    echo "  ⏹️  Press Ctrl+C to stop the preview server"
    
    # Wait for user to stop the server
    wait $PREVIEW_PID
else
    print_error "Failed to start preview server"
    exit 1
fi

print_success "Production build process completed!"
echo ""
echo "🎉 Your Code Rev Minds app is ready for deployment!"
echo ""
echo "Next steps:"
echo "  1. Test the preview server thoroughly"
echo "  2. Deploy to your chosen hosting platform"
echo "  3. Set up monitoring and analytics"
echo "  4. Configure custom domain (if needed)"
echo ""
echo "Deployment platforms:"
echo "  • Netlify: Drag and drop the 'dist' folder"
echo "  • Vercel: Connect your Git repository"
echo "  • GitHub Pages: Push to gh-pages branch"
echo "  • AWS S3: Upload 'dist' folder contents"
