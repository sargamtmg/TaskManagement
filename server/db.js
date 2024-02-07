// db.js
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017/taskManagement'; 

// Create a new MongoClient
const client = new MongoClient(uri);

// Connect to the MongoDB server
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(); // Replace 'your-database-name' with your actual database name
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

module.exports = connectToMongoDB;