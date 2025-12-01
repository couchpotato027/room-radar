import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';

const ListHostel = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    area: '',
    address: '',
    monthlyRent: '',
    securityDeposit: '',
    genderPreference: 'MIXED',
    roomType: 'SHARED',
    totalRooms: '',
    availableRooms: '',
    description: '',
    images: '',
    landmark: '',
    metroStation: '',
    amenities: {
      wifi: true,
      ac: false,
      mess: true,
      laundry: true,
      parking: false,
      cctv: true,
      powerBackup: true,
      gym: false,
      rooftop: false
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('amenities.')) {
      const amenity = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [amenity]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      
      // Process images
      const images = formData.images
        ? formData.images.split(',').map(url => url.trim()).filter(url => url)
        : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'];

      const payload = {
        ...formData,
        monthlyRent: parseInt(formData.monthlyRent),
        securityDeposit: formData.securityDeposit ? parseInt(formData.securityDeposit) : undefined,
        totalRooms: formData.totalRooms ? parseInt(formData.totalRooms) : 50,
        availableRooms: formData.availableRooms ? parseInt(formData.availableRooms) : formData.totalRooms || 50,
        images,
        nearbyPlaces: []
      };

      const response = await axios.post(
        `${config.API_URL}/api/hostels`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error listing hostel:', error);
      setError(error.response?.data?.error || 'Failed to list hostel. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">List Your Hostel</h1>
            <p className="text-gray-600 text-lg">Fill in the details below to list your property on RoomRadar and reach thousands of students</p>
          </div>

          {success && (
            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-800 font-semibold">Hostel listed successfully! Redirecting...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hostel Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="e.g., UrbanNest Koramangala"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="e.g., Bangalore"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Area *</label>
                  <input
                    type="text"
                    name="area"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="e.g., Koramangala"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="Full address"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Rent (₹) *</label>
                  <input
                    type="number"
                    name="monthlyRent"
                    required
                    value={formData.monthlyRent}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="15000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Security Deposit (₹)</label>
                  <input
                    type="number"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="30000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Rooms *</label>
                  <input
                    type="number"
                    name="totalRooms"
                    value={formData.totalRooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Rooms *</label>
                  <input
                    type="number"
                    name="availableRooms"
                    value={formData.availableRooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="20"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender Preference *</label>
                  <select
                    name="genderPreference"
                    required
                    value={formData.genderPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  >
                    <option value="MIXED">Co-ed</option>
                    <option value="MALE">Male Only</option>
                    <option value="FEMALE">Female Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Room Type *</label>
                  <select
                    name="roomType"
                    required
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  >
                    <option value="SHARED">Shared</option>
                    <option value="SINGLE">Single</option>
                    <option value="DORMITORY">Dormitory</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(formData.amenities).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name={`amenities.${key}`}
                      checked={value}
                      onChange={handleChange}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <span className="text-gray-700 capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="Describe your hostel..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Image URLs (comma-separated)</label>
                  <input
                    type="text"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="e.g., Forum Mall"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Metro Station</label>
                    <input
                      type="text"
                      name="metroStation"
                      value={formData.metroStation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="e.g., Koramangala Metro"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Listing Hostel...' : 'List Hostel'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListHostel;

