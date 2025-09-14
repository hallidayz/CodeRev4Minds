#!/usr/bin/env node

/**
 * Code Rev Minds - Production Build Test
 * This script tests the production build for common issues
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'blue') {
  console.log(`${colors[color]}[TEST]${colors.reset} ${message}`);
}

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    log(`✅ ${description}: ${(stats.size / 1024).toFixed(2)}KB`, 'green');
    return true;
  } else {
    log(`❌ ${description}: File not found`, 'red');
    return false;
  }
}

function checkDirectory(dirPath, description) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    const files = fs.readdirSync(dirPath);
    log(`✅ ${description}: ${files.length} files`, 'green');
    return true;
  } else {
    log(`❌ ${description}: Directory not found`, 'red');
    return false;
  }
}

function analyzeBundleSize() {
  const distPath = path.join(process.cwd(), 'dist');
  
  if (!fs.existsSync(distPath)) {
    log('❌ Build directory not found. Run "npm run build" first.', 'red');
    return false;
  }

  log('📊 Analyzing bundle size...', 'blue');
  
  // Check main files
  const indexHtml = checkFile(path.join(distPath, 'index.html'), 'index.html');
  const assetsDir = checkDirectory(path.join(distPath, 'assets'), 'assets directory');
  
  if (!indexHtml || !assetsDir) {
    return false;
  }

  // Analyze JavaScript files
  const assetsPath = path.join(distPath, 'assets');
  const jsFiles = fs.readdirSync(assetsPath).filter(file => file.endsWith('.js'));
  const cssFiles = fs.readdirSync(assetsPath).filter(file => file.endsWith('.css'));

  let totalJsSize = 0;
  let totalCssSize = 0;

  jsFiles.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const size = fs.statSync(filePath).size;
    totalJsSize += size;
    log(`  📄 ${file}: ${(size / 1024).toFixed(2)}KB`, 'blue');
  });

  cssFiles.forEach(file => {
    const filePath = path.join(assetsPath, file);
    const size = fs.statSync(filePath).size;
    totalCssSize += size;
    log(`  🎨 ${file}: ${(size / 1024).toFixed(2)}KB`, 'blue');
  });

  const totalSize = totalJsSize + totalCssSize;
  
  log(`📊 Bundle Analysis:`, 'blue');
  log(`  Total JavaScript: ${(totalJsSize / 1024).toFixed(2)}KB`, 'blue');
  log(`  Total CSS: ${(totalCssSize / 1024).toFixed(2)}KB`, 'blue');
  log(`  Total Size: ${(totalSize / 1024).toFixed(2)}KB`, 'blue');

  // Performance recommendations
  if (totalSize > 1024 * 1024) { // 1MB
    log(`⚠️  Bundle size is large (${(totalSize / 1024 / 1024).toFixed(2)}MB). Consider code splitting.`, 'yellow');
  } else if (totalSize > 500 * 1024) { // 500KB
    log(`⚠️  Bundle size is moderate (${(totalSize / 1024).toFixed(2)}KB). Monitor performance.`, 'yellow');
  } else {
    log(`✅ Bundle size is good (${(totalSize / 1024).toFixed(2)}KB)`, 'green');
  }

  return true;
}

function checkHtmlContent() {
  const indexPath = path.join(process.cwd(), 'dist', 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    log('❌ index.html not found', 'red');
    return false;
  }

  const htmlContent = fs.readFileSync(indexPath, 'utf8');
  
  // Check for essential elements
  const checks = [
    { pattern: /<title>/, description: 'Title tag' },
    { pattern: /<meta name="viewport"/, description: 'Viewport meta tag' },
    { pattern: /<meta name="description"/, description: 'Description meta tag' },
    { pattern: /<div id="root">/, description: 'React root element' },
    { pattern: /<script type="module"/, description: 'Module script tag' }
  ];

  let allPassed = true;
  checks.forEach(check => {
    if (check.pattern.test(htmlContent)) {
      log(`✅ ${check.description}`, 'green');
    } else {
      log(`❌ ${check.description}`, 'red');
      allPassed = false;
    }
  });

  return allPassed;
}

function checkThemeSupport() {
  const indexPath = path.join(process.cwd(), 'dist', 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    return false;
  }

  const htmlContent = fs.readFileSync(indexPath, 'utf8');
  
  // Check for theme-related meta tags
  const hasThemeColor = /<meta name="theme-color"/.test(htmlContent);
  const hasDarkMode = /class="dark"/.test(htmlContent) || /data-theme/.test(htmlContent);
  
  if (hasThemeColor) {
    log('✅ Theme color meta tag found', 'green');
  } else {
    log('⚠️  Theme color meta tag not found', 'yellow');
  }

  return true;
}

function main() {
  log('🚀 Code Rev Minds - Production Build Test', 'blue');
  log('==========================================', 'blue');
  
  const results = [];
  
  // Test 1: Check build directory structure
  log('\n📁 Checking build structure...', 'blue');
  results.push(analyzeBundleSize());
  
  // Test 2: Check HTML content
  log('\n📄 Checking HTML content...', 'blue');
  results.push(checkHtmlContent());
  
  // Test 3: Check theme support
  log('\n🎨 Checking theme support...', 'blue');
  results.push(checkThemeSupport());
  
  // Summary
  const passedTests = results.filter(Boolean).length;
  const totalTests = results.length;
  
  log('\n📊 Test Summary:', 'blue');
  log(`  Passed: ${passedTests}/${totalTests}`, passedTests === totalTests ? 'green' : 'yellow');
  
  if (passedTests === totalTests) {
    log('\n🎉 All tests passed! Your build is ready for production.', 'green');
    process.exit(0);
  } else {
    log('\n⚠️  Some tests failed. Please review the issues above.', 'yellow');
    process.exit(1);
  }
}

// Run the tests
main();
