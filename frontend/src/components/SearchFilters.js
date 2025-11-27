import React, { useState } from 'react';

const SearchFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    genderPreference: '',
    roomType: '',
    sortBy: 'rating',
    sortOrder: 'desc'
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      search: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      genderPreference: '',
      roomType: '',
      sortBy: 'rating',
      sortOrder: 'desc'
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Noida', 'Gurgaon'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Main Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search hostels, areas, or landmarks
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., Koramangala, Zolo, near metro..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="input-field pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="input-field"
          >
            <option value="">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              handleFilterChange('sortBy', sortBy);
              handleFilterChange('sortOrder', sortOrder);
            }}
            className="input-field"
          >
            <option value="rating-desc">Highest Rated</option>
            <option value="monthlyRent-asc">Price: Low to High</option>
            <option value="monthlyRent-desc">Price: High to Low</option>
            <option value="reviewCount-desc">Most Reviewed</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
        >
          <svg 
            className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </button>

        {(filters.search || filters.city || filters.minPrice || filters.maxPrice || filters.genderPreference || filters.roomType) && (
          <button
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200 animate-slide-up">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
            <input
              type="number"
              placeholder="₹5,000"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
            <input
              type="number"
              placeholder="₹25,000"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="input-field"
            />
          </div>

          {/* Gender Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender Preference</label>
            <select
              value={filters.genderPreference}
              onChange={(e) => handleFilterChange('genderPreference', e.target.value)}
              className="input-field"
            >
              <option value="">Any</option>
              <option value="MALE">Male Only</option>
              <option value="FEMALE">Female Only</option>
              <option value="MIXED">Co-ed</option>
            </select>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
            <select
              value={filters.roomType}
              onChange={(e) => handleFilterChange('roomType', e.target.value)}
              className="input-field"
            >
              <option value="">Any</option>
              <option value="SINGLE">Private Room</option>
              <option value="SHARED">Shared Room</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;