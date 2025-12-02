# Fix: Clear Browser Cache and LocalStorage

If you're seeing bookings from a different user, follow these steps:

## Steps to Fix:

1. **Stop the backend server** (if running) and restart it:
   ```bash
   cd room-radar/backend
   npm run dev
   ```

2. **Clear your browser's localStorage:**
   - Open your browser's Developer Tools (F12 or Cmd+Option+I on Mac)
   - Go to the "Application" tab (Chrome) or "Storage" tab (Firefox)
   - Find "Local Storage" in the left sidebar
   - Click on your localhost URL
   - Delete the `token` and `user` keys
   - OR simply run this in the browser console:
     ```javascript
     localStorage.clear()
     ```

3. **Close and reopen your browser** (or do a hard refresh: Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

4. **Log out completely** from your current session

5. **Log in again** with the account you want to test

## Why this happens:

The old code was using a shared demo token (`'demo-token-123'`) for all users. Now each user gets their own unique JWT token. But if you have the old token stored in localStorage, you need to clear it first.

## Test:

After clearing and logging in with a different account:
- You should see ONLY that account's bookings
- No bookings from previous users



