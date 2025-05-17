/**
 * Script to check essential data (roles and approval workflows)
 * 
 * Usage:
 *   node check-data.js
 */

// Import required modules
require('ts-node/register');
const path = require('path');

// Set the current working directory to the server directory
process.chdir(path.join(__dirname, 'server'));

// Import the check function
const { checkEssentialData } = require('./src/scripts/checkEssentialData');

// Run the check
checkEssentialData()
  .then(() => {
    console.log('Check completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during check:', error);
    process.exit(1);
  });