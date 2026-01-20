import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import HostelCard from './HostelCard';
import Button from './ui/Button';

const stats = [
  { label: 'Cities covered', value: '18' },
  { label: 'Verified beds', value: '42k+' },
  { label: 'Avg. resident rating', value: '4.7 / 5' }
];

const initialFilters = {
  search: '',
  city: '',
  area: '',
  minPrice: '',
  maxPrice: '',
  genderPreference: '',
  roomType: '',
  sortBy: 'rating',
  sortOrder: 'desc'
};

const Home = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState({});
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1, limit: 12, total: 0, pages: 1
  });

  useEffect(() => { fetchLocations(); }, []);
  useEffect(() => { fetchHostels(); }, [filters, pagination.page]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/locations`);
      setLocations(response.data);
    } catch (error) { console.error('Error fetching locations:', error); }
  };

  const fetchHostels = async () => {
    try {
      setLoading(true);
      const params = { ...filters, page: pagination.page, limit: pagination.limit };
      const response = await axios.get(`${config.API_URL}/api/hostels`, { params });
      setHostels(response.data.hostels);
      setPagination(response.data.pagination);
    } catch (error) { console.error('Error fetching hostels:', error); }
    finally { setLoading(false); }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const nextFilters = { ...prev, [key]: value };
      if (key === 'city') nextFilters.area = '';
      return nextFilters;
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleHostelClick = (id) => {
    navigate(`/hostel/${id}`);
  };

  const cities = useMemo(() => Object.keys(locations), [locations]);
  const areas = useMemo(() => (
    filters.city && locations[filters.city] ? locations[filters.city] : []
  ), [filters.city, locations]);

  return (
    <div className="min-h-screen bg-secondary-50 font-sans text-primary-900">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl bg-secondary-100 p-8 lg:p-12">
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-medium text-accent-600 shadow-sm">
                <span className="mr-2 h-2 w-2 rounded-full bg-accent-500"></span>
                Curated Living Spaces
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-primary-900 sm:text-6xl leading-tight">
                Find your place <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-accent-500">
                  to call home.
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Verified listings, transparent pricing, and a community-first approach.
                Discover standard-setting hostels and co-living spaces.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg" onClick={() => navigate('/list-hostel')}>
                  List Your Property
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
                  View Bookings
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className={`bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm ${idx === 2 ? 'col-span-2' : ''}`}>
                  <p className="text-3xl font-bold text-primary-900">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEARCH & FILTERS */}
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary-200">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">Search Location</label>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search by city, area, or name..."
                  className="w-full bg-secondary-50 border-transparent focus:border-accent-500 focus:bg-white rounded-xl px-4 py-3 placeholder-gray-400 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full bg-secondary-50 border-transparent focus:border-accent-500 focus:bg-white rounded-xl px-4 py-3 font-medium cursor-pointer"
                >
                  <option value="">All Cities</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">Area</label>
                <select
                  value={filters.area}
                  onChange={(e) => handleFilterChange('area', e.target.value)}
                  disabled={!filters.city}
                  className="w-full bg-secondary-50 border-transparent focus:border-accent-500 focus:bg-white rounded-xl px-4 py-3 font-medium disabled:opacity-50 cursor-pointer"
                >
                  <option value="">All Areas</option>
                  {areas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

            {/* Secondary Filters */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6 pt-6 border-t border-secondary-100">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 bg-secondary-50 border-transparent rounded-xl px-3 py-2 text-sm"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 bg-secondary-50 border-transparent rounded-xl px-3 py-2 text-sm"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-500 mb-2">Sort By</label>
                <select
                  className="w-full bg-secondary-50 border-transparent rounded-xl px-3 py-2.5 text-sm"
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    setFilters(prev => ({ ...prev, sortBy, sortOrder }));
                  }}
                >
                  <option value="rating-desc">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              <div className="lg:col-span-2 flex items-center justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm font-semibold text-accent-600 hover:text-accent-500 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* LISTINGS */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary-900">
              Explore Spaces
              <span className="ml-3 text-lg font-medium text-gray-500">
                {pagination.total} results
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
            </div>
          ) : hostels.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-secondary-200">
              <p className="text-gray-500 text-lg">No spaces found matching your criteria.</p>
              <Button variant="ghost" className="mt-4" onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {hostels.map((h) => (
                  <HostelCard
                    key={h._id || h.id}
                    hostel={h}
                    onClick={() => handleHostelClick(h._id || h.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-10">
                  <Button
                    variant="ghost"
                    disabled={pagination.page === 1}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  >
                    Previous
                  </Button>
                  <span className="font-medium text-primary-900">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="ghost"
                    disabled={pagination.page === pagination.pages}
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
