# Fix: CSS/Styles Not Loading on Render

## Problem
Frontend deployed but showing unstyled content (black text on white background).

## Solution

### Step 1: Update Render Build Settings

In your Render Static Site settings, verify:

1. **Build Command**: `npm install && npm run build`
2. **Publish Directory**: `dist` (must be exactly `dist`)
3. **Node Version**: Set to `18.x` or `20.x` (in Advanced settings)

### Step 2: Rebuild and Redeploy

1. In Render dashboard, go to your Static Site
2. Click **"Manual Deploy"** → **"Clear build cache & deploy"**
3. Wait for build to complete (5-10 minutes)

### Step 3: Verify Build Output

After build, check the logs. You should see:
- ✅ `dist/index.html` created
- ✅ `dist/assets/` folder with CSS and JS files
- ✅ No build errors

### Step 4: Check Browser Console

1. Open your deployed site
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Look for errors like:
   - `Failed to load resource: the server responded with a status of 404`
   - `Refused to apply style from...`

### Step 5: Verify Asset Paths

If assets are 404:
1. Check Render logs for the actual file paths
2. Verify `dist/assets/` contains `.css` files
3. Check if `index.html` references assets correctly

## Common Issues

### Issue 1: Build Command Wrong
❌ Wrong: `npm run build` (might not install dependencies)
✅ Right: `npm install && npm run build`

### Issue 2: Publish Directory Wrong
❌ Wrong: `build`, `public`, or empty
✅ Right: `dist` (exactly as shown)

### Issue 3: Node Version Mismatch
- Set Node version to `18` or `20` in Render settings
- Go to: Static Site → Settings → Environment → Node Version

### Issue 4: CSS Not Generated
- Check if `tailwind.config.ts` is in root
- Verify `postcss.config.js` exists
- Check build logs for Tailwind processing

## Quick Fix Checklist

- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] Node version: 18 or 20
- [ ] Cleared build cache
- [ ] Rebuilt from scratch
- [ ] Checked browser console for errors
- [ ] Verified `dist/assets/` has CSS files

## If Still Not Working

1. **Check Render Build Logs**:
   - Look for errors during `npm run build`
   - Check if Tailwind is processing
   - Verify all dependencies installed

2. **Test Build Locally**:
   ```bash
   npm run build
   ls dist/assets/  # Should show CSS files
   ```

3. **Verify dist/index.html**:
   - Should have `<link>` tags for CSS
   - Asset paths should be relative (e.g., `/assets/index-xxx.css`)

4. **Contact Support**:
   - Share Render build logs
   - Share browser console errors
   - Share your Render service settings



