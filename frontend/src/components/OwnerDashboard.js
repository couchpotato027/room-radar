import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import Button from './ui/Button';
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';

const OwnerDashboard = ({ user, onLogout }) => {
  console.log('OwnerDashboard User:', user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ active: 0, pending: 0, earnings: 0 });

  useEffect(() => {
    if (user?.role === 'OWNER') {
      fetchBookings();
    }
  }, [user]);

  // If Admin (Super Owner), show Admin Dashboard
  if (user && user.role === 'ADMIN') {
    return <AdminDashboard user={user} onLogout={onLogout} />;
  }

  const fetchBookings = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(`${config.API_URL}/api/bookings/owner`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);

      // Calculate stats
      const pending = response.data.filter(b => b.bookingStatus === 'PENDING').length;
      const confirmed = response.data.filter(b => b.bookingStatus === 'CONFIRMED').length;
      const earnings = response.data
        .filter(b => b.bookingStatus === 'CONFIRMED')
        .reduce((sum, b) => sum + b.totalAmount, 0);

      setStats({ active: confirmed, pending, earnings });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`${config.API_URL}/api/bookings/${bookingId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh list
      fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-900">Owner Dashboard</h1>
            <p className="text-gray-500">Manage your properties and bookings</p>
          </div>
          <Link to="/list-hostel">
            <Button variant="primary">Add New Property</Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary-200">
            <div className="text-4xl font-bold text-primary-900 mb-2">₹{stats.earnings.toLocaleString()}</div>
            <div className="text-gray-500 font-medium">Total Earnings</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary-200">
            <div className="text-4xl font-bold text-accent-600 mb-2">{stats.pending}</div>
            <div className="text-gray-500 font-medium">Pending Requests</div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary-200">
            <div className="text-4xl font-bold text-green-600 mb-2">{stats.active}</div>
            <div className="text-gray-500 font-medium">Active Bookings</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-primary-900 mb-6">Booking Requests</h2>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-secondary-200 shadow-sm">
            <div className="text-4xl mb-6">📭</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500">Wait for students to discover your amazing property!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-6 rounded-3xl shadow-sm border border-secondary-200 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

                {/* Guest & Property Info */}
                <div className="flex items-center gap-6">
                  <img
                    src={booking.hostelId.images[0] || 'https://via.placeholder.com/100'}
                    alt={booking.hostelId.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-primary-900">{booking.user.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">requested <span className="font-semibold text-gray-700">{booking.hostelId.name}</span></p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>📅 {formatDate(booking.checkinDate)}</span>
                      <span>🛏️ {booking.roomType}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                  <div className="text-right">
                    <div className="font-bold text-lg text-primary-900">₹{booking.totalAmount.toLocaleString()}</div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide ${booking.bookingStatus === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                      booking.bookingStatus === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        booking.bookingStatus === 'CANCELLED' ? 'bg-gray-100 text-gray-700' :
                          'bg-yellow-100 text-yellow-700'
                      }`}>
                      {booking.bookingStatus || 'PENDING'}
                    </span>
                  </div>

                  {/* Action Buttons (Only for PENDING) */}
                  {(booking.bookingStatus === 'PENDING' || !booking.bookingStatus) && (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleStatusUpdate(booking._id, 'REJECTED')}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white shadow-sm border-none"
                        onClick={() => handleStatusUpdate(booking._id, 'CONFIRMED')}
                      >
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerDashboard;
