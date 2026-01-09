# Quick Deploy Guide - Saltier to Vercel

## 🚀 Quick Steps

### 1. Deploy Backend (Railway - Easiest)

1. Go to https://railway.app → Sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `saltier-web` repository
4. Add Environment Variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string (from `.env`)
5. Railway will auto-deploy
6. **Copy the URL** (e.g., `https://saltier-backend.railway.app`)

### 2. Deploy Frontend (Vercel)

1. Go to https://vercel.com → Sign up/login with GitHub
2. Click **"Add New Project"**
3. Import `AnasTanwar5/saltier-web` (grant access to private repo)
4. **Settings** (should auto-detect):
   - Framework: Vite ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist` ✅
5. **Environment Variables**:
   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app/api`
   - Select: Production, Preview, Development
6. Click **"Deploy"**
7. Wait 2-3 minutes → Done! 🎉

### 3. Update MongoDB Atlas

1. MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (allows all IPs)
3. Save

## ✅ That's It!

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.railway.app`
- Auto-deploys on every git push!

## 🔧 Troubleshooting

**Frontend can't reach backend?**
- Check `VITE_API_URL` in Vercel settings
- Make sure backend URL ends with `/api`

**Backend can't connect to MongoDB?**
- Check MongoDB Atlas Network Access
- Verify `MONGODB_URI` in Railway

## 💰 Cost: $0/month (Free tiers)

