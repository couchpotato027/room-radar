require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { z } = require('zod');

const prisma = new PrismaClient();

// 1. Validation Schema (Zod)
const hostelSchema = z.object({
    name: z.string().min(2),
    details: z.object({
        rent: z.string(), // "₹12,500/mo" -> need normalization
        deposit: z.string().optional(),
        location: z.string(), // "Area, City" -> need normalization
        type: z.string(),
        rooms_total: z.number().positive(),
        rooms_available: z.number().nonnegative(),
        rating: z.number().min(0).max(5).optional(),
        reviews: z.number().nonnegative().optional()
    }),
    amenities: z.array(z.string()),
    images: z.array(z.string().url()),
    description: z.string()
});

const ingestData = async () => {
    try {
        console.log('🚀 Starting Data Ingestion Pipeline...');

        // 2. Read Source Data
        const rawData = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../data/real_world_hostels.json'), 'utf-8')
        );
        console.log(`📂 Loaded ${rawData.length} records from source.`);

        // Get Owner
        const owner = await prisma.user.findFirst({ where: { role: 'OWNER' } });
        if (!owner) throw new Error('No owner found. Run seed.js first to create default owner.');

        // 3. Process Each Record
        let successCount = 0;
        let errorCount = 0;

        for (const record of rawData) {
            try {
                // Validate Structure
                const validData = hostelSchema.parse(record);

                // 4. Normalization Logic
                const rent = parseInt(validData.details.rent.replace(/[^\d]/g, ''));
                const deposit = validData.details.deposit
                    ? parseInt(validData.details.deposit.replace(/[^\d]/g, ''))
                    : rent * 2;

                const [area, city] = validData.details.location.includes(',')
                    ? validData.details.location.split(',').map(s => s.trim())
                    : [validData.details.location, 'Unknown City'];

                const genderMap = {
                    'Co-ed': 'MIXED',
                    'Male Only': 'MALE',
                    'Female Only': 'FEMALE',
                    'Student (Mixed)': 'MIXED'
                };

                // 2. Normalization Configuration
                const AMENITY_PATTERNS = {
                    wifi: ['wifi', 'internet', 'broadband', 'fiber'],
                    ac: ['ac', 'air condition', 'cooling'],
                    mess: ['mess', 'food', 'meals', 'canteen', 'dining'],
                    laundry: ['laundry', 'washing', 'washer'],
                    powerBackup: ['backup', 'inverter', 'generator', 'power', 'ups'],
                    cctv: ['cctv', 'camera', 'surveillance', 'security'],
                    gym: ['gym', 'fitness', 'workout', 'weights']
                };

                const normalizeAmenities = (rawAmenities) => {
                    const flags = {};

                    Object.entries(AMENITY_PATTERNS).forEach(([key, terms]) => {
                        // Create a regex that matches any term, handling flexible spacing
                        // e.g., "air condition" matches "aircondition", "air-condition", "air condition"
                        const pattern = terms
                            .map(term => term.replace(/\s+/g, '[\\s-]*')) // Allow flexible separators
                            .join('|');

                        const regex = new RegExp(pattern, 'i');
                        flags[key] = rawAmenities.some(a => regex.test(a));
                    });

                    return flags;
                };

                const amenityFlags = normalizeAmenities(validData.amenities);

                // 5. Database Upsert (Prevent Duplicates)
                await prisma.hostel.create({
                    data: {
                        name: validData.name,
                        city,
                        area,
                        address: validData.details.location, // simplified for now
                        monthlyRent: rent,
                        securityDeposit: deposit,
                        totalRooms: validData.details.rooms_total,
                        availableRooms: validData.details.rooms_available,
                        rating: validData.details.rating || 0,
                        reviewCount: validData.details.reviews || 0,
                        genderPreference: genderMap[validData.details.type] || 'MIXED',
                        roomType: 'SHARED', // default to shared for this dataset
                        description: validData.description,
                        ownerId: owner.id,
                        isVerified: true,
                        ...amenityFlags,
                        images: {
                            create: validData.images.map(url => ({ url }))
                        }
                    }
                });

                successCount++;
                process.stdout.write('.');
            } catch (err) {
                errorCount++;
                console.error(`\n❌ Error processing ${record.name}:`, err.message);
            }
        }

        console.log(`\n\n✅ Ingestion Complete!`);
        console.log(`Success: ${successCount}`);
        console.log(`Failed: ${errorCount}`);

    } catch (error) {
        console.error('Pipeline Error:', error);
    } finally {
        await prisma.$disconnect();
    }
};

ingestData();
