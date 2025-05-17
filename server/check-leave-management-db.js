const { Client } = require('pg');
require('dotenv').config();

async function checkLeaveManagementDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, // Connect directly to the leave_management database
  });

  try {
    console.log('Connecting to leave_management database...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Port: ${process.env.DB_PORT}`);
    console.log(`User: ${process.env.DB_USERNAME}`);
    console.log(`Database: ${process.env.DB_DATABASE}`);
    
    await client.connect();
    console.log('Connected to leave_management database successfully!');
    
    // List all tables in the database
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    
    console.log('Tables in the database:');
    if (result.rows.length > 0) {
      result.rows.forEach(row => {
        console.log(`- ${row.table_name}`);
      });
    } else {
      console.log('No tables found in the database.');
    }
  } catch (error) {
    console.error('Error connecting to leave_management database:', error);
  } finally {
    await client.end();
  }
}

checkLeaveManagementDatabase();