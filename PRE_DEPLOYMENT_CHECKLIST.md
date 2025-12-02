# ✅ Pre-Deployment Checklist

## Code Changes Made for Deployment

### ✅ Backend Updates
- [x] Updated CORS to support production URLs
- [x] Moved Prisma to dependencies (needed for Render shell)
- [x] Environment variables configured
- [x] Build command includes `npx prisma generate`

### ✅ Frontend Updates
- [x] API URL uses environment variable (`REACT_APP_API_URL`)
- [x] Netlify configuration file created
- [x] Build process ready

### ✅ Configuration Files
- [x] `.gitignore` properly configured (excludes .env)
- [x] `render.yaml` created for Render deployment
- [x] `netlify.toml` created for Netlify deployment

---

## Before Deploying - Verify These:

### 1. Git Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for deployment: Prisma/MySQL migration complete"
git push origin main
```

### 2. Environment Variables to Set

**Render (Backend):**
- `DATABASE_URL` - From Aiven MySQL service
- `JWT_SECRET` - Generate a random secret key
- `PORT` - Set to `10000` (Render default)
- `NODE_ENV` - Set to `production`
- `FRONTEND_URL` - Your Netlify URL (set after frontend deploys)

**Netlify (Frontend):**
- `REACT_APP_API_URL` - Your Render backend URL

### 3. Database Setup
After first backend deployment:
- Run `npx prisma db push` in Render shell
- (Optional) Run `npm run seed` to add sample data

---

## Quick Deploy Commands

### Step 1: Push to GitHub
```bash
cd /Users/priyanshsatija/Desktop/capstone/room-radar
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Database (Aiven)
1. Go to https://aiven.io
2. Create MySQL service
3. Copy connection string

### Step 3: Deploy Backend (Render)
1. Go to https://render.com
2. Connect GitHub repo
3. Create web service with settings from `DEPLOY_NOW.md`
4. Add environment variables
5. Deploy
6. Run `npx prisma db push` in shell

### Step 4: Deploy Frontend (Netlify)
1. Go to https://netlify.com
2. Connect GitHub repo or drag & drop build folder
3. Add `REACT_APP_API_URL` environment variable
4. Deploy

---

## Testing After Deployment

1. ✅ Frontend loads
2. ✅ Can sign up / login
3. ✅ Can browse hostels
4. ✅ Can view hostel details
5. ✅ Can create booking
6. ✅ Booking appears in dashboard
7. ✅ No console errors

---

## Need Help?

See `DEPLOY_NOW.md` for detailed step-by-step instructions.

