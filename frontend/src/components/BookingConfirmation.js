import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';

const BookingConfirmation = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL}/api/bookings/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const foundBooking = response.data.find(b => b._id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={onLogout} />
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={onLogout} />
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-500 text-lg">Booking not found</p>
        </div>
      </div>
    );
  }

  const hostel = booking.hostelId;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Your booking has been successfully confirmed. We've sent a confirmation email to your registered email address.
          </p>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-semibold text-gray-900">#{booking._id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hostel</span>
                <span className="font-semibold text-gray-900">{hostel?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-semibold text-gray-900">{hostel?.area}, {hostel?.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room Type</span>
                <span className="font-semibold text-gray-900">
                  {booking.roomType === 'SINGLE' ? 'Single' : booking.roomType === 'SHARED' ? 'Shared' : 'Dormitory'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold text-gray-900">{booking.duration} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in Date</span>
                <span className="font-semibold text-gray-900">
                  {new Date(booking.checkinDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-xl text-indigo-600">₹{booking.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                  booking.bookingStatus === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                  booking.bookingStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {booking.bookingStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Browse More Hostels
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;

