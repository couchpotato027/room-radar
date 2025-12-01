import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Header = ({ user, onLogout }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <Logo />
            <h1 className="text-2xl font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">RoomRadar</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Browse Hostels
            </Link>
            <Link 
              to="/list-hostel" 
              className={`transition-colors ${
                isActive('/list-hostel')
                  ? 'text-indigo-600 font-semibold'
                  : 'text-gray-700 hover:text-indigo-600 font-medium'
              }`}
            >
              List Your Hostel
            </Link>
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-indigo-600 font-semibold'
                      : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  My Bookings
                </Link>
                {user.role === 'OWNER' && (
                  <Link 
                    to="/owner/dashboard" 
                    className={`font-medium transition-colors ${
                      isActive('/owner/dashboard')
                        ? 'text-indigo-600 font-semibold'
                        : 'text-gray-700 hover:text-indigo-600'
                    }`}
                  >
                    Owner Dashboard
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to="/list-hostel"
                  className="md:hidden px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-semibold"
                >
                  List Hostel
                </Link>
                <span className="text-sm text-gray-600 hidden sm:inline">Hi, {user.name}</span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
