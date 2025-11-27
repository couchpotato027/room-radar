import React, { useState } from 'react';

const SearchFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    genderPreference: '',
    roomType: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div style={{
      background: 'rgba(26, 32, 44, 0.95)',
      borderRadius: '16px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '2rem'
    }}>
      <h3 style={{ color: '#f7fafc', marginBottom: '1rem', fontSize: '1.2rem' }}>
        🔍 Search & Filter
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search hostels, city..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #4a5568',
            borderRadius: '8px',
            background: '#2d3748',
            color: '#f7fafc',
            fontSize: '0.9rem'
          }}
        />
        
        {/* City */}
        <input
          type="text"
          placeholder="City"
          value={filters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #4a5568',
            borderRadius: '8px',
            background: '#2d3748',
            color: '#f7fafc',
            fontSize: '0.9rem'
          }}
        />
        
        {/* Price Range */}
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #4a5568',
            borderRadius: '8px',
            background: '#2d3748',
            color: '#f7fafc',
            fontSize: '0.9rem'
          }}
        />
        
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #4a5568',
            borderRadius: '8px',
            background: '#2d3748',
            color: '#f7fafc',
            fontSize: '0.9rem'
          }}
        />
        
        {/* Gender Preference */}
        <select
          value={filters.genderPreference}
          onChange={(e) => handleFilterChange('genderPreference', e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #4a5568',
            borderRadius: '8px',
            background: '#2d3748',
            color: '#f7fafc',
            fontSize: '0.9rem'
          }}
        >
          <option value="">All Genders</option>
          <option value="MALE">Male Only</option>
          <option value="FEMALE">Female Only</option>
          <option value="MIXED">Mixed</option>
        </select>
        
        {/* Room Type */}
        <select
          value={filters.roomType}
          onChange={(e) => handleFilterChange('roomType', e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #4a5568',
            borderRadius: '8px',
            background: '#2d3748',
            color: '#f7fafc',
            fontSize: '0.9rem'
          }}
        >
          <option value="">All Room Types</option>
          <option value="SINGLE">Single</option>
          <option value="SHARED">Shared</option>
          <option value="DORMITORY">Dormitory</option>
        </select>
        
        {/* Sort By */}
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #4a5568',
            borderRadius: '8px',
            background: '#2d3748',
            color: '#f7fafc',
            fontSize: '0.9rem'
          }}
        >
          <option value="createdAt">Latest</option>
          <option value="monthlyRent">Price</option>
          <option value="name">Name</option>
        </select>
        
        {/* Sort Order */}
        <select
          value={filters.sortOrder}
          onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #4a5568',
            borderRadius: '8px',
            background: '#2d3748',
            color: '#f7fafc',
            fontSize: '0.9rem'
          }}
        >
          <option value="desc">High to Low</option>
          <option value="asc">Low to High</option>
        </select>
      </div>
      
      <button
        onClick={() => {
          const resetFilters = {
            search: '',
            city: '',
            minPrice: '',
            maxPrice: '',
            genderPreference: '',
            roomType: '',
            sortBy: 'createdAt',
            sortOrder: 'desc'
          };
          setFilters(resetFilters);
          onFiltersChange(resetFilters);
        }}
        style={{
          marginTop: '1rem',
          background: 'rgba(255, 107, 53, 0.2)',
          color: '#ff6b35',
          border: '1px solid #ff6b35',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SearchFilters;