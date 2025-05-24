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
      body: JSON.stringify({ error: `Invalid data type: ${dataType}` })
    };
  }

  try {
    // In Netlify, we'll return a sample data for demonstration
    // In a real application, you would fetch this from a database
    
    // Try to load data from the build/data directory if it exists
    let data = [];
    
    try {
      // Attempt to get data from build directory
      const dataPath = path.join(__dirname, '../../build/data', `${dataType}.json`);
      if (fs.existsSync(dataPath)) {
        data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      }
    } catch (error) {
      console.error(`Error reading data file for ${dataType}:`, error);
      // Fall back to sample data if file can't be read
      switch (dataType) {
        case 'members':
          data = [{ id: 1, name: 'Sample Member' }];
          break;
        case 'events':
          data = [{ id: 1, name: 'Sample Event' }];
          break;
        case 'projects':
          data = [{ id: 1, name: 'Sample Project' }];
          break;
        case 'sponsors':
          data = [{ id: 1, name: 'Sample Sponsor' }];
          break;
        case 'news':
          data = [{ id: 1, title: 'Sample News Item' }];
          break;
        case 'gallery':
          data = [{ id: 1, title: 'Sample Gallery Item' }];
          break;
        case 'achievements':
          data = [{ id: 1, title: 'Sample Achievement' }];
          break;
        case 'merchandise':
          data = [{ id: 1, name: 'Sample Merchandise' }];
          break;
        case 'racing-journey':
          data = [{ id: 1, title: 'Sample Racing Journey' }];
          break;
        case 'team-info':
          data = { teamName: 'Sample Team', foundingYear: 2020 };
          break;
        default:
          data = [];
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error(`Error in get-data function:`, error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data', message: error.message })
    };
  }
};
