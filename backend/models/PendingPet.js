const mongoose = require('mongoose');

const pendingPetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: String,
  type: String,
  age: Number,
  description: String,
  image: String,
  dateAdded: { type: Date, default: Date.now },
  shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Explicitly specify collection name 'pendingPets'
module.exports = mongoose.models.PendingPet || mongoose.model('PendingPet', pendingPetSchema, 'pendingPets');
