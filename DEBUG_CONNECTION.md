# 🔍 Debug Connection Issues

## Current Status
- ✅ Backend: https://room-radar-7t3y.onrender.com (Responding)
- ❌ Frontend: Can't connect to backend

## 🔧 Immediate Debug Steps

### Step 1: Check What URL Frontend is Using

1. Open: https://room-radar-wheat.vercel.app
2. Press **F12** (Open DevTools)
3. Go to **Console** tab
4. Type this and press Enter:
   ```javascript
   // This will show what API URL is being used
   fetch('/api/test').catch(e => console.log('API URL check:', e.message))
   ```

### Step 2: Check Network Requests

1. Open DevTools (F12)
2. Go to **Network** tab
3. Try to sign up
4. Look for the failed request
5. Check:
   - What URL is it trying to connect to?
   - What's the error message?
   - Is it a CORS error?

### Step 3: Verify Backend is Accessible

Test in browser console:
```javascript
fetch('https://room-radar-7t3y.onrender.com/')
  .then(r => r.json())
  .then(data => console.log('Backend response:', data))
  .catch(e => console.error('Backend error:', e))
```

Should return: `{message: "Room Radar API Server is running!", status: "OK"}`

### Step 4: Test API Endpoint Directly

```javascript
fetch('https://room-radar-7t3y.onrender.com/api/auth/signup', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Test',
    email: 'test@test.com',
    password: 'test12345'
  })
})
.then(r => r.json())
.then(data => console.log('Signup response:', data))
.catch(e => console.error('Signup error:', e))
```

---

## 🐛 Common Issues & Fixes

### Issue 1: Still Using localhost:3001

**Symptom**: Network tab shows requests to `localhost:3001`

**Fix**:
1. Clear browser cache (Cmd+Shift+Delete)
2. Hard refresh (Cmd+Shift+R)
3. Check Vercel deployment is complete
4. Wait 2-3 minutes after code push

### Issue 2: CORS Error

**Symptom**: Console shows "CORS policy" error

**Fix**: Backend CORS should already include Vercel URL. If not:
1. Check backend `server.js` CORS settings
2. Verify `https://room-radar-wheat.vercel.app` is in allowed origins

### Issue 3: Network Error / Connection Refused

**Symptom**: "Network Error" or "ERR_CONNECTION_REFUSED"

**Possible Causes**:
- Backend is sleeping (Render free tier)
- Backend crashed
- Wrong URL

**Fix**:
1. Check Render dashboard - is backend "Live"?
2. Wake up backend by visiting: https://room-radar-7t3y.onrender.com/
3. Wait 30 seconds for it to wake up
4. Try again

### Issue 4: 404 Not Found

**Symptom**: 404 error on API calls

**Fix**: Check API endpoint path is correct:
- Should be: `https://room-radar-7t3y.onrender.com/api/auth/signup`
- NOT: `https://room-radar-7t3y.onrender.com/auth/signup`

---

## 🧪 Quick Test Script

Paste this in browser console on your Vercel site:

```javascript
(async () => {
  console.log('Testing backend connection...');
  
  // Test 1: Root endpoint
  try {
    const res1 = await fetch('https://room-radar-7t3y.onrender.com/');
    const data1 = await res1.json();
    console.log('✅ Root endpoint:', data1);
  } catch (e) {
    console.error('❌ Root endpoint failed:', e);
  }
  
  // Test 2: API endpoint
  try {
    const res2 = await fetch('https://room-radar-7t3y.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: 'Test',
        email: 'test@test.com',
        password: 'test12345'
      })
    });
    const data2 = await res2.json();
    console.log('✅ API endpoint:', data2);
  } catch (e) {
    console.error('❌ API endpoint failed:', e);
  }
  
  // Test 3: Check config
  console.log('Current hostname:', window.location.hostname);
  console.log('Expected API URL: https://room-radar-7t3y.onrender.com');
})();
```

---

## 📋 Checklist

- [ ] Backend is "Live" in Render dashboard
- [ ] Can access https://room-radar-7t3y.onrender.com/ in browser
- [ ] Vercel deployment completed (check dashboard)
- [ ] Cleared browser cache
- [ ] Hard refreshed page
- [ ] Checked browser console for errors
- [ ] Checked Network tab for request details

---

## 🆘 Still Not Working?

**Share these details:**
1. Screenshot of browser console (F12)
2. Screenshot of Network tab showing the failed request
3. What URL is shown in the Network tab?
4. What's the exact error message?

This will help identify the exact issue!

