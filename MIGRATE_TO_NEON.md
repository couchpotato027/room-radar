# 🗄️ Migrate Database to Neon PostgreSQL

## ✅ Changes Made

1. **Updated Prisma Schema**: Changed provider from `mysql` to `postgresql`
2. **Updated Search Queries**: Added case-insensitive mode for PostgreSQL
3. **Updated Table Check**: Changed to PostgreSQL syntax (quoted table names)

## 🔧 Next Steps

### Step 1: Update Render Environment Variable

1. **Go to**: https://dashboard.render.com
2. **Click**: Your backend service (`room-radar-7t3y`)
3. **Go to**: Environment tab
4. **Find**: `DATABASE_URL`
5. **Update** to your Neon connection string:
   ```
   postgresql://neondb_owner:npg_BFR1kKyxhGU8@ep-red-haze-ahp4v23l-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
6. **Click**: Save

### Step 2: Regenerate Prisma Client

After updating DATABASE_URL, the backend will automatically:
- Regenerate Prisma Client for PostgreSQL
- Push the schema to Neon database
- Create all tables

### Step 3: Redeploy Backend

1. **Go to**: Render Dashboard → Your Backend Service
2. **Click**: "Manual Deploy" → "Clear build cache & deploy"
3. **Wait**: 2-3 minutes for deployment

### Step 4: Verify Connection

Check Render logs for:
- ✅ `Database Connected via Prisma`
- ✅ `✅ Database schema exists` or `✅ Prisma schema pushed successfully`
- ✅ `Server running on port 10000`

### Step 5: Test API

Test if database is working:
```bash
curl https://room-radar-7t3y.onrender.com/api/admin/users
```

Should return user data if database is connected.

---

## 📝 What Changed

### Prisma Schema (`backend/prisma/schema.prisma`)
```prisma
datasource db {
  provider = "postgresql"  // Changed from "mysql"
  url      = env("DATABASE_URL")
}
```

### Search Query (`backend/server.js`)
```javascript
// Now uses case-insensitive mode for PostgreSQL
{ name: { contains: search, mode: 'insensitive' } }
```

### Table Check (`backend/server.js`)
```javascript
// PostgreSQL uses quoted identifiers
await prisma.$queryRaw`SELECT 1 FROM "User" LIMIT 1`;
```

---

## ⚠️ Important Notes

1. **Data Migration**: Existing data in MySQL will NOT be automatically migrated. You'll need to:
   - Export data from MySQL (if needed)
   - Re-seed the database after switching to PostgreSQL

2. **Auto-Seeding**: The backend will automatically seed sample hostels if the database is empty.

3. **Connection String**: Make sure the Neon connection string includes `?sslmode=require` for secure connections.

---

## 🎯 After Migration

Once deployed:
1. Database will be on Neon PostgreSQL
2. Schema will be automatically created
3. Sample data will be seeded if database is empty
4. All CRUD operations will work with PostgreSQL

---

## 🔍 Verify It's Working

1. Check Render logs - should show successful connection
2. Test signup - should create user in PostgreSQL
3. Test `/api/admin/users` - should return users from PostgreSQL
4. Check Neon dashboard - should see tables created

