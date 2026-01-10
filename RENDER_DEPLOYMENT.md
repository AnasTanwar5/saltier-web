# Deploying Saltier to Render (Full Stack)

This guide will help you deploy both frontend and backend to Render.

## Prerequisites

- GitHub account with your private repository
- Render account (free tier works)
- MongoDB Atlas connection string

## Step 1: Deploy Backend (Web Service)

1. **Go to [Render.com](https://render.com)** and sign up/login with GitHub

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `AnasTanwar5/saltier-web`
   - Render will ask for access to your private repo (grant it)

3. **Configure Backend Service**:
   - **Name**: `saltier-backend` (or any name you like)
   - **Region**: Choose closest to you (e.g., Singapore, US East)
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `./` if needed)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build:server`
   - **Start Command**: `npm run start:server`
   - **Instance Type**: Free (or paid if you need more resources)

4. **Environment Variables**:
   Click "Advanced" → "Add Environment Variable":
   - `MONGODB_URI` = Your MongoDB connection string
   - `PORT` = `10000` (Render uses port from env or 10000)
   - `NODE_ENV` = `production`

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes first time)
   - Render will give you a URL like: `https://saltier-backend.onrender.com`
   - **Copy this URL** - you'll need it for the frontend

## Step 2: Deploy Frontend (Static Site)

1. **Still in Render Dashboard**, click "New +" → "Static Site"

2. **Configure Frontend**:
   - **Name**: `saltier-frontend` (or any name)
   - **Repository**: Select `AnasTanwar5/saltier-web`
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Environment Variables**:
   Click "Add Environment Variable":
   - `VITE_API_URL` = `https://saltier-backend.onrender.com/api`
     (Use your actual backend URL from Step 1)

4. **Deploy**:
   - Click "Create Static Site"
   - Wait for build (3-5 minutes)
   - Render will give you a URL like: `https://saltier-frontend.onrender.com`

## Step 3: Update MongoDB Atlas

1. Go to **MongoDB Atlas** → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - Or add Render's IP ranges if you want to be more secure
4. Click **"Confirm"**

## Step 4: Update Backend for Render

Render requires a few adjustments. Let's update the server:

### Update server/index.ts

The server needs to listen on the port from environment variable:

```typescript
const PORT = process.env.PORT || 3001;
```

This should already be correct, but verify it's using `process.env.PORT`.

### CORS Configuration

Make sure CORS allows your frontend domain. Update `server/index.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://saltier-frontend.onrender.com', // Your frontend URL
    process.env.FRONTEND_URL || ''
  ],
  credentials: true
}));
```

## Step 5: Test Your Deployment

1. **Test Backend**:
   - Visit: `https://saltier-backend.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**:
   - Visit your frontend URL
   - Try adding an appetizer
   - Check if data saves to MongoDB

## Render-Specific Considerations

### Free Tier Limitations

- **Spins down after 15 minutes** of inactivity
- **First request after spin-down takes 30-60 seconds** (cold start)
- **750 hours/month free** (enough for most projects)

### Upgrade to Paid (Optional)

- **$7/month**: No spin-down, always on
- **Better performance**
- **Custom domains**

### Auto-Deploy

- Render auto-deploys on every push to `main` branch
- Both frontend and backend will update automatically

## Environment Variables Summary

**Backend (Web Service):**
- `MONGODB_URI` = Your MongoDB connection string
- `PORT` = `10000` (or leave empty, Render auto-assigns)
- `NODE_ENV` = `production`

**Frontend (Static Site):**
- `VITE_API_URL` = `https://your-backend.onrender.com/api`

## Troubleshooting

### Backend won't start
- Check build logs in Render dashboard
- Verify `build:server` script works locally
- Check if `PORT` environment variable is set

### Frontend can't reach backend
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Make sure backend URL includes `/api` at the end

### MongoDB connection fails
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas Network Access
- Check backend logs for connection errors

### Slow first request
- Normal on free tier (cold start)
- Consider upgrading to paid for always-on

## Custom Domain (Optional)

1. In Render dashboard → Your service → Settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records as instructed

## Cost

- **Free Tier**: $0/month (with spin-down after inactivity)
- **Paid Tier**: $7/month per service (always on, better performance)

**Total Free**: $0/month (both services on free tier)
**Total Paid**: $14/month (both services always on)

## Advantages of Render

✅ Everything in one place (frontend + backend)
✅ Easy to manage
✅ Free tier available
✅ Auto-deploy from GitHub
✅ Custom domains support
✅ SSL certificates included

## Next Steps After Deployment

1. Test all features (add appetizers, create coupons)
2. Set up custom domain (optional)
3. Monitor logs in Render dashboard
4. Consider upgrading if you need always-on service



