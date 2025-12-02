# How to Start the Development Servers

## Quick Start Guide

### Backend Server (Port 3001)
```bash
cd room-radar/backend
npm run dev
```

The backend will run on: `http://localhost:3001`

### Frontend Server (Port 3000)
```bash
cd room-radar/frontend
npm start
```

The frontend will automatically open at: `http://localhost:3000`

## Verify Servers are Running

### Check Backend:
```bash
curl http://localhost:3001/
```

Should return: `{"message":"Room Radar API Server is running!","status":"OK"}`

### Check Frontend:
Open browser and go to: `http://localhost:3000`

## Port Information

- **Frontend**: Port 3000 (http://localhost:3000)
- **Backend API**: Port 3001 (http://localhost:3001)
- **API Base URL**: http://localhost:3001/api

## Troubleshooting

### "Site can't be reached" Error

1. **Check if backend is running:**
   ```bash
   lsof -ti:3001
   ```
   If no output, backend is not running.

2. **Check if frontend is running:**
   ```bash
   lsof -ti:3000
   ```
   If no output, frontend is not running.

3. **Start missing servers:**
   - Backend: `cd room-radar/backend && npm run dev`
   - Frontend: `cd room-radar/frontend && npm start`

### Port Already in Use

If you get "port already in use" error:

```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9
```

Then start the servers again.

## Development Workflow

1. **Start Backend First:**
   ```bash
   cd room-radar/backend
   npm run dev
   ```
   Wait for "Server running on port 3001" and "MongoDB Connected"

2. **Start Frontend:**
   ```bash
   cd room-radar/frontend
   npm start
   ```
   Browser should automatically open to http://localhost:3000

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/roomradar
JWT_SECRET=your-secret-key
PORT=3001
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001
```

## Common Issues

### Backend not connecting to MongoDB
- Check MongoDB is running
- Verify MONGODB_URI in .env file
- Check MongoDB connection string

### Frontend can't reach backend
- Verify backend is running on port 3001
- Check API_URL in frontend config.js
- Check CORS settings in backend

### Port conflicts
- Make sure no other applications are using ports 3000 or 3001
- Kill existing processes on those ports


