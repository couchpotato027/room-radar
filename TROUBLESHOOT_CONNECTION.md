# Troubleshooting: "Unable to connect to server" Error

## Quick Fix

### Step 1: Ensure Backend is Running
```bash
cd /Users/priyanshsatija/Desktop/capstone/room-radar/backend
npm run dev
```

**Look for these messages:**
- ✅ "Server running on port 3001"
- ✅ "MongoDB Connected: ..."

### Step 2: Verify Backend is Accessible
Open a new terminal and test:
```bash
curl http://localhost:3001/
# Should return: {"message":"Room Radar API Server is running!","status":"OK"}
```

### Step 3: Check Frontend Config
File: `frontend/src/config.js`
Should contain:
```javascript
API_URL: 'http://localhost:3001'
```

### Step 4: Clear Browser Cache
1. Open browser DevTools (F12)
2. Go to Application tab → Clear Storage → Clear site data
3. Or run in console: `localStorage.clear()`
4. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

## Verification Checklist

- [ ] Backend server is running (check terminal for "Server running on port 3001")
- [ ] MongoDB is connected (check terminal for "MongoDB Connected")
- [ ] Frontend is running on port 3000
- [ ] No firewall blocking ports 3000/3001
- [ ] Browser can access http://localhost:3001 directly

## Test Backend API Manually

### Test Root Endpoint:
```bash
curl http://localhost:3001/
```

### Test Login Endpoint:
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

If this works but frontend doesn't, it's a frontend configuration issue.

## Browser Console Debugging

1. Open DevTools (F12)
2. Go to **Network** tab
3. Try to login
4. Look for `/api/auth/login` request
5. Check:
   - **Status**: Should be 200 or 401 (not failed)
   - **Request URL**: Should be `http://localhost:3001/api/auth/login`
   - **Response**: Click on request to see response

## Common Issues

### Issue: Backend not starting
**Solution:**
- Check MongoDB is running
- Check `.env` file exists in backend folder
- Check for port conflicts

### Issue: CORS errors in browser console
**Solution:**
- CORS is already configured in backend
- Try clearing browser cache
- Check backend CORS middleware is active

### Issue: "Connection refused"
**Solution:**
- Backend server is not running
- Start backend with `npm run dev`
- Check port 3001 is not blocked by firewall

## Restart Everything

1. **Stop all servers:**
   ```bash
   # Kill backend
   lsof -ti:3001 | xargs kill -9
   
   # Kill frontend
   lsof -ti:3000 | xargs kill -9
   ```

2. **Start Backend:**
   ```bash
   cd room-radar/backend
   npm run dev
   ```
   Wait for "Server running on port 3001"

3. **Start Frontend (in new terminal):**
   ```bash
   cd room-radar/frontend
   npm start
   ```

4. **Open browser:**
   - Go to http://localhost:3000
   - Try logging in

## Still Not Working?

1. Check backend console for errors
2. Check browser console (F12) for errors
3. Check Network tab for failed requests
4. Verify API URL in frontend config.js
5. Try accessing backend directly: http://localhost:3001

