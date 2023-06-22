const express = require('express');
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// Define MongoDB connection URI and options
const mongoURI = 'mongodb+srv://shankaragoudarpbsc22:shankar123@cluster0.wrulo80.mongodb.net/?retryWrites=true&w=majority';
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create City schema
const citySchema = new mongoose.Schema({
  name: String,
});

// Create Leg schema
const legSchema = new mongoose.Schema({
  source: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  cost: Number,
});

// Create Route schema
const routeSchema = new mongoose.Schema({
  legs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Leg' }],
});

// Create City model
const City = mongoose.model('City', citySchema);

// Create Leg model
const Leg = mongoose.model('Leg', legSchema);

// Create Route model
const Route = mongoose.model('Route', routeSchema);

// Initialize Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    main();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Function to prompt user for input
function promptInput(message) {
  return prompt(message);
}

// Main function to handle user input and save the route
async function main() {
  try {
    const route = new Route();

    const numLegs = parseInt(promptInput("Enter the number of legs in the route:"));

    for (let i = 0; i < numLegs; i++) {
      const sourceCity = promptInput(`Enter the source city for leg ${i + 1}:`);
      const destinationCity = promptInput(`Enter the destination city for leg ${i + 1}:`);
      const cost = parseFloat(promptInput(`Enter the cost for leg ${i + 1}:`));

      const leg = new Leg({
        source: await City.findOne({ name: sourceCity }),
        destination: await City.findOne({ name: destinationCity }),
        cost: cost,
      });

      route.legs.push(leg);
    }

    const savedRoute = await route.save();

    console.log('Route saved successfully:');
    console.log(savedRoute);
  } catch (error) {
    console.error('Failed to save the route', error);
  } finally {
    mongoose.disconnect();
  }
}

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
