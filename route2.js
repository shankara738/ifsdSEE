const prompt=require('prompt-sync')();
const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb+srv://shankaragoudarpbsc22:shankar123@cluster0.wrulo80.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'mydatabase';

// Function to calculate the total cost of the trip
const calculateTotalCost = (legs) => {
  let totalCost = 0;
  for (const leg of legs) {
    totalCost += leg.cost;
  }
  return totalCost;
};

// Function to create a new route
const createRoute = async (legs) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Create a new document in the "routes" collection
    const route = {
      legs: legs,
      totalCost: calculateTotalCost(legs)
    };
    const result = await db.collection('routes').insertOne(route);

    console.log('Route created:');
    console.log(result.ops[0]);
  } catch (err) {
    console.error('Error creating route:', err);
  } finally {
    client.close();
  }
};

// Function to read a route by its ID
const readRoute = async (routeId) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Find the route by its ID
    const route = await db.collection('routes').findOne({ _id: routeId });

    console.log('Route found:');
    console.log(route);
  } catch (err) {
    console.error('Error reading route:', err);
  } finally {
    client.close();
  }
};

// Function to update the legs of a route
const updateRouteLegs = async (routeId, newLegs) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Update the legs and total cost of the route
    const updatedRoute = {
      $set: {
        legs: newLegs,
        totalCost: calculateTotalCost(newLegs)
      }
    };
    const result = await db
      .collection('routes')
      .updateOne({ _id: routeId }, updatedRoute);

    console.log('Route updated:');
    console.log(result);
  } catch (err) {
    console.error('Error updating route:', err);
  } finally {
    client.close();
  }
};

// Function to delete a route by its ID
const deleteRoute = async (routeId) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db(dbName);

    // Delete the route by its ID
    const result = await db.collection('routes').deleteOne({ _id: routeId });

    console.log('Route deleted:');
    console.log(result);
  } catch (err) {
    console.error('Error deleting route:', err);
  } finally {
    client.close();
  }
};

// Usage example
const exampleRoute = {
  legs: [
    { cities: ['City A', 'City B'], cost: 100 },
    { cities: ['City B', 'City C'], cost: 150 },
    { cities: ['City C', 'City D'], cost: 200 }
  ]
};

// Create a new route
createRoute(exampleRoute.legs);

// Read the route by its ID
const routeId = '60c0c6db4f312024f0a8a146'; // Replace with the actual route ID
readRoute(routeId);
