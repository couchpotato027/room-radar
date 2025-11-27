import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // You could verify the token here
      // For now, we'll just assume it's valid
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="app">
        <div className="auth-container">
          <div className="auth-card">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto'
              }}></div>
              <p style={{ marginTop: '1rem', color: '#718096' }}>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1 className="logo">🏠 Room Radar</h1>
            <div className="user-info">
              <span>Welcome back, {user.name}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Sign Out
              </button>
            </div>
          </div>
        </header>
        
        <Dashboard user={user} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🏠 Room Radar</h1>
        </div>
      </header>
      
      {isLogin ? (
        <Login onLogin={handleLogin} switchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup onLogin={handleLogin} switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;