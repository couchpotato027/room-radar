# 🔧 Fix Render Backend Deployment Failure

## Current Status
- ❌ Backend service `room-radar` shows "Failed service" on Render
- Need to check logs and fix the issue

## 🔍 Step 1: Check Deployment Logs

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click on**: `room-radar` service
3. **Go to**: "Logs" tab
4. **Check the error messages** - this will tell you what failed

## 🐛 Common Issues & Fixes

### Issue 1: Build Command Failed

**Error**: `npm install` or `npx prisma generate` failed

**Fix**:
- Check if `prisma` is in `dependencies` (not just `devDependencies`)
- Verify `package.json` has all required dependencies
- Build command should be: `npm install && npx prisma generate`

### Issue 2: Database Connection Failed

**Error**: `DATABASE_URL` not set or invalid

**Fix**:
1. Go to Render → Your service → "Environment" tab
2. Check if `DATABASE_URL` is set
3. Format should be: `mysql://user:password@host:port/database`
4. If using Aiven, get the Service URI from Aiven dashboard

### Issue 3: Prisma Client Not Generated

**Error**: `@prisma/client` not found

**Fix**:
- Ensure build command includes: `npx prisma generate`
- Check `package.json` has `@prisma/client` in dependencies

### Issue 4: Start Command Failed

**Error**: Server won't start

**Fix**:
- Start command should be: `npm start`
- Verify `package.json` has `"start": "node server.js"`
- Check if `PORT` environment variable is set (Render uses `PORT` automatically)

### Issue 5: Missing Environment Variables

**Error**: Required env vars not set

**Required Variables**:
```
DATABASE_URL=mysql://user:pass@host:port/db
JWT_SECRET=your-secret-key
PORT=10000 (or let Render auto-assign)
NODE_ENV=production
FRONTEND_URL=https://room-radar-wheat.vercel.app
```

## 🔧 Step 2: Fix Configuration

### Check Render Service Settings

1. **Go to**: Render Dashboard → `room-radar` service
2. **Click**: "Settings" tab
3. **Verify**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

### Update Environment Variables

1. **Go to**: "Environment" tab
2. **Add/Update** these variables:
   ```
   DATABASE_URL=your_mysql_connection_string
   JWT_SECRET=change-this-to-random-secret
   NODE_ENV=production
   FRONTEND_URL=https://room-radar-wheat.vercel.app
   ```
3. **Note**: `PORT` is auto-set by Render, don't override it

## 🚀 Step 3: Redeploy

### Option A: Manual Deploy
1. Go to service page
2. Click "Manual Deploy" → "Deploy latest commit"
3. Wait for deployment

### Option A: Trigger New Deploy
1. Make a small change to trigger redeploy
2. Or click "Clear build cache" and redeploy

## 🗄️ Step 4: Set Up Database (If Not Done)

### Quick Setup with Aiven (Free)

1. **Go to**: https://aiven.io
2. **Sign up/Login** (free)
3. **Create MySQL Service**:
   - Service: MySQL
   - Plan: Startup-1 (Free)
   - Region: Choose closest
   - Name: `room-radar-db`
4. **Wait 2-3 minutes** for service to start
5. **Get Connection String**:
   - Go to "Overview" tab
   - Copy "Service URI"
   - Format: `mysql://avnadmin:password@host:port/defaultdb`
6. **Use in Render**: Set as `DATABASE_URL` environment variable

### After Database is Set

1. **Deploy backend** on Render
2. **After deployment succeeds**, go to Render Shell
3. **Run**:
   ```bash
   npx prisma db push
   ```
4. **(Optional)** Seed data:
   ```bash
   npm run seed
   ```

## ✅ Step 5: Verify Deployment

1. **Check service status**: Should be "Live" (green)
2. **Test endpoint**: 
   ```bash
   curl https://your-service-name.onrender.com/
   ```
   Should return: `{"message":"Room Radar API Server is running!","status":"OK"}`
3. **Check logs**: Should show "Database Connected via Prisma"

## 🆘 Still Failing?

### Check These:

1. **Render Logs**: What's the exact error?
2. **Build Logs**: Did build complete?
3. **Runtime Logs**: Any errors when starting?
4. **Environment Variables**: All set correctly?
5. **Database**: Is it accessible?

### Share These for Help:

1. Screenshot of Render logs (error section)
2. Build command output
3. Environment variables (hide sensitive values)
4. Database connection status

## 📋 Quick Checklist

- [ ] Service settings correct (Root Directory: `backend`)
- [ ] Build command: `npm install && npx prisma generate`
- [ ] Start command: `npm start`
- [ ] `DATABASE_URL` environment variable set
- [ ] `JWT_SECRET` environment variable set
- [ ] `prisma` in dependencies (not just devDependencies)
- [ ] Database is accessible
- [ ] Service redeployed after fixes

---

## 🎯 Expected Result

After fixing:
- Service status: "Live" (green ✓)
- Can access: `https://your-service.onrender.com/`
- Returns: `{"message":"Room Radar API Server is running!","status":"OK"}`
- Frontend can connect successfully

