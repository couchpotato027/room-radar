import React from 'react';

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
    rating, reviewCount, images, amenities, availableRooms
  } = hostel;

  const hostelId = _id || id;
  const safeImage = images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80';

  const activeAmenities = Object.entries(amenityIcons)
    .filter(([key]) => amenities?.[key])
    .slice(0, 3);

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onClick && onClick(hostelId)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.(hostelId)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={safeImage}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Rating Badge */}
        {rating > 0 && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-stone-900 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="text-amber-500">★</span> {rating.toFixed(1)}
          </div>
        )}

        {/* Location */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
            {city}{area ? `, ${area}` : ''}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-stone-900 leading-tight line-clamp-1 flex-1">
            {name}
          </h3>
          {availableRooms !== undefined && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded ${availableRooms > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {availableRooms > 0 ? `${availableRooms} left` : 'Full'}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-stone-900">₹{monthlyRent?.toLocaleString()}</span>
          <span className="text-sm text-stone-500">/month</span>
        </div>

        {/* Amenities */}
        {activeAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
            {activeAmenities.map(([key, { label }]) => (
              <span key={key} className="text-[10px] font-medium uppercase tracking-wide text-stone-500 bg-stone-50 px-2 py-1 rounded">
                {label}
              </span>
            ))}
            {Object.keys(amenities || {}).filter(k => amenities[k]).length > 3 && (
              <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded">
                +{Object.keys(amenities).filter(k => amenities[k]).length - 3}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <button className="w-full mt-2 py-2 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </article>
  );
};

export default HostelCard;
