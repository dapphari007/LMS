/**
 * Script to fix migration issues and run migrations in the correct order
 */
const { execSync } = require('child_process');
const path = require('path');

console.log('Starting migration fix process...');

try {
  // Change to the server directory
  process.chdir(path.join(__dirname, 'server'));
  
  // Run the migration fix script
  console.log('Running migration fix script...');
  execSync('npx ts-node src/scripts/fixMigrationOrder.ts', { stdio: 'inherit' });
  
  // Run the positions table fix script
  console.log('Running positions table fix script...');
  execSync('npx ts-node src/scripts/fixPositionsTable.ts', { stdio: 'inherit' });
  
  // Run the positions data fix script
  console.log('Running positions data fix script...');
  execSync('npx ts-node src/scripts/fixPositionsData.ts', { stdio: 'inherit' });
  
  console.log('Migration fix completed successfully!');
  console.log('You can now start the server normally with: npm run dev');
} catch (error) {
  console.error('Error fixing migrations:', error.message);
  process.exit(1);
}