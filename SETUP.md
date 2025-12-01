# RoomRadar - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd room-radar/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/roomradar
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roomradar
   
   JWT_SECRET=your-secret-key-here
   PORT=3001
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```
   This will create 100 hostels across major Indian cities.

5. **Start the server**
   ```bash
   npm run dev
   # or
   npm start
   ```

   Server will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd room-radar/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API URL** (if needed)
   Edit `src/config.js` to point to your backend:
   ```javascript
   const config = {
     API_URL: 'http://localhost:3001' // or your deployed backend URL
   };
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   App will run on `http://localhost:3000`

## 📁 Project Structure

```
room-radar/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── models/
│   │   ├── User.js            # User model
│   │   ├── Hostel.js          # Hostel model
│   │   └── Booking.js         # Booking model
│   ├── routes/
│   │   └── bookings.js        # Booking routes
│   ├── seed/
│   │   ├── hostels.js         # Seed data (100 hostels)
│   │   └── seed.js            # Seed script
│   └── server.js              # Express server
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Home.js                # Main listing page
    │   │   ├── HostelDetails.js       # Hostel detail page
    │   │   ├── BookNow.js             # Booking form
    │   │   ├── BookingConfirmation.js # Confirmation page
    │   │   ├── UserDashboard.js      # User bookings
    │   │   ├── OwnerDashboard.js     # Owner dashboard
    │   │   ├── Login.js              # Login page
    │   │   ├── Signup.js             # Signup page
    │   │   ├── Header.js             # Navigation header
    │   │   └── HostelCard.js         # Hostel card component
    │   ├── App.js                    # Main app with routing
    │   └── config.js                 # API configuration
    └── package.json
```

## 🎯 Features

### ✅ Implemented Features

1. **Modern UI/UX**
   - Clean, professional design inspired by Airbnb/Zolo/Booking.com
   - Responsive layout with Tailwind CSS
   - Smooth animations and transitions
   - Professional color scheme (Blue + Slate + White)

2. **Area-Wise Hostel Allocation**
   - City dropdown with dynamic area selection
   - Search by hostel name, city, area, landmark, metro station
   - Filters respect area selection

3. **Comprehensive Hostel Data**
   - 100 realistic hostel entries
   - Major brands: Stanza Living, Zolo, Colive, YourSpace, OxfordCaps, OYO Life
   - Local PG/hostel names per area
   - Complete data: pricing, amenities, ratings, reviews, photos

4. **Full Booking System**
   - Book Now functionality
   - Room type selection
   - Duration selection (1-12 months)
   - Auto-calculate pricing
   - Availability checking
   - Booking confirmation
   - User booking history
   - Cancel bookings

5. **Backend Performance**
   - Server-side pagination
   - Server-side filtering
   - Server-side sorting
   - Full-text search indexing
   - MongoDB indexes on city, area, price

6. **User Features**
   - User authentication (Login/Signup)
   - User dashboard with booking history
   - Owner dashboard (placeholder)

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login

### Hostels
- `GET /api/hostels` - Get hostels with filters, pagination, sorting
- `GET /api/hostels/:id` - Get single hostel details
- `GET /api/locations` - Get cities and areas

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user` - Get user's bookings
- `GET /api/bookings/hostel/:id` - Get bookings for a hostel (owner)
- `PUT /api/bookings/cancel/:id` - Cancel a booking
- `PUT /api/bookings/:id/status` - Update booking status (owner)

## 🎨 Design Features

- **Color Palette**: Indigo/Purple gradients with slate grays
- **Typography**: Inter font family
- **Components**: Modern cards with shadows and hover effects
- **Animations**: Fade-in, slide-up, hover transitions
- **Icons**: Emoji-based icons for amenities
- **Badges**: Verified badges, availability badges, status badges

## 📝 Notes

- Authentication uses demo tokens for development
- Payment processing is mocked (ready for integration)
- Owner dashboard is a placeholder (can be extended)
- All images use Unsplash URLs
- MongoDB indexes are automatically created

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Set `MONGODB_URI` environment variable
2. Set `JWT_SECRET` environment variable
3. Deploy and run `npm run seed` after first deployment

### Frontend (Vercel/Netlify)
1. Set build command: `npm run build`
2. Set output directory: `build`
3. Update `config.js` with production API URL

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check firewall settings for Atlas

**Seed Script Fails**
- Ensure MongoDB is connected
- Check if hostels collection already exists (may need to clear first)

**Frontend Can't Connect to Backend**
- Check CORS settings in `server.js`
- Verify API URL in `frontend/src/config.js`
- Ensure backend is running on correct port

## 📄 License

This project is part of a capstone project.

