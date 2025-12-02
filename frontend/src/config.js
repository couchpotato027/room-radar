const config = {
  // Use environment variable if set, otherwise use production backend
  API_URL: process.env.REACT_APP_API_URL || 
           (window.location.hostname === 'localhost' 
             ? 'http://localhost:3001' 
             : 'https://room-radar-7t3y.onrender.com')
};

export default config;