require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const hostels = require('./hostels');

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Database Connected via Prisma');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedHostels = async () => {
  try {
    // Clear existing hostels and related data
    await prisma.hostelImage.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.hostel.deleteMany({});
    console.log('Cleared existing hostels');

    // Create a default owner user if not exists
    let owner = await prisma.user.findUnique({ where: { email: 'owner@roomradar.com' } });
    if (!owner) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      owner = await prisma.user.create({
        data: {
          name: 'Default Owner',
          email: 'owner@roomradar.com',
          password: hashedPassword,
          role: 'OWNER'
        }
      });
      console.log('Created default owner');
    }

    // Insert hostels with owner reference
    for (const hostelData of hostels) {
      const {
        name,
        brand,
        city,
        area,
        address,
        monthlyRent,
        securityDeposit,
        genderPreference,
        roomType,
        totalRooms,
        availableRooms,
        isVerified,
        rating,
        reviewCount,
        images,
        amenities,
        description,
        nearbyPlaces,
        coordinates,
        landmark,
        metroStation
      } = hostelData;

      await prisma.hostel.create({
        data: {
          name,
          brand: brand || null,
          city,
          area: area || null,
          address,
          state: null, // Can be added if needed
          pincode: null, // Can be added if needed
          monthlyRent,
          securityDeposit: securityDeposit || monthlyRent * 2,
          genderPreference: genderPreference || 'MIXED',
          roomType: roomType || 'SHARED',
          totalRooms: totalRooms || 50,
          availableRooms: availableRooms || totalRooms || 50,
          isVerified: isVerified || false,
          isActive: true,
          rating: rating || 0,
          reviewCount: reviewCount || 0,
          description: description || `Comfortable accommodation in ${area || city}.`,
          landmark: landmark || null,
          metroStation: metroStation || null,
          latitude: coordinates?.lat || null,
          longitude: coordinates?.lng || null,
          wifi: amenities?.wifi || false,
          ac: amenities?.ac || false,
          mess: amenities?.mess || false,
          laundry: amenities?.laundry || false,
          parking: amenities?.parking || false,
          cctv: amenities?.cctv || false,
          powerBackup: amenities?.powerBackup || false,
          gym: amenities?.gym || false,
          rooftop: amenities?.rooftop || false,
          nearbyPlaces: nearbyPlaces || null,
          ownerId: owner.id,
          images: {
            create: (images || []).map(url => ({
              url
            }))
          }
        }
      });
    }

    console.log(`✅ Seeded ${hostels.length} hostels successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding hostels:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedHostels();
  await prisma.$disconnect();
};

runSeed();
