const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://room-radar-backend.onrender.com' 
    : 'http://localhost:3001'
};

export default config;