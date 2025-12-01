const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  hostelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel', required: true, index: true },
  roomType: { type: String, enum: ['SINGLE', 'SHARED', 'DORMITORY'], required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in months
  checkinDate: { type: Date, required: true },
  bookingStatus: { 
    type: String, 
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'], 
    default: 'PENDING',
    index: true
  },
  totalAmount: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);

