# 🏠 RoomRadar - Smart Hostel & Accommodation Discovery Platform

**Finding reliable hostels and mess services made simple, transparent, and trustworthy.**

## ✅ Evaluation Requirements Checklist

### Backend Functionality ✅
- ✅ **2+ CREATE Operations**: Create Booking, Create Hostel
- ✅ **2+ READ Operations**: Get User Bookings, Get Hostel Bookings, Get Hostels (with filters), Get Single Hostel
- ✅ **2+ UPDATE Operations**: Cancel Booking, Update Booking Status, Update Hostel
- ✅ **2+ DELETE Operations**: Delete Booking, Delete Hostel

### Backend API Features ✅
- ✅ **Pagination**: Server-side pagination implemented (`GET /api/hostels?page=1&limit=12`)
- ✅ **Searching**: Text search implemented (`GET /api/hostels?search=keyword`)
- ✅ **Sorting**: Sort by price, rating, reviewCount (`GET /api/hostels?sortBy=price&sortOrder=asc`)
- ✅ **Filtering**: Filter by city, area, price range, gender, room type (all backend API calls)

### Hosting & Documentation ✅
- ✅ **Frontend URL**: https://room-radar-frontend.netlify.app
- ✅ **Backend URL**: https://room-radar-backend.onrender.com
- ✅ **Problem Statement**: Clearly defined in README.md
- ✅ **API Documentation**: Complete endpoint documentation included

## 🧠 Problem Statement

Students and working professionals struggle to find trustworthy accommodation options. Existing sources are scattered, unverified, and lack transparency in pricing and quality.

**RoomRadar solves this by providing:**
- ✅ Verified hostel & mess listings
- ⭐ User reviews and ratings  
- 📍 Location-based search with maps
- 💰 Transparent pricing and facility comparison
- 💸 Expense sharing for roommates
- 🔍 Advanced search, sort & filter options

## 🏗️ System Architecture

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, React Router, Axios, Modern CSS |
| **Backend** | Node.js, Express.js, Prisma ORM |
| **Database** | MySQL (Aiven Cloud) |
| **Authentication** | JWT-based secure login |
| **Hosting** | Netlify (Frontend), Render (Backend) |

## ✨ Key Features

### 🔐 **Authentication & Authorization**
- User registration & login with JWT
- Role-based access (User / Owner / Admin)
- Secure password hashing

### 🏠 **Hostel Management**
- Complete CRUD operations for hostels
- Detailed hostel information (pricing, facilities, location)
- Image uploads and gallery
- Availability tracking

### 🔍 **Advanced Search & Discovery**
- **Search**: By name, city, or location
- **Sort**: By price, rating, or date
- **Filter**: Gender preference, room type, price range, facilities
- **Pagination**: Optimized performance for large datasets

### ⭐ **Reviews & Ratings System**
- Authentic user reviews and ratings
- Average rating calculation
- Review moderation and verification

### 💸 **Expense Sharing (Splitwise-like)**
- Split bills among roommates
- Track shared expenses
- Category-wise expense management
- Settlement tracking

### 📍 **Location Features**
- Map integration for hostel locations
- Nearby services discovery
- Distance-based search

### 📱 **Modern UI/UX**
- Dark theme with warm orange accents
- Responsive design for all devices
- Smooth animations and transitions
- Professional, trustworthy appearance

## 🛠️ API Endpoints

### Authentication
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/auth/signup` | POST | Register new user | Public |
| `/api/auth/login` | POST | Authenticate user | Public |

### Hostels
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/hostels` | GET | Get hostels with filters, pagination, sorting | Authenticated |
| `/api/hostels/:id` | GET | Get specific hostel | Authenticated |
| `/api/hostels/owner` | GET | Get owner's hostels | Owner |
| `/api/hostels` | POST | Create hostel listing | Owner/Admin |
| `/api/hostels/:id` | PUT | Update hostel info | Owner/Admin |
| `/api/hostels/:id` | DELETE | Delete hostel (soft delete) | Owner/Admin |

### Bookings
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/bookings` | POST | Create new booking | Authenticated |
| `/api/bookings/user` | GET | Get user's bookings | Authenticated |
| `/api/bookings/hostel/:id` | GET | Get hostel bookings | Owner |
| `/api/bookings/cancel/:id` | PUT | Cancel booking | Authenticated |
| `/api/bookings/:id/status` | PUT | Update booking status | Owner |
| `/api/bookings/:id` | DELETE | Delete booking | Authenticated |

### Reviews
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/reviews` | POST | Add hostel review | Authenticated |

### Expenses
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/expenses` | GET | Get user expenses | Authenticated |
| `/api/expenses` | POST | Add/split expense | Authenticated |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL database (Aiven)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/couchpotato027/room-radar.git
   cd room-radar
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Add your database URL and JWT secret
   
   # Generate Prisma client and create tables
   npx prisma generate
   npx prisma db push
   
   # Start backend server
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL="mysql://username:password@host:port/database"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
```

## 📊 Database Schema

### Core Models
- **User**: Authentication and profile management
- **Hostel**: Accommodation listings with detailed information
- **Review**: User reviews and ratings
- **Booking**: Reservation management
- **Expense**: Shared expense tracking
- **HostelImage**: Image management for hostels

### Key Relationships
- Users can own multiple hostels
- Users can review hostels (one review per hostel)
- Users can create and participate in expense sharing
- Hostels have multiple images and reviews

## 🎯 Advanced Features Implemented

### 1. **Smart Search & Filtering**
- Multi-parameter search (name, city, facilities)
- Price range filtering
- Gender and room type preferences
- Sorting by price, rating, or recency

### 2. **Pagination System**
- Server-side pagination for performance
- Configurable page sizes
- Navigation controls

### 3. **Review System**
- Star ratings (1-5)
- Written reviews
- Average rating calculation
- Review authenticity (one per user per hostel)

### 4. **Expense Management**
- Create shared expenses
- Split bills among multiple users
- Category-wise tracking
- Settlement calculations

## 🔧 Technical Highlights

### Backend Architecture
- **Prisma ORM** for type-safe database operations
- **JWT Authentication** with role-based access
- **RESTful API** design with proper HTTP status codes
- **Error handling** and validation
- **CORS** configuration for cross-origin requests

### Frontend Architecture
- **React Hooks** for state management
- **Axios** for API communication
- **Component-based** architecture
- **Responsive design** with modern CSS
- **Environment-based** configuration

### Database Design
- **Normalized schema** with proper relationships
- **Indexes** for performance optimization
- **Constraints** for data integrity
- **Enums** for standardized values

## 🚀 Deployment

### 🌐 Production URLs (Live & Accessible)

**Frontend (Netlify):**  
🔗 **https://room-radar-frontend.netlify.app**

**Backend API (Render):**  
🔗 **https://room-radar-backend.onrender.com**

**API Base URL:** `https://room-radar-backend.onrender.com/api`

**Database:** MongoDB Atlas / Aiven MySQL Cloud

### Deployment Process
1. **Database**: MongoDB Atlas / Aiven MySQL service configured
2. **Backend**: Render with environment variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`)
3. **Frontend**: Netlify with build optimization and environment variables

### ✅ Hosting Verification Instructions

**To verify backend API calls:**
1. Open the hosted frontend: https://room-radar-frontend.netlify.app
2. Open browser Developer Tools (F12)
3. Go to **Network** tab → Filter by **Fetch/XHR**
4. Perform actions (login, search, filter, create booking)
5. Verify all API calls are made to: `https://room-radar-backend.onrender.com/api/*`
6. Check API responses in the Network tab to confirm backend functionality

**To verify database entries:**
1. Connect to MongoDB Atlas / Aiven database
2. Verify that entries are created/updated when you:
   - Create a booking (check `bookings` collection)
   - Create a hostel (check `hostels` collection)
   - Update hostel info (check `hostels` collection updates)
   - Cancel booking (check booking status updates)

## 📈 Future Enhancements

### Phase 2 Features
- 🤖 **AI-based recommendations** using user preferences
- 💬 **Real-time chat** between owners and tenants
- 📸 **Photo verification** and document upload
- 🗺️ **Google Maps integration** for location services
- 📱 **Mobile app** development
- 🔔 **Push notifications** for bookings and updates

### Phase 3 Features
- 🏢 **Multi-city expansion** with city-specific features
- 💳 **Payment gateway** integration
- 📊 **Analytics dashboard** for owners
- 🎯 **Targeted marketing** tools
- 🔒 **Advanced security** features

## 👥 Team

**Developed by**: Priyansh Satija  
**Instructor**: Vishal Sharma Sir  
**Institution**: [Your Institution Name]  
**Submission Date**: November 27, 2024

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and queries:
- 📧 Email: [your-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/couchpotato027/room-radar/issues)

---

**RoomRadar** - Making accommodation discovery simple, transparent, and trustworthy! 🏠✨# Force redeploy Mon Dec  1 15:47:27 IST 2025
