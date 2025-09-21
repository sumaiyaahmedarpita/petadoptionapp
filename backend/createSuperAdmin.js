const mongoose = require('mongoose');
const User = require('./models/user'); // adjust path if needed
const bcrypt = require('bcrypt');

async function createSuperAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourdbname', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await User.findOne({ username: 'superadmin' });
    if (existing) {
      console.log('Super-admin user already exists.');
      mongoose.connection.close();
      return;
    }

    const password = 'SuperSecret123'; // change to your preferred password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const superAdmin = new User({
      username: 'superadmin',
      email: 'superadmin@example.com',
      passwordHash,
      role: 'super-admin',
    });

    await superAdmin.save();
    console.log('Super-admin user created successfully.');
    console.log('Username: superadmin');
    console.log(`Password: ${password}`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating super-admin:', error);
  }
}

createSuperAdmin();
