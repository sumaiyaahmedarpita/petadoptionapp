// Test script to verify models load correctly
console.log('Testing model imports...');

try {
  // Test Pet model
  const Pet = require('./models/Pet');
  console.log('✓ Pet model loaded successfully');
  
  // Test User model
  const User = require('./models/user');
  console.log('✓ User model loaded successfully');
  
  // Test Application model
  const Application = require('./models/Application');
  console.log('✓ Application model loaded successfully');
  
  // Test loading Pet model again (should not cause error)
  const Pet2 = require('./models/Pet');
  console.log('✓ Pet model loaded again without error');
  
  // Test pending pets route
  const pendingPetsRoute = require('./routes/pendingPets');
  console.log('✓ Pending pets route loaded successfully');
  
  console.log('\n✓ All models and routes loaded successfully!');
  
} catch (error) {
  console.error('✗ Error:', error.message);
  process.exit(1);
}