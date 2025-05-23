// Netlify function to update all types of data
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the form data
    const formData = new URLSearchParams(event.body);
    const dataType = formData.get('dataType');
    const jsonData = formData.get('data');
    
    if (!dataType || !jsonData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing dataType or data' })
      };
    }

    // Validate dataType against allowed types
    const allowedTypes = [
      'members', 'achievements', 'events', 'gallery', 
      'merchandise', 'news', 'projects', 'racing-journey', 
      'sponsors', 'team-info'
    ];
    
    if (!allowedTypes.includes(dataType)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid dataType' })
      };
    }

    // Parse the JSON data
    const data = JSON.parse(jsonData);

    // Write to both source and public locations
    const srcFilePath = path.join(__dirname, `../../src/data/${dataType}.json`);
    const publicFilePath = path.join(__dirname, `../../public/data/${dataType}.json`);
    
    const formattedData = JSON.stringify(data, null, 2);
    
    // Write to src/data
    await writeFile(srcFilePath, formattedData);
    
    // Write to public/data
    await writeFile(publicFilePath, formattedData);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: `${dataType} data updated successfully`,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Error updating data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update data', details: error.message })
    };
  }
};
