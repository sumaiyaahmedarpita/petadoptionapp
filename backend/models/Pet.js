const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: String,
  type: String,
  age: Number,
  description: String,
  image: String,
  adopted: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'available', 'adopted'], default: 'pending' },
  dateAdded: { type: Date, default: Date.now },
  shelter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // optional
});

module.exports = mongoose.models.Pet || mongoose.model('Pet', petSchema);
