# Room Radar Deployment Guide

## 🗄️ Step 1: Deploy Database on Aiven

1. **Sign up for Aiven**
   - Go to https://aiven.io
   - Create a free account
   - Verify your email

2. **Create MySQL Service**
   - Click "Create Service"
   - Select "MySQL"
   - Choose "Startup-1" (free tier)
   - Select region closest to you
   - Name your service: `room-radar-db`
   - Click "Create Service"

3. **Get Database Connection**
   - Wait for service to start (2-3 minutes)
   - Go to "Overview" tab
   - Copy the "Service URI" - it looks like:
     `mysql://avnadmin:password@host:port/defaultdb`

## 🚀 Step 2: Deploy Backend on Render

1. **Prepare Repository**
   - Push your code to GitHub
   - Make sure `.env` is in `.gitignore`

2. **Deploy on Render**
   - Go to https://render.com
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `room-radar` repository

3. **Configure Render Settings**
   - **Name**: `room-radar-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add these variables:
     ```
     DATABASE_URL=your_aiven_mysql_url_here
     JWT_SECRET=your_random_secret_key_here
     PORT=10000
     ```

5. **Deploy Database Schema**
   - After first deploy, go to Render dashboard
   - Click your service → "Shell"
   - Run: `npx prisma db push`

## 🌐 Step 3: Deploy Frontend on Netlify

1. **Update API URLs**
   - Replace `localhost:3001` with your Render backend URL
   - Your Render URL will be: `https://room-radar-backend.onrender.com`

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy on Netlify**
   - Go to https://netlify.com
   - Sign up with GitHub
   - Drag and drop the `build` folder
   - Or connect GitHub repository

4. **Configure Netlify**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
   - **Build Directory**: `frontend`

## 🔧 Environment Variables Summary

### Aiven MySQL
- Get connection string from Aiven dashboard
- Format: `mysql://user:pass@host:port/db`

### Render Backend
```
DATABASE_URL=mysql://avnadmin:password@host:port/defaultdb
JWT_SECRET=your-super-secret-jwt-key-here
PORT=10000
```

### Frontend (update API URLs)
- Replace `http://localhost:3001` with `https://your-render-app.onrender.com`

## 🚨 Common Issues

1. **Database Connection Failed**
   - Check Aiven service is running
   - Verify connection string format
   - Ensure IP whitelist allows connections

2. **CORS Errors**
   - Update CORS origin in backend to include Netlify URL
   - Add both localhost and production URLs

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

## 📱 Final URLs
- **Frontend**: `https://your-app-name.netlify.app`
- **Backend**: `https://room-radar-backend.onrender.com`
- **Database**: Managed by Aiven