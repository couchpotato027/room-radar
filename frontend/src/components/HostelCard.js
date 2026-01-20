import React from 'react';
import Card from './ui/Card';

const amenityIcons = {
  wifi: { icon: '📶', label: 'WiFi' },
  ac: { icon: '❄️', label: 'AC' },
  mess: { icon: '🍽️', label: 'Meals' },
  laundry: { icon: '🧺', label: 'Laundry' },
  parking: { icon: '🚗', label: 'Parking' },
  cctv: { icon: '📹', label: 'CCTV' },
  powerBackup: { icon: '🔋', label: 'Backup' },
  gym: { icon: '🏋️‍♂️', label: 'Gym' },
  rooftop: { icon: '🌇', label: 'Terrace' }
};

const HostelCard = ({ hostel, onClick }) => {
  const {
    _id, id, name, city, area, monthlyRent,
    rating, reviewCount, images, amenities
  } = hostel;

  const hostelId = _id || id;
  const safeImage = images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80';

  const activeAmenities = Object.entries(amenityIcons)
    .filter(([key]) => amenities?.[key])
    .slice(0, 3);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick && onClick(hostelId);
    }
  };

  return (
    <Card
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-none ring-1 ring-secondary-200"
      onClick={() => onClick && onClick(hostelId)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={safeImage}
          alt={name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-medium text-white mb-1 border border-white/20">
              {city}, {area}
            </span>
            <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md truncate w-full">
              {name}
            </h3>
          </div>
        </div>

        {rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-primary-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span>★</span> {rating} <span className="font-normal text-gray-500">({reviewCount})</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3 bg-white">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold text-primary-900">
            ₹{monthlyRent?.toLocaleString()} <span className="text-xs font-normal text-gray-500">/mo</span>
          </h4>
        </div>

        {activeAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-secondary-100">
            {activeAmenities.map(([key, { icon, label }]) => (
              <span key={key} className="text-[10px] font-medium uppercase tracking-wider text-gray-500 bg-secondary-50 px-2 py-1 rounded-md">
                {label}
              </span>
            ))}
            {Object.keys(amenities || {}).filter(k => amenities[k]).length > 3 && (
              <span className="text-[10px] font-medium text-accent-600 bg-accent-50 px-2 py-1 rounded-md">
                +{Object.keys(amenities).filter(k => amenities[k]).length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default HostelCard;
