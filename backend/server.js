require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const Hostel = require('./models/Hostel');
const User = require('./models/User');
const bookingRoutes = require('./routes/bookings');
const hostelRoutes = require('./routes/hostels');
const auth = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.query);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Room Radar API Server is running!', status: 'OK' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working!', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'USER' } = req.body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required (name, email, password)' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Validate name
    if (name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters long' });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists. Please login instead.' });
    }

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      role: role.toUpperCase()
    });

    // Generate JWT token with user ID
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle duplicate email error (MongoDB unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'User with this email already exists. Please login instead.' });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errorMessage = Object.values(error.errors).map(e => e.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }
    
    // Generic server error
    res.status(500).json({ 
      error: 'Failed to create account. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // For demo, create a user if doesn't exist
      const newUser = await User.create({
        name: email.split('@')[0],
        email: email.toLowerCase(),
        password: password || 'password123',
        role: 'USER'
      });
      
      // Generate JWT token with user ID
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );

      return res.json({
        token,
        user: {
          id: newUser._id,
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password || 'password123');
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token with user ID
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get cities and areas
app.get('/api/locations', async (req, res) => {
  try {
    const cities = await Hostel.distinct('city');
    const locations = {};

    for (const city of cities) {
      const areas = await Hostel.distinct('area', { city });
      locations[city] = areas;
    }

    res.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Hostels routes with pagination, filtering, sorting
app.get('/api/hostels', async (req, res) => {
  try {
    const {
      search,
      city,
      area,
      minPrice,
      maxPrice,
      genderPreference,
      roomType,
      sortBy = 'rating',
      sortOrder = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    const query = { isActive: true };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // City filter
    if (city && city !== 'All Cities') {
      query.city = new RegExp(city, 'i');
    }

    // Area filter
    if (area) {
      query.area = new RegExp(area, 'i');
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.monthlyRent = {};
      if (minPrice) query.monthlyRent.$gte = parseInt(minPrice);
      if (maxPrice) query.monthlyRent.$lte = parseInt(maxPrice);
    }

    // Gender preference
    if (genderPreference) {
      query.genderPreference = genderPreference;
    }

    // Room type
    if (roomType) {
      query.roomType = roomType;
    }

    // Build sort options
    const sortOptions = {};
    if (sortBy === 'price' || sortBy === 'monthlyRent') {
      sortOptions.monthlyRent = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'rating') {
      sortOptions.rating = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'reviewCount') {
      sortOptions.reviewCount = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    // If text search, add text score
    if (search) {
      sortOptions.score = { $meta: 'textScore' };
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [hostels, total] = await Promise.all([
      Hostel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Hostel.countDocuments(query)
    ]);

    res.json({
      hostels,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching hostels:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single hostel
app.get('/api/hostels/:id', async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id).lean();
    
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    res.json(hostel);
  } catch (error) {
    console.error('Error fetching hostel:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Booking routes
app.use('/api/bookings', bookingRoutes);

// Hostel management routes
app.use('/api/hostels', hostelRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
