// Determine API URL based on environment
const getApiUrl = () => {
  // If environment variable is set, use it (highest priority)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Check if we're in production (Vercel, Netlify, etc.)
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1' &&
                       !window.location.hostname.includes('localhost');
  
  // If in production, use production backend
  if (isProduction) {
    return 'https://room-radar-7t3y.onrender.com';
  }
  
  // Otherwise, use local backend for development
  return 'http://localhost:3001';
};

const config = {
  API_URL: getApiUrl()
};

// Log for debugging
console.log('API URL configured:', config.API_URL);
console.log('Hostname:', window.location.hostname);
console.log('Is production:', window.location.hostname !== 'localhost');

export default config;