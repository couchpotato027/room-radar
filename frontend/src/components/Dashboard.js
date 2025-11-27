import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import HostelCard from './HostelCard';
import SearchFilters from './SearchFilters';

const Dashboard = ({ user }) => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  const fetchHostels = async (page = 1, filterParams = {}) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 9,
        ...filterParams
      };
      
      const response = await axios.get(`${config.API_URL}/api/hostels`, { params });
      setHostels(response.data.hostels);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels(currentPage, filters);
  }, [currentPage, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleHostelClick = (hostelId) => {
    // Navigate to hostel details (implement routing)
    console.log('Navigate to hostel:', hostelId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && hostels.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: '#a0aec0'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #4a5568',
          borderTop: '3px solid #ff6b35',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span style={{ marginLeft: '1rem' }}>Loading hostels...</span>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#f7fafc', fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          🏠 Discover Perfect Hostels
        </h1>
        <p style={{ color: '#a0aec0', fontSize: '1.1rem' }}>
          Find verified hostels and mess services with transparent pricing and genuine reviews
        </p>
      </div>

      <SearchFilters onFiltersChange={handleFiltersChange} />

      {/* Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(26, 32, 44, 0.95)',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ color: '#ff6b35', fontSize: '2rem', fontWeight: '700' }}>
            {pagination.total || 0}
          </div>
          <div style={{ color: '#a0aec0' }}>Total Hostels</div>
        </div>
        
        <div style={{
          background: 'rgba(26, 32, 44, 0.95)',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ color: '#ff6b35', fontSize: '2rem', fontWeight: '700' }}>
            {hostels.filter(h => h.averageRating >= 4).length}
          </div>
          <div style={{ color: '#a0aec0' }}>Highly Rated</div>
        </div>
        
        <div style={{
          background: 'rgba(26, 32, 44, 0.95)',
          borderRadius: '12px',
          padding: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ color: '#ff6b35', fontSize: '2rem', fontWeight: '700' }}>
            {hostels.filter(h => h.availableRooms > 0).length}
          </div>
          <div style={{ color: '#a0aec0' }}>Available Now</div>
        </div>
      </div>

      {/* Hostels Grid */}
      {hostels.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {hostels.map(hostel => (
            <HostelCard 
              key={hostel.id} 
              hostel={hostel} 
              onClick={handleHostelClick}
            />
          ))}
        </div>
      ) : (
        <div style={{
          background: 'rgba(26, 32, 44, 0.95)',
          borderRadius: '16px',
          padding: '3rem',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3 style={{ color: '#f7fafc', marginBottom: '0.5rem' }}>No hostels found</h3>
          <p style={{ color: '#a0aec0' }}>Try adjusting your search filters</p>
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.5rem',
          marginTop: '2rem'
        }}>
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '8px',
                background: page === currentPage 
                  ? 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
                  : 'rgba(26, 32, 44, 0.95)',
                color: 'white',
                cursor: 'pointer',
                fontWeight: page === currentPage ? '600' : '400'
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;