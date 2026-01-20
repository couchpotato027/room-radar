import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import Button from './ui/Button';

// Mock Component for clearer visual
const Section = ({ title, children }) => (
  <div className="py-6 border-b border-secondary-200 last:border-0">
    <h2 className="text-xl font-semibold mb-4 text-primary-900">{title}</h2>
    {children}
  </div>
);

const BookNow = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [bookingData, setBookingData] = useState({
    roomType: 'SHARED', duration: 6, checkinDate: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHostel();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setBookingData(prev => ({ ...prev, checkinDate: nextMonth.toISOString().split('T')[0] }));
  }, [id]);

  const fetchHostel = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/hostels/${id}`);
      setHostel(response.data);
      setBookingData(prev => ({ ...prev, roomType: response.data.roomType || 'SHARED' }));
    } catch (error) { console.error(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.API_URL}/api/bookings`,
        { hostelId: id, ...bookingData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/booking/confirmation/${response.data._id}`);
    } catch (error) {
      alert('Booking failed: ' + (error.response?.data?.error || 'Unknown error'));
      setSubmitting(false);
    }
  };

  if (!hostel) return null;

  const total = (hostel.monthlyRent * bookingData.duration) + (hostel.securityDeposit || hostel.monthlyRent * 2);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
            ←
          </button>
          <h1 className="text-3xl font-bold text-primary-900">Request to book</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <Section title="Your trip">
                <div className="flex justify-between items-center py-4">
                  <div>
                    <div className="font-semibold text-primary-900">Dates</div>
                    <div className="text-sm text-gray-500">Auto-set for next month</div>
                  </div>
                  <input
                    type="date"
                    className="bg-transparent border-none font-semibold text-right focus:ring-0"
                    value={bookingData.checkinDate}
                    onChange={e => setBookingData({ ...bookingData, checkinDate: e.target.value })}
                  />
                </div>
                <div className="flex justify-between items-center py-4">
                  <div>
                    <div className="font-semibold text-primary-900">Duration</div>
                    <div className="text-sm text-gray-500">{bookingData.duration} Months</div>
                  </div>
                  <select
                    className="border-gray-200 rounded-lg text-sm"
                    value={bookingData.duration}
                    onChange={e => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}
                  >
                    {[1, 2, 3, 4, 5, 6, 12].map(m => <option key={m} value={m}>{m} mo</option>)}
                  </select>
                </div>
              </Section>

              <Section title="Room Preferences">
                <div className="space-y-3">
                  {['SINGLE', 'SHARED', 'DORMITORY'].map(type => (
                    <label key={type} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${bookingData.roomType === type ? 'border-accent-500 bg-accent-50/10' : 'border-gray-100'
                      }`}>
                      <span className="font-medium capitalize">{type.toLowerCase()} Room</span>
                      <input
                        type="radio"
                        name="roomType"
                        value={type}
                        checked={bookingData.roomType === type}
                        onChange={e => setBookingData({ ...bookingData, roomType: e.target.value })}
                        className="text-accent-600 focus:ring-accent-500"
                      />
                    </label>
                  ))}
                </div>
              </Section>

              <div className="mt-8">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full h-14 text-lg bg-accent-600 hover:bg-accent-700"
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : 'Confirm and Pay'}
                </Button>
              </div>
            </form>
          </div>

          {/* Right: Summary Card */}
          <div className="hidden lg:block">
            <div className="bg-white p-6 rounded-2xl border border-secondary-200 shadow-lg sticky top-32">
              <div className="flex gap-4 mb-6 pb-6 border-b border-secondary-100">
                <img src={hostel.images?.[0]} className="w-24 h-24 object-cover rounded-xl" alt="" />
                <div>
                  <div className="text-xs text-gray-500 uppercase font-semibold">{hostel.roomType} in {hostel.city}</div>
                  <h3 className="font-bold text-gray-900 mt-1">{hostel.name}</h3>
                  <div className="flex items-center gap-1 text-sm mt-1">★ {hostel.rating || 5.0}</div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Price details</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>₹{hostel.monthlyRent?.toLocaleString()} x {bookingData.duration} months</span>
                  <span>₹{(hostel.monthlyRent * bookingData.duration).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit</span>
                  <span>₹{(hostel.securityDeposit || hostel.monthlyRent * 2).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg text-primary-900 mt-6 pt-6 border-t border-dashed border-gray-300">
                <span>Total (INR)</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookNow;
