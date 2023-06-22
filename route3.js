const prompt=require('prompt-sync')();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://shankaragoudarpbsc22:shankar123@cluster0.wrulo80.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema for a leg
const legSchema = new mongoose.Schema({
  cities: [String],
  cost: Number,
});

// Define the schema for a route
const routeSchema = new mongoose.Schema({
  legs: [legSchema],
  totalCost: Number,
});

// Define the Route model
const Route = mongoose.model('Route', routeSchema);

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
  try {
    const route = new Route({
      legs: legs,
      totalCost: calculateTotalCost(legs),
    });
    const savedRoute = await route.save();
    console.log('Route created:');
    console.log(savedRoute);
  } catch (err) {
    console.error('Error creating route:', err);
  }
};

// Function to read a route by its ID
const readRoute = async (routeId) => {
  try {
    const route = await Route.findById(routeId);
    console.log('Route found:');
    console.log(route);
  } catch (err) {
    console.error('Error reading route:', err);
  }
};

// Function to update the legs of a route
const updateRouteLegs = async (routeId, newLegs) => {
  try {
    const updatedRoute = {
      legs: newLegs,
      totalCost: calculateTotalCost(newLegs),
    };
    const result = await Route.findByIdAndUpdate(routeId, updatedRoute);
    console.log('Route updated:');
    console.log(result);
  } catch (err) {
    console.error('Error updating route:', err);
  }
};

// Function to delete a route by its ID
const deleteRoute = async (routeId) => {
  try {
    const result = await Route.findByIdAndDelete(routeId);
    console.log('Route deleted:');
    console.log(result);
  } catch (err) {
    console.error('Error deleting route:', err);
  }
};

// Usage example
const exampleRoute = {
  legs: [
    { cities: ['City A', 'City B'], cost: 100 },
    { cities: ['City B', 'City C'], cost: 150 },
    { cities: ['City C', 'City D'], cost: 200 },
  ],
};

// Create a new route
createRoute(exampleRoute.legs);

// Read the route by its ID
const routeId = '60c0c6db4f312024f0a8a146'; // Replace with the actual route ID
readRoute(routeId);
