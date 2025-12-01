import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Logo from './Logo';

const Signup = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${config.API_URL}/api/auth/signup`, formData);
      onLogin(response.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mx-auto mb-6">
            <Logo size="xl" className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Join RoomRadar
          </h1>
          <p className="text-white/80 text-lg">
            Create your account and start exploring
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20 mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                placeholder="Create a strong password"
              />
              <p className="text-gray-500 text-xs mt-1">
                Must be at least 8 characters long
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        {/* Benefits */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <h3 className="text-white font-semibold text-base mb-4">
            Why join RoomRadar?
          </h3>
          <ul className="text-white/90 text-sm space-y-2">
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Access to verified hostels across India</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Transparent pricing with no hidden fees</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Real reviews from genuine residents</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✓</span>
              <span>Easy booking and expense management</span>
            </li>
          </ul>
        </div>

        {/* Switch to Login */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
          <p className="text-white/90 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-white font-semibold underline hover:text-white/80">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
