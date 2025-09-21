const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const petRoutes = require('./pets');
const authRoutes = require('./auth');
const pendingPetsRoutes = require('./routes/pendingPets');

const app = express(); // <-- this must come BEFORE app.use(...)

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/pendingPets', pendingPetsRoutes); // <-- this should come after app is defined

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/petadoption')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Serve index.html for root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
