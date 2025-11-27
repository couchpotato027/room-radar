import React from 'react';

const HostelCard = ({ hostel, onClick }) => {
  const {
    id,
    name,
    brand,
    city,
    area,
    monthlyRent,
    genderPreference,
    roomType,
    rating,
    reviewCount,
    images,
    amenities,
    isVerified,
    availableRooms
  } = hostel;

  const getAmenityIcon = (amenity, available) => {
    const icons = {
      wifi: '📶',
      ac: '❄️',
      mess: '🍽️',
      laundry: '👕',
      parking: '🚗',
      cctv: '📹',
      powerBackup: '🔋',
      gym: '💪',
      rooftop: '🏢'
    };
    
    return available ? icons[amenity] : null;
  };

  const getGenderBadgeColor = (gender) => {
    switch (gender) {
      case 'MALE': return 'bg-blue-100 text-blue-800';
      case 'FEMALE': return 'bg-pink-100 text-pink-800';
      case 'MIXED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="card cursor-pointer group animate-fade-in"
      onClick={() => onClick(id)}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'}
          alt={name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isVerified && (
            <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
              ✓ Verified
            </span>
          )}
          {availableRooms <= 5 && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Only {availableRooms} left
            </span>
          )}
        </div>

        {/* Brand */}
        {brand && (
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
              {brand}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
              {name}
            </h3>
            <p className="text-gray-600 text-sm">{area}, {city}</p>
          </div>
          
          {rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="font-medium text-gray-900">{rating}</span>
              <span className="text-gray-500 text-sm">({reviewCount})</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getGenderBadgeColor(genderPreference)}`}>
            {genderPreference === 'MIXED' ? 'Co-ed' : genderPreference.toLowerCase()}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
            {roomType === 'SINGLE' ? 'Private' : 'Shared'} Room
          </span>
        </div>

        {/* Amenities */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {Object.entries(amenities || {}).map(([key, value]) => {
            const icon = getAmenityIcon(key, value);
            return icon ? (
              <span key={key} className="text-sm" title={key}>
                {icon}
              </span>
            ) : null;
          })}
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ₹{monthlyRent?.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm ml-1">/month</span>
          </div>
          
          <button className="btn-primary text-sm py-2 px-4">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;