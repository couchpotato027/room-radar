// Real photography references to avoid AI-looking placeholders
const curatedImages = [
  "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1521783988139-8931970b1d5a?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1505692794400-7f632ae42769?auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1500&q=80"
];

// Comprehensive seed data for 100 hostels across major Indian cities
const hostels = [
  // Bangalore - Koramangala
  {
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
    images: [curatedImages[0], curatedImages[4], curatedImages[2]],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: false },
    description: "Tech-enabled co-living with premium facilities and 24/7 security.",
    nearbyPlaces: ["Forum Mall", "Koramangala Metro", "Flipkart Office"],
    coordinates: { lat: 12.9352, lng: 77.6245 },
    landmark: "Forum Mall",
    metroStation: "Koramangala Metro"
  },
  {
    name: "UrbanNest Koramangala",
    brand: null,
    city: "Bangalore",
    area: "Koramangala",
    address: "6th Block, Koramangala, Bangalore 560095",
    monthlyRent: 13200,
    securityDeposit: 26400,
    genderPreference: "MIXED",
    roomType: "SINGLE",
    totalRooms: 85,
    availableRooms: 5,
    isVerified: true,
    rating: 4.2,
    reviewCount: 156,
    images: [curatedImages[1], curatedImages[6]],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: false, cctv: true, powerBackup: true, gym: false, rooftop: true },
    description: "Modern PG accommodation with all essential amenities.",
    nearbyPlaces: ["Koramangala Metro", "Wipro Office"],
    coordinates: { lat: 12.9300, lng: 77.6200 },
    landmark: "Wipro Office",
    metroStation: "Koramangala Metro"
  },
  {
    name: "Zolo Stays Koramangala",
    brand: "Zolo",
    city: "Bangalore",
    area: "Koramangala",
    address: "4th Block, Koramangala, Bangalore 560034",
    monthlyRent: 14500,
    securityDeposit: 29000,
    genderPreference: "FEMALE",
    roomType: "SHARED",
    totalRooms: 150,
    availableRooms: 8,
    isVerified: true,
    rating: 4.4,
    reviewCount: 203,
    images: [curatedImages[2], curatedImages[7]],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Women-only premium co-living space with world-class amenities.",
    nearbyPlaces: ["Forum Mall", "Koramangala Metro"],
    coordinates: { lat: 12.9280, lng: 77.6250 },
    landmark: "Forum Mall",
    metroStation: "Koramangala Metro"
  },

  // Bangalore - HSR Layout
  {
    name: "MetroStay HSR Layout",
    brand: null,
    city: "Bangalore",
    area: "HSR Layout",
    address: "27th Main, HSR Layout, Bangalore 560102",
    monthlyRent: 12800,
    securityDeposit: 25600,
    genderPreference: "MIXED",
    roomType: "SHARED",
    totalRooms: 120,
    availableRooms: 10,
    isVerified: true,
    rating: 4.3,
    reviewCount: 178,
    images: [curatedImages[3], curatedImages[5]],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: false, rooftop: false },
    description: "Comfortable accommodation near HSR Layout metro station.",
    nearbyPlaces: ["HSR Metro", "Manyata Tech Park"],
    coordinates: { lat: 12.9140, lng: 77.6410 },
    landmark: "HSR Metro",
    metroStation: "HSR Metro"
  },
  {
    name: "Colive HSR Layout",
    brand: "Colive",
    city: "Bangalore",
    area: "HSR Layout",
    address: "Sector 7, HSR Layout, Bangalore 560102",
    monthlyRent: 15200,
    securityDeposit: 30400,
    genderPreference: "MALE",
    roomType: "SINGLE",
    totalRooms: 95,
    availableRooms: 4,
    isVerified: true,
    rating: 4.6,
    reviewCount: 234,
    images: [curatedImages[8], curatedImages[1]],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Premium co-living space with modern amenities.",
    nearbyPlaces: ["HSR Metro", "Manyata Tech Park"],
    coordinates: { lat: 12.9100, lng: 77.6450 },
    landmark: "Manyata Tech Park",
    metroStation: "HSR Metro"
  },

  // Bangalore - Indiranagar
  {
    name: "The Hive Indiranagar",
    brand: null,
    city: "Bangalore",
    area: "Indiranagar",
    address: "100 Feet Road, Indiranagar, Bangalore 560038",
    monthlyRent: 16500,
    securityDeposit: 33000,
    genderPreference: "MIXED",
    roomType: "SINGLE",
    totalRooms: 75,
    availableRooms: 3,
    isVerified: true,
    rating: 4.7,
    reviewCount: 198,
    images: [curatedImages[9], curatedImages[2]],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Luxury co-living space in the heart of Indiranagar.",
    nearbyPlaces: ["Indiranagar Metro", "100 Feet Road"],
    coordinates: { lat: 12.9784, lng: 77.6408 },
    landmark: "100 Feet Road",
    metroStation: "Indiranagar Metro"
  },
  {
    name: "OxfordCaps Indiranagar",
    brand: "OxfordCaps",
    city: "Bangalore",
    area: "Indiranagar",
    address: "CMH Road, Indiranagar, Bangalore 560038",
    monthlyRent: 17200,
    securityDeposit: 34400,
    genderPreference: "MALE",
    roomType: "SHARED",
    totalRooms: 180,
    availableRooms: 15,
    isVerified: true,
    rating: 4.5,
    reviewCount: 267,
    images: [curatedImages[10], curatedImages[5]],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: false },
    description: "Premium student accommodation with all modern facilities.",
    nearbyPlaces: ["Indiranagar Metro", "CMH Road"],
    coordinates: { lat: 12.9750, lng: 77.6380 },
    landmark: "CMH Road",
    metroStation: "Indiranagar Metro"
  },

  // Mumbai - Andheri
  {
    name: "BlueSpace Andheri",
    brand: null,
    city: "Mumbai",
    area: "Andheri",
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
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: false, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Premium women-only co-living space with world-class amenities.",
    nearbyPlaces: ["Andheri Metro", "Infiniti Mall", "Mindspace IT Park"],
    coordinates: { lat: 19.1136, lng: 72.8697 },
    landmark: "Infiniti Mall",
    metroStation: "Andheri Metro"
  },
  {
    name: "Colive 7 Eleven",
    brand: "Colive",
    city: "Mumbai",
    area: "Andheri",
    address: "Veera Desai Road, Andheri West, Mumbai 400053",
    monthlyRent: 19200,
    securityDeposit: 38400,
    genderPreference: "MIXED",
    roomType: "SHARED",
    totalRooms: 140,
    availableRooms: 9,
    isVerified: true,
    rating: 4.4,
    reviewCount: 245,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Modern co-living space near Andheri metro station.",
    nearbyPlaces: ["Andheri Metro", "Mindspace IT Park"],
    coordinates: { lat: 19.1150, lng: 72.8700 },
    landmark: "Mindspace IT Park",
    metroStation: "Andheri Metro"
  },
  {
    name: "OYO Life Andheri",
    brand: "OYO Life",
    city: "Mumbai",
    area: "Andheri",
    address: "S.V. Road, Andheri West, Mumbai 400053",
    monthlyRent: 16800,
    securityDeposit: 33600,
    genderPreference: "MALE",
    roomType: "SINGLE",
    totalRooms: 110,
    availableRooms: 7,
    isVerified: true,
    rating: 4.1,
    reviewCount: 189,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: false, cctv: true, powerBackup: true, gym: false, rooftop: false },
    description: "Affordable co-living with essential amenities.",
    nearbyPlaces: ["Andheri Metro", "Infiniti Mall"],
    coordinates: { lat: 19.1120, lng: 72.8680 },
    landmark: "Infiniti Mall",
    metroStation: "Andheri Metro"
  },

  // Mumbai - Powai
  {
    name: "YourSpace Powai",
    brand: "YourSpace",
    city: "Mumbai",
    area: "Powai",
    address: "Hiranandani Gardens, Powai, Mumbai 400076",
    monthlyRent: 19800,
    securityDeposit: 39600,
    genderPreference: "MIXED",
    roomType: "SINGLE",
    totalRooms: 90,
    availableRooms: 5,
    isVerified: true,
    rating: 4.6,
    reviewCount: 223,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Premium accommodation in Hiranandani Gardens.",
    nearbyPlaces: ["Powai Lake", "IIT Bombay"],
    coordinates: { lat: 19.1180, lng: 72.9060 },
    landmark: "Powai Lake",
    metroStation: null
  },

  // Delhi - Connaught Place
  {
    name: "Zolo Stays Connaught Place",
    brand: "Zolo",
    city: "Delhi",
    area: "Connaught Place",
    address: "Block A, Connaught Place, New Delhi 110001",
    monthlyRent: 17500,
    securityDeposit: 35000,
    genderPreference: "MIXED",
    roomType: "SHARED",
    totalRooms: 160,
    availableRooms: 11,
    isVerified: true,
    rating: 4.3,
    reviewCount: 201,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: false, cctv: true, powerBackup: true, gym: false, rooftop: false },
    description: "Central location with easy metro connectivity.",
    nearbyPlaces: ["Rajiv Chowk Metro", "Connaught Place"],
    coordinates: { lat: 28.6304, lng: 77.2177 },
    landmark: "Rajiv Chowk Metro",
    metroStation: "Rajiv Chowk Metro"
  },
  {
    name: "Stanza Living CP",
    brand: "Stanza Living",
    city: "Delhi",
    area: "Connaught Place",
    address: "Block B, Connaught Place, New Delhi 110001",
    monthlyRent: 18200,
    securityDeposit: 36400,
    genderPreference: "MALE",
    roomType: "SINGLE",
    totalRooms: 125,
    availableRooms: 6,
    isVerified: true,
    rating: 4.5,
    reviewCount: 278,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Premium co-living in the heart of Delhi.",
    nearbyPlaces: ["Rajiv Chowk Metro", "Connaught Place"],
    coordinates: { lat: 28.6320, lng: 77.2180 },
    landmark: "Rajiv Chowk Metro",
    metroStation: "Rajiv Chowk Metro"
  },

  // Delhi - Greater Kailash
  {
    name: "PrimeStay Greater Kailash",
    brand: null,
    city: "Delhi",
    area: "Greater Kailash",
    address: "M Block, Greater Kailash, New Delhi 110048",
    monthlyRent: 19500,
    securityDeposit: 39000,
    genderPreference: "FEMALE",
    roomType: "SINGLE",
    totalRooms: 70,
    availableRooms: 2,
    isVerified: true,
    rating: 4.4,
    reviewCount: 167,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Luxury women-only accommodation in upscale locality.",
    nearbyPlaces: ["Greater Kailash Metro", "M Block Market"],
    coordinates: { lat: 28.5470, lng: 77.2410 },
    landmark: "M Block Market",
    metroStation: "Greater Kailash Metro"
  },

  // Noida - Sector 15
  {
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
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: false, rooftop: true },
    description: "Premium co-living space with modern amenities and 24/7 security.",
    nearbyPlaces: ["Sector 15 Metro", "DLF Mall", "Wipro Office"],
    coordinates: { lat: 28.5921, lng: 77.3125 },
    landmark: "DLF Mall",
    metroStation: "Sector 15 Metro"
  },
  {
    name: "PrimeStay Noida Sector 18",
    brand: null,
    city: "Noida",
    area: "Sector 18",
    address: "Sector 18, Noida, Uttar Pradesh 201301",
    monthlyRent: 11800,
    securityDeposit: 23600,
    genderPreference: "MALE",
    roomType: "SHARED",
    totalRooms: 100,
    availableRooms: 12,
    isVerified: true,
    rating: 4.1,
    reviewCount: 134,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: false, rooftop: false },
    description: "Affordable accommodation near Sector 18 metro.",
    nearbyPlaces: ["Sector 18 Metro", "DLF Mall"],
    coordinates: { lat: 28.5700, lng: 77.3200 },
    landmark: "DLF Mall",
    metroStation: "Sector 18 Metro"
  },

  // Gurgaon - Cyber City
  {
    name: "Stanza Living Cyber City",
    brand: "Stanza Living",
    city: "Gurgaon",
    area: "Cyber City",
    address: "DLF Cyber City, Gurgaon, Haryana 122002",
    monthlyRent: 16200,
    securityDeposit: 32400,
    genderPreference: "MIXED",
    roomType: "SHARED",
    totalRooms: 180,
    availableRooms: 14,
    isVerified: true,
    rating: 4.4,
    reviewCount: 256,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Premium co-living in the heart of Cyber City.",
    nearbyPlaces: ["Cyber City Metro", "DLF Cyber Hub"],
    coordinates: { lat: 28.4996, lng: 77.0944 },
    landmark: "DLF Cyber Hub",
    metroStation: "Cyber City Metro"
  },
  {
    name: "Zolo Stays Cyber City",
    brand: "Zolo",
    city: "Gurgaon",
    area: "Cyber City",
    address: "Sector 24, Gurgaon, Haryana 122002",
    monthlyRent: 15500,
    securityDeposit: 31000,
    genderPreference: "MALE",
    roomType: "SINGLE",
    totalRooms: 130,
    availableRooms: 9,
    isVerified: true,
    rating: 4.3,
    reviewCount: 198,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: false },
    description: "Modern accommodation near Cyber City metro.",
    nearbyPlaces: ["Cyber City Metro", "DLF Cyber Hub"],
    coordinates: { lat: 28.4970, lng: 77.0920 },
    landmark: "DLF Cyber Hub",
    metroStation: "Cyber City Metro"
  },

  // Pune - Baner
  {
    name: "Colive Baner",
    brand: "Colive",
    city: "Pune",
    area: "Baner",
    address: "Baner Road, Baner, Pune 411045",
    monthlyRent: 14200,
    securityDeposit: 28400,
    genderPreference: "MIXED",
    roomType: "SHARED",
    totalRooms: 150,
    availableRooms: 13,
    isVerified: true,
    rating: 4.2,
    reviewCount: 189,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Comfortable co-living space in Baner.",
    nearbyPlaces: ["Baner Road", "Hinjewadi IT Park"],
    coordinates: { lat: 18.5600, lng: 73.7800 },
    landmark: "Hinjewadi IT Park",
    metroStation: null
  },
  {
    name: "YourSpace Baner",
    brand: "YourSpace",
    city: "Pune",
    area: "Baner",
    address: "Sus Road, Baner, Pune 411045",
    monthlyRent: 14800,
    securityDeposit: 29600,
    genderPreference: "FEMALE",
    roomType: "SINGLE",
    totalRooms: 95,
    availableRooms: 4,
    isVerified: true,
    rating: 4.5,
    reviewCount: 167,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Premium women-only accommodation in Baner.",
    nearbyPlaces: ["Baner Road", "Hinjewadi IT Park"],
    coordinates: { lat: 18.5580, lng: 73.7780 },
    landmark: "Hinjewadi IT Park",
    metroStation: null
  },

  // Hyderabad - Gachibowli
  {
    name: "Zolo Stays Gachibowli",
    brand: "Zolo",
    city: "Hyderabad",
    area: "Gachibowli",
    address: "Financial District, Gachibowli, Hyderabad 500032",
    monthlyRent: 13800,
    securityDeposit: 27600,
    genderPreference: "MIXED",
    roomType: "SHARED",
    totalRooms: 170,
    availableRooms: 15,
    isVerified: true,
    rating: 4.3,
    reviewCount: 212,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: false },
    description: "Modern co-living near Financial District.",
    nearbyPlaces: ["Financial District", "Gachibowli Metro"],
    coordinates: { lat: 17.4225, lng: 78.3490 },
    landmark: "Financial District",
    metroStation: "Gachibowli Metro"
  },
  {
    name: "Stanza Living Gachibowli",
    brand: "Stanza Living",
    city: "Hyderabad",
    area: "Gachibowli",
    address: "HITEC City, Gachibowli, Hyderabad 500032",
    monthlyRent: 15200,
    securityDeposit: 30400,
    genderPreference: "MALE",
    roomType: "SINGLE",
    totalRooms: 140,
    availableRooms: 8,
    isVerified: true,
    rating: 4.6,
    reviewCount: 245,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
    ],
    amenities: { wifi: true, ac: true, mess: true, laundry: true, parking: true, cctv: true, powerBackup: true, gym: true, rooftop: true },
    description: "Premium accommodation near HITEC City.",
    nearbyPlaces: ["HITEC City", "Gachibowli Metro"],
    coordinates: { lat: 17.4200, lng: 78.3470 },
    landmark: "HITEC City",
    metroStation: "Gachibowli Metro"
  }
];

// Generate more hostels to reach 100
const generateMoreHostels = () => {
  const cities = [
    { name: "Bangalore", areas: ["Koramangala", "HSR Layout", "Indiranagar", "Whitefield", "Marathahalli"] },
    { name: "Mumbai", areas: ["Andheri", "Powai", "Bandra", "Vashi", "Thane"] },
    { name: "Delhi", areas: ["Connaught Place", "Greater Kailash", "Dwarka", "Rohini", "Pitampura"] },
    { name: "Noida", areas: ["Sector 15", "Sector 18", "Sector 62", "Sector 137"] },
    { name: "Gurgaon", areas: ["Cyber City", "Sector 29", "DLF Phase 1", "Sohna Road"] },
    { name: "Pune", areas: ["Baner", "Hinjewadi", "Kothrud", "Viman Nagar"] },
    { name: "Hyderabad", areas: ["Gachibowli", "HITEC City", "Kondapur", "Madhapur"] }
  ];

  const brands = ["Zolo", "Stanza Living", "Colive", "YourSpace", "OxfordCaps", "OYO Life", null];
  const genderPrefs = ["MALE", "FEMALE", "MIXED"];
  const roomTypes = ["SINGLE", "SHARED", "DORMITORY"];
  const localNames = ["UrbanNest", "MetroStay", "The Hive", "BlueSpace", "PrimeStay", "ComfortZone", "EliteStay", "HomeAway"];

  const additionalHostels = [];
  let id = hostels.length + 1;

  cities.forEach(city => {
    city.areas.forEach(area => {
      // Skip if already exists
      if (hostels.some(h => h.city === city.name && h.area === area)) return;

      for (let i = 0; i < 3; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const name = brand 
          ? `${brand} ${area}`
          : `${localNames[Math.floor(Math.random() * localNames.length)]} ${area}`;
        
        const genderPref = genderPrefs[Math.floor(Math.random() * genderPrefs.length)];
        const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
        
        const baseRent = 10000 + Math.floor(Math.random() * 10000);
        const rating = 3.8 + Math.random() * 0.7;
        const reviewCount = 50 + Math.floor(Math.random() * 300);
        
        additionalHostels.push({
          name,
          brand,
          city: city.name,
          area,
          address: `${area}, ${city.name}`,
          monthlyRent: baseRent,
          securityDeposit: baseRent * 2,
          genderPreference: genderPref,
          roomType,
          totalRooms: 80 + Math.floor(Math.random() * 120),
          availableRooms: Math.floor(Math.random() * 15) + 1,
          isVerified: Math.random() > 0.3,
          rating: Math.round(rating * 10) / 10,
          reviewCount,
          images: [
            curatedImages[(id + i) % curatedImages.length],
            curatedImages[(id + i + 3) % curatedImages.length]
          ],
          amenities: {
            wifi: true,
            ac: Math.random() > 0.2,
            mess: true,
            laundry: true,
            parking: Math.random() > 0.3,
            cctv: true,
            powerBackup: true,
            gym: Math.random() > 0.5,
            rooftop: Math.random() > 0.6
          },
          description: `Comfortable accommodation in ${area}, ${city.name}.`,
          nearbyPlaces: [`${area} Metro`, "IT Park"],
          coordinates: {
            lat: 12.9 + Math.random() * 0.1,
            lng: 77.6 + Math.random() * 0.1
          },
          landmark: `${area} Market`,
          metroStation: `${area} Metro`
        });
      }
    });
  });

  return additionalHostels;
};

const allHostels = [...hostels, ...generateMoreHostels()].slice(0, 100);

module.exports = allHostels;

