import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Header from './Header';
import HostelCard from './HostelCard';

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
    page: 1,
    limit: 12,
    total: 0,
    pages: 1
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchHostels();
  }, [filters, pagination.page]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/locations`);
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchHostels = async () => {
    try {
      setLoading(true);
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit
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
    <div className="min-h-screen bg-slate-50">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* HERO */}
        <section className="bg-white border border-slate-100 rounded-3xl shadow-sm p-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">Curated living</p>
              <h1 className="text-4xl font-semibold text-slate-900 leading-tight">
                Minimal, transparent discovery for Indian hostels & co-living spaces.
              </h1>
              <p className="text-slate-600">
                No cluttered cards or questionable photos. Just verified inventory, real photography and filters that work.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  View my bookings
                </button>
                <button
                  onClick={() => navigate('/list-hostel')}
                  className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700"
                >
                  List your hostel
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-6 text-center">
                  <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-600">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="e.g. Koramangala, Stanza"
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <option value="">All cities</option>
                  {cities.map(city => <option key={city}>{city}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600">Area</label>
                <select
                  value={filters.area}
                  onChange={(e) => handleFilterChange('area', e.target.value)}
                  disabled={!filters.city}
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 disabled:opacity-60"
                >
                  <option value="">All areas</option>
                  {areas.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Other filters */}
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="text-xs uppercase text-slate-500">Min rent</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="text-xs uppercase text-slate-500">Max rent</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5"
              />
            </div>

            <div>
              <label className="text-xs uppercase text-slate-500">Gender</label>
              <select
                value={filters.genderPreference}
                onChange={(e) => handleFilterChange('genderPreference', e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5"
              >
                <option value="">Any</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="MIXED">Co-ed</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase text-slate-500">Room type</label>
              <select
                value={filters.roomType}
                onChange={(e) => handleFilterChange('roomType', e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5"
              >
                <option value="">Any</option>
                <option value="SINGLE">Single</option>
                <option value="SHARED">Twin</option>
                <option value="DORMITORY">Dorm</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                setFilters(prev => ({ ...prev, sortBy, sortOrder }));
                setPagination(prev => ({ ...prev, page: 1 }));
              }}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5"
            >
              <option value="rating-desc">Highest rated</option>
              <option value="price-asc">Budget first</option>
              <option value="price-desc">Premium first</option>
            </select>

            <button onClick={clearFilters} className="text-sm font-semibold text-slate-600">
              Clear filters
            </button>
          </div>
        </section>

        {/* HOSTELS GRID */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">
            {pagination.total.toLocaleString()} hostels
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : hostels.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostels.map((h) => (
                  <HostelCard
                    key={h._id || h.id}
                    hostel={h}
                    onClick={() => handleHostelClick(h._id || h.id)}
                  />
                ))}
              </div>

              <div className="flex justify-center items-center gap-4 pt-6">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  className="px-4 py-2 border rounded-2xl"
                >
                  Previous
                </button>

                <span>{pagination.page} / {pagination.pages}</span>

                <button
                  disabled={pagination.page === pagination.pages}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  className="px-4 py-2 border rounded-2xl"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
