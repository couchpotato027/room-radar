# 🔧 CRITICAL: Fix Vercel Environment Variable

## The Problem
Your frontend is still trying to connect to `localhost:3001` because the environment variable isn't set or the frontend hasn't been redeployed.

## ✅ SOLUTION (Do This Now)

### Method 1: Vercel Dashboard (Recommended)

1. **Open Vercel**: https://vercel.com/dashboard
2. **Select Project**: `room-radar-wheat` 
3. **Settings** → **Environment Variables**
4. **Check if `REACT_APP_API_URL` exists**:
   - If NO → Click "Add New"
   - If YES → Click to edit it
5. **Set Value**:
   ```
   Key: REACT_APP_API_URL
   Value: https://room-radar-7t3y.onrender.com
   Environments: ✅ Production ✅ Preview ✅ Development
   ```
6. **Save**

### Method 2: Vercel CLI (If you have it)

```bash
cd /Users/priyanshsatija/Desktop/capstone/room-radar
vercel env add REACT_APP_API_URL
# When prompted, enter: https://room-radar-7t3y.onrender.com
# Select: Production, Preview, Development
```

---

## 🔄 MUST REDEPLOY After Setting Env Var

**Environment variables only apply to NEW deployments!**

### Option A: Trigger New Deployment
```bash
cd /Users/priyanshsatija/Desktop/capstone/room-radar
# Make a small change to trigger redeploy
echo "# Redeploy trigger" >> README.md
git add README.md
git commit -m "Trigger redeploy with env var"
git push origin main
```

### Option B: Manual Redeploy in Vercel
1. Vercel Dashboard → Deployments
2. Click "..." on latest
3. Click "Redeploy"
4. **IMPORTANT**: Make sure "Use existing Build Cache" is **UNCHECKED**
5. Click "Redeploy"

---

## 🧪 Verify It's Working

### Step 1: Check Environment Variable is Set
1. Vercel → Settings → Environment Variables
2. Verify `REACT_APP_API_URL` = `https://room-radar-7t3y.onrender.com`

### Step 2: Check Latest Deployment
1. Vercel → Deployments
2. Click on latest deployment
3. Check "Build Logs"
4. Look for: `REACT_APP_API_URL` in the logs
5. Should see it being used during build

### Step 3: Test in Browser
1. Open: https://room-radar-wheat.vercel.app
2. Open DevTools (F12) → Console
3. Type: `console.log(process.env.REACT_APP_API_URL)`
   - **Note**: This won't work in browser, env vars are build-time only
4. Better: Check Network tab
5. Try to sign up
6. In Network tab, look for the request
7. Should see: `https://room-radar-7t3y.onrender.com/api/auth/signup`

---

## 🔍 Debugging Steps

### If Still Not Working:

1. **Clear Browser Cache**:
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear cache in browser settings

2. **Check Browser Console**:
   - F12 → Console tab
   - Look for errors
   - Check what URL it's trying to connect to

3. **Check Network Tab**:
   - F12 → Network tab
   - Try signup
   - See what URL the request goes to
   - If it's `localhost:3001`, env var isn't set/working

4. **Verify Backend**:
   ```bash
   curl https://room-radar-7t3y.onrender.com/
   # Should return: {"message":"Room Radar API Server is running!","status":"OK"}
   ```

5. **Check Vercel Build Logs**:
   - Vercel → Deployments → Latest → Build Logs
   - Look for any errors
   - Verify env var is being used

---

## ⚠️ Common Mistakes

1. **Setting env var but not redeploying** ❌
   - Env vars only apply to NEW builds
   - Must redeploy after setting

2. **Wrong variable name** ❌
   - Must be exactly: `REACT_APP_API_URL`
   - React only reads vars starting with `REACT_APP_`

3. **Trailing slash** ❌
   - Use: `https://room-radar-7t3y.onrender.com`
   - NOT: `https://room-radar-7t3y.onrender.com/`

4. **Only set for Production** ❌
   - Set for: Production, Preview, AND Development

---

## 🎯 Quick Checklist

- [ ] `REACT_APP_API_URL` set in Vercel
- [ ] Value = `https://room-radar-7t3y.onrender.com` (no trailing slash)
- [ ] Set for all environments (Production, Preview, Development)
- [ ] Frontend redeployed AFTER setting env var
- [ ] Cleared browser cache
- [ ] Tested in browser

---

## 🆘 Still Not Working?

**Share these details:**
1. Screenshot of Vercel Environment Variables page
2. Browser console errors (F12 → Console)
3. Network tab showing the failed request
4. Vercel deployment logs

This will help diagnose the exact issue!

