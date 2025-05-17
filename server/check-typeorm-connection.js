require('dotenv').config();
const { Client } = require('pg');

async function checkTypeORMConnection() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  try {
    console.log('Initializing database connection...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Port: ${process.env.DB_PORT}`);
    console.log(`User: ${process.env.DB_USERNAME}`);
    console.log(`Database: ${process.env.DB_DATABASE}`);
    
    await client.connect();
    console.log('Database connection initialized successfully!');
    
    // Run a simple query
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
      LIMIT 5;
    `);
    
    console.log('Sample tables in the database:');
    result.rows.forEach(row => {
      console.log(`- ${row.table_name}`);
    });
    
    await client.end();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error initializing database connection:', error);
  }
}

checkTypeORMConnection();