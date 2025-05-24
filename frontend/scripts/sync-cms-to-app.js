const fs = require('fs');
const path = require('path');

// Base paths
const srcDataPath = path.join(__dirname, '../src/data');
const rootDataPath = path.join(__dirname, '../../data');

// Collections that should be converted from individual files back to arrays
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

async function convertIndividualFilesToArrays() {
  console.log('Converting individual CMS files back to JSON arrays for application...');
  
  for (const collection of collections) {
    const inputDir = path.join(rootDataPath, collection);
    const outputFile = path.join(srcDataPath, `${collection}.json`);
    
    try {
      // Check if input directory exists
      if (!fs.existsSync(inputDir)) {
        console.warn(`Directory ${inputDir} does not exist, skipping ${collection}`);
        continue;
      }
      
      // Read all JSON files in the directory
      const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.json'));
      const dataArray = [];
      
      files.forEach(file => {
        const filePath = path.join(inputDir, file);
        try {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          dataArray.push(data);
        } catch (error) {
          console.error(`Error reading ${filePath}:`, error.message);
        }
      });
      
      // Sort by id if available
      dataArray.sort((a, b) => {
        const idA = a.id ? parseInt(a.id) || a.id : 0;
        const idB = b.id ? parseInt(b.id) || b.id : 0;
        return idA > idB ? 1 : -1;
      });
      
      // Write the array to the output file
      fs.writeFileSync(outputFile, JSON.stringify(dataArray, null, 2));
      console.log(`Updated: ${outputFile} (${dataArray.length} items)`);
      
    } catch (error) {
      console.error(`Error processing ${collection}:`, error.message);
    }
  }
  
  // Copy team-info.json back to src/data
  copyTeamInfoBack();
  
  console.log('Sync complete!');
}

function copyTeamInfoBack() {
  const sourceFile = path.join(rootDataPath, 'team-info.json');
  const targetFile = path.join(srcDataPath, 'team-info.json');
  
  try {
    if (fs.existsSync(sourceFile)) {
      // Read the CMS format data
      const cmsData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
      
      // Convert description format for application use
      if (cmsData.welcome?.description) {
        cmsData.welcome.description = cmsData.welcome.description.map(item => 
          typeof item === 'object' && item.paragraph ? item.paragraph : item
        );
      }
      
      // Write the converted data
      fs.writeFileSync(targetFile, JSON.stringify(cmsData, null, 2));
      console.log('Synced and converted team-info.json back to src/data');
    }
  } catch (error) {
    console.error('Error syncing team-info.json:', error.message);
  }
}

// Run the sync
convertIndividualFilesToArrays();
