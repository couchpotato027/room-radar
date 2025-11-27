const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://room-radar-backend.onrender.com' 
    : 'http://localhost:3001'
};

// For immediate deployment, use production URL
// config.API_URL = 'https://room-radar-backend.onrender.com';

export default config;