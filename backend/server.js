const express = require('express');
const cors = require('cors');

const app = express();

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
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Sample data
const sampleHostels = [
  {
    id: 1,
    name: "Green Valley Hostel",
    city: "Delhi",
    monthlyRent: 8000,
    genderPreference: "MIXED",
    roomType: "SHARED",
    wifi: true,
    ac: true,
    mess: true,
    averageRating: 4.2,
    reviewCount: 15
  },
  {
    id: 2,
    name: "Student Paradise",
    city: "Mumbai",
    monthlyRent: 12000,
    genderPreference: "MALE",
    roomType: "SINGLE",
    wifi: true,
    ac: false,
    mess: true,
    averageRating: 4.5,
    reviewCount: 23
  }
];

app.get('/', (req, res) => {
  res.json({ message: 'Room Radar API Server is running!', status: 'OK' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working!', timestamp: new Date().toISOString() });
});

app.post('/test-signup', (req, res) => {
  res.json({ message: 'Test signup working!', body: req.body });
});

app.post('/api/auth/signup', (req, res) => {
  try {
    console.log('Signup request received:', req.body);
    const { name, email, password } = req.body;
    
    const response = { 
      token: 'demo-token-123', 
      user: { 
        id: 1, 
        name: name || 'Demo User', 
        email: email || 'demo@example.com', 
        role: 'USER' 
      } 
    };
    
    console.log('Sending response:', response);
    res.status(200).json(response);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  
  res.json({ 
    token: 'demo-token-123', 
    user: { 
      id: 1, 
      name: 'Demo User', 
      email: email || 'demo@example.com', 
      role: 'USER' 
    } 
  });
});

app.get('/api/hostels', (req, res) => {
  res.json({
    hostels: sampleHostels,
    pagination: {
      page: 1,
      limit: 10,
      total: sampleHostels.length,
      pages: 1
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});