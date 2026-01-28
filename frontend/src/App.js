import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import OwnerSignup from './components/OwnerSignup';
import OwnerLogin from './components/OwnerLogin';
import Home from './components/Home';
import HostelDetails from './components/HostelDetails';
import BookNow from './components/BookNow';
import BookingConfirmation from './components/BookingConfirmation';
import UserDashboard from './components/UserDashboard';
import OwnerDashboard from './components/OwnerDashboard';
import ListHostel from './components/ListHostel';
import UserLayout from './components/UserLayout';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = sessionStorage.getItem('token');
    const userData = sessionStorage.getItem('user');

    // If old demo token is detected, clear everything
    if (token === 'demo-token-123') {
      console.warn('Old demo token detected! Clearing sessionStorage...');
      sessionStorage.clear();
      setUser(null);
      setLoading(false);
      return;
    }

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
        sessionStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    // Clear any old data first
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    // Set new user data
    setUser(userData);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Loading RoomRadar...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup onLogin={handleLogin} /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={user ? (
            <UserLayout user={user} onLogout={handleLogout}>
              <Home user={user} />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/about"
          element={
            <UserLayout user={user} onLogout={handleLogout}>
              <AboutUs user={user} />
            </UserLayout>
          }
        />
        <Route
          path="/hostel/:id"
          element={user ? (
            <UserLayout user={user} onLogout={handleLogout}>
              <HostelDetails user={user} />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/book/:id"
          element={user ? (
            <UserLayout user={user} onLogout={handleLogout}>
              <BookNow user={user} />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/booking/confirmation/:id"
          element={user ? (
            <UserLayout user={user} onLogout={handleLogout}>
              <BookingConfirmation user={user} />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/dashboard"
          element={user ? (
            <UserLayout user={user} onLogout={handleLogout}>
              <UserDashboard user={user} />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )}
        />

        {/* Public Owner Routes */}
        <Route
          path="/owner/login"
          element={!user ? <OwnerLogin onLogin={handleLogin} /> : <Navigate to={user.role === 'OWNER' ? '/owner/dashboard' : '/'} />}
        />
        <Route
          path="/owner/signup"
          element={!user ? <OwnerSignup onLogin={handleLogin} /> : <Navigate to={user.role === 'OWNER' ? '/owner/dashboard' : '/'} />}
        />

        {/* Protected Owner Routes */}
        <Route
          path="/owner/dashboard"
          element={user && (user.role === 'OWNER' || user.role === 'ADMIN') ? <OwnerDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />
        <Route
          path="/list-hostel"
          element={user && (user.role === 'OWNER' || user.role === 'ADMIN') ? <ListHostel user={user} onLogout={handleLogout} /> : <Navigate to="/" />}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
