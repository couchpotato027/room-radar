import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import Header from './Header';

const OwnerDashboard = ({ user, onLogout }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState('');

  useEffect(() => {
    // In a real app, fetch owner's hostels and their bookings
    // For now, we'll show a message
    setLoading(false);
  }, []);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${config.API_URL}/api/bookings/${bookingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // Refresh bookings
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert(error.response?.data?.error || 'Failed to update booking');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Manage bookings for your hostels</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-600 text-center">
              Owner dashboard functionality will be available once you have hostels listed.
              <br />
              Bookings for your hostels will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;

