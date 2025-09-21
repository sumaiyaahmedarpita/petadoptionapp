// updatePetsStatus.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/petadoption', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const petSchema = new mongoose.Schema({}, { strict: false }); // loose schema so we don't care about full definition
const Pet = mongoose.model('Pet', petSchema, 'pets'); // explicitly target 'pets' collection

async function updatePets() {
  try {
    const result = await Pet.updateMany(
      { status: { $exists: false } }, // only pets without status
      { $set: { status: 'available' } }
    );
    console.log(`Updated ${result.modifiedCount} pet(s)`);
  } catch (error) {
    console.error('Error updating pets:', error);
  } finally {
    mongoose.connection.close();
  }
}

updatePets();

