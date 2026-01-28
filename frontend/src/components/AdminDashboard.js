import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ user, onLogout }) => {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalHostels: 0, totalBookings: 0, activeHostels: 0 });

    useEffect(() => {
        fetchHostels();
    }, []);

    const fetchHostels = async () => {
        try {
            // In a real app, you'd pass a specific admin token or use the user's token
            // For now we assume the generic endpoint works and is somewhat protected or public-read for this scope
            // But typically we'd use the authenticated token
            const token = sessionStorage.getItem('token');
            const response = await axios.get(`${config.API_URL}/api/admin/hostels`, {
                // We can pass the token if the backend middleware checks it, 
                // currently our backend endpoint didn't strictly require it but it's good practice
                headers: { Authorization: `Bearer ${token}` }
            });

            const allHostels = response.data;
            setHostels(allHostels);

            // Calculate stats
            const totalHostels = allHostels.length;
            const activeHostels = allHostels.filter(h => h.isActive).length;
            const totalBookings = allHostels.reduce((sum, h) => sum + (h.bookingCount || 0), 0);

            setStats({ totalHostels, activeHostels, totalBookings });
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (hostelId, currentStatus) => {
        try {
            const token = sessionStorage.getItem('token');
            // We might need a specific endpoint for this, or use the general update endpoint
            // Assuming generic update endpoint works for owners/admins
            await axios.put(`${config.API_URL}/api/hostels/${hostelId}`,
                { isActive: !currentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchHostels();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (hostelId) => {
        if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return;

        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(`${config.API_URL}/api/hostels/${hostelId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchHostels();
        } catch (error) {
            console.error('Error deleting hostel:', error);
            alert('Failed to delete listing');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header user={user} onLogout={onLogout} />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500">Super Owner Access • Managing {stats.totalHostels} Properties</p>
                    </div>
                    <Link to="/list-hostel">
                        <Button variant="primary">Add New Property</Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">{stats.totalHostels}</div>
                        <div className="text-gray-500 font-medium">Total Properties</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <div className="text-4xl font-bold text-green-600 mb-2">{stats.activeHostels}</div>
                        <div className="text-gray-500 font-medium">Active Listings</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <div className="text-4xl font-bold text-purple-600 mb-2">{stats.totalBookings}</div>
                        <div className="text-gray-500 font-medium">Total Bookings</div>
                    </div>
                </div>

                {/* Listings Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">All Property Listings</h2>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Loading data...</div>
                    ) : hostels.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">No properties found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-8 py-4">Property</th>
                                        <th className="px-6 py-4">Owner</th>
                                        <th className="px-6 py-4">Location</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {hostels.map(hostel => (
                                        <tr key={hostel._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-4">
                                                    {/* Show image if available, else placeholder */}
                                                    {hostel.images && hostel.images.length > 0 ? (
                                                        <img src={hostel.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-gray-200" />
                                                    )}
                                                    <div>
                                                        <div className="font-bold text-gray-900">{hostel.name}</div>
                                                        <div className="text-xs text-gray-500">ID: {hostel._id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{hostel.ownerName || 'Unknown'}</div>
                                                <div className="text-xs text-gray-500">{hostel.ownerEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {hostel.area}, {hostel.city}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${hostel.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {hostel.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleToggleStatus(hostel._id, hostel.isActive)}
                                                >
                                                    {hostel.isActive ? 'Disable' : 'Enable'}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="text-red-600 hover:bg-red-50 border-red-200"
                                                    variant="outline"
                                                    onClick={() => handleDelete(hostel._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
