# 🏠 Room Radar

A modern platform for discovering and booking hostels and co-living spaces in India.

## 🌟 Features

- **Browse Hostels**: Search and filter hostels by city, area, price, gender preference, and room type
- **User Authentication**: Secure signup and login with JWT
- **Booking System**: Book hostels with confirmation and tracking
- **Owner Dashboard**: List and manage your hostels
- **User Dashboard**: View and manage your bookings
- **Admin API**: View registered users and system statistics

## 🏗️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend
- Node.js with Express
- Prisma ORM
- MySQL (Aiven)
- JWT Authentication
- bcryptjs for password hashing

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Aiven MySQL

## 📁 Project Structure

```
room-radar/
├── backend/              # Backend API server
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth middleware
│   ├── routes/          # API routes
│   ├── seed/           # Database seeding
│   ├── prisma/         # Prisma schema
│   └── server.js       # Main server file
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── config.js   # API configuration
│   └── public/
├── vercel.json          # Vercel deployment config
├── render.yaml         # Render deployment config
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL database (or Aiven account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/couchpotato027/room-radar.git
   cd room-radar
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Create .env file
   # Add your DATABASE_URL and JWT_SECRET to .env
   npx prisma generate
   npx prisma db push
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Seed Database (Optional)**
   ```bash
   cd backend
   npm run seed
   ```

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend
```
REACT_APP_API_URL=http://localhost:3001
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Hostels
- `GET /api/hostels` - Get all hostels (with filters)
- `GET /api/hostels/:id` - Get single hostel
- `POST /api/hostels` - Create hostel (auth required)
- `GET /api/locations` - Get cities and areas

### Bookings
- `GET /api/bookings` - Get user bookings (auth required)
- `POST /api/bookings` - Create booking (auth required)
- `GET /api/bookings/single/:id` - Get single booking

### Admin
- `GET /api/admin/users` - View all registered users

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set Root Directory: `backend`
3. Build Command: `npm install && npx prisma generate`
4. Start Command: `npm start`
5. Add environment variables

### Frontend (Vercel)
1. Connect GitHub repository
2. Set Root Directory: `frontend` (or configure in vercel.json)
3. Add environment variable: `REACT_APP_API_URL`
4. Deploy

## 📝 Database Schema

The database uses Prisma with MySQL. Key models:
- **User**: Users and owners
- **Hostel**: Hostel listings
- **Booking**: User bookings
- **Review**: Hostel reviews
- **HostelImage**: Hostel images

See `backend/prisma/schema.prisma` for full schema.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Live Links

- **Frontend**: https://room-radar-wheat.vercel.app
- **Backend**: https://room-radar-7t3y.onrender.com
- **Admin API**: https://room-radar-7t3y.onrender.com/api/admin/users
