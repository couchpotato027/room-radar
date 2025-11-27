import React from 'react';

const HostelCard = ({ hostel, onClick }) => {
  const { 
    name, 
    city, 
    monthlyRent, 
    genderPreference, 
    roomType, 
    averageRating, 
    reviewCount,
    wifi,
    ac,
    mess,
    images 
  } = hostel;

  return (
    <div 
      className="hostel-card"
      onClick={() => onClick(hostel.id)}
      style={{
        background: 'rgba(26, 32, 44, 0.95)',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginBottom: '1rem'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-4px)';
        e.target.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      {images && images.length > 0 && (
        <div style={{
          width: '100%',
          height: '200px',
          borderRadius: '12px',
          backgroundImage: `url(${images[0].url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '1rem'
        }} />
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
        <h3 style={{ color: '#f7fafc', fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>
          {name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ color: '#ff6b35' }}>★</span>
          <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>
            {averageRating ? averageRating.toFixed(1) : 'No reviews'} ({reviewCount})
          </span>
        </div>
      </div>
      
      <p style={{ color: '#a0aec0', marginBottom: '1rem' }}>📍 {city}</p>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <span style={{ 
          background: 'rgba(255, 107, 53, 0.2)', 
          color: '#ff6b35', 
          padding: '0.25rem 0.5rem', 
          borderRadius: '6px', 
          fontSize: '0.8rem' 
        }}>
          {genderPreference}
        </span>
        <span style={{ 
          background: 'rgba(255, 107, 53, 0.2)', 
          color: '#ff6b35', 
          padding: '0.25rem 0.5rem', 
          borderRadius: '6px', 
          fontSize: '0.8rem' 
        }}>
          {roomType}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {wifi && <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>📶 WiFi</span>}
        {ac && <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>❄️ AC</span>}
        {mess && <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>🍽️ Mess</span>}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#ff6b35', fontSize: '1.5rem', fontWeight: '700' }}>
            ₹{monthlyRent.toLocaleString()}
          </span>
          <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>/month</span>
        </div>
        <button style={{
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default HostelCard;