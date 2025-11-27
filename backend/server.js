const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

let prisma;
try {
  prisma = new PrismaClient();
} catch (error) {
  console.log('Database connection failed, but server will still start');
}

// Sample data for demo
const sampleHostels = [
  {
    id: 1,
    name: "Green Valley Hostel",
    city: "Delhi",
    address: "Sector 15, Noida",
    monthlyRent: 8000,
    genderPreference: "MIXED",
    roomType: "SHARED",
    wifi: true,
    ac: true,
    mess: true,
    averageRating: 4.2,
    reviewCount: 15,
    availableRooms: 5,
    totalRooms: 20
  },
  {
    id: 2,
    name: "Student Paradise",
    city: "Mumbai",
    address: "Andheri West",
    monthlyRent: 12000,
    genderPreference: "MALE",
    roomType: "SINGLE",
    wifi: true,
    ac: false,
    mess: true,
    averageRating: 4.5,
    reviewCount: 23,
    availableRooms: 2,
    totalRooms: 15
  },
  {
    id: 3,
    name: "Tech Hub Residency",
    city: "Bangalore",
    address: "Koramangala",
    monthlyRent: 15000,
    genderPreference: "FEMALE",
    roomType: "SHARED",
    wifi: true,
    ac: true,
    mess: false,
    averageRating: 4.8,
    reviewCount: 31,
    availableRooms: 8,
    totalRooms: 25
  }
];

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Room Radar API Server is running!', status: 'OK' });
});

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!prisma) {
      // Fallback: create user without database
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = jwt.sign({ userId: 1, email, role: 'USER' }, process.env.JWT_SECRET);
      return res.json({ 
        token, 
        user: { 
          id: 1, 
          name, 
          email, 
          role: 'USER' 
        } 
      });
    }
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword
      }
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!prisma) {
      // Fallback: simple login without database
      const token = jwt.sign({ userId: 1, email, role: 'USER' }, process.env.JWT_SECRET);
      return res.json({ 
        token, 
        user: { 
          id: 1, 
          name: 'Demo User', 
          email, 
          role: 'USER' 
        } 
      });
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user.id, 
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

// Hostel Routes
app.get('/api/hostels', async (req, res) => {
  try {
    if (!prisma) {
      const { page = 1, limit = 10 } = req.query;
      return res.json({
        hostels: sampleHostels,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: sampleHostels.length,
          pages: 1
        }
      });
    }

    const { 
      page = 1, 
      limit = 10, 
      search, 
      city, 
      minPrice, 
      maxPrice, 
      genderPreference, 
      roomType,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build where clause
    const where = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search } },
          { city: { contains: search } },
          { address: { contains: search } }
        ]
      }),
      ...(city && { city: { contains: city } }),
      ...(minPrice && { monthlyRent: { gte: parseInt(minPrice) } }),
      ...(maxPrice && { monthlyRent: { lte: parseInt(maxPrice) } }),
      ...(genderPreference && { genderPreference }),
      ...(roomType && { roomType })
    };

    const hostels = await prisma.hostel.findMany({
      where,
      include: {
        owner: {
          select: { name: true, phone: true }
        },
        reviews: {
          select: { rating: true }
        },
        images: {
          select: { url: true }
        }
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: parseInt(limit)
    });

    // Calculate average rating for each hostel
    const hostelsWithRating = hostels.map(hostel => ({
      ...hostel,
      averageRating: hostel.reviews.length > 0 
        ? hostel.reviews.reduce((sum, review) => sum + review.rating, 0) / hostel.reviews.length
        : 0,
      reviewCount: hostel.reviews.length
    }));

    const total = await prisma.hostel.count({ where });

    res.json({
      hostels: hostelsWithRating,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get hostels error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/hostels/:id', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const hostel = await prisma.hostel.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        owner: {
          select: { name: true, phone: true, email: true }
        },
        reviews: {
          include: {
            user: {
              select: { name: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        images: true
      }
    });

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    const averageRating = hostel.reviews.length > 0 
      ? hostel.reviews.reduce((sum, review) => sum + review.rating, 0) / hostel.reviews.length
      : 0;

    res.json({
      ...hostel,
      averageRating,
      reviewCount: hostel.reviews.length
    });
  } catch (error) {
    console.error('Get hostel error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/hostels', authenticateToken, async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    if (req.user.role !== 'OWNER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only owners can create hostels' });
    }

    const hostel = await prisma.hostel.create({
      data: {
        ...req.body,
        ownerId: req.user.userId,
        availableRooms: req.body.totalRooms
      }
    });

    res.status(201).json(hostel);
  } catch (error) {
    console.error('Create hostel error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reviews Routes
app.post('/api/reviews', authenticateToken, async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const { hostelId, rating, comment } = req.body;

    const review = await prisma.review.create({
      data: {
        rating: parseInt(rating),
        comment,
        userId: req.user.userId,
        hostelId: parseInt(hostelId)
      },
      include: {
        user: {
          select: { name: true }
        }
      }
    });

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'You have already reviewed this hostel' });
    }
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Expense Routes
app.post('/api/expenses', authenticateToken, async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const expense = await prisma.expense.create({
      data: {
        ...req.body,
        paidBy: req.user.userId
      }
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/expenses', authenticateToken, async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database not connected' });
    }

    const expenses = await prisma.expense.findMany({
      where: {
        OR: [
          { paidBy: req.user.userId },
          // Add logic for expenses where user is in splitWith array
        ]
      },
      include: {
        payer: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});