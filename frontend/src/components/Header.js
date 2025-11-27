import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">RoomRadar</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Find Hostels
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              List Property
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
              Help
            </a>
          </nav>

          {/* User Menu */}
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-sm">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user.name}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-primary-600 text-sm font-medium transition-colors">
                Sign in
              </button>
              <button className="btn-primary">
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;