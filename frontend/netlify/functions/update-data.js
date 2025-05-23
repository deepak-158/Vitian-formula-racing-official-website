const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

// This function handles data updates from Netlify CMS
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the request body
    const formData = new URLSearchParams(event.body);
    const dataType = formData.get('dataType');
    const data = JSON.parse(formData.get('data'));

    if (!dataType || !data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing dataType or data parameter' })
      };
    }

    // Validate the dataType to prevent directory traversal attacks
    const validDataTypes = ['members', 'achievements', 'events', 'gallery', 
                          'merchandise', 'racing-journey', 'sponsors', 'team-info'];
    
    if (!validDataTypes.includes(dataType)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid dataType parameter' })
      };
    }

    // Define the path to the data file
    const filePath = path.join(process.cwd(), 'public', 'data', `${dataType}.json`);
    
    // Also update the source data file in src/data
    const srcFilePath = path.join(process.cwd(), 'src', 'data', `${dataType}.json`);

    // Write the updated data to the public data file
    await writeFile(filePath, JSON.stringify(data, null, 2));
    
    // Write the updated data to the source data file
    await writeFile(srcFilePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: `${dataType} data updated successfully`,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Error updating data:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error updating data',
        error: error.message 
      })
    };
  }
};