# Deploy Frontend to Vercel - Private Repository Guide

Step-by-step guide to deploy your Saltier frontend to Vercel with a private GitHub repository.

## 🎯 Prerequisites

- ✅ Your backend is already deployed on Render: `https://saltier-web.onrender.com`
- ✅ Your GitHub repository is private: `AnasTanwar5/saltier-web`
- ✅ You have a Vercel account (or can create one)

## 📋 Step-by-Step Deployment

### Step 1: Sign Up / Log In to Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Private Repository

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your repositories
3. Find **`AnasTanwar5/saltier-web`** in the list
4. If you don't see it:
   - Click **"Adjust GitHub App Permissions"**
   - Make sure **"Private Repositories"** is enabled
   - Grant access to your private repos
   - Refresh the page
5. Click **"Import"** next to `saltier-web`

### Step 3: Configure Project Settings

Vercel should auto-detect your Vite project, but verify these settings:

**Project Name:**
- Default: `saltier-web` (you can change it)
- This will be your URL: `https://saltier-web.vercel.app`

**Framework Preset:**
- Should auto-detect: **"Vite"** ✅
- If not, select **"Vite"** manually

**Root Directory:**
- Leave as **`./`** (root of repository)

**Build and Output Settings:**
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅
- **Install Command**: `npm install` ✅

**Node.js Version:**
- Select **18.x** or **20.x** (in Advanced settings)

### Step 4: Add Environment Variables

**This is crucial!** You need to tell the frontend where your backend is.

1. In the project configuration, scroll to **"Environment Variables"**
2. Click **"Add"** or the **"Environment Variables"** section
3. Add this variable:

   **Variable Name:** `VITE_API_URL`
   
   **Value:** `https://saltier-web.onrender.com/api`
   
   **Environments:** Select all three:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. Click **"Save"** or **"Add"**

### Step 5: Deploy!

1. Review all settings one more time
2. Click **"Deploy"** button (big blue button at bottom)
3. Wait 2-3 minutes for build to complete
4. You'll see build logs in real-time

### Step 6: Get Your Live URL

After deployment completes:

1. You'll see **"Congratulations!"** message
2. Your site is live at: `https://saltier-web.vercel.app` (or your custom name)
3. Click **"Visit"** to open your deployed site

## ✅ Verification Checklist

After deployment, verify:

- [ ] Site loads without errors
- [ ] Styles/CSS are working (not black text on white)
- [ ] Can see appetizers (if any in database)
- [ ] Can add new appetizers
- [ ] Backend connection works (check browser console for API calls)

## 🔧 Troubleshooting

### Issue: Can't See Private Repository

**Solution:**
1. Go to GitHub → Settings → Applications → Authorized OAuth Apps
2. Find "Vercel"
3. Click "Configure"
4. Make sure "Private Repositories" is checked
5. Save and refresh Vercel

### Issue: Build Fails

**Check:**
- Build logs in Vercel dashboard
- Verify `package.json` has `build` script
- Check for TypeScript errors
- Verify all dependencies are in `package.json`

### Issue: Styles Not Loading

**Solution:**
- Hard refresh browser: `Ctrl + Shift + R`
- Check if `dist` folder has CSS files in build logs
- Verify `vite.config.ts` has correct build settings

### Issue: Frontend Can't Reach Backend

**Check:**
- `VITE_API_URL` environment variable is set correctly
- Value should be: `https://saltier-web.onrender.com/api` (with `/api` at end)
- Check browser console for CORS errors
- Verify backend CORS allows Vercel domain

## 🎯 Environment Variables Summary

**Required:**
- `VITE_API_URL` = `https://saltier-web.onrender.com/api`

**Optional:**
- None needed for frontend

## 🔄 Auto-Deploy

After initial setup:
- Every push to `main` branch = automatic deployment
- Every pull request = preview deployment
- No manual steps needed!

## 📱 Custom Domain (Optional)

1. In Vercel dashboard → Your project → Settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions
5. SSL certificate is automatic!

## 💰 Cost

- **Vercel Free Tier**: 
  - Unlimited deployments
  - 100GB bandwidth/month
  - Perfect for your project
  - **Cost: $0/month**

## 🎉 You're Done!

Your frontend is now live on Vercel:
- **URL**: `https://saltier-web.vercel.app` (or your custom name)
- **Backend**: `https://saltier-web.onrender.com`
- **Auto-deploys** on every git push

## 📊 Quick Reference

**Frontend URL:** `https://saltier-web.vercel.app`
**Backend URL:** `https://saltier-web.onrender.com`
**API Endpoint:** `https://saltier-web.onrender.com/api`

**Environment Variable:**
```
VITE_API_URL=https://saltier-web.onrender.com/api
```

## 🆘 Need Help?

- Check Vercel build logs for errors
- Check browser console (F12) for frontend errors
- Verify environment variables are set
- Make sure backend is running and accessible


