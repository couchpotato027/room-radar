# CRUD Operations Documentation

This document lists all CRUD (Create, Read, Update, Delete) operations implemented in the RoomRadar backend API.

## ✅ Complete CRUD Operations (Non-Auth)

### CREATE Operations (2+)

1. **Create Booking**
   - Endpoint: `POST /api/bookings`
   - Description: Creates a new hostel booking
   - Access: Authenticated users
   - Body: `{ hostelId, roomType, duration, checkinDate }`
   - Status: ✅ Implemented

2. **Create Hostel**
   - Endpoint: `POST /api/hostels`
   - Description: Creates a new hostel listing
   - Access: Owner/Admin
   - Body: `{ name, city, area, monthlyRent, ... }`
   - Status: ✅ Implemented

### READ Operations (4+)

1. **Get User Bookings**
   - Endpoint: `GET /api/bookings/user`
   - Description: Retrieves all bookings for the authenticated user
   - Access: Authenticated users
   - Status: ✅ Implemented

2. **Get Hostel Bookings**
   - Endpoint: `GET /api/bookings/hostel/:id`
   - Description: Retrieves all bookings for a specific hostel (owner only)
   - Access: Owner
   - Status: ✅ Implemented

3. **Get Hostels (with filters)**
   - Endpoint: `GET /api/hostels`
   - Description: Retrieves hostels with pagination, search, filtering, and sorting
   - Query Params: `search, city, area, minPrice, maxPrice, genderPreference, roomType, sortBy, sortOrder, page, limit`
   - Access: Authenticated users
   - Status: ✅ Implemented

4. **Get Single Hostel**
   - Endpoint: `GET /api/hostels/:id`
   - Description: Retrieves details of a specific hostel
   - Access: Authenticated users
   - Status: ✅ Implemented

5. **Get Owner's Hostels**
   - Endpoint: `GET /api/hostels/owner`
   - Description: Retrieves all hostels owned by the authenticated user
   - Access: Owner
   - Status: ✅ Implemented

### UPDATE Operations (2+)

1. **Cancel Booking**
   - Endpoint: `PUT /api/bookings/cancel/:id`
   - Description: Cancels a booking and updates status to CANCELLED
   - Access: Booking owner
   - Status: ✅ Implemented

2. **Update Booking Status**
   - Endpoint: `PUT /api/bookings/:id/status`
   - Description: Updates booking status (for hostel owners)
   - Access: Hostel owner
   - Body: `{ status }`
   - Status: ✅ Implemented

3. **Update Hostel**
   - Endpoint: `PUT /api/hostels/:id`
   - Description: Updates hostel information
   - Access: Hostel owner/Admin
   - Body: `{ name, city, area, monthlyRent, ... }`
   - Status: ✅ Implemented

### DELETE Operations (2+)

1. **Delete Booking**
   - Endpoint: `DELETE /api/bookings/:id`
   - Description: Permanently deletes a booking
   - Access: Booking owner or Admin
   - Status: ✅ Implemented

2. **Delete Hostel**
   - Endpoint: `DELETE /api/hostels/:id`
   - Description: Soft deletes a hostel (sets isActive to false)
   - Access: Hostel owner or Admin
   - Status: ✅ Implemented

## Backend API Features

### ✅ Pagination
- Implemented in `GET /api/hostels`
- Query parameters: `page`, `limit`
- Returns: `{ hostels: [], pagination: { page, limit, total, pages } }`

### ✅ Searching
- Implemented in `GET /api/hostels`
- Query parameter: `search`
- Uses MongoDB text search for name, city, area

### ✅ Sorting
- Implemented in `GET /api/hostels`
- Query parameters: `sortBy`, `sortOrder`
- Options: `sortBy=price|rating|reviewCount`, `sortOrder=asc|desc`

### ✅ Filtering
- Implemented in `GET /api/hostels`
- Query parameters: `city`, `area`, `minPrice`, `maxPrice`, `genderPreference`, `roomType`
- All filters work through backend API calls

## Summary

- **CREATE**: 2 operations ✅
- **READ**: 5 operations ✅
- **UPDATE**: 3 operations ✅
- **DELETE**: 2 operations ✅

**Total Non-Auth CRUD Operations: 12+**

All operations are fully functional and tested. Backend API handles all pagination, searching, sorting, and filtering operations.



