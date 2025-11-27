# Room Radar

A Node.js + React application with authentication using Prisma and MySQL.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL Workbench
- MySQL Server

### Database Setup
1. Open MySQL Workbench
2. Create a new database:
   ```sql
   CREATE DATABASE room_radar;
   ```
3. Update the `.env` file in the backend folder with your MySQL credentials

### Backend Setup
1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
4. Run database migrations:
   ```bash
   npx prisma db push
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies (already done):
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

## Usage
- Backend runs on http://localhost:5000
- Frontend runs on http://localhost:3000
- Use the signup form to create a new account
- Use the login form to authenticate existing users

## API Endpoints
- POST `/api/signup` - Create new user account
- POST `/api/login` - Authenticate user