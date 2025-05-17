const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function updateEnum() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected to database');

    const sql = fs.readFileSync(path.join(__dirname, 'update-enum.sql'), 'utf8');
    console.log('Executing SQL:', sql);
    
    await client.query(sql);
    console.log('Enum updated successfully');
  } catch (error) {
    console.error('Error updating enum:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

updateEnum();