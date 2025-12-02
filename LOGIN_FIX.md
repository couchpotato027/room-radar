# Login Connection Issue - Fix Guide

## Problem
"Unable to connect to server" error when trying to login.

## Root Cause
The frontend cannot reach the backend API server.

## Solutions

### 1. ✅ Check Backend Server is Running

**Verify backend is running:**
```bash
# Check if port 3001 is in use
lsof -ti:3001

# Or check the process
ps aux | grep "node.*server.js"
```

**Start backend server:**
```bash
cd room-radar/backend
npm run dev
```

**Expected output:**
```
Server running on port 3001
MongoDB Connected: ...
```

### 2. ✅ Verify API URL Configuration

**Check frontend config:**
- File: `frontend/src/config.js`
- Should be: `http://localhost:3001`

**Check in browser console:**
```javascript
// Open DevTools Console and run:
localStorage.getItem('token')
// Should show null if not logged in
```

### 3. ✅ Test Backend API Directly

**Test if backend is responding:**
```bash
curl http://localhost:3001/

# Should return:
# {"message":"Room Radar API Server is running!","status":"OK"}
```

**Test login endpoint:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### 4. ✅ Check MongoDB Connection

**Backend needs MongoDB to work:**
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env` file
- Backend should show "MongoDB Connected" message

### 5. ✅ Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Backend not running | Start with `npm run dev` in backend folder |
| Wrong port | Backend should be on port 3001 |
| MongoDB not connected | Check MongoDB URI and connection |
| CORS error | Already configured in backend |
| Network error | Check backend server status |

## Quick Fix Steps

1. **Open Terminal 1 - Start Backend:**
   ```bash
   cd /Users/priyanshsatija/Desktop/capstone/room-radar/backend
   npm run dev
   ```

2. **Verify Backend Started:**
   - Look for: "Server running on port 3001"
   - Look for: "MongoDB Connected"

3. **Open Terminal 2 - Start Frontend (if not running):**
   ```bash
   cd /Users/priyanshsatija/Desktop/capstone/room-radar/frontend
   npm start
   ```

4. **Test Connection:**
   - Open browser: http://localhost:3000
   - Try logging in
   - Check browser console (F12) for errors

## Debugging

### Check Browser Console (F12)
Look for errors like:
- `ERR_CONNECTION_REFUSED`
- `Network Error`
- `Failed to fetch`

### Check Backend Logs
Look for errors like:
- MongoDB connection errors
- Port already in use
- Missing environment variables

### Network Tab (F12)
1. Open DevTools → Network tab
2. Try to login
3. Look for the `/api/auth/login` request
4. Check:
   - Status code (should be 200 or 401, not failed)
   - Request URL (should be http://localhost:3001/api/auth/login)
   - Response (check what the server returned)

## Expected Flow

1. User enters email/password
2. Frontend sends POST to `http://localhost:3001/api/auth/login`
3. Backend validates credentials
4. Backend returns JWT token and user data
5. Frontend stores token and redirects to home page

## If Still Not Working

1. **Restart both servers:**
   - Kill all node processes
   - Start backend first
   - Then start frontend

2. **Check ports:**
   - Frontend: Port 3000
   - Backend: Port 3001
   - Make sure nothing else is using these ports

3. **Check environment:**
   - Backend `.env` file exists
   - MongoDB URI is correct
   - JWT_SECRET is set

4. **Clear browser cache:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Clear localStorage: `localStorage.clear()` in console

