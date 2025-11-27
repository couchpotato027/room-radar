const realHostels = [
  {
    id: 1,
    name: "Zolo Stays Sector 15",
    brand: "Zolo",
    city: "Noida",
    area: "Sector 15",
    address: "Plot No. 45, Sector 15, Noida, Uttar Pradesh 201301",
    monthlyRent: 12500,
    securityDeposit: 25000,
    genderPreference: "MIXED",
    roomType: "SINGLE",
    totalRooms: 120,
    availableRooms: 8,
    isVerified: true,
    rating: 4.3,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
    ],
    amenities: {
      wifi: true,
      ac: true,
      mess: true,
      laundry: true,
      parking: true,
      cctv: true,
      powerBackup: true,
      gym: false,
      rooftop: true
    },
    description: "Premium co-living space with modern amenities and 24/7 security.",
    nearbyPlaces: ["Sector 15 Metro", "DLF Mall", "Wipro Office"],
    coordinates: { lat: 28.5921, lng: 77.3125 }
  },
  {
    id: 2,
    name: "Stanza Living Koramangala",
    brand: "Stanza Living",
    city: "Bangalore",
    area: "Koramangala",
    address: "80 Feet Road, 5th Block, Koramangala, Bangalore 560095",
    monthlyRent: 15800,
    securityDeposit: 31600,
    genderPreference: "MALE",
    roomType: "SHARED",
    totalRooms: 200,
    availableRooms: 12,
    isVerified: true,
    rating: 4.5,
    reviewCount: 289,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
    ],
    amenities: {
      wifi: true,
      ac: true,
      mess: true,
      laundry: true,
      parking: true,
      cctv: true,
      powerBackup: true,
      gym: true,
      rooftop: false
    },
    description: "Tech-enabled co-living with premium facilities.",
    nearbyPlaces: ["Forum Mall", "Koramangala Metro", "Flipkart Office"],
    coordinates: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: 3,
    name: "Colive 7 Eleven",
    brand: "Colive",
    city: "Mumbai",
    area: "Andheri West",
    address: "New Link Road, Andheri West, Mumbai 400053",
    monthlyRent: 18500,
    securityDeposit: 37000,
    genderPreference: "FEMALE",
    roomType: "SINGLE",
    totalRooms: 85,
    availableRooms: 3,
    isVerified: true,
    rating: 4.2,
    reviewCount: 198,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    amenities: {
      wifi: true,
      ac: true,
      mess: true,
      laundry: true,
      parking: false,
      cctv: true,
      powerBackup: true,
      gym: true,
      rooftop: true
    },
    description: "Premium women-only co-living space with world-class amenities.",
    nearbyPlaces: ["Andheri Metro", "Infiniti Mall", "Mindspace IT Park"],
    coordinates: { lat: 19.1136, lng: 72.8697 }
  }
];

module.exports = realHostels;