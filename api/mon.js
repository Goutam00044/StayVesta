require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Read the MongoDB URI from environment for safety.
const url = process.env.MONGODB_URI;

if (!url) {
  throw new Error('MONGODB_URI is not set. Add it to your .env file before running this script.');
}

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function main() {
  try {
    await client.connect();
    // Ping the server to confirm connection
    await client.db('admin').command({ ping: 1 });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:');
    console.error(error);
  } finally {
    await client.close();
  }
}

main();