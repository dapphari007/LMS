/**
 * Script to synchronize essential data (roles and approval workflows)
 * 
 * Usage:
 *   node sync-data.js
 */

// Import required modules
require('ts-node/register');
const path = require('path');

// Set the current working directory to the server directory
process.chdir(path.join(__dirname, 'server'));

// Import the sync function
const { syncEssentialData } = require('./src/scripts/syncEssentialData');

// Run the synchronization
syncEssentialData()
  .then(() => {
    console.log('Synchronization completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during synchronization:', error);
    process.exit(1);
  });