require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Read MongoDB URI from environment for safety. Replace in .env with the connection string
// you copied from MongoDB Atlas (or use your local URI).
const url = process.env.MONGODB_URI || 'mongodb+srv://StayVesta:StayVesta09@stay-vesta.otlfdad.mongodb.net/?appName=Stay-Vesta';

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