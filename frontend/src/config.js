// Determine API URL based on environment
const getApiUrl = () => {
  // If environment variable is set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // If running on localhost, use local backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }
  
  // Otherwise, use production backend
  return 'https://room-radar-7t3y.onrender.com';
};

const config = {
  API_URL: getApiUrl()
};

// Log for debugging (remove in production)
if (process.env.NODE_ENV === 'development') {
  console.log('API URL:', config.API_URL);
}

export default config;