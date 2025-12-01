import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';

const BookNow = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    roomType: 'SHARED',
    duration: 6,
    checkinDate: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHostel();
    // Set default checkin date to next month
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setBookingData(prev => ({
      ...prev,
      checkinDate: nextMonth.toISOString().split('T')[0]
    }));
  }, [id]);

  const fetchHostel = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_URL}/api/hostels/${id}`);
      setHostel(response.data);
      setBookingData(prev => ({
        ...prev,
        roomType: response.data.roomType || 'SHARED'
      }));
    } catch (error) {
      console.error('Error fetching hostel:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.API_URL}/api/bookings`,
        {
          hostelId: id,
          ...bookingData
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate(`/booking/confirmation/${response.data._id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(error.response?.data?.error || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={onLogout} />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={onLogout} />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-500 text-lg">Hostel not found</p>
        </div>
      </div>
    );
  }

  const totalAmount = hostel.monthlyRent * bookingData.duration;
  const securityDeposit = hostel.securityDeposit || hostel.monthlyRent * 2;
  const grandTotal = totalAmount + securityDeposit;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
              <p className="text-gray-600 mb-8">{hostel.name}, {hostel.area}, {hostel.city}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Room Type
                  </label>
                  <select
                    value={bookingData.roomType}
                    onChange={(e) => setBookingData({ ...bookingData, roomType: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  >
                    <option value="SINGLE">Single Room</option>
                    <option value="SHARED">Shared Room</option>
                    <option value="DORMITORY">Dormitory</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration (Months)
                  </label>
                  <select
                    value={bookingData.duration}
                    onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                      <option key={month} value={month}>{month} {month === 1 ? 'Month' : 'Months'}</option>
                    ))}
                  </select>
                </div>

                {/* Check-in Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.checkinDate}
                    onChange={(e) => setBookingData({ ...bookingData, checkinDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  />
                </div>

                {/* Payment Info (Mock) */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Payment Information</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This is a demo booking. Payment processing will be integrated in production.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Card Number</span>
                      <span className="text-gray-400">**** **** **** 1234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expiry</span>
                      <span className="text-gray-400">12/25</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !hostel.availableRooms}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Price Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-semibold">₹{hostel.monthlyRent?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{bookingData.duration} months</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Deposit</span>
                  <span className="font-semibold">₹{securityDeposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xl font-extrabold pt-4 border-t-2 border-gray-300">
                  <span>Total</span>
                  <span className="text-indigo-600">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <p className="text-sm text-indigo-800">
                  <strong>Note:</strong> Security deposit will be refunded after check-out (subject to property condition).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;

