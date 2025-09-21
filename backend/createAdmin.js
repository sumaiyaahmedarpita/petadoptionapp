// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/petadoption');

    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const password = 'yourAdminPassword'; // change this
    const passwordHash = await bcrypt.hash(password, 10);

    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      passwordHash,
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

createAdmin();
