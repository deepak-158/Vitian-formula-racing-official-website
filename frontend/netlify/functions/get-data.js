// Netlify Function to get data for the CMS
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  // Get the data type from the query parameters
  const { dataType } = event.queryStringParameters || {};

  // Validate data type
  if (!dataType) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Missing data type parameter' })
    };
  }

  // Validate data type against allowed types
  const allowedTypes = [
    'members', 'events', 'projects', 'sponsors', 
    'news', 'gallery', 'achievements', 'merchandise',
    'racing-journey', 'team-info'
  ];
  
  if (!allowedTypes.includes(dataType)) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: `Invalid data type: ${dataType}` })
    };
  }

  try {
    // Try to load data from multiple locations
    let data = null;
    const possiblePaths = [
      path.join(__dirname, '../../build/data', `${dataType}.json`),
      path.join(__dirname, '../../public/data', `${dataType}.json`),
      path.join(__dirname, '../../src/data', `${dataType}.json`),
    ];

    // Try each path until we find the data
    for (const dataPath of possiblePaths) {
      try {
        if (fs.existsSync(dataPath)) {
          const fileContent = fs.readFileSync(dataPath, 'utf8');
          data = JSON.parse(fileContent);
          console.log(`Successfully loaded ${dataType} from ${dataPath}`);
          break;
        }
      } catch (readError) {
        console.error(`Error reading ${dataPath}:`, readError);
        continue;
      }
    }

    // If we couldn't load any data, return sample data
    if (!data) {
      console.log(`No data file found for ${dataType}, returning sample data`);
      switch (dataType) {
        case 'members':
          data = [{ id: 1, name: 'Sample Member', role: 'Team Member', bio: 'Sample bio' }];
          break;
        case 'events':
          data = [{ id: 1, name: 'Sample Event', date: '2024-01-01', description: 'Sample event' }];
          break;
        case 'projects':
          data = [{ id: 1, name: 'Sample Project', description: 'Sample project description' }];
          break;
        case 'sponsors':
          data = [{ id: 1, name: 'Sample Sponsor', tier: 'Gold' }];
          break;
        case 'news':
          data = [{ id: 1, title: 'Sample News Item', content: 'Sample news content' }];
          break;
        case 'gallery':
          data = [{ id: 1, title: 'Sample Gallery Item', imageUrl: '/images/sample.jpg' }];
          break;
        case 'achievements':
          data = [{ id: 1, title: 'Sample Achievement', description: 'Sample achievement' }];
          break;
        case 'merchandise':
          data = [{ id: 1, name: 'Sample Merchandise', price: 25.00 }];
          break;
        case 'racing-journey':
          data = [{ id: 1, title: 'Sample Racing Journey', year: 2024 }];
          break;
        case 'team-info':
          data = { teamName: 'Sample Racing Team', foundingYear: 2020, description: 'Sample team info' };
          break;
        default:
          data = [];
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error(`Error in get-data function for ${dataType}:`, error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Error fetching data', 
        message: error.message,
        dataType: dataType
      })
    };
  }
};
