# 🚀 Vercel Deployment Guide - Room Radar

## Current Deployment Status

- **Frontend**: https://room-radar-wheat.vercel.app
- **GitHub**: https://github.com/couchpotato027/room-radar.git
- **Backend**: Needs to be deployed on Render (or your preferred backend host)

---

## ✅ Changes Made for Deployment

### 1. Prisma/MySQL Migration
- ✅ Migrated from MongoDB/Mongoose to Prisma/MySQL
- ✅ Updated all routes and models
- ✅ Database schema ready for MySQL

### 2. Configuration Files
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ Updated CORS to include Vercel URL
- ✅ Environment variable support

---

## 🔧 Vercel Environment Variables

To update your Vercel deployment, add this environment variable:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your backend API URL (e.g., `https://room-radar-backend.onrender.com`)
   - **Environment**: Production, Preview, Development

---

## 📤 Deploy Updated Code

### Option 1: Automatic (Recommended)
Just push to GitHub - Vercel will auto-deploy:

```bash
cd /Users/priyanshsatija/Desktop/capstone/room-radar
git add .
git commit -m "Migrate to Prisma/MySQL and update deployment config"
git push origin main
```

Vercel will automatically detect the push and redeploy.

### Option 2: Manual Deploy
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Click "Redeploy" on the latest deployment

---

## 🗄️ Backend Deployment (Required)

Your backend needs to be deployed separately. Options:

### Option A: Render (Recommended)
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install && npx prisma generate`
   - Start Command: `npm start`
5. Environment Variables:
   - `DATABASE_URL` - Your MySQL connection string
   - `JWT_SECRET` - Random secret key
   - `PORT` - `10000`
   - `FRONTEND_URL` - `https://room-radar-wheat.vercel.app`

### Option B: Railway / Fly.io / Other
Follow similar steps with your preferred platform.

---

## 🗄️ Database Setup

1. **Create MySQL Database** (Aiven recommended):
   - Go to https://aiven.io
   - Create MySQL service (Startup-1 free tier)
   - Copy connection string

2. **Push Schema**:
   - After backend deploys, run in backend shell:
   ```bash
   npx prisma db push
   ```

3. **Seed Data** (optional):
   ```bash
   npm run seed
   ```

---

## ✅ Verification Checklist

After deployment:

- [ ] Frontend loads on Vercel
- [ ] Backend API is accessible
- [ ] Database connection works
- [ ] Can sign up / login
- [ ] Can browse hostels
- [ ] Can create bookings
- [ ] CORS errors resolved

---

## 🔍 Troubleshooting

### Frontend can't connect to backend
- Check `REACT_APP_API_URL` in Vercel environment variables
- Verify backend URL is correct
- Check browser console for errors

### CORS errors
- Update `FRONTEND_URL` in backend environment
- Verify Vercel URL is in backend CORS allowed origins

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Verify `vercel.json` is correct
- Ensure all dependencies are in `package.json`

---

## 📝 Next Steps

1. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Update for Prisma/MySQL deployment"
   git push origin main
   ```

2. **Deploy backend** (if not already done)

3. **Set environment variables** in Vercel

4. **Test the deployment**

---

## 🎉 You're All Set!

Your app should now be updated with Prisma/MySQL and ready to use!

