const prompt=require("prompt-sync")();

const mongoose = require('mongoose');

// Connection URL and database name
const url = 'mongodb+srv://shankaragoudarpbsc22:s6360589432@cluster0.wrulo80.mongodb.net/?retryWrites=true&w=majority';
// Schema for household documents
const householdSchema = new mongoose.Schema({
  consumption: {
    type: Number,
    required: true
  }
});

// Model for household collection
const Household = mongoose.model('Household', householdSchema);

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Insert a new household document
    const newHousehold = new Household({ consumption: 350 });
    newHousehold.save()
      .then(() => {
        console.log('Household document inserted:', newHousehold._id);

        // Update a household document
        const householdId = newHousehold._id;
        const newConsumption = 400;
        Household.findByIdAndUpdate(householdId, { consumption: newConsumption })
          .then(() => {
            console.log('Household document updated:', householdId);

            // Delete a household document
            Household.findByIdAndDelete(householdId)
              .then(() => {
                console.log('Household document deleted:', householdId);

                // Find the average monthly consumption
                Household.aggregate([
                  {
                    $group: {
                      _id: null,
                      averageConsumption: { $avg: "$consumption" }
                    }
                  }
                ])
                  .then((result) => {
                    const averageConsumption = result[0].averageConsumption;
                    console.log('Average monthly electricity consumption:', averageConsumption);

                    // Close the MongoDB connection
                    mongoose.connection.close();
                  })
                  .catch((error) => {
                    console.error('Error finding average consumption:', error);
                    mongoose.connection.close();
                  });
              })
              .catch((error) => {
                console.error('Error deleting household document:', error);
                mongoose.connection.close();
              });
          })
          .catch((error) => {
            console.error('Error updating household document:', error);
            mongoose.connection.close();
          });
      })
      .catch((error) => {
        console.error('Error inserting household document:', error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
