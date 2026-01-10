# 🚀 Quick Deploy to Render - Saltier App

Deploy both frontend and backend to Render in minutes!

## Step 1: Deploy Backend (5 minutes)

1. Go to **https://render.com** → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect repo: `AnasTanwar5/saltier-web`
4. **Settings**:
   - **Name**: `saltier-backend`
   - **Build Command**: `npm install && npm run build:server`
   - **Start Command**: `npm run start:server`
   - **Instance**: Free
5. **Environment Variables**:
   - `MONGODB_URI` = Your MongoDB connection string
   - `PORT` = `10000`
6. Click **"Create Web Service"**
7. **Copy the URL** (e.g., `https://saltier-backend.onrender.com`)

## Step 2: Deploy Frontend (3 minutes)

1. In Render, click **"New +"** → **"Static Site"**
2. **Settings**:
   - **Name**: `saltier-frontend`
   - **Repository**: `AnasTanwar5/saltier-web`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
3. **Environment Variables**:
   - `VITE_API_URL` = `https://saltier-backend.onrender.com/api`
     (Use your actual backend URL from Step 1)
4. Click **"Create Static Site"**
5. Done! 🎉

## Step 3: Update MongoDB Atlas

1. MongoDB Atlas → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (`0.0.0.0/0`)
4. Save

## ✅ That's It!

- **Frontend**: `https://saltier-frontend.onrender.com`
- **Backend**: `https://saltier-backend.onrender.com`
- **Auto-deploys** on every git push!

## ⚠️ Free Tier Note

- Services spin down after 15 min of inactivity
- First request after spin-down takes 30-60 seconds (cold start)
- Upgrade to paid ($7/month) for always-on service

## 🔧 Troubleshooting

**Backend won't start?**
- Check build logs in Render
- Verify `MONGODB_URI` is set correctly

**Frontend can't reach backend?**
- Check `VITE_API_URL` environment variable
- Make sure URL ends with `/api`

**MongoDB connection fails?**
- Verify Network Access in MongoDB Atlas
- Check backend logs for errors

## 💰 Cost: $0/month (Free tier) or $14/month (Always-on)



