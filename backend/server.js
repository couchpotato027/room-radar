const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['https://room-radar-wheat.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

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

app.post('/api/auth/signup', (req, res) => {
  console.log('Signup request received:', req.body);
  const { name, email, password } = req.body;
  
  res.json({ 
    token: 'demo-token-123', 
    user: { 
      id: 1, 
      name: name || 'Demo User', 
      email: email || 'demo@example.com', 
      role: 'USER' 
    } 
  });
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