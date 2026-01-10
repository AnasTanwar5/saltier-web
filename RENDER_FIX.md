# Fix: "Cannot GET /" Error on Render

## Problem

You're seeing "Cannot GET /" because you're accessing the **backend URL** directly. The backend is an API server, not a web page.

## Solution: Deploy Frontend as Separate Service

You need **TWO services** on Render:

1. ✅ **Backend** (Web Service) - Already deployed
2. ❌ **Frontend** (Static Site) - Need to deploy this!

## Quick Fix Steps

### Step 1: Deploy Frontend (Static Site)

1. Go to your **Render Dashboard**
2. Click **"New +"** → **"Static Site"** (NOT Web Service!)
3. **Configure**:
   - **Name**: `saltier-frontend` (or any name)
   - **Repository**: Select `AnasTanwar5/saltier-web`
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist` ⚠️ **IMPORTANT!**
4. **Environment Variables**:
   - Click "Add Environment Variable"
   - **Name**: `VITE_API_URL`
   - **Value**: `https://saltier-web.onrender.com/api` 
     (Use your actual backend URL - the one showing "Cannot GET /")
5. Click **"Create Static Site"**
6. Wait 3-5 minutes for build

### Step 2: Access the Frontend URL

After deployment, Render will give you a **NEW URL** for the frontend:
- Example: `https://saltier-frontend.onrender.com`
- **This is the URL you should visit**, not the backend URL!

### Step 3: Verify Setup

You should now have:
- **Backend**: `https://saltier-web.onrender.com` (API only)
- **Frontend**: `https://saltier-frontend.onrender.com` (Your website)

## How to Check Which Service You Have

In Render Dashboard:
- **Web Service** = Backend (shows "Cannot GET /")
- **Static Site** = Frontend (shows your website)

## If You Only See One Service

If you only deployed one service, you need to:
1. Keep the backend (Web Service) as is
2. Deploy a **second service** as **Static Site** for the frontend

## Testing

1. **Backend URL** (`https://saltier-web.onrender.com`):
   - Should show JSON with API info
   - Or visit: `https://saltier-web.onrender.com/api/health`

2. **Frontend URL** (`https://saltier-frontend.onrender.com`):
   - Should show your Saltier website
   - This is what users should visit!

## Common Mistakes

❌ **Wrong**: Deploying frontend as "Web Service"
✅ **Right**: Deploying frontend as "Static Site"

❌ **Wrong**: Accessing backend URL in browser
✅ **Right**: Accessing frontend URL in browser

❌ **Wrong**: Not setting `VITE_API_URL` environment variable
✅ **Right**: Set `VITE_API_URL` to your backend URL + `/api`

## Still Having Issues?

1. Check Render logs for build errors
2. Verify `Publish Directory` is set to `dist`
3. Make sure `VITE_API_URL` points to your backend + `/api`
4. Wait for build to complete (can take 5+ minutes first time)


