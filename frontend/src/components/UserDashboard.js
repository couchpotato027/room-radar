import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';

const UserDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const currentUser = user || JSON.parse(localStorage.getItem('user') || 'null');
      
      if (!token) {
        console.error('No token found');
        setBookings([]);
        return;
      }
      
      // Debug logging
      console.log('Fetching bookings for user:', currentUser?._id || currentUser?.id);
      console.log('Token exists:', !!token);
      
      const response = await axios.get(`${config.API_URL}/api/bookings/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Verify bookings belong to current user (extra safety check)
      const userId = currentUser?._id || currentUser?.id;
      const bookings = response.data || [];
      
      // Filter bookings to ensure they belong to current user
      const userBookings = bookings.filter(booking => {
        const bookingUserId = booking.userId?.toString();
        const currentUserId = userId?.toString();
        return bookingUserId === currentUserId;
      });
      
      console.log(`Received ${bookings.length} bookings, filtered to ${userBookings.length} for user ${userId}`);
      
      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      console.error('Error response:', error.response?.data);
      if (error.response?.status === 401) {
        // Unauthorized - clear bookings and redirect to login
        setBookings([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clear bookings immediately when component mounts or user changes
    setBookings([]);
    setLoading(true);
    
    // Get the current token to ensure it matches the user
    const currentToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('user');
    let currentUser = user;
    
    if (!currentUser && storedUserData) {
      try {
        currentUser = JSON.parse(storedUserData);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    
    // Check if token is the old demo token - if so, clear everything
    if (currentToken === 'demo-token-123') {
      console.warn('Old demo token detected! Please log out and log in again.');
      localStorage.clear();
      window.location.href = '/login';
      return;
    }
    
    // Only fetch if we have a valid user and token
    if (currentUser && (currentUser._id || currentUser.id) && currentToken && currentToken !== 'demo-token-123') {
      fetchBookings();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, user?.id]); // Refetch when user ID changes

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${config.API_URL}/api/bookings/cancel/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Show success notification
      if (response.data) {
        setNotification({ type: 'success', message: 'Booking cancelled successfully' });
        setTimeout(() => setNotification(null), 4000);
      }
      
      fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      const errorMsg = error.response?.data?.error || 'Failed to cancel booking. Please try again.';
      setNotification({ type: 'error', message: errorMsg });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl animate-slide-in min-w-[300px] ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{notification.type === 'success' ? '✓' : '✗'}</span>
              <span className="font-semibold">{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600 text-lg">Manage and track all your hostel bookings in one place</p>
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
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center border border-gray-200 shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-8">Start exploring hostels and make your first booking!</p>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                Browse Hostels
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => {
              const hostel = booking.hostelId;
              return (
                <div key={booking._id} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-5 mb-5">
                        {hostel?.images?.[0] && (
                          <img
                            src={hostel.images[0]}
                            alt={hostel.name}
                            className="w-28 h-28 object-cover rounded-xl shadow-md flex-shrink-0"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200&h=200&fit=crop';
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">{hostel?.name || 'Unknown Hostel'}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                              booking.bookingStatus === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                              booking.bookingStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                              booking.bookingStatus === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.bookingStatus}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {hostel?.area || 'N/A'}, {hostel?.city || 'N/A'}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-semibold">
                              {booking.roomType === 'SINGLE' ? 'Single Room' : booking.roomType === 'SHARED' ? 'Shared Room' : 'Dormitory'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">Duration</span>
                          <p className="font-bold text-gray-900 text-lg">{booking.duration} {booking.duration === 1 ? 'month' : 'months'}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">Check-in Date</span>
                          <p className="font-bold text-gray-900 text-lg">
                            {new Date(booking.checkinDate).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">Booking ID</span>
                          <p className="font-mono font-bold text-gray-900 text-lg">#{booking._id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-1">Total Amount</span>
                          <p className="font-bold text-indigo-600 text-lg">₹{booking.totalAmount?.toLocaleString('en-IN') || '0'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col gap-3 lg:min-w-[140px]">
                      {booking.bookingStatus !== 'CANCELLED' && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="flex-1 lg:flex-none px-5 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 hover:shadow-md transition-all duration-200"
                        >
                          Cancel Booking
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/hostel/${hostel?._id || hostel?.id}`)}
                        className="flex-1 lg:flex-none px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 hover:shadow-md transition-all duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

