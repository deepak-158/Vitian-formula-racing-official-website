// This file copies JSON data files to the public directory for access by Netlify CMS
const fs = require('fs');
const path = require('path');

// Source and destination directories
const SRC_DATA_DIR = path.join(__dirname, '../src/data');
const PUBLIC_DATA_DIR = path.join(__dirname, '../public/data');

// Create the public/data directory if it doesn't exist
if (!fs.existsSync(PUBLIC_DATA_DIR)) {
  console.log('Creating public/data directory...');
  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
}

// Get all JSON files from the src/data directory
const jsonFiles = fs.readdirSync(SRC_DATA_DIR)
  .filter(file => file.endsWith('.json'));

// Copy each JSON file to the public/data directory
jsonFiles.forEach(file => {
  const srcPath = path.join(SRC_DATA_DIR, file);
  const destPath = path.join(PUBLIC_DATA_DIR, file);
  
  // Copy the file
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to public/data/`);
  } catch (error) {
    console.error(`Error copying ${file}:`, error);
  }
});

console.log('Data files copy complete!');
