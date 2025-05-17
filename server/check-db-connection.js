const { Client } = require('pg');
require('dotenv').config();

async function checkDatabaseConnection() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // Connect to the default postgres database first
  });

  try {
    console.log('Connecting to PostgreSQL...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Port: ${process.env.DB_PORT}`);
    console.log(`User: ${process.env.DB_USERNAME}`);
    
    await client.connect();
    console.log('Connected to PostgreSQL successfully!');
    
    // Check if the leave_management database exists
    const result = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_DATABASE}'
    `);
    
    if (result.rows.length > 0) {
      console.log(`Database '${process.env.DB_DATABASE}' exists!`);
    } else {
      console.log(`Database '${process.env.DB_DATABASE}' does not exist.`);
      console.log('Creating database...');
      
      // Create the database
      await client.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
      console.log(`Database '${process.env.DB_DATABASE}' created successfully!`);
    }
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  } finally {
    await client.end();
  }
}

checkDatabaseConnection();