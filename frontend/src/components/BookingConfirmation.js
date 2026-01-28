import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Button from './ui/Button';

const BookingConfirmation = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const res = await axios.get(`${config.API_URL}/api/bookings/single/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(async () => {
          // Fallback
          const all = await axios.get(`${config.API_URL}/api/bookings/user`, { headers: { Authorization: `Bearer ${token}` } });
          return { data: all.data.find(b => b._id === id || b.id === parseInt(id)) };
        });
        setBooking(res.data);
      } catch (error) { console.error(error); }
    };
    fetchBooking();
  }, [id]);

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in">
          <span className="text-4xl">🎉</span>
        </div>

        <h1 className="text-4xl font-bold text-primary-900 mb-4">Your hostel journey begins here!</h1>
        <p className="text-gray-500 text-lg mb-12">
          Confirmation code: <span className="font-mono font-bold text-primary-900">#{String(booking._id).slice(-6).toUpperCase()}</span>
        </p>

        <div className="bg-secondary-50 rounded-3xl p-8 mb-10 text-left">
          <h3 className="font-bold text-gray-900 mb-6">Booking Details</h3>
          <div className="grid grid-cols-2 gap-y-6">
            <div>
              <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">Check-in</div>
              <div className="font-medium mt-1">{new Date(booking.checkinDate).toDateString()}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">Duration</div>
              <div className="font-medium mt-1">{booking.duration} Months</div>
            </div>
            <div className="col-span-2">
              <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">Address</div>
              <div className="font-medium mt-1">{booking.hostelId?.name}, {booking.hostelId?.address}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => navigate('/dashboard')} variant="primary">View My Trips</Button>
          <Button onClick={() => navigate('/')} variant="ghost">Return Home</Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
