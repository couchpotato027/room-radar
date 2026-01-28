import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Button from './ui/Button';

const UserDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        const res = await axios.get(`${config.API_URL}/api/bookings/user`, { headers: { Authorization: `Bearer ${token}` } });
        setBookings(res.data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchBookings();
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`${config.API_URL}/api/bookings/cancel/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      window.location.reload();
    } catch (e) { alert('Failed to cancel'); }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">My Trips</h1>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse" />)}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-secondary-200">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-xl font-bold text-primary-900 mb-2">No trips booked... yet!</h2>
            <p className="text-gray-500 mb-8">Time to dust off your bags and start planning your next adventure.</p>
            <Button variant="primary" onClick={() => navigate('/')}>Start Exploring</Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-3xl overflow-hidden border border-secondary-200 shadow-sm hover:shadow-md transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={booking.hostelId?.images?.[0] || 'https://via.placeholder.com/400'}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    alt={booking.hostelId?.name}
                  />
                  <div className={`absolute top-4 right-4 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase ${booking.bookingStatus === 'CONFIRMED' ? 'bg-green-100/90 text-green-800' :
                    booking.bookingStatus === 'REJECTED' ? 'bg-red-100/90 text-red-800' :
                      booking.bookingStatus === 'CANCELLED' ? 'bg-gray-100/90 text-gray-800' :
                        'bg-yellow-100/90 text-yellow-800'
                    }`}>
                    {booking.bookingStatus || 'PENDING'}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-primary-900 line-clamp-1">{booking.hostelId?.name}</h3>
                      <p className="text-sm text-gray-500">{booking.hostelId?.city}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary-900">₹{booking.totalAmount?.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{booking.duration} mo</div>
                    </div>
                  </div>

                  <div className="flex gap-2 text-sm text-gray-600 bg-secondary-50 p-3 rounded-xl mb-6">
                    <span className="flex-1 text-center border-r border-gray-200">
                      <div className="text-xs uppercase text-gray-400 font-bold">Check-in</div>
                      <div className="font-medium">{new Date(booking.checkinDate).toLocaleDateString()}</div>
                    </span>
                    <span className="flex-1 text-center">
                      <div className="text-xs uppercase text-gray-400 font-bold">Details</div>
                      <div className="font-medium">{booking.roomType}</div>
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/hostel/${booking.hostelId?._id}`)}>View Property</Button>
                    {booking.bookingStatus !== 'CANCELLED' && (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleCancel(booking._id)}>Cancel</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
