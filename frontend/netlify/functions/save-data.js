const fs = require('fs');
const path = require('path');

// This is a simple server endpoint to handle data saving
// In a production environment, you would implement proper authentication and validation
exports.handler = async function(event, context) {
  // Check if request method is POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const { dataType, data } = body;
      // Validate required fields
    if (!dataType || !data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }
    
    // Validate data type
    const allowedTypes = [
      'members', 'events', 'projects', 'sponsors', 
      'news', 'gallery', 'achievements', 'merchandise',
      'racing-journey', 'team-info'
    ];
    
    if (!allowedTypes.includes(dataType)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Invalid data type: ${dataType}` })
      };
    }
      // In Netlify functions, we cannot directly write to the filesystem.
    // Instead, we'll simulate a successful response for the front-end.
    // In a real implementation, you would store this data in a database or storage service.
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `Data would be saved in a real deployment. Received ${dataType} with ${JSON.stringify(data).length} characters.`,
        success: true
      })
    };
    
    // Copy to build directory for immediate usage
    const buildFilePath = path.join(__dirname, '../../build/data', `${dataType}.json`);
    await fs.promises.writeFile(buildFilePath, JSON.stringify(data, null, 2));
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `${dataType} data saved successfully`,
        success: true
      })
    };  } catch (error) {
    console.error('Error saving data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error saving data',
        error: error.message
      })
    };
  }
};
