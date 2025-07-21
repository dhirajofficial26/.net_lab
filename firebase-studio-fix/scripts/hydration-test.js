#!/usr/bin/env node

/**
 * Firebase Studio Hydration Fix - Test Utility
 * 
 * This script helps test and validate the hydration fix implementation.
 * Run with: node scripts/hydration-test.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Firebase Studio Hydration Fix - Test Utility\n');

// Check if we're in a Next.js project
function isNextJsProject() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.dependencies && packageJson.dependencies.next;
}

// Check if layout file exists and has the fix
function checkLayoutFile() {
  const appLayoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
  const pagesAppPath = path.join(process.cwd(), 'pages/_app.tsx');
  
  let layoutContent = '';
  let layoutType = '';
  
  if (fs.existsSync(appLayoutPath)) {
    layoutContent = fs.readFileSync(appLayoutPath, 'utf8');
    layoutType = 'App Router';
  } else if (fs.existsSync(pagesAppPath)) {
    layoutContent = fs.readFileSync(pagesAppPath, 'utf8');
    layoutType = 'Pages Router';
  } else {
    return { exists: false };
  }
  
  const hasSuppressHydration = layoutContent.includes('suppressHydrationWarning');
  const hasHydrationProvider = layoutContent.includes('HydrationProvider');
  
  return {
    exists: true,
    type: layoutType,
    hasSuppressHydration,
    hasHydrationProvider,
    content: layoutContent
  };
}

// Check if HydrationProvider component exists
function checkHydrationProvider() {
  const providerPath = path.join(process.cwd(), 'src/app/components/HydrationProvider.tsx');
  
  if (!fs.existsSync(providerPath)) {
    return { exists: false };
  }
  
  const content = fs.readFileSync(providerPath, 'utf8');
  const hasWebcrxCleanup = content.includes('removeAttribute(\'webcrx\')');
  const hasUseEffect = content.includes('useEffect');
  const hasClientDirective = content.includes('\'use client\'');
  
  return {
    exists: true,
    hasWebcrxCleanup,
    hasUseEffect,
    hasClientDirective
  };
}

// Check Firebase dependency
function checkFirebaseDependency() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return { exists: false };
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const firebaseVersion = packageJson.dependencies?.firebase || 
                         packageJson.devDependencies?.firebase;
  
  return {
    exists: !!firebaseVersion,
    version: firebaseVersion
  };
}

// Main test function
function runTests() {
  console.log('📋 Running Hydration Fix Tests...\n');
  
  // Test 1: Next.js Project
  console.log('1. Next.js Project Check');
  if (isNextJsProject()) {
    console.log('   ✅ Next.js project detected');
  } else {
    console.log('   ❌ Not a Next.js project');
    return;
  }
  
  // Test 2: Layout File
  console.log('\n2. Layout File Check');
  const layout = checkLayoutFile();
  if (layout.exists) {
    console.log(`   ✅ Layout file found (${layout.type})`);
    
    if (layout.hasSuppressHydration) {
      console.log('   ✅ suppressHydrationWarning found');
    } else {
      console.log('   ⚠️  suppressHydrationWarning missing');
    }
    
    if (layout.hasHydrationProvider) {
      console.log('   ✅ HydrationProvider usage found');
    } else {
      console.log('   ⚠️  HydrationProvider usage missing');
    }
  } else {
    console.log('   ❌ Layout file not found');
  }
  
  // Test 3: HydrationProvider Component
  console.log('\n3. HydrationProvider Component Check');
  const provider = checkHydrationProvider();
  if (provider.exists) {
    console.log('   ✅ HydrationProvider component found');
    
    if (provider.hasClientDirective) {
      console.log('   ✅ \'use client\' directive found');
    } else {
      console.log('   ⚠️  \'use client\' directive missing');
    }
    
    if (provider.hasUseEffect) {
      console.log('   ✅ useEffect hook found');
    } else {
      console.log('   ⚠️  useEffect hook missing');
    }
    
    if (provider.hasWebcrxCleanup) {
      console.log('   ✅ webcrx attribute cleanup found');
    } else {
      console.log('   ⚠️  webcrx attribute cleanup missing');
    }
  } else {
    console.log('   ❌ HydrationProvider component not found');
  }
  
  // Test 4: Firebase Dependency
  console.log('\n4. Firebase Dependency Check');
  const firebase = checkFirebaseDependency();
  if (firebase.exists) {
    console.log(`   ✅ Firebase dependency found (${firebase.version})`);
  } else {
    console.log('   ⚠️  Firebase dependency not found');
  }
  
  // Summary
  console.log('\n📊 Test Summary');
  const allChecks = [
    isNextJsProject(),
    layout.exists && layout.hasSuppressHydration && layout.hasHydrationProvider,
    provider.exists && provider.hasClientDirective && provider.hasUseEffect && provider.hasWebcrxCleanup,
    firebase.exists
  ];
  
  const passedChecks = allChecks.filter(Boolean).length;
  const totalChecks = allChecks.length;
  
  if (passedChecks === totalChecks) {
    console.log('   🎉 All tests passed! Hydration fix is properly implemented.');
  } else {
    console.log(`   ⚠️  ${passedChecks}/${totalChecks} tests passed. Please review the warnings above.`);
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('   1. Run: npm run build');
  console.log('   2. Run: npm run start');
  console.log('   3. Check browser console for: "🔧 Firebase Studio Hydration Fix: Cleaned up problematic attributes"');
  console.log('   4. Verify no hydration mismatch errors appear');
}

// Run the tests
runTests();