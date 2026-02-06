import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Button from './ui/Button';

const Header = ({ user, onLogout }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${isActive(path)
      ? 'text-stone-900 border-b-2 border-amber-600'
      : 'text-stone-500 hover:text-stone-900'
    }`;

  const NavLinks = () => (
    <>
      {(!user || user.role !== 'ADMIN') && (
        <Link to="/" className={navLinkClass('/')} onClick={() => setMobileMenuOpen(false)}>Browse</Link>
      )}
      {user && (user.role === 'OWNER' || user.role === 'ADMIN') && (
        <Link to="/list-hostel" className={navLinkClass('/list-hostel')} onClick={() => setMobileMenuOpen(false)}>List Property</Link>
      )}
      {user && (
        <>
          {user.role !== 'OWNER' && user.role !== 'ADMIN' && (
            <Link to="/dashboard" className={navLinkClass('/dashboard')} onClick={() => setMobileMenuOpen(false)}>My Bookings</Link>
          )}
          {(user.role === 'OWNER' || user.role === 'ADMIN') && (
            <Link to="/owner/dashboard" className={navLinkClass('/owner/dashboard')} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          )}
        </>
      )}
      {(!user || user.role !== 'ADMIN') && (
        <Link to="/about" className={navLinkClass('/about')} onClick={() => setMobileMenuOpen(false)}>About</Link>
      )}
    </>
  );

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-7 h-7 text-stone-900" />
            <span className="text-xl font-bold text-stone-900 tracking-tight">RoomRadar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLinks />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-stone-900">{user.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-amber-700 font-semibold uppercase tracking-wide">{user.role}</span>
                </div>
                <Button variant="outline" size="sm" onClick={onLogout}>Sign Out</Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">Sign In</Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-stone-600 hover:text-stone-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-stone-100 flex flex-col gap-4">
            <NavLinks />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
