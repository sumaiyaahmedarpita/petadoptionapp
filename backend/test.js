console.log('Testing require...');
try {
  const pendingPetsRoutes = require('./routes/pendingPets');
  console.log('Route loaded successfully!');
} catch (err) {
  console.error('Error loading route:', err.message);
  console.error('Full error:', err);
}