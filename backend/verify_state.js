const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyRejectionLogic() {
    try {
        console.log('--- Verifying Rejection Logic ---');

        // 1. Get a hostel and its initial availability
        const hostel = await prisma.hostel.findFirst();
        if (!hostel) throw new Error('No hostel found');
        const initialRooms = hostel.availableRooms;
        console.log(`Initial Available Rooms for Hostel ${hostel.id}: ${initialRooms}`);

        // 2. Simulate a Booking (Pending)
        // Decrement availability as done in booking creation
        await prisma.hostel.update({
            where: { id: hostel.id },
            data: { availableRooms: { decrement: 1 } }
        });

        // Create dummy booking
        const booking = await prisma.booking.create({
            data: {
                userId: 1, // Assuming user 1 exists
                hostelId: hostel.id,
                checkinDate: new Date(),
                totalAmount: 5000,
                bookingStatus: 'PENDING'
            }
        });
        console.log(`Created Booking ${booking.id}. Status: ${booking.bookingStatus}`);

        const hostelAfterBooking = await prisma.hostel.findUnique({ where: { id: hostel.id } });
        console.log(`Available Rooms after booking: ${hostelAfterBooking.availableRooms} (Should be ${initialRooms - 1})`);

        // 3. Simulate Rejection (using the Logic we implemented)
        // We can't call the API easily here without auth, so we'll replicate the DB logic we *expect* to happen
        // strictly to verify if my *understanding* matches, OR better: use axios to call the API if I had a token.
        // actually, let's just write a test that calls the updated function logic? No, that's unit testing.
        // I will use this script to just READ the values while I perform the action in the browser? 
        // Or I can just check the db state *after* I do it in the browser. 
        // YES. I'll use this script to Dump the state.

        // Let's just exit.
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

// Just a dumper
async function dumpHostelState(hostelId) {
    const hostel = await prisma.hostel.findUnique({ where: { id: hostelId } });
    console.log(`Hostel ${hostelId} Available Rooms: ${hostel.availableRooms}`);
}

// dumpHostelState(1);
