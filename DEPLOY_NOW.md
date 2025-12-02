# 🚀 Quick Deployment Guide - Room Radar

## Prerequisites
- GitHub account with repository pushed
- Aiven account (free tier available)
- Render account (free tier available)
- Netlify account (free tier available)

---

## Step 1: Deploy Database (Aiven MySQL) ⚡

1. **Go to Aiven**: https://aiven.io
2. **Create MySQL Service**:
   - Click "Create Service"
   - Service: **MySQL**
   - Plan: **Startup-1** (Free)
   - Cloud: Choose closest region
   - Service Name: `room-radar-db`
   - Click **Create Service**

3. **Get Connection String**:
   - Wait 2-3 minutes for service to start
   - Go to **Overview** tab
   - Copy the **Service URI** (looks like: `mysql://avnadmin:password@host:port/defaultdb`)
   - **Save this** - you'll need it for Render

---

## Step 2: Deploy Backend (Render) ⚡

1. **Go to Render**: https://render.com
2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your `room-radar` repository

3. **Configure Service**:
   - **Name**: `room-radar-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`

4. **Add Environment Variables** (in Render dashboard):
   ```
   DATABASE_URL=your_aiven_mysql_uri_here
   JWT_SECRET=generate-a-random-secret-key-here
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://your-netlify-app.netlify.app
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for first deployment
   - Note your backend URL: `https://room-radar-backend.onrender.com`

6. **Push Database Schema**:
   - After first deploy, go to your service
   - Click "Shell" tab
   - Run: `npx prisma db push`
   - (Optional) Run: `npm run seed` to add sample data

---

## Step 3: Deploy Frontend (Netlify) ⚡

1. **Build Frontend Locally** (or let Netlify build it):
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Go to Netlify**: https://netlify.com
3. **Deploy**:
   - Option A: **Drag & Drop**
     - Drag the `frontend/build` folder to Netlify
   - Option B: **GitHub Integration** (Recommended)
     - Click "Add new site" → "Import an existing project"
     - Connect GitHub → Select repository
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `build`

4. **Add Environment Variable** (in Netlify):
   - Go to Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `https://room-radar-backend.onrender.com`

5. **Redeploy** (if needed):
   - Trigger a new deployment after adding env variable

6. **Note your frontend URL**: `https://your-app-name.netlify.app`

---

## Step 4: Update CORS (if needed) ⚡

If your frontend URL is different, update backend CORS:

1. Go to Render → Your backend service → Environment
2. Update `FRONTEND_URL` to your actual Netlify URL
3. Redeploy

---

## ✅ Verification Checklist

- [ ] Database deployed on Aiven
- [ ] Backend deployed on Render
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Frontend deployed on Netlify
- [ ] Environment variables set correctly
- [ ] Frontend can connect to backend (check browser console)
- [ ] Test: Create account, login, browse hostels, create booking

---

## 🔧 Troubleshooting

### Backend won't start
- Check Render logs
- Verify `DATABASE_URL` is correct
- Ensure `npx prisma generate` runs in build

### Database connection fails
- Verify Aiven service is running
- Check connection string format
- Ensure IP whitelist allows connections (Aiven handles this)

### CORS errors
- Update `FRONTEND_URL` in backend environment
- Check allowed origins in `server.js`

### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` in Netlify
- Check backend URL is correct
- Rebuild frontend after env variable changes

---

## 📝 Final URLs

After deployment, you'll have:
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://room-radar-backend.onrender.com`
- **Database**: Managed by Aiven

---

## 🎉 You're Done!

Your Room Radar app should now be live! Test all features and enjoy! 🚀

