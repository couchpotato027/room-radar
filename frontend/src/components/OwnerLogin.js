import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Logo from './Logo';
import Button from './ui/Button';

const OwnerLogin = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${config.API_URL}/api/auth/login`, {
                email: formData.email.trim().toLowerCase(),
                password: formData.password
            });

            // Strict Role Check
            if (response.data.user.role !== 'OWNER') {
                setError('Access denied. This portal is for property owners only.');
                return;
            }

            onLogin(response.data.user, response.data.token);
            navigate('/owner/dashboard');
        } catch (error) {
            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError('Login failed. Please check your credentials.');
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
                    <div className="inline-block px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-bold tracking-wide mb-4">
                        PARTNER PORTAL
                    </div>
                    <h1 className="text-3xl font-bold text-primary-900 mb-2">Owner Sign In</h1>
                    <p className="text-gray-500">Manage your properties and bookings</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-secondary-200 p-8 md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all"
                                placeholder="name@business.com"
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
                                placeholder="Enter your password"
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
                            className="w-full py-3.5 rounded-xl shadow-none hover:shadow-lg bg-gradient-to-r from-accent-600 to-accent-500 border-none"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Access Dashboard'}
                        </Button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <p className="text-gray-500">
                        Don't have a partner account?{' '}
                        <Link to="/owner/signup" className="font-semibold text-primary-900 hover:text-accent-600 transition-colors">
                            Apply to Host
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OwnerLogin;
