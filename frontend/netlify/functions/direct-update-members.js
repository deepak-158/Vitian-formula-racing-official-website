// Helper function to directly write team member data to the repo
// Note: This requires proper git configuration and permissions
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

exports.handler = async function(event, context) {
  // We use environment variables to check authorization
  const API_KEY = process.env.UPDATE_MEMBERS_API_KEY;
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Check API key from Authorization header
  const authHeader = event.headers.authorization || '';
  const providedKey = authHeader.replace('Bearer ', '');
  
  if (!API_KEY || providedKey !== API_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    // Parse the form data
    const formData = new URLSearchParams(event.body);
    const membersData = formData.get('data');
    
    if (!membersData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No data provided' })
      };
    }

    // Parse the JSON data
    const members = JSON.parse(membersData);

    // Write to both source and public locations
    const srcFilePath = path.join(__dirname, '../../src/data/members.json');
    const publicFilePath = path.join(__dirname, '../../public/data/members.json');
    
    const formattedData = JSON.stringify(members, null, 2);
    
    // Write to src/data
    await writeFile(srcFilePath, formattedData);
    
    // Write to public/data
    await writeFile(publicFilePath, formattedData);
    
    // In a more complete solution, we would:
    // 1. Use Git Gateway to commit these changes back to the repo
    // 2. Trigger a rebuild of the site
    // 3. Log this action for audit purposes

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Members data updated successfully',
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Error updating members:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update members data', details: error.message })
    };
  }
};
