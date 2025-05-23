const fs = require('fs');
const path = require('path');

// Path to the members.json file
const membersFilePath = path.join(__dirname, '../../src/data/members.json');

/**
 * Updates the members.json file with new data
 * @param {Array} members - The members data array
 */
function updateMembersFile(members) {
  try {
    // Read the current file
    const currentData = JSON.parse(fs.readFileSync(membersFilePath, 'utf8'));
    
    // Write the updated data
    fs.writeFileSync(membersFilePath, JSON.stringify(members, null, 2), 'utf8');
    
    console.log('Members data updated successfully!');
    return true;
  } catch (error) {
    console.error('Error updating members data:', error);
    return false;
  }
}

/**
 * Gets the current members data
 * @returns {Array} The members data array
 */
function getMembersData() {
  try {
    return JSON.parse(fs.readFileSync(membersFilePath, 'utf8'));
  } catch (error) {
    console.error('Error reading members data:', error);
    return [];
  }
}

module.exports = {
  updateMembersFile,
  getMembersData
};
