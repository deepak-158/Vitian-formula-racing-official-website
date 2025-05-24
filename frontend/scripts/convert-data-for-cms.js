const fs = require('fs');
const path = require('path');

// Base paths
const srcDataPath = path.join(__dirname, '../src/data');
const rootDataPath = path.join(__dirname, '../../data');

// Collections that should be converted from arrays to individual files
const collections = [
  'achievements',
  'events', 
  'gallery',
  'members',
  'merchandise',
  'news',
  'projects',
  'racing-journey',
  'sponsors'
];

async function convertArrayToIndividualFiles() {
  console.log('Converting JSON arrays to individual files for CMS...');
  
  for (const collection of collections) {
    const jsonFile = path.join(srcDataPath, `${collection}.json`);
    const outputDir = path.join(rootDataPath, collection);
    
    try {
      // Read the JSON array
      const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
      
      // Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Create individual files for each item
      if (Array.isArray(jsonData)) {
        jsonData.forEach((item, index) => {
          const filename = item.id ? `${item.id}.json` : `${collection}-${index + 1}.json`;
          const outputFile = path.join(outputDir, filename);
          
          fs.writeFileSync(outputFile, JSON.stringify(item, null, 2));
          console.log(`Created: ${outputFile}`);
        });
      }
      
    } catch (error) {
      console.error(`Error processing ${collection}:`, error.message);
    }
  }
  
  console.log('Conversion complete!');
}

// Also copy team-info.json to root data folder
function copyTeamInfo() {
  const sourceFile = path.join(srcDataPath, 'team-info.json');
  const targetFile = path.join(rootDataPath, 'team-info.json');
  
  try {
    // Read the app format data
    const appData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
    
    // Convert description format for CMS
    if (appData.welcome?.description) {
      appData.welcome.description = appData.welcome.description.map(item => 
        typeof item === 'string' ? { paragraph: item } : item
      );
    }
    
    // Write the converted data
    fs.writeFileSync(targetFile, JSON.stringify(appData, null, 2));
    console.log('Copied and converted team-info.json to root data folder');
  } catch (error) {
    console.error('Error copying team-info.json:', error.message);
  }
}

// Run the conversion
convertArrayToIndividualFiles();
copyTeamInfo();
