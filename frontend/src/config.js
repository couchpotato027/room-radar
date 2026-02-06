// API Configuration for Room Radar
const config = {
  API_URL: process.env.REACT_APP_API_URL ||
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3001'
      : 'https://room-radar-7t3y.onrender.com')
};

export default config;