const { Client } = require('pg');
require('dotenv').config();

async function checkApprovalWorkflows() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  try {
    console.log('Connecting to leave_management database...');
    await client.connect();
    console.log('Connected to leave_management database successfully!');
    
    // Check the structure of the approval_workflows table
    console.log('Checking approval_workflows table structure...');
    const tableStructure = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'approval_workflows'
      ORDER BY ordinal_position;
    `);
    
    console.log('Columns in approval_workflows table:');
    tableStructure.rows.forEach(row => {
      console.log(`- ${row.column_name} (${row.data_type})`);
    });
    
    // Check the data in the approval_workflows table
    console.log('\nChecking approval_workflows table data...');
    const workflowData = await client.query(`
      SELECT id, name, "minDays", "maxDays" 
      FROM approval_workflows
      ORDER BY name;
    `);
    
    console.log('Workflows in the database:');
    workflowData.rows.forEach(row => {
      console.log(`- ${row.name} (minDays: ${row.minDays}, maxDays: ${row.maxDays})`);
    });
    
    // Check if the minDays column exists
    const minDaysExists = tableStructure.rows.some(row => row.column_name === 'minDays');
    if (minDaysExists) {
      console.log('\nThe minDays column exists in the approval_workflows table.');
    } else {
      console.log('\nThe minDays column does NOT exist in the approval_workflows table.');
    }
    
    // Check if the maxDays column exists
    const maxDaysExists = tableStructure.rows.some(row => row.column_name === 'maxDays');
    if (maxDaysExists) {
      console.log('The maxDays column exists in the approval_workflows table.');
    } else {
      console.log('The maxDays column does NOT exist in the approval_workflows table.');
    }
    
    // Check if the approvalLevels column exists
    const approvalLevelsExists = tableStructure.rows.some(row => row.column_name === 'approvalLevels');
    if (approvalLevelsExists) {
      console.log('The approvalLevels column exists in the approval_workflows table.');
    } else {
      console.log('The approvalLevels column does NOT exist in the approval_workflows table.');
    }
  } catch (error) {
    console.error('Error checking approval_workflows table:', error);
  } finally {
    await client.end();
  }
}

checkApprovalWorkflows();