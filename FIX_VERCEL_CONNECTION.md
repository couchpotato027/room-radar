# 🔧 Fix: "Unable to connect to server" on Vercel

## Problem
The frontend on Vercel is trying to connect to `http://localhost:3001` because the `REACT_APP_API_URL` environment variable is not set.

## Solution

### Step 1: Deploy Backend First (Required)

You need a backend API URL before the frontend can work. Choose one:

#### Option A: Quick Deploy on Render (Recommended - Free)

1. **Go to Render**: https://render.com
2. **Sign up/Login** with GitHub
3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repo: `couchpotato027/room-radar`
   - Click "Connect"

4. **Configure Service**:
   - **Name**: `room-radar-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables** (Click "Advanced"):
   ```
   DATABASE_URL=your_mysql_connection_string
   JWT_SECRET=your-random-secret-key-here
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://room-radar-wheat.vercel.app
   ```

6. **Create MySQL Database** (Aiven - Free):
   - Go to https://aiven.io
   - Create MySQL service (Startup-1 free tier)
   - Copy the Service URI
   - Use it as `DATABASE_URL` in Render

7. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Note your backend URL: `https://room-radar-backend.onrender.com`

8. **Push Database Schema**:
   - After deployment, go to Render dashboard
   - Click your service → "Shell" tab
   - Run: `npx prisma db push`
   - (Optional) Run: `npm run seed` for sample data

### Step 2: Set Vercel Environment Variable

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `room-radar-wheat`
3. **Go to**: Settings → Environment Variables
4. **Add New Variable**:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your backend URL (e.g., `https://room-radar-backend.onrender.com`)
   - **Environment**: Select all (Production, Preview, Development)
5. **Save**

### Step 3: Redeploy Frontend

1. **In Vercel Dashboard**:
   - Go to "Deployments"
   - Click "..." on latest deployment
   - Click "Redeploy"
   - Or just push to GitHub (auto-redeploys)

### Step 4: Verify

1. Open https://room-radar-wheat.vercel.app
2. Try to sign up
3. Should now connect to backend!

---

## Quick Test (Without Full Deployment)

If you want to test locally first:

1. **Start backend locally**:
   ```bash
   cd backend
   npm start
   ```

2. **Update Vercel env var temporarily**:
   - Use a service like ngrok to expose localhost
   - Or use your Render backend URL once deployed

---

## Troubleshooting

### Still getting connection error?
- Check browser console (F12) for exact error
- Verify backend URL is correct in Vercel env vars
- Make sure backend is actually running
- Check CORS settings in backend

### Backend deployment fails?
- Check Render logs
- Verify `DATABASE_URL` format is correct
- Ensure `npx prisma generate` runs in build

### Database connection fails?
- Verify Aiven service is running
- Check connection string format
- Run `npx prisma db push` in Render shell

---

## Current Status

✅ Frontend: Deployed on Vercel  
❌ Backend: Needs deployment  
❌ Database: Needs setup  
❌ Environment Variable: Needs to be set in Vercel

Once all are done, your app will work! 🚀

