import React from 'react';
import Header from './Header';
import Button from './ui/Button';

const OwnerDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-secondary-50">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Owner Dashboard</h1>
          <Button variant="primary">Add New Property</Button>
        </div>

        <div className="bg-white rounded-3xl p-16 text-center border border-secondary-200 shadow-sm">
          <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            🏠
          </div>
          <h2 className="text-2xl font-bold text-primary-900 mb-3">Welcome to your hosting hub!</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8">
            Here you can manage your listed properties, view incoming booking requests, and track your earnings. Currently, this dashboard is in preview mode.
          </p>
          <div className="flex justify-center gap-4">
            <div className="p-6 bg-secondary-50 rounded-2xl min-w-[150px]">
              <div className="text-3xl font-bold text-primary-900 mb-1">0</div>
              <div className="text-sm text-gray-500">Active Listings</div>
            </div>
            <div className="p-6 bg-secondary-50 rounded-2xl min-w-[150px]">
              <div className="text-3xl font-bold text-primary-900 mb-1">0</div>
              <div className="text-sm text-gray-500">Pending Requests</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
