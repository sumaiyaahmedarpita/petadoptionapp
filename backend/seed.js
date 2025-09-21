const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/petadoption', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Pet = mongoose.model('Pet', new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  description: String,
  image: String
}));

const samplePets = [
  {
    name: 'Luna',
    breed: 'Labrador Retriever',
    age: 3,
    description: 'A friendly and energetic dog who loves to play fetch.',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16'
  },
  {
    name: 'Milo',
    breed: 'Tabby Cat',
    age: 2,
    description: 'Loves napping in sunbeams and chasing laser pointers.',
    image: 'https://images.unsplash.com/photo-1601758123927-1961b6c9f5c7'
  },
  {
    name: 'Bella',
    breed: 'Holland Lop Rabbit',
    age: 1,
    description: 'A calm bunny who enjoys carrots and cuddles.',
    image: 'https://images.unsplash.com/photo-1582727461540-984f6a5fc0ff'
  }
];

Pet.insertMany(samplePets)
  .then(() => {
    console.log('Sample pets inserted');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error inserting pets:', err));
