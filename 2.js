const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb+srv://shankaragoudarpbsc22:s6360589432@cluster0.wrulo80.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'householdDB';

// Collection name
const collectionName = 'households';

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Function to insert a new household document
async function insertHouseholdDocument(collection, consumption) {
  try {
    const result = await collection.insertOne({ consumption });
    console.log("Household document inserted:", result.insertedId);
  } catch (error) {
    console.error("Error inserting household document:", error);
  }
}

// Function to update a household document
async function updateHouseholdDocument(collection, householdId, newConsumption) {
  try {
    const result = await collection.updateOne({ _id: householdId }, { $set: { consumption: newConsumption } });
    console.log("Household document updated:", result.modifiedCount);
  } catch (error) {
    console.error("Error updating household document:", error);
  }
}

// Function to delete a household document
async function deleteHouseholdDocument(collection, householdId) {
  try {
    const result = await collection.deleteOne({ _id: householdId });
    console.log("Household document deleted:", result.deletedCount);
  } catch (error) {
    console.error("Error deleting household document:", error);
  }
}

// Function to find the average monthly consumption of all households
async function findAverageConsumption(collection) {
  try {
    const cursor = await collection.find();
    let totalConsumption = 0;
    let count = 0;

    await cursor.forEach((document) => {
      totalConsumption += document.consumption;
      count++;
    });

    const averageConsumption = totalConsumption / count;
    console.log("Average monthly electricity consumption:", averageConsumption);
  } catch (error) {
    console.error("Error finding average consumption:", error);
  }
}

// Main function to perform CRUD operations
async function main() {
  // Connect to MongoDB
  const collection = await connectToMongoDB();

  // Insert a new household document
  await insertHouseholdDocument(collection, 350);

  // Update a household document
  const householdId = '60cfe7e20b15f4d81f24667d';
  const newConsumption = 400;
  await updateHouseholdDocument(collection, householdId, newConsumption);

  // Delete a household document
  await deleteHouseholdDocument(collection, householdId);

  // Find the average monthly consumption
  await findAverageConsumption(collection);

  // Close the MongoDB connection
  collection.db.client.close();
}

main();
