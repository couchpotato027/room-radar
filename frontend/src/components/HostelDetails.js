import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Button from './ui/Button';

const HostelDetails = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchHostel(); }, [id]);

  const fetchHostel = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_URL}/api/hostels/${id}`);
      setHostel(response.data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const amenityIcons = {
    wifi: '📶', ac: '❄️', mess: '🍽️', laundry: '🧺',
    parking: '🚗', cctv: '📹', powerBackup: '🔋', gym: '💪', rooftop: '🌇'
  };

  if (loading || !hostel) return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">{hostel.name}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1 font-medium text-primary-900">
              ★ {hostel.rating || 'New'} ({hostel.reviewCount} reviews)
            </span>
            <span>•</span>
            <span className="underline">{hostel.area}, {hostel.city}</span>
            {hostel.isVerified && (
              <>
                <span>•</span>
                <span className="text-accent-600 font-medium">Verified Property</span>
              </>
            )}
          </div>
        </div>

        {/* Image Grid (Airbnb Style) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden h-[500px] mb-12">
          <div className="md:col-span-2 md:row-span-2 h-full">
            <img
              src={hostel.images?.[0] || 'https://via.placeholder.com/800'}
              className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
              alt="Main view"
            />
          </div>
          <div className="hidden md:block h-full">
            <img
              src={hostel.images?.[1] || hostel.images?.[0]}
              className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
              alt="View 2"
            />
          </div>
          <div className="hidden md:block h-full rounded-tr-2xl">
            <img
              src={hostel.images?.[2] || hostel.images?.[0]}
              className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
              alt="View 3"
            />
          </div>
          <div className="hidden md:block h-full">
            <img
              src={hostel.images?.[3] || hostel.images?.[0]}
              className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
              alt="View 4"
            />
          </div>
          <div className="hidden md:block h-full rounded-br-2xl relative">
            <img
              src={hostel.images?.[4] || hostel.images?.[0]}
              className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
              alt="View 5"
            />
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md active:scale-95 transition">
              Show all photos
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick Stats */}
            <div className="flex justify-between py-6 border-b border-secondary-200">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {hostel.roomType === 'SHARED' ? 'Shared Room' : 'Private Room'}
                </h2>
                <p className="text-gray-500">
                  {hostel.genderPreference === 'MIXED' ? 'Co-ed' : hostel.genderPreference} • {hostel.brand || 'Independent'}
                </p>
              </div>
              <div className="flex -space-x-4">
                {/* Avatars placeholder */}
                <div className="w-12 h-12 rounded-full bg-secondary-200 border-2 border-white flex items-center justify-center text-xs">Owner</div>
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-b border-secondary-200">
              <h2 className="text-2xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {hostel.description || `Experience comfortable living in the heart of ${hostel.city}. This property features modern amenities and a vibrant community atmosphere.`}
              </p>
            </div>

            {/* Amenities */}
            <div className="py-6 border-b border-secondary-200">
              <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-y-4">
                {Object.entries(hostel.amenities || {}).filter(([_, v]) => v).map(([key]) => (
                  <div key={key} className="flex items-center gap-4 text-gray-700">
                    <span className="text-2xl">{amenityIcons[key] || '✨'}</span>
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-secondary-200 shadow-xl p-6">
              <div className="flex justify-between items-baseline mb-6">
                <div>
                  <span className="text-2xl font-bold text-primary-900">₹{hostel.monthlyRent?.toLocaleString()}</span>
                  <span className="text-gray-500"> /month</span>
                </div>
                <div className="text-sm font-semibold underline text-gray-500">
                  {hostel.availableRooms} rooms left
                </div>
              </div>

              <div className="border border-gray-300 rounded-xl mb-6 overflow-hidden">
                <div className="p-3 border-b border-gray-300 bg-secondary-50">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600">Check-in</label>
                  <div className="font-medium text-gray-900">Auto-filled (Next Month)</div>
                </div>
                <div className="p-3">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600">Guests</label>
                  <div className="font-medium text-gray-900">1 Guest</div>
                </div>
              </div>

              {user?.role !== 'OWNER' && (
                <Button
                  variant="primary"
                  className="w-full py-4 text-lg rounded-xl mb-4 bg-gradient-to-r from-accent-600 to-accent-500 border-none"
                  onClick={() => navigate(`/book/${id}`)}
                  disabled={!hostel.availableRooms}
                >
                  {hostel.availableRooms > 0 ? 'Reserve' : 'Sold Out'}
                </Button>
              )}

              <p className="text-center text-xs text-gray-500">You won't be charged yet</p>

              <div className="mt-6 space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span className="underline">Monthly Rent</span>
                  <span>₹{hostel.monthlyRent?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Security Deposit</span>
                  <span>₹{hostel.securityDeposit?.toLocaleString() || (hostel.monthlyRent * 2).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostelDetails;
