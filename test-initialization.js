/**
 * Script to test the system initialization
 * This script will:
 * 1. Start the server
 * 2. Wait for the initialization to complete
 * 3. Check if the super admin user exists
 */
const { execSync } = require('child_process');
const path = require('path');

console.log('Starting system initialization test...');

try {
  // Change to the server directory
  process.chdir(path.join(__dirname, 'server'));
  
  // Run the initialization script directly
  console.log('Running initialization script...');
  execSync('npx ts-node src/scripts/initializeSystem.ts', { stdio: 'inherit' });
  
  // Check if the super admin user exists
  console.log('\nChecking if super admin user exists...');
  execSync('npx ts-node src/scripts/check-superadmin.ts', { stdio: 'inherit' });
  
  // Check if the test user exists
  console.log('\nChecking if test user exists...');
  execSync('npx ts-node src/scripts/check-test-user.ts', { stdio: 'inherit' });
  
  // List all users
  console.log('\nListing all users...');
  execSync('npx ts-node src/scripts/list-users.ts', { stdio: 'inherit' });
  
  console.log('\nSystem initialization test completed successfully!');
  console.log('You can now start the server normally with: npm run dev');
} catch (error) {
  console.error('Error during system initialization test:', error.message);
  process.exit(1);
}