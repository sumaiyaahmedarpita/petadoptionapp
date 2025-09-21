console.log('Testing individual requires...');

try {
  console.log('1. Testing pets...');
  const petRoutes = require('./pets');
  console.log('✓ pets loaded');
} catch (err) {
  console.error('✗ Error loading pets:', err.message);
}

try {
  console.log('2. Testing auth...');
  const authRoutes = require('./auth');
  console.log('✓ auth loaded');
} catch (err) {
  console.error('✗ Error loading auth:', err.message);
}

try {
  console.log('3. Testing pendingPets...');
  const pendingPetsRoutes = require('./routes/pendingPets');
  console.log('✓ pendingPets loaded');
} catch (err) {
  console.error('✗ Error loading pendingPets:', err.message);
}