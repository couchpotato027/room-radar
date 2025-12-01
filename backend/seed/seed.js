require('dotenv').config();
const mongoose = require('mongoose');
const Hostel = require('../models/Hostel');
const User = require('../models/User');
const hostels = require('./hostels');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roomradar');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedHostels = async () => {
  try {
    // Clear existing hostels
    await Hostel.deleteMany({});
    console.log('Cleared existing hostels');

    // Create a default owner user if not exists
    let owner = await User.findOne({ email: 'owner@roomradar.com' });
    if (!owner) {
      owner = await User.create({
        name: 'Default Owner',
        email: 'owner@roomradar.com',
        password: 'password123',
        role: 'OWNER'
      });
      console.log('Created default owner');
    }

    // Insert hostels with owner reference
    const hostelsWithOwner = hostels.map(hostel => ({
      ...hostel,
      ownerId: owner._id
    }));

    await Hostel.insertMany(hostelsWithOwner);
    console.log(`✅ Seeded ${hostels.length} hostels successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding hostels:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedHostels();
};

runSeed();

