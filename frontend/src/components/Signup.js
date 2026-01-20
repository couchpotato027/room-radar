import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Logo from './Logo';
import Button from './ui/Button';

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
      const response = await axios.post(`${config.API_URL}/api/auth/signup`, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });
      onLogin(response.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <Link to="/" className="inline-block p-4 rounded-full bg-white shadow-sm mb-6">
            <Logo className="w-10 h-10" />
          </Link>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Create Account</h1>
          <p className="text-gray-500">Join the curated living community</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-secondary-200 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all"
                placeholder="Min. 8 characters"
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2">
                <span className="text-xl">!</span> {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3.5 rounded-xl shadow-none hover:shadow-lg"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-900 hover:text-accent-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
