# 👀 How to View Data in Neon Database

## ✅ Yes! You can see all your data in Neon Dashboard

After deploying with the Neon connection string, you can view your database directly in Neon's dashboard.

---

## 🔍 Method 1: Neon Dashboard (Easiest)

### Step 1: Access Neon Dashboard
1. **Go to**: https://console.neon.tech
2. **Login** with your Neon account
3. **Click** on your project: `neondb` (or your project name)

### Step 2: View Tables
1. **Click**: "SQL Editor" tab (left sidebar)
2. **Click**: "New Query"
3. **Run** these queries to see your data:

#### View All Users:
```sql
SELECT * FROM "User";
```

#### View All Hostels:
```sql
SELECT * FROM "Hostel";
```

#### View All Bookings:
```sql
SELECT * FROM "Booking";
```

#### View Hostel Images:
```sql
SELECT * FROM "HostelImage";
```

#### View Reviews:
```sql
SELECT * FROM "Review";
```

### Step 3: Browse Tables
1. **Click**: "Tables" tab (left sidebar)
2. You'll see all your tables:
   - `User`
   - `Hostel`
   - `HostelImage`
   - `Booking`
   - `Review`
   - `Expense`
3. **Click** on any table to see its structure and data

---

## 🔍 Method 2: Using Connection String (External Tools)

You can also connect using any PostgreSQL client:

### Using DBeaver, pgAdmin, or TablePlus:
1. **Connection String**: 
   ```
   postgresql://neondb_owner:npg_BFR1kKyxhGU8@ep-red-haze-ahp4v23l-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

2. **Parse it**:
   - **Host**: `ep-red-haze-ahp4v23l-pooler.c-3.us-east-1.aws.neon.tech`
   - **Port**: `5432` (default PostgreSQL port)
   - **Database**: `neondb`
   - **Username**: `neondb_owner`
   - **Password**: `npg_BFR1kKyxhGU8`
   - **SSL**: Required

---

## 🔍 Method 3: Prisma Studio (Local)

You can also use Prisma Studio to view data locally:

```bash
cd backend
npx prisma studio
```

This opens a browser at `http://localhost:5555` where you can:
- Browse all tables
- View, edit, and delete records
- See relationships between tables

**Note**: Make sure `DATABASE_URL` in your `.env` points to Neon for this to work.

---

## 📊 What You'll See After Deployment

### After First Deployment:
1. **Tables Created**: All Prisma models will be created as tables
2. **Auto-Seeded Data**: If database is empty, you'll see:
   - 1 default owner user (`owner@roomradar.com`)
   - ~20 sample hostels with images
   - All amenities and details populated

### After Users Sign Up:
- New users will appear in `User` table
- Bookings will appear in `Booking` table
- Reviews will appear in `Review` table

---

## 🔍 Quick Verification Queries

Run these in Neon SQL Editor to verify everything is working:

### Count Records:
```sql
-- Count users
SELECT COUNT(*) FROM "User";

-- Count hostels
SELECT COUNT(*) FROM "Hostel";

-- Count bookings
SELECT COUNT(*) FROM "Booking";
```

### View Recent Signups:
```sql
SELECT id, name, email, role, "createdAt" 
FROM "User" 
ORDER BY "createdAt" DESC 
LIMIT 10;
```

### View Hostels with Details:
```sql
SELECT id, name, city, area, "monthlyRent", rating, "isVerified"
FROM "Hostel"
ORDER BY rating DESC
LIMIT 10;
```

---

## ⚠️ Important Notes

1. **Table Names**: Prisma uses PascalCase for table names in PostgreSQL:
   - `User` (not `user`)
   - `Hostel` (not `hostel`)
   - `Booking` (not `booking`)

2. **Quoted Identifiers**: Always use double quotes for table/column names in SQL:
   ```sql
   SELECT * FROM "User";  ✅ Correct
   SELECT * FROM User;    ❌ Wrong (will fail)
   ```

3. **Real-time Updates**: Data in Neon updates in real-time. When users sign up or make bookings, you'll see them immediately in Neon dashboard.

4. **Connection Pooling**: Your connection string uses a pooler (`-pooler` in the hostname), which is optimized for serverless connections.

---

## 🎯 After Deployment Checklist

- [ ] Update `DATABASE_URL` in Render
- [ ] Redeploy backend
- [ ] Check Render logs for successful connection
- [ ] Open Neon dashboard
- [ ] Verify tables are created
- [ ] Check if sample data is seeded
- [ ] Test signup and verify user appears in Neon

---

## 🚀 Quick Test

After deployment, run this in Neon SQL Editor:

```sql
-- Check if everything is set up
SELECT 
  (SELECT COUNT(*) FROM "User") as users,
  (SELECT COUNT(*) FROM "Hostel") as hostels,
  (SELECT COUNT(*) FROM "Booking") as bookings;
```

You should see:
- `users`: At least 1 (the default owner)
- `hostels`: At least 20 (auto-seeded)
- `bookings`: 0 or more (depending on user activity)

