const express = require('express');
const router = express.Router();
const Hostel = require('../models/Hostel');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Create new hostel (List Your Hostel)
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    
    // If demo user, create or find a user
    let user = req.user;
    if (!userId || userId === 'demo-user-id') {
      user = await User.findOne({ email: 'demo@roomradar.com' });
      if (!user) {
        user = await User.create({
          name: 'Demo User',
          email: 'demo@roomradar.com',
          password: 'demo123',
          role: 'OWNER'
        });
      }
    }

    const {
      name,
      city,
      area,
      address,
      monthlyRent,
      securityDeposit,
      genderPreference,
      roomType,
      totalRooms,
      availableRooms,
      description,
      images,
      amenities,
      nearbyPlaces,
      landmark,
      metroStation
    } = req.body;

    // Create hostel
    const hostel = await Hostel.create({
      name,
      city,
      area,
      address: address || `${area}, ${city}`,
      monthlyRent,
      securityDeposit: securityDeposit || monthlyRent * 2,
      genderPreference: genderPreference || 'MIXED',
      roomType: roomType || 'SHARED',
      totalRooms: totalRooms || 50,
      availableRooms: availableRooms || totalRooms || 50,
      isVerified: false, // New listings need verification
      isActive: true,
      rating: 0,
      reviewCount: 0,
      images: images || ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'],
      amenities: amenities || {
        wifi: true,
        ac: false,
        mess: true,
        laundry: true,
        parking: false,
        cctv: true,
        powerBackup: true,
        gym: false,
        rooftop: false
      },
      description: description || `Comfortable accommodation in ${area}, ${city}.`,
      nearbyPlaces: nearbyPlaces || [],
      coordinates: { lat: 0, lng: 0 },
      landmark: landmark || '',
      metroStation: metroStation || '',
      ownerId: user._id
    });

    res.status(201).json(hostel);
  } catch (error) {
    console.error('Error creating hostel:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Get owner's hostels (must be before /:id route)
router.get('/owner', auth, async (req, res) => {
  try {
    let userId = req.user._id || req.user.id;
    
    // Handle demo users
    if (!userId || userId === 'demo-user-id') {
      let user = await User.findOne({ email: 'demo@roomradar.com' });
      if (!user) {
        user = await User.create({
          name: 'Demo User',
          email: 'demo@roomradar.com',
          password: 'demo123',
          role: 'OWNER'
        });
      }
      userId = user._id;
    }
    
    const hostels = await Hostel.find({ ownerId: userId }).sort({ createdAt: -1 });
    res.json(hostels);
  } catch (error) {
    console.error('Error fetching owner hostels:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update hostel (for owners)
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const hostel = await Hostel.findById(req.params.id);
    
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    
    // Verify user is owner of this hostel
    if (hostel.ownerId.toString() !== userId.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized. Only the owner can update this hostel.' });
    }
    
    // Update hostel fields
    const allowedUpdates = [
      'name', 'city', 'area', 'address', 'monthlyRent', 'securityDeposit',
      'genderPreference', 'roomType', 'totalRooms', 'availableRooms',
      'description', 'images', 'amenities', 'nearbyPlaces', 'landmark', 'metroStation'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        hostel[field] = req.body[field];
      }
    });
    
    await hostel.save();
    res.json(hostel);
  } catch (error) {
    console.error('Error updating hostel:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Delete hostel (for owners/admins)
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const hostel = await Hostel.findById(req.params.id);
    
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    
    // Verify user is owner of this hostel or is admin
    if (hostel.ownerId.toString() !== userId.toString() && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized. Only the owner or admin can delete this hostel.' });
    }
    
    // Soft delete by setting isActive to false (better practice)
    hostel.isActive = false;
    await hostel.save();
    
    res.json({ message: 'Hostel deleted successfully', hostel });
  } catch (error) {
    console.error('Error deleting hostel:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

module.exports = router;

