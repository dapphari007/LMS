const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('Checking if ts-node is installed...');
  const output = execSync('npx ts-node --version', { encoding: 'utf8' });
  console.log(`ts-node version: ${output.trim()}`);
  
  console.log('Checking TypeScript version...');
  const tsOutput = execSync('npx tsc --version', { encoding: 'utf8' });
  console.log(`TypeScript version: ${tsOutput.trim()}`);
  
  console.log('Checking if server.ts exists...');
  const serverPath = path.join(__dirname, 'src', 'server.ts');
  if (fs.existsSync(serverPath)) {
    console.log(`Server file exists at: ${serverPath}`);
    
    console.log('Checking server.ts content...');
    const serverContent = fs.readFileSync(serverPath, 'utf8');
    console.log(`Server file size: ${serverContent.length} bytes`);
    
    console.log('All checks passed! You should be able to run the application with ts-node.');
  } else {
    console.error(`Server file not found at: ${serverPath}`);
  }
} catch (error) {
  console.error('Error during checks:', error.message);
}