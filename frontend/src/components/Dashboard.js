import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import HostelCard from './HostelCard';
import SearchFilters from './SearchFilters';

const Dashboard = ({ user, onLogout }) => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({});

  const fetchHostels = async (filterParams = {}) => {
    try {
      setLoading(true);
      const params = {
        limit: 12,
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
    fetchHostels(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleHostelClick = (hostelId) => {
    console.log('Navigate to hostel:', hostelId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Hostel
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover verified hostels and co-living spaces across India with transparent pricing and genuine reviews
          </p>
        </div>

        {/* Search & Filters */}
        <SearchFilters onFiltersChange={handleFiltersChange} />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {pagination.total || 0} hostels found
            </h2>
            <p className="text-gray-600">
              Showing verified properties with real pricing
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden md:flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {hostels.filter(h => h.isVerified).length}
              </div>
              <div className="text-sm text-gray-500">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {hostels.filter(h => h.availableRooms > 0).length}
              </div>
              <div className="text-sm text-gray-500">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {hostels.filter(h => h.rating >= 4.0).length}
              </div>
              <div className="text-sm text-gray-500">Top Rated</div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Hostels Grid */}
            {hostels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostels.map(hostel => (
                  <HostelCard 
                    key={hostel.id} 
                    hostel={hostel} 
                    onClick={handleHostelClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hostels found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <button 
                  onClick={() => handleFiltersChange({})}
                  className="btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Load More / Pagination could go here */}
      </main>
    </div>
  );
};

export default Dashboard;