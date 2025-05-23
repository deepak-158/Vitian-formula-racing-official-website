// Netlify Function to refresh data files after CMS updates
const fs = require('fs');
const path = require('path');

// Source and destination directories
const SRC_DATA_DIR = path.join(__dirname, '../../src/data');
const PUBLIC_DATA_DIR = path.join(__dirname, '../../public/data');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
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

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data files refreshed successfully' })
    };
  } catch (error) {
    console.error('Error refreshing data files:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error refreshing data files', error: error.message })
    };
  }
};
