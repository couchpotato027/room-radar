const express = require('express');
const router = express.Router();
const { prisma } = require('../config/db');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// Create new hostel (List Your Hostel)
router.post('/', auth, async (req, res) => {
  try {
    let userId = req.user._id || req.user.id;
    
    // If demo user, create or find a user
    let user = req.user;
    if (!userId || userId === 'demo-user-id') {
      user = await prisma.user.findUnique({ where: { email: 'demo@roomradar.com' } });
      if (!user) {
        const hashedPassword = await bcrypt.hash('demo123', 10);
        user = await prisma.user.create({
          data: {
            name: 'Demo User',
            email: 'demo@roomradar.com',
            password: hashedPassword,
            role: 'OWNER'
          }
        });
      }
    } else {
      userId = parseInt(userId);
    }

    const {
      name,
      city,
      area,
      address,
      state,
      pincode,
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
      metroStation,
      latitude,
      longitude
    } = req.body;

    // Create hostel with images
    const hostel = await prisma.hostel.create({
      data: {
        name,
        brand: req.body.brand || null,
        city,
        area: area || null,
        address: address || `${area || ''}, ${city}`,
        state: state || null,
        pincode: pincode || null,
        monthlyRent,
        securityDeposit: securityDeposit || monthlyRent * 2,
        genderPreference: genderPreference || 'MIXED',
        roomType: roomType || 'SHARED',
        totalRooms: totalRooms || 50,
        availableRooms: availableRooms || totalRooms || 50,
        isVerified: false,
        isActive: true,
        rating: 0,
        reviewCount: 0,
        description: description || `Comfortable accommodation in ${area || city}.`,
        landmark: landmark || null,
        metroStation: metroStation || null,
        latitude: latitude || (req.body.coordinates?.lat || null),
        longitude: longitude || (req.body.coordinates?.lng || null),
        wifi: amenities?.wifi || false,
        ac: amenities?.ac || false,
        mess: amenities?.mess || true,
        laundry: amenities?.laundry || true,
        parking: amenities?.parking || false,
        cctv: amenities?.cctv || true,
        powerBackup: amenities?.powerBackup || true,
        gym: amenities?.gym || false,
        rooftop: amenities?.rooftop || false,
        nearbyPlaces: nearbyPlaces || null,
        ownerId: user.id || userId,
        images: {
          create: (images || ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800']).map(url => ({
            url
          }))
        }
      },
      include: {
        images: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Transform to match expected format
    const transformedHostel = {
      ...hostel,
      _id: hostel.id,
      images: hostel.images.map(img => img.url),
      coordinates: hostel.latitude && hostel.longitude ? {
        lat: hostel.latitude,
        lng: hostel.longitude
      } : undefined,
      amenities: {
        wifi: hostel.wifi,
        ac: hostel.ac,
        mess: hostel.mess,
        laundry: hostel.laundry,
        parking: hostel.parking,
        cctv: hostel.cctv,
        powerBackup: hostel.powerBackup,
        gym: hostel.gym,
        rooftop: hostel.rooftop
      },
      nearbyPlaces: hostel.nearbyPlaces || []
    };
    
    res.status(201).json(transformedHostel);
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
      let user = await prisma.user.findUnique({ where: { email: 'demo@roomradar.com' } });
      if (!user) {
        const hashedPassword = await bcrypt.hash('demo123', 10);
        user = await prisma.user.create({
          data: {
            name: 'Demo User',
            email: 'demo@roomradar.com',
            password: hashedPassword,
            role: 'OWNER'
          }
        });
      }
      userId = user.id;
    } else {
      userId = parseInt(userId);
    }
    
    const hostels = await prisma.hostel.findMany({
      where: { ownerId: userId },
      include: {
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    // Transform hostels
    const transformedHostels = hostels.map(hostel => ({
      ...hostel,
      _id: hostel.id,
      images: hostel.images.map(img => img.url),
      coordinates: hostel.latitude && hostel.longitude ? {
        lat: hostel.latitude,
        lng: hostel.longitude
      } : undefined,
      amenities: {
        wifi: hostel.wifi,
        ac: hostel.ac,
        mess: hostel.mess,
        laundry: hostel.laundry,
        parking: hostel.parking,
        cctv: hostel.cctv,
        powerBackup: hostel.powerBackup,
        gym: hostel.gym,
        rooftop: hostel.rooftop
      },
      nearbyPlaces: hostel.nearbyPlaces || []
    }));
    
    res.json(transformedHostels);
  } catch (error) {
    console.error('Error fetching owner hostels:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update hostel (for owners)
router.put('/:id', auth, async (req, res) => {
  try {
    const userId = parseInt(req.user._id || req.user.id);
    const hostelId = parseInt(req.params.id);
    
    const hostel = await prisma.hostel.findUnique({
      where: { id: hostelId }
    });
    
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    
    // Verify user is owner of this hostel
    if (hostel.ownerId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized. Only the owner can update this hostel.' });
    }
    
    // Prepare update data
    const updateData = {};
    const allowedUpdates = [
      'name', 'city', 'area', 'address', 'state', 'pincode', 'monthlyRent', 'securityDeposit',
      'genderPreference', 'roomType', 'totalRooms', 'availableRooms',
      'description', 'landmark', 'metroStation', 'latitude', 'longitude', 'brand'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Handle amenities
    if (req.body.amenities) {
      const amenities = req.body.amenities;
      if (amenities.wifi !== undefined) updateData.wifi = amenities.wifi;
      if (amenities.ac !== undefined) updateData.ac = amenities.ac;
      if (amenities.mess !== undefined) updateData.mess = amenities.mess;
      if (amenities.laundry !== undefined) updateData.laundry = amenities.laundry;
      if (amenities.parking !== undefined) updateData.parking = amenities.parking;
      if (amenities.cctv !== undefined) updateData.cctv = amenities.cctv;
      if (amenities.powerBackup !== undefined) updateData.powerBackup = amenities.powerBackup;
      if (amenities.gym !== undefined) updateData.gym = amenities.gym;
      if (amenities.rooftop !== undefined) updateData.rooftop = amenities.rooftop;
    }

    // Handle nearbyPlaces
    if (req.body.nearbyPlaces !== undefined) {
      updateData.nearbyPlaces = req.body.nearbyPlaces;
    }

    // Handle images
    if (req.body.images) {
      // Delete existing images
      await prisma.hostelImage.deleteMany({
        where: { hostelId }
      });
      
      // Create new images
      await prisma.hostelImage.createMany({
        data: req.body.images.map(url => ({
          url,
          hostelId
        }))
      });
    }
    
    const updatedHostel = await prisma.hostel.update({
      where: { id: hostelId },
      data: updateData,
      include: {
        images: true
      }
    });

    // Transform to match expected format
    const transformedHostel = {
      ...updatedHostel,
      _id: updatedHostel.id,
      images: updatedHostel.images.map(img => img.url),
      coordinates: updatedHostel.latitude && updatedHostel.longitude ? {
        lat: updatedHostel.latitude,
        lng: updatedHostel.longitude
      } : undefined,
      amenities: {
        wifi: updatedHostel.wifi,
        ac: updatedHostel.ac,
        mess: updatedHostel.mess,
        laundry: updatedHostel.laundry,
        parking: updatedHostel.parking,
        cctv: updatedHostel.cctv,
        powerBackup: updatedHostel.powerBackup,
        gym: updatedHostel.gym,
        rooftop: updatedHostel.rooftop
      },
      nearbyPlaces: updatedHostel.nearbyPlaces || []
    };
    
    res.json(transformedHostel);
  } catch (error) {
    console.error('Error updating hostel:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Delete hostel (for owners/admins)
router.delete('/:id', auth, async (req, res) => {
  try {
    const userId = parseInt(req.user._id || req.user.id);
    const hostelId = parseInt(req.params.id);
    
    const hostel = await prisma.hostel.findUnique({
      where: { id: hostelId }
    });
    
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    
    // Verify user is owner of this hostel or is admin
    if (hostel.ownerId !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Unauthorized. Only the owner or admin can delete this hostel.' });
    }
    
    // Soft delete by setting isActive to false (better practice)
    const updatedHostel = await prisma.hostel.update({
      where: { id: hostelId },
      data: { isActive: false }
    });
    
    res.json({ message: 'Hostel deleted successfully', hostel: { ...updatedHostel, _id: updatedHostel.id } });
  } catch (error) {
    console.error('Error deleting hostel:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

module.exports = router;
