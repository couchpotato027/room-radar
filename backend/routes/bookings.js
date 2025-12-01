const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Hostel = require('../models/Hostel');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { hostelId, roomType, duration, checkinDate } = req.body;
    let userId = req.user._id || req.user.id;
    
    if (!userId || userId === 'demo-user-id') {
      // For demo users, create or find a user
      let user = await User.findOne({ email: 'demo@roomradar.com' });
      if (!user) {
        user = await User.create({
          name: 'Demo User',
          email: 'demo@roomradar.com',
          password: 'demo123',
          role: 'USER'
        });
      }
      userId = user._id;
    }

    // Get hostel details
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    // Check availability
    if (hostel.availableRooms <= 0) {
      return res.status(400).json({ error: 'No rooms available' });
    }

    // Calculate price
    const price = hostel.monthlyRent;
    const totalAmount = price * duration;

    // Create booking
    const booking = await Booking.create({
      userId,
      hostelId,
      roomType,
      price,
      duration,
      checkinDate: new Date(checkinDate),
      totalAmount
    });

    // Update hostel availability
    await Hostel.findByIdAndUpdate(hostelId, {
      $inc: { availableRooms: -1 }
    });

    await booking.populate('hostelId', 'name city area images monthlyRent');
    await booking.populate('userId', 'name email');

    res.status(201).json(booking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user bookings
router.get('/user', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'User ID not found' });
    }
    
    // Query bookings for this specific user only
    // MongoDB automatically handles ObjectId comparison - use userId directly
    const bookings = await Booking.find({ userId: userId })
      .populate('hostelId', 'name city area images monthlyRent')
      .sort({ createdAt: -1 });
    
    // Log for debugging (can remove later)
    console.log(`Fetched ${bookings.length} bookings for user ${userId}`);
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get hostel bookings (for owners)
router.get('/hostel/:id', auth, async (req, res) => {
  try {
    // Verify user is owner of this hostel
    const userId = req.user._id || req.user.id;
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel || hostel.ownerId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const bookings = await Booking.find({ hostelId: req.params.id })
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching hostel bookings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel booking
router.put('/cancel/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify user owns this booking
    const userId = req.user._id || req.user.id;
    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update booking status
    booking.bookingStatus = 'CANCELLED';
    await booking.save();

    // Restore hostel availability
    await Hostel.findByIdAndUpdate(booking.hostelId, {
      $inc: { availableRooms: 1 }
    });

    res.json(booking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update booking status (for owners)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id).populate('hostelId');
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify user is owner of the hostel
    const userId = req.user._id || req.user.id;
    if (booking.hostelId.ownerId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    booking.bookingStatus = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete booking (hard delete - only for users or cancelled bookings)
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const userId = req.user._id || req.user.id;
    
    // Verify user owns this booking or is admin
    if (booking.userId.toString() !== userId.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized. Only the booking owner can delete this booking.' });
    }
    
    // Only allow deletion of cancelled bookings or allow users to delete their own bookings
    // Restore hostel availability if booking was active
    if (booking.bookingStatus !== 'CANCELLED' && booking.bookingStatus !== 'COMPLETED') {
      await Hostel.findByIdAndUpdate(booking.hostelId, {
        $inc: { availableRooms: 1 }
      });
    }
    
    // Delete the booking
    await Booking.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

