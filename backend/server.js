const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

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

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Room Radar API Server is running!', status: 'OK' });
});

// Authentication Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ userId: 1, email, role: 'USER' }, process.env.JWT_SECRET);
    
    res.json({ 
      token, 
      user: { 
        id: 1, 
        name, 
        email, 
        role: 'USER' 
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
    
    const token = jwt.sign({ userId: 1, email, role: 'USER' }, process.env.JWT_SECRET);
    
    res.json({ 
      token, 
      user: { 
        id: 1, 
        name: 'Demo User', 
        email, 
        role: 'USER' 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Hostel Routes
app.get('/api/hostels', (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    res.json({
      hostels: sampleHostels,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: sampleHostels.length,
        pages: 1
      }
    });
  } catch (error) {
    console.error('Get hostels error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});