import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';

const HostelDetails = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetchHostel();
  }, [id]);

  const fetchHostel = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_URL}/api/hostels/${id}`);
      setHostel(response.data);
    } catch (error) {
      console.error('Error fetching hostel:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate(`/book/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={onLogout} />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={onLogout} />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-500 text-lg">Hostel not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
        >
          ← Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="mb-6">
              <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                <img
                  src={hostel.images?.[currentImage] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop'}
                  alt={hostel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop';
                  }}
                />
                {hostel.images?.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage(prev => Math.max(0, prev - 1))}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-lg"
                      disabled={currentImage === 0}
                    >
                      ←
                    </button>
                    <button
                      onClick={() => setCurrentImage(prev => Math.min(hostel.images.length - 1, prev + 1))}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-lg"
                      disabled={currentImage === hostel.images.length - 1}
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              {hostel.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {hostel.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${hostel.name} ${idx + 1}`}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                        currentImage === idx ? 'border-indigo-600' : 'border-gray-200'
                      }`}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200&h=200&fit=crop';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{hostel.name}</h1>
                    {hostel.isVerified && (
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 flex items-center gap-2">
                    📍 {hostel.area}, {hostel.city}
                  </p>
                </div>
                {hostel.rating && (
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                      ⭐ {hostel.rating}
                    </div>
                    <p className="text-sm text-gray-500">{hostel.reviewCount} reviews</p>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-6 flex-wrap">
                <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  hostel.genderPreference === 'MIXED' ? 'bg-green-100 text-green-800' :
                  hostel.genderPreference === 'MALE' ? 'bg-blue-100 text-blue-800' :
                  'bg-pink-100 text-pink-800'
                }`}>
                  {hostel.genderPreference === 'MIXED' ? 'Co-ed' : hostel.genderPreference}
                </span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold">
                  {hostel.roomType === 'SINGLE' ? 'Private' : hostel.roomType === 'SHARED' ? 'Shared' : 'Dormitory'} Room
                </span>
                {hostel.brand && (
                  <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold">
                    {hostel.brand}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About this place</h2>
                <p className="text-gray-600 leading-relaxed">
                  {hostel.description || `Comfortable accommodation in ${hostel.area}, ${hostel.city} with all modern amenities.`}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostel.amenities?.wifi && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📶</span>
                      <span className="text-gray-700">WiFi</span>
                    </div>
                  )}
                  {hostel.amenities?.ac && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">❄️</span>
                      <span className="text-gray-700">AC</span>
                    </div>
                  )}
                  {hostel.amenities?.mess && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🍽️</span>
                      <span className="text-gray-700">Mess</span>
                    </div>
                  )}
                  {hostel.amenities?.laundry && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">👕</span>
                      <span className="text-gray-700">Laundry</span>
                    </div>
                  )}
                  {hostel.amenities?.parking && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🚗</span>
                      <span className="text-gray-700">Parking</span>
                    </div>
                  )}
                  {hostel.amenities?.gym && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💪</span>
                      <span className="text-gray-700">Gym</span>
                    </div>
                  )}
                  {hostel.amenities?.cctv && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📹</span>
                      <span className="text-gray-700">CCTV</span>
                    </div>
                  )}
                  {hostel.amenities?.powerBackup && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🔋</span>
                      <span className="text-gray-700">Power Backup</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Nearby Places */}
              {hostel.nearbyPlaces && hostel.nearbyPlaces.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Nearby Places</h2>
                  <div className="flex flex-wrap gap-2">
                    {hostel.nearbyPlaces.map((place, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm">
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-extrabold text-gray-900">
                    ₹{hostel.monthlyRent?.toLocaleString()}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
                {hostel.securityDeposit && (
                  <p className="text-sm text-gray-600">
                    Security Deposit: ₹{hostel.securityDeposit.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Rooms</span>
                  <span className="font-semibold text-gray-900">{hostel.availableRooms || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Rooms</span>
                  <span className="font-semibold text-gray-900">{hostel.totalRooms || 0}</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                disabled={!hostel.availableRooms || hostel.availableRooms === 0}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {hostel.availableRooms > 0 ? 'Book Now' : 'Not Available'}
              </button>

              {hostel.availableRooms <= 5 && hostel.availableRooms > 0 && (
                <p className="text-sm text-red-600 text-center mt-4">
                  Only {hostel.availableRooms} rooms left!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;

