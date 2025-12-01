import React from 'react';

const amenityIcons = {
  wifi: { icon: '📶', label: 'WiFi' },
  ac: { icon: '❄️', label: 'AC' },
  mess: { icon: '🍽️', label: 'Meals' },
  laundry: { icon: '🧺', label: 'Laundry' },
  parking: { icon: '🚗', label: 'Parking' },
  cctv: { icon: '📹', label: 'CCTV' },
  powerBackup: { icon: '🔋', label: 'Power backup' },
  gym: { icon: '🏋️‍♂️', label: 'Gym' },
  rooftop: { icon: '🌇', label: 'Terrace' }
};

const HostelCard = ({ hostel, onClick }) => {
  const {
    _id,
    id,
    name,
    brand,
    city,
    area,
    monthlyRent,
    securityDeposit,
    genderPreference,
    roomType,
    rating,
    reviewCount,
    images,
    amenities,
    isVerified,
    totalRooms,
    availableRooms
  } = hostel;

  const hostelId = _id || id;
  const safeImage = images?.[0] || 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80';
  const deposit = securityDeposit || (monthlyRent ? monthlyRent * 2 : null);
  const availabilityPercent = totalRooms ? Math.round((availableRooms / totalRooms) * 100) : null;

  const activeAmenities = Object.entries(amenityIcons)
    .filter(([key]) => amenities?.[key])
    .slice(0, 5);

  const handleCardClick = () => {
    if (onClick) {
      onClick(hostelId);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl focus-within:ring-2 focus-within:ring-indigo-500"
      tabIndex={0}
      role="button"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={safeImage}
          alt={name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {isVerified && (
            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-white">
              Verified by RoomRadar
            </span>
          )}
          {brand && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
              {brand}
            </span>
          )}
        </div>

        {rating && (
          <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-slate-900 shadow-lg">
            ⭐ {rating}{reviewCount ? ` · ${reviewCount} reviews` : ''}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">{city}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{name}</h3>
            <p className="text-sm text-slate-500">{area}</p>
          </div>
          <div className="text-right">
            {monthlyRent ? (
              <>
                <p className="text-2xl font-semibold text-slate-900">
                  ₹{monthlyRent.toLocaleString()}
                  <span className="text-sm font-normal text-slate-500"> /mo</span>
                </p>
                {deposit && (
                  <p className="text-xs text-slate-500">Deposit ₹{deposit.toLocaleString()}</p>
                )}
              </>
            ) : (
              <p className="text-base font-semibold text-slate-900">Contact for pricing</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className={`rounded-full px-3 py-1 ${
            genderPreference === 'MIXED'
              ? 'bg-emerald-50 text-emerald-700'
              : genderPreference === 'MALE'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-rose-50 text-rose-700'
          }`}>
            {genderPreference === 'MIXED' ? 'Co-ed' : genderPreference}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            {roomType === 'SINGLE' ? 'Private room' : roomType === 'SHARED' ? 'Twin sharing' : 'Dormitory'}
          </span>
          {availableRooms !== undefined && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              {availableRooms} rooms open
            </span>
          )}
        </div>

        {availabilityPercent !== null && (
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-1">
              <span>Availability</span>
              <span>{availabilityPercent}% beds open</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-indigo-500"
                style={{ width: `${availabilityPercent}%` }}
              />
            </div>
          </div>
        )}

        {activeAmenities.length > 0 && (
          <div className="flex flex-wrap gap-3 text-sm text-slate-500">
            {activeAmenities.map(([key, { icon, label }]) => (
              <span key={key} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                <span>{icon}</span>
                {label}
              </span>
            ))}
            {Object.keys(amenities || {}).filter((key) => amenities[key]).length > activeAmenities.length && (
              <span className="text-xs font-semibold text-indigo-500">+ more</span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-500">Instant virtual tour + booking</p>
            <p className="text-sm font-semibold text-slate-900">Click to see full brief</p>
          </div>
          <div className="text-indigo-600 font-semibold group-hover:translate-x-1 transition">
            View details →
          </div>
        </div>
      </div>
    </article>
  );
};

export default HostelCard;
