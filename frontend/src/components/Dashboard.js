import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const Dashboard = ({ user, onLogout }) => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    sortBy: 'rating'
  });

  const fetchHostels = async (filterParams = {}) => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_URL}/api/hostels`, { params: filterParams });
      setHostels(response.data.hostels);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const cities = ['All Cities', 'Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Noida'];

  return (
    <div style={{ minHeight: '100vh', background: '#fafbfc' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>R</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a202c' }}>RoomRadar</h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Welcome, {user?.name}</span>
            <button 
              onClick={onLogout}
              style={{
                background: '#f3f4f6',
                color: '#374151',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }} className="animate-fade-in">
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#1a202c',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Find Your Perfect Hostel
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover verified hostels across India with transparent pricing and genuine reviews
          </p>
        </div>

        {/* Search & Filters */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb'
        }} className="animate-slide-up">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            alignItems: 'end'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Search hostels, areas, or landmarks
              </label>
              <input
                type="text"
                placeholder="e.g., Koramangala, Zolo, near metro..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="input-modern"
                style={{
                  paddingLeft: '48px',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '16px center',
                  backgroundSize: '20px'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="input-modern"
              >
                {cities.map(city => (
                  <option key={city} value={city === 'All Cities' ? '' : city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Sort by
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="input-modern"
              >
                <option value="rating">Highest Rated</option>
                <option value="monthlyRent">Price: Low to High</option>
                <option value="reviewCount">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '8px'
          }}>
            {hostels.length} Premium Hostels Found
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Verified properties with transparent pricing
          </p>
        </div>

        {/* Hostels Grid */}
        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  height: '240px',
                  background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)',
                  animation: 'pulse 2s infinite'
                }}></div>
                <div style={{ padding: '24px' }}>
                  <div style={{
                    height: '20px',
                    background: '#f3f4f6',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <div style={{
                    height: '16px',
                    background: '#f3f4f6',
                    borderRadius: '4px',
                    width: '60%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {hostels.map((hostel, index) => (
              <div
                key={hostel.id}
                className="card-hover animate-slide-up"
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative' }}>
                  <img
                    src={hostel.images?.[0] || `https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=240&fit=crop`}
                    alt={hostel.name}
                    style={{
                      width: '100%',
                      height: '240px',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* Badges */}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'flex',
                    gap: '8px'
                  }}>
                    {hostel.isVerified && (
                      <span style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        ✓ Verified
                      </span>
                    )}
                    {hostel.brand && (
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#374151',
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '6px 12px',
                        borderRadius: '20px'
                      }}>
                        {hostel.brand}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {hostel.rating && (
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: '600',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ⭐ {hostel.rating}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#1a202c',
                      marginBottom: '4px'
                    }}>
                      {hostel.name}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      📍 {hostel.area}, {hostel.city}
                    </p>
                  </div>

                  {/* Tags */}
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '16px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      background: hostel.genderPreference === 'MIXED' ? '#dbeafe' : 
                                 hostel.genderPreference === 'MALE' ? '#dbeafe' : '#fce7f3',
                      color: hostel.genderPreference === 'MIXED' ? '#1d4ed8' : 
                             hostel.genderPreference === 'MALE' ? '#1d4ed8' : '#be185d',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 12px',
                      borderRadius: '12px'
                    }}>
                      {hostel.genderPreference === 'MIXED' ? 'Co-ed' : hostel.genderPreference}
                    </span>
                    <span style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 12px',
                      borderRadius: '12px'
                    }}>
                      {hostel.roomType === 'SINGLE' ? 'Private' : 'Shared'} Room
                    </span>
                  </div>

                  {/* Amenities */}
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '20px',
                    flexWrap: 'wrap'
                  }}>
                    {hostel.amenities?.wifi && <span title="WiFi">📶</span>}
                    {hostel.amenities?.ac && <span title="AC">❄️</span>}
                    {hostel.amenities?.mess && <span title="Mess">🍽️</span>}
                    {hostel.amenities?.laundry && <span title="Laundry">👕</span>}
                    {hostel.amenities?.parking && <span title="Parking">🚗</span>}
                    {hostel.amenities?.gym && <span title="Gym">💪</span>}
                  </div>

                  {/* Price & CTA */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        color: '#1a202c'
                      }}>
                        ₹{hostel.monthlyRent?.toLocaleString()}
                      </span>
                      <span style={{
                        color: '#6b7280',
                        fontSize: '14px',
                        marginLeft: '4px'
                      }}>
                        /month
                      </span>
                    </div>
                    
                    <button className="btn-primary" style={{
                      fontSize: '14px',
                      padding: '10px 20px'
                    }}>
                      View Details
                    </button>
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

export default Dashboard;