const express = require('express');
const router = express.Router();
const { prisma } = require('../config/db');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { hostelId, roomType, duration, checkinDate } = req.body;
    let userId = req.user._id || req.user.id;
    
    if (!userId || userId === 'demo-user-id') {
      // For demo users, create or find a user
      let user = await prisma.user.findUnique({ where: { email: 'demo@roomradar.com' } });
      if (!user) {
        const hashedPassword = await bcrypt.hash('demo123', 10);
        user = await prisma.user.create({
          data: {
            name: 'Demo User',
            email: 'demo@roomradar.com',
            password: hashedPassword,
            role: 'USER'
          }
        });
      }
      userId = user.id;
    } else {
      userId = parseInt(userId);
    }

    // Get hostel details
    const hostelIdInt = parseInt(hostelId);
    const hostel = await prisma.hostel.findUnique({
      where: { id: hostelIdInt }
    });
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
    const booking = await prisma.booking.create({
      data: {
        userId,
        hostelId: hostelIdInt,
        roomType,
        price,
        duration,
        checkinDate: new Date(checkinDate),
        totalAmount
      },
      include: {
        hostel: {
          select: {
            id: true,
            name: true,
            city: true,
            area: true,
            monthlyRent: true,
            images: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Update hostel availability
    await prisma.hostel.update({
      where: { id: hostelIdInt },
      data: {
        availableRooms: { decrement: 1 }
      }
    });

    // Transform booking to match expected format
    const transformedBooking = {
      ...booking,
      _id: booking.id,
      hostelId: {
        ...booking.hostel,
        _id: booking.hostel.id,
        images: booking.hostel.images.map(img => img.url)
      },
      userId: booking.userId, // Keep as integer for easier comparison
      user: {
        ...booking.user,
        _id: booking.user.id
      }
    };

    res.status(201).json(transformedBooking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user bookings
router.get('/user', auth, async (req, res) => {
  try {
    // Get user ID from authenticated request (from JWT token)
    let userId = req.user._id || req.user.id;
    
    if (!userId) {
      console.error('User ID not found in request:', req.user);
      return res.status(401).json({ error: 'User ID not found' });
    }
    
    userId = parseInt(userId);
    
    if (isNaN(userId)) {
      console.error('Invalid user ID:', req.user._id || req.user.id);
      return res.status(401).json({ error: 'Invalid user ID' });
    }
    
    console.log(`Fetching bookings for user ID: ${userId} (type: ${typeof userId})`);
    
    // Query bookings for this specific user only
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        hostel: {
          select: {
            id: true,
            name: true,
            city: true,
            area: true,
            monthlyRent: true,
            images: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Found ${bookings.length} bookings in database for user ${userId}`);
    
    // Transform bookings to match expected format
    const transformedBookings = bookings.map(booking => ({
      ...booking,
      _id: booking.id,
      hostelId: {
        ...booking.hostel,
        _id: booking.hostel.id,
        images: booking.hostel.images.map(img => img.url)
      },
      userId: booking.userId, // Keep as integer for easier comparison
      user: {
        ...booking.user,
        _id: booking.user.id
      }
    }));
    
    console.log(`Returning ${transformedBookings.length} bookings for user ${userId}`);
    
    res.json(transformedBookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Server error', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});

// Get single booking by ID (must be after /user and /hostel routes)
router.get('/single/:id', auth, async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId)) {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }

    const userId = parseInt(req.user._id || req.user.id);
    
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        hostel: {
          select: {
            id: true,
            name: true,
            city: true,
            area: true,
            monthlyRent: true,
            images: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify user owns this booking
    if (booking.userId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Transform booking to match expected format
    const transformedBooking = {
      ...booking,
      _id: booking.id,
      hostelId: {
        ...booking.hostel,
        _id: booking.hostel.id,
        images: booking.hostel.images.map(img => img.url)
      },
      userId: booking.userId, // Keep as integer for easier comparison
      user: {
        ...booking.user,
        _id: booking.user.id
      }
    };

    res.json(transformedBooking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get hostel bookings (for owners)
router.get('/hostel/:id', auth, async (req, res) => {
  try {
    // Verify user is owner of this hostel
    const userId = parseInt(req.user._id || req.user.id);
    const hostelId = parseInt(req.params.id);
    
    const hostel = await prisma.hostel.findUnique({
      where: { id: hostelId }
    });
    
    if (!hostel || hostel.ownerId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const bookings = await prisma.booking.findMany({
      where: { hostelId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Transform bookings
    const transformedBookings = bookings.map(booking => ({
      ...booking,
      _id: booking.id,
      userId: {
        ...booking.user,
        _id: booking.user.id
      }
    }));
    
    res.json(transformedBookings);
  } catch (error) {
    console.error('Error fetching hostel bookings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel booking
router.put('/cancel/:id', auth, async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify user owns this booking
    const userId = parseInt(req.user._id || req.user.id);
    if (booking.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        bookingStatus: 'CANCELLED'
      }
    });

    // Restore hostel availability
    await prisma.hostel.update({
      where: { id: booking.hostelId },
      data: {
        availableRooms: { increment: 1 }
      }
    });

    res.json({ ...updatedBooking, _id: updatedBooking.id });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update booking status (for owners)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = parseInt(req.params.id);
    
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        hostel: true
      }
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify user is owner of the hostel
    const userId = parseInt(req.user._id || req.user.id);
    if (booking.hostel.ownerId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        bookingStatus: status
      }
    });

    res.json({ ...updatedBooking, _id: updatedBooking.id });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete booking (hard delete - only for users or cancelled bookings)
router.delete('/:id', auth, async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const userId = parseInt(req.user._id || req.user.id);
    
    // Verify user owns this booking or is admin
    if (booking.userId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized. Only the booking owner can delete this booking.' });
    }
    
    // Only allow deletion of cancelled bookings or allow users to delete their own bookings
    // Restore hostel availability if booking was active
    if (booking.bookingStatus !== 'CANCELLED' && booking.bookingStatus !== 'COMPLETED') {
      await prisma.hostel.update({
        where: { id: booking.hostelId },
        data: {
          availableRooms: { increment: 1 }
        }
      });
    }
    
    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId }
    });
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
