import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Logo from './Logo';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${config.API_URL}/api/auth/login`, formData);
      onLogin(response.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
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
            Welcome Back
          </h1>
          <p className="text-white/80 text-lg">
            Sign in to your RoomRadar account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20 mb-6">
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
              />
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
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Switch to Signup */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
          <p className="text-white/90 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white font-semibold underline hover:text-white/80">
              Create Account
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="text-center mt-8 text-white/70 text-sm">
          <p>🏠 Trusted by 50,000+ students across India</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
