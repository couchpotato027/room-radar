// Determine API URL based on environment
const getApiUrl = () => {
  // HARDCODED: Always use correct backend URL in production
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1' &&
                       !window.location.hostname.includes('localhost');
  
  if (isProduction) {
    // Force correct backend URL
    return 'https://room-radar-7t3y.onrender.com';
  }
  
  // Development: use local backend
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