// Netlify function to update team members
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

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
    const membersData = formData.get('data');
    
    if (!membersData) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No data provided' })
      };
    }

    // Parse the JSON data
    const members = JSON.parse(membersData);

    // File path for the members.json file
    // Note: In Netlify Functions, files are written to /tmp
    // In a real production environment, you would write to a database
    // or use Netlify's Git Gateway to commit back to the repository
    const filePath = path.join('/tmp', 'members.json');
    
    // Write the file
    await writeFile(filePath, JSON.stringify(members, null, 2));
    
    // In a real environment, you'd commit this file back to the repo using Git Gateway
    // For demo purposes, we'll create a simple notification file
    await writeFile(
      path.join('/tmp', 'update-notification.txt'), 
      `Members updated at ${new Date().toISOString()}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Members data updated successfully' })
    };
  } catch (error) {
    console.error('Error updating members:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update members data', details: error.message })
    };
  }
};
