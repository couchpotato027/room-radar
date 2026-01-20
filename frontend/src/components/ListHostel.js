import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import Button from './ui/Button';

const Section = ({ title, children }) => (
  <div className="bg-white rounded-3xl p-8 border border-secondary-200 shadow-sm mb-6">
    <h2 className="text-xl font-bold text-primary-900 mb-6">{title}</h2>
    {children}
  </div>
);

const InputGroup = ({ label, children, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    {children}
  </div>
);

const ListHostel = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', city: '', area: '', address: '', monthlyRent: '', securityDeposit: '',
    genderPreference: 'MIXED', roomType: 'SHARED', totalRooms: '', availableRooms: '',
    description: '', images: '', landmark: '', metroStation: '',
    amenities: { wifi: true, ac: false, mess: true, laundry: true, parking: false, cctv: true, powerBackup: true, gym: false, rooftop: false }
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('amenities.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({ ...prev, amenities: { ...prev.amenities, [field]: checked } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        monthlyRent: parseInt(formData.monthlyRent),
        securityDeposit: formData.securityDeposit ? parseInt(formData.securityDeposit) : undefined,
        totalRooms: parseInt(formData.totalRooms || 50),
        availableRooms: parseInt(formData.availableRooms || formData.totalRooms || 50),
        images: formData.images ? formData.images.split(',').map(u => u.trim()).filter(Boolean) :
          ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'],
        nearbyPlaces: []
      };

      await axios.post(`${config.API_URL}/api/hostels`, payload, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to list hostel');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">List your property</h1>
          <p className="text-gray-500">Share your space with the RoomRadar community</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-2">
            <span>!</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Section title="Property Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Property Name">
                <input type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all"
                  placeholder="e.g. Sunny Villa" />
              </InputGroup>
              <InputGroup label="City">
                <input type="text" name="city" required value={formData.city} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all" />
              </InputGroup>
              <InputGroup label="Area / Locality">
                <input type="text" name="area" required value={formData.area} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all" />
              </InputGroup>
              <InputGroup label="Full Address">
                <input type="text" name="address" value={formData.address} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all" />
              </InputGroup>
            </div>
          </Section>

          <Section title="Accommodation & Pricing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="Monthly Rent (₹)">
                <input type="number" name="monthlyRent" required value={formData.monthlyRent} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all" />
              </InputGroup>
              <InputGroup label="Security Deposit (₹)">
                <input type="number" name="securityDeposit" value={formData.securityDeposit} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all" />
              </InputGroup>
              <InputGroup label="Available Rooms">
                <input type="number" name="availableRooms" value={formData.availableRooms} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all" />
              </InputGroup>
              <InputGroup label="Room Type">
                <select name="roomType" value={formData.roomType} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all">
                  <option value="SHARED">Shared Room</option>
                  <option value="SINGLE">Private Room</option>
                  <option value="DORMITORY">Dormitory</option>
                </select>
              </InputGroup>
              <InputGroup label="Gender Preference">
                <select name="genderPreference" value={formData.genderPreference} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all">
                  <option value="MIXED">Co-ed</option>
                  <option value="MALE">Male Only</option>
                  <option value="FEMALE">Female Only</option>
                </select>
              </InputGroup>
            </div>
          </Section>

          <Section title="Amenities & Photos">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(formData.amenities).map(([key, val]) => (
                  <label key={key} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${val ? 'border-accent-500 bg-accent-50/10' : 'border-gray-100'}`}>
                    <input type="checkbox" name={`amenities.${key}`} checked={val} onChange={handleChange} className="hidden" />
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${val ? 'bg-accent-500 border-accent-500' : 'border-gray-300'}`}>
                      {val && <span className="text-white text-[10px]">✓</span>}
                    </span>
                    <span className="capitalize text-sm font-medium">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            <InputGroup label="Image URLs (Comma separated)">
              <textarea name="images" value={formData.images} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
            </InputGroup>

            <InputGroup label="Description">
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                className="w-full px-4 py-3 rounded-xl bg-secondary-50 border-transparent focus:bg-white focus:border-accent-500 transition-all"
                placeholder="Tell us what makes your place special..." />
            </InputGroup>
          </Section>

          <div className="flex gap-4">
            <Button type="button" variant="ghost" className="flex-1 py-4" onClick={() => navigate('/')}>Cancel</Button>
            <Button type="submit" variant="primary" className="flex-[2] py-4 text-lg shadow-lg" disabled={submitting}>
              {submitting ? 'Publishing...' : 'Publish Listing'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ListHostel;
