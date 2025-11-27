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

// Real hostel data
const realHostels = require('./data/hostels');

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
  const { search, city, minPrice, maxPrice, genderPreference, roomType, sortBy = 'rating', sortOrder = 'desc' } = req.query;
  
  let filteredHostels = [...realHostels];
  
  // Apply filters
  if (search) {
    filteredHostels = filteredHostels.filter(h => 
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.area.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (city) {
    filteredHostels = filteredHostels.filter(h => h.city.toLowerCase().includes(city.toLowerCase()));
  }
  
  if (minPrice) {
    filteredHostels = filteredHostels.filter(h => h.monthlyRent >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    filteredHostels = filteredHostels.filter(h => h.monthlyRent <= parseInt(maxPrice));
  }
  
  if (genderPreference) {
    filteredHostels = filteredHostels.filter(h => h.genderPreference === genderPreference);
  }
  
  if (roomType) {
    filteredHostels = filteredHostels.filter(h => h.roomType === roomType);
  }
  
  // Apply sorting
  filteredHostels.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (sortOrder === 'desc') {
      return bVal > aVal ? 1 : -1;
    } else {
      return aVal > bVal ? 1 : -1;
    }
  });
  
  res.json({
    hostels: filteredHostels,
    pagination: {
      page: 1,
      limit: 10,
      total: filteredHostels.length,
      pages: 1
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});