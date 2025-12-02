# ⚡ Quick Fix: "Unable to connect to server"

## The Problem
Your Vercel frontend (https://room-radar-wheat.vercel.app) is trying to connect to `localhost:3001` which doesn't exist in production.

## ✅ Solution in 3 Steps

### Step 1: Deploy Backend (5 minutes)

**Option A: Render (Recommended - Free & Fast)**

1. Go to: https://render.com
2. Sign up with GitHub (free)
3. Click "New +" → "Web Service"
4. Connect repo: `couchpotato027/room-radar`
5. Settings:
   - **Name**: `room-radar-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
6. **Environment Variables** (click "Advanced"):
   ```
   DATABASE_URL=mysql://root@localhost:3306/roomradar
   JWT_SECRET=your-secret-key-change-this
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://room-radar-wheat.vercel.app
   ```
7. Click "Create Web Service"
8. **Wait 2-3 minutes** for deployment
9. **Copy your backend URL**: `https://room-radar-backend.onrender.com` (or similar)

**For Database:**
- Quick option: Use local MySQL connection string for testing
- Production: Create Aiven MySQL (free) and update DATABASE_URL

### Step 2: Set Vercel Environment Variable (1 minute)

1. Go to: https://vercel.com/dashboard
2. Click your project: `room-radar-wheat`
3. Go to: **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://room-radar-backend.onrender.com` (your backend URL from Step 1)
   - **Environments**: ✅ Production ✅ Preview ✅ Development
6. Click **Save**

### Step 3: Redeploy Frontend (30 seconds)

1. In Vercel dashboard, go to **Deployments**
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

**OR** just push to GitHub:
```bash
git push origin main
```
(Vercel auto-deploys on push)

---

## 🧪 Test It

1. Open: https://room-radar-wheat.vercel.app
2. Try to sign up
3. Should work now! ✅

---

## 🔍 If Still Not Working

### Check Backend is Running:
```bash
curl https://your-backend-url.onrender.com/
```
Should return: `{"message":"Room Radar API Server is running!","status":"OK"}`

### Check Browser Console:
1. Open https://room-radar-wheat.vercel.app
2. Press F12 → Console tab
3. Try to sign up
4. Look for error messages
5. Check what URL it's trying to connect to

### Common Issues:

**"Network Error"**
- Backend URL is wrong in Vercel env vars
- Backend is not deployed/running
- CORS issue (check backend CORS settings)

**"404 Not Found"**
- Backend URL is correct but path is wrong
- Check backend routes

**"500 Internal Server Error"**
- Backend is running but has errors
- Check Render logs

---

## 📝 Quick Checklist

- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] `REACT_APP_API_URL` set in Vercel
- [ ] Frontend redeployed
- [ ] Tested signup/login

---

## 🆘 Need Help?

If you're stuck:
1. Check Render logs for backend errors
2. Check Vercel deployment logs
3. Check browser console (F12)
4. Verify environment variables are set correctly

---

## 💡 Pro Tip

For quick testing, you can temporarily use a local backend with ngrok:
```bash
# Install ngrok
npm install -g ngrok

# Expose local backend
ngrok http 3001

# Use the ngrok URL in Vercel env var
```

But for production, use Render or another hosting service.

