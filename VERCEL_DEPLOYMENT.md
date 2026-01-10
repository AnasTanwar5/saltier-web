# Deploying Saltier to Vercel

This guide will help you deploy your Saltier application to Vercel. Since your app has both a frontend and backend, we'll deploy them separately.

## Prerequisites

- GitHub account with your private repository
- Vercel account (free tier works)
- MongoDB Atlas connection string

## Option 1: Deploy Frontend to Vercel + Backend to Railway/Render (Recommended)

### Step 1: Deploy Backend First

**Option A: Railway (Easiest)**

1. Go to [Railway.app](https://railway.app) and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your `saltier-web` repository
4. Railway will auto-detect it's a Node.js project
5. Add environment variable:
   - `MONGODB_URI` = your MongoDB connection string
   - `PORT` = leave empty (Railway auto-assigns)
6. Railway will deploy and give you a URL like: `https://your-app.railway.app`
7. **Copy this backend URL** - you'll need it for the frontend

**Option B: Render**

1. Go to [Render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Settings:
   - **Build Command**: `npm install && npm run build:server`
   - **Start Command**: `npm run start:server`
   - **Environment**: Node
5. Add environment variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `PORT` = 10000 (or leave empty)
6. Deploy and copy the backend URL

### Step 2: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign up/login with GitHub
2. Click **"Add New Project"**
3. **Import your private repository**:
   - Select `AnasTanwar5/saltier-web`
   - Vercel will ask for access to your private repo (grant it)
4. **Configure Project**:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)
5. **Environment Variables**:
   Click "Environment Variables" and add:
   - `VITE_API_URL` = `https://your-backend-url.railway.app/api` (or your Render URL)
     - For Production, Preview, and Development
6. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Vercel will give you a URL like: `https://saltier-web.vercel.app`

### Step 3: Update MongoDB Atlas Network Access

1. Go to MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (allows all IPs) OR add your Railway/Render IP
3. This allows your backend to connect to MongoDB

## Option 2: Deploy Everything to Vercel (Serverless Functions)

This requires converting your Express backend to Vercel serverless functions. More complex but everything in one place.

### Converting Backend to Serverless Functions

1. Create `api/` folder in root
2. Convert Express routes to serverless functions
3. Update Vercel config

**Note**: This is more complex. Option 1 is recommended for simplicity.

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set correctly
- [ ] MongoDB Atlas network access configured
- [ ] Test the deployed frontend
- [ ] Test API endpoints from frontend
- [ ] Verify data is saving to MongoDB

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` environment variable in Vercel
- Verify backend URL is correct and accessible
- Check browser console for CORS errors

### Backend can't connect to MongoDB
- Verify `MONGODB_URI` is set correctly
- Check MongoDB Atlas Network Access (IP whitelist)
- Check backend logs for connection errors

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

## Environment Variables Summary

**Vercel (Frontend):**
- `VITE_API_URL` = Your backend API URL

**Railway/Render (Backend):**
- `MONGODB_URI` = Your MongoDB connection string
- `PORT` = (optional, auto-assigned)

## Quick Deploy Commands

After initial setup, updates are automatic:
- Push to `main` branch → Vercel auto-deploys
- Push to `main` branch → Railway/Render auto-deploys

## Cost

- **Vercel**: Free tier (more than enough for this project)
- **Railway**: Free tier with $5 credit/month
- **Render**: Free tier available
- **MongoDB Atlas**: Free tier (M0 cluster)

Total: **$0/month** for small projects!



