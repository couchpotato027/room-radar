require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { connectDB, prisma } = require('./config/db');
const bookingRoutes = require('./routes/bookings');
const hostelRoutes = require('./routes/hostels');
const auth = require('./middleware/auth');

const app = express();

// Connect to Database
connectDB();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://room-radar-wheat.vercel.app',
  'https://room-radar-git-main-priyansh-s-projects-eb60a61d.vercel.app',
  'https://room-radar-44ghhywse-priyansh-s-projects-eb60a61d.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow requests from allowed origins or if no origin (like Postman)
  if (allowedOrigins.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  } else if (process.env.NODE_ENV === 'development') {
    // In development, allow all origins
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).json({
      status: 200,
      message: 'CORS preflight successful'
    });
  }
  
  next();
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
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists. Please login instead.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role.toUpperCase()
      }
    });

    // Generate JWT token with user ID
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle duplicate email error (Prisma unique constraint)
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'User with this email already exists. Please login instead.' });
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
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (!user) {
      // For demo, create a user if doesn't exist
      const hashedPassword = await bcrypt.hash(password || 'password123', 10);
      const newUser = await prisma.user.create({
        data: {
          name: email.split('@')[0],
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'USER'
        }
      });
      
      // Generate JWT token with user ID
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );

      return res.json({
        token,
        user: {
          id: newUser.id,
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password || 'password123', user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token with user ID
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        _id: user.id,
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
    const hostels = await prisma.hostel.findMany({
      where: { isActive: true },
      select: { city: true, area: true }
    });
    
    const locations = {};
    const citySet = new Set();
    
    hostels.forEach(hostel => {
      if (hostel.city) {
        citySet.add(hostel.city);
        if (!locations[hostel.city]) {
          locations[hostel.city] = [];
        }
        if (hostel.area && !locations[hostel.city].includes(hostel.area)) {
          locations[hostel.city].push(hostel.area);
        }
      }
    });

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

    // Build where clause
    const where = { isActive: true };

    // Text search (MySQL search)
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { city: { contains: search } },
        { area: { contains: search } },
        { description: { contains: search } }
      ];
    }

    // City filter
    if (city && city !== 'All Cities') {
      where.city = city;
    }

    // Area filter
    if (area) {
      where.area = area;
    }

    // Price filter
    if (minPrice || maxPrice) {
      where.monthlyRent = {};
      if (minPrice) where.monthlyRent.gte = parseInt(minPrice);
      if (maxPrice) where.monthlyRent.lte = parseInt(maxPrice);
    }

    // Gender preference
    if (genderPreference) {
      where.genderPreference = genderPreference;
    }

    // Room type
    if (roomType) {
      where.roomType = roomType;
    }

    // Build sort options
    const orderBy = {};
    if (sortBy === 'price' || sortBy === 'monthlyRent') {
      orderBy.monthlyRent = sortOrder === 'desc' ? 'desc' : 'asc';
    } else if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'desc' ? 'desc' : 'asc';
    } else if (sortBy === 'reviewCount') {
      orderBy.reviewCount = sortOrder === 'desc' ? 'desc' : 'asc';
    } else {
      orderBy[sortBy] = sortOrder === 'desc' ? 'desc' : 'asc';
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [hostels, total] = await Promise.all([
      prisma.hostel.findMany({
        where,
        orderBy,
        skip,
        take: parseInt(limit),
        include: {
          images: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.hostel.count({ where })
    ]);

    // Transform hostels to match expected format
    const transformedHostels = hostels.map(hostel => ({
      ...hostel,
      _id: hostel.id,
      images: hostel.images.map(img => img.url),
      coordinates: hostel.latitude && hostel.longitude ? {
        lat: hostel.latitude,
        lng: hostel.longitude
      } : undefined,
      amenities: {
        wifi: hostel.wifi,
        ac: hostel.ac,
        mess: hostel.mess,
        laundry: hostel.laundry,
        parking: hostel.parking,
        cctv: hostel.cctv,
        powerBackup: hostel.powerBackup,
        gym: hostel.gym,
        rooftop: hostel.rooftop
      }
    }));

    res.json({
      hostels: transformedHostels,
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
    const hostelId = parseInt(req.params.id);
    if (isNaN(hostelId)) {
      return res.status(400).json({ error: 'Invalid hostel ID' });
    }

    const hostel = await prisma.hostel.findUnique({
      where: { id: hostelId },
      include: {
        images: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });
    
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    // Transform to match expected format
    const transformedHostel = {
      ...hostel,
      _id: hostel.id,
      images: hostel.images.map(img => img.url),
      coordinates: hostel.latitude && hostel.longitude ? {
        lat: hostel.latitude,
        lng: hostel.longitude
      } : undefined,
      amenities: {
        wifi: hostel.wifi,
        ac: hostel.ac,
        mess: hostel.mess,
        laundry: hostel.laundry,
        parking: hostel.parking,
        cctv: hostel.cctv,
        powerBackup: hostel.powerBackup,
        gym: hostel.gym,
        rooftop: hostel.rooftop
      }
    };

    res.json(transformedHostel);
  } catch (error) {
    console.error('Error fetching hostel:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Booking routes
app.use('/api/bookings', bookingRoutes);

// Hostel management routes
app.use('/api/hostels', hostelRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
