import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Button from './ui/Button';

const Header = ({ user, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${isActive(path)
      ? 'text-primary-900 border-b-2 border-accent-500'
      : 'text-gray-500 hover:text-primary-900'
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo className="w-8 h-8 text-primary-900" />
            <span className="text-2xl font-bold text-primary-900 tracking-tight">RoomRadar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLinkClass('/')}>Browse</Link>
            <Link to="/list-hostel" className={navLinkClass('/list-hostel')}>List Property</Link>
            {user && (
              <>
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>My Bookings</Link>
                {user.role === 'OWNER' && (
                  <Link to="/owner/dashboard" className={navLinkClass('/owner/dashboard')}>Dashboard</Link>
                )}
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600 hidden sm:block">
                  {user.name.split(' ')[0]}
                </span>
                <Button variant="outline" size="sm" onClick={onLogout} className="rounded-full">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="md" className="rounded-full px-8 shadow-none hover:shadow-lg">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
