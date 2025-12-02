# 🚨 URGENT FIX: Backend Connection Error

## Current Status
- ✅ Frontend: https://room-radar-wheat.vercel.app (Working)
- ❌ Backend: Not accessible (404 error)
- ❌ Connection: Frontend can't reach backend

## ⚡ IMMEDIATE FIX (Choose One)

### Option 1: Deploy New Backend on Render (10 minutes)

1. **Go to Render**: https://render.com
2. **Sign in** (or sign up with GitHub - free)
3. **New Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub: `couchpotato027/room-radar`
4. **Configure**:
   ```
   Name: room-radar-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install && npx prisma generate
   Start Command: npm start
   Plan: Free
   ```
5. **Environment Variables**:
   ```
   DATABASE_URL=mysql://root:password@host:port/database
   JWT_SECRET=change-this-to-random-secret-key
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://room-radar-wheat.vercel.app
   ```
6. **Deploy** → Wait 3-5 minutes
7. **Get Backend URL**: `https://room-radar-backend-xxxx.onrender.com`

### Option 2: Fix Existing Backend

If you already have a Render backend:
1. Go to Render Dashboard
2. Find your backend service
3. Check if it's running (should be "Live")
4. If stopped, click "Manual Deploy"
5. Check logs for errors
6. If it needs database, run `npx prisma db push` in Shell

---

## 🔧 Set Vercel Environment Variable

**CRITICAL STEP** - Do this after backend is deployed:

1. **Vercel Dashboard**: https://vercel.com/dashboard
2. **Project**: `room-radar-wheat`
3. **Settings** → **Environment Variables**
4. **Add**:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.onrender.com`
   - Environments: All (Production, Preview, Development)
5. **Save**

## 🔄 Redeploy Frontend

1. Vercel Dashboard → Deployments
2. Click "..." → "Redeploy"
3. Wait 2 minutes

---

## 🗄️ Database Setup (Required)

You need a MySQL database. Quick options:

### Option A: Aiven (Free Tier)
1. https://aiven.io → Sign up (free)
2. Create MySQL service (Startup-1)
3. Copy Service URI
4. Use as `DATABASE_URL` in Render

### Option B: Local MySQL (for testing)
Use your local MySQL connection string temporarily

---

## ✅ Verification

After setup:
1. Test backend: `curl https://your-backend.onrender.com/`
   - Should return: `{"message":"Room Radar API Server is running!","status":"OK"}`
2. Test frontend: https://room-radar-wheat.vercel.app
3. Try signup - should work!

---

## 🆘 Still Not Working?

**Check these:**

1. **Backend URL correct?**
   - Test in browser: `https://your-backend.onrender.com/`
   - Should show API message

2. **Environment variable set?**
   - Vercel → Settings → Environment Variables
   - Must be `REACT_APP_API_URL` (exact name)
   - Value must be full URL with `https://`

3. **Frontend redeployed?**
   - Check Vercel deployments
   - Latest should be after env var was set

4. **CORS issue?**
   - Check backend CORS settings
   - Should include Vercel URL

5. **Browser console?**
   - F12 → Console
   - Look for error messages
   - Check Network tab for failed requests

---

## 📞 Quick Test Commands

```bash
# Test backend
curl https://your-backend.onrender.com/

# Test API endpoint
curl https://your-backend.onrender.com/api/hostels

# Check if env var is set (in Vercel build logs)
# Look for REACT_APP_API_URL in deployment logs
```

---

## 🎯 Summary

**What you need:**
1. ✅ Backend deployed and running
2. ✅ Backend URL
3. ✅ `REACT_APP_API_URL` set in Vercel
4. ✅ Frontend redeployed
5. ✅ Database connected

**Time needed:** ~10-15 minutes

**Cost:** $0 (all free tiers)

---

**Need help?** Check the error in browser console (F12) and share it!

