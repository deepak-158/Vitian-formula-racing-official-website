const fs = require('fs');
const path = require('path');

console.log('🔍 Pre-Deployment Checklist - VIT Bhopal Racing Team\n');

// Check 1: Required files exist
console.log('1. Checking required files...');
const requiredFiles = [
  'frontend/package.json',
  'frontend/public/admin/config.yml',
  'frontend/public/admin/index.html',
  'frontend/netlify.toml',
  'frontend/public/_headers',
  'data/team-info.json'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING!`);
    allFilesExist = false;
  }
});

// Check 2: Data structure
console.log('\n2. Checking data structure...');
const dataDir = path.join(__dirname, '..', 'data');
const expectedFolders = [
  'achievements', 'events', 'gallery', 'members',
  'merchandise', 'news', 'projects', 'racing-journey', 'sponsors'
];

expectedFolders.forEach(folder => {
  const folderPath = path.join(dataDir, folder);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.json'));
    console.log(`   ✅ ${folder}/ (${files.length} files)`);
  } else {
    console.log(`   ❌ ${folder}/ - MISSING!`);
    allFilesExist = false;
  }
});

// Check 3: Package.json scripts
console.log('\n3. Checking package.json scripts...');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'frontend', 'package.json'), 'utf8'));
  const requiredScripts = ['build', 'cms:setup', 'cms:sync'];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`   ✅ ${script}`);
    } else {
      console.log(`   ❌ ${script} - MISSING!`);
      allFilesExist = false;
    }
  });
} catch (error) {
  console.log('   ❌ Error reading package.json');
  allFilesExist = false;
}

// Check 4: CMS config validation
console.log('\n4. Validating CMS configuration...');
try {
  const configPath = path.join(__dirname, '..', 'frontend', 'public', 'admin', 'config.yml');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  // Basic checks
  if (configContent.includes('backend:')) {
    console.log('   ✅ Backend configuration found');
  } else {
    console.log('   ❌ Backend configuration missing');
    allFilesExist = false;
  }
  
  if (configContent.includes('collections:')) {
    console.log('   ✅ Collections configuration found');
  } else {
    console.log('   ❌ Collections configuration missing');
    allFilesExist = false;
  }
  
  if (configContent.includes('media_folder:')) {
    console.log('   ✅ Media folder configuration found');
  } else {
    console.log('   ❌ Media folder configuration missing');
    allFilesExist = false;
  }
} catch (error) {
  console.log('   ❌ Error reading config.yml:', error.message);
  allFilesExist = false;
}

// Check 5: Build test
console.log('\n5. Testing build process...');
const { execSync } = require('child_process');
const frontendPath = path.join(__dirname, '..', 'frontend');

try {
  console.log('   🔄 Running npm run build...');
  execSync('npm run build', { 
    cwd: frontendPath, 
    stdio: 'pipe' 
  });
  
  // Check if build folder exists
  const buildPath = path.join(frontendPath, 'build');
  if (fs.existsSync(buildPath)) {
    const buildFiles = fs.readdirSync(buildPath);
    console.log(`   ✅ Build successful (${buildFiles.length} files generated)`);
  } else {
    console.log('   ❌ Build folder not created');
    allFilesExist = false;
  }
} catch (error) {
  console.log('   ❌ Build failed:', error.message);
  allFilesExist = false;
}

// Final result
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 READY FOR DEPLOYMENT!');
  console.log('\nNext steps:');
  console.log('1. Commit all changes: git add . && git commit -m "Ready for deployment"');
  console.log('2. Push to GitHub: git push origin main');
  console.log('3. Deploy on Netlify following the deployment guide');
  console.log('4. Enable Netlify Identity for CMS access');
} else {
  console.log('❌ NOT READY FOR DEPLOYMENT');
  console.log('\nPlease fix the issues above before deploying.');
  console.log('Run this script again after making fixes.');
}
console.log('='.repeat(50));
