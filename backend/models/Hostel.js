const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  brand: String,
  city: { type: String, required: true, index: true },
  area: { type: String, required: true, index: true },
  address: String,
  monthlyRent: { type: Number, required: true, index: true },
  securityDeposit: Number,
  genderPreference: { type: String, enum: ['MALE', 'FEMALE', 'MIXED'], default: 'MIXED' },
  roomType: { type: String, enum: ['SINGLE', 'SHARED', 'DORMITORY'], default: 'SHARED' },
  totalRooms: { type: Number, default: 0 },
  availableRooms: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  images: [String],
  amenities: {
    wifi: { type: Boolean, default: false },
    ac: { type: Boolean, default: false },
    mess: { type: Boolean, default: false },
    laundry: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    cctv: { type: Boolean, default: false },
    powerBackup: { type: Boolean, default: false },
    gym: { type: Boolean, default: false },
    rooftop: { type: Boolean, default: false }
  },
  description: String,
  nearbyPlaces: [String],
  coordinates: {
    lat: Number,
    lng: Number
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  landmark: String,
  metroStation: String
}, {
  timestamps: true
});

// Text search index
hostelSchema.index({ name: 'text', city: 'text', area: 'text', landmark: 'text', metroStation: 'text' });

module.exports = mongoose.model('Hostel', hostelSchema);

