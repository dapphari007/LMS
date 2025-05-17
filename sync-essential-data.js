/**
 * Script to manually synchronize essential data (roles and approval workflows)
 * 
 * Usage:
 *   node sync-essential-data.js
 */

// Import required modules
require('ts-node/register');
const { SyncService } = require('./server/src/services/syncService');

async function main() {
  try {
    console.log("Starting essential data synchronization...");
    
    // Run the synchronization
    await SyncService.syncAll();
    
    console.log("Essential data synchronization completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error during synchronization:", error);
    process.exit(1);
  }
}

// Run the script
main();