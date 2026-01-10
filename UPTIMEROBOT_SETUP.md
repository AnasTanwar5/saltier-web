# How to Add 5-6 Monitors on UptimeRobot

UptimeRobot allows multiple monitors for the same URL! Here's exactly how to set them up.

## 🎯 Step-by-Step Guide

### Step 1: Sign Up / Log In

1. Go to **https://uptimerobot.com**
2. Sign up for a free account (or log in if you already have one)
3. Free tier allows **50 monitors** - more than enough!

### Step 2: Create Your First Monitor

1. In your UptimeRobot dashboard, click **"+ Add New Monitor"** (big green button)
2. Fill in the details:
   - **Monitor Type**: Select **"HTTP(s)"**
   - **Friendly Name**: `Saltier Backend Monitor 1`
   - **URL (or IP)**: `https://your-backend.onrender.com/api/health`
     - Replace `your-backend` with your actual Render backend URL
     - Make sure to include `/api/health` at the end
   - **Monitoring Interval**: Select **"Every 5 minutes"**
   - **Alert Contacts**: (Optional) Add your email if you want notifications
3. Click **"Create Monitor"**

### Step 3: Create Additional Monitors (4-5 more)

**Repeat Step 2** for each additional monitor:

**Monitor 2:**
- Friendly Name: `Saltier Backend Monitor 2`
- URL: Same as Monitor 1 (`https://your-backend.onrender.com/api/health`)
- Interval: 5 minutes
- Click "Create Monitor"

**Monitor 3:**
- Friendly Name: `Saltier Backend Monitor 3`
- URL: Same URL again
- Interval: 5 minutes
- Click "Create Monitor"

**Monitor 4:**
- Friendly Name: `Saltier Backend Monitor 4`
- URL: Same URL
- Interval: 5 minutes
- Click "Create Monitor"

**Monitor 5:**
- Friendly Name: `Saltier Backend Monitor 5`
- URL: Same URL
- Interval: 5 minutes
- Click "Create Monitor"

**Monitor 6 (Optional):**
- Friendly Name: `Saltier Backend Monitor 6`
- URL: Same URL
- Interval: 5 minutes
- Click "Create Monitor"

## ✅ Verification

After creating all monitors:

1. Go to your **Dashboard**
2. You should see all 5-6 monitors listed
3. Each should show:
   - ✅ **Status**: "Up" (green)
   - **Last Check**: Recent timestamp
   - **Response Time**: Usually < 1 second

## 🎯 Pro Tips

### Stagger the Intervals (Optional)

For even better coverage, you can stagger the intervals:

- **Monitor 1**: Every 5 minutes
- **Monitor 2**: Every 5 minutes (but starts at different time)
- **Monitor 3**: Every 5 minutes
- **Monitor 4**: Every 5 minutes
- **Monitor 5**: Every 5 minutes

UptimeRobot will automatically stagger them, so you'll get pings roughly every 1 minute!

### Use Different Endpoints (Advanced)

You can also ping different endpoints to be extra safe:

- Monitor 1: `/api/health`
- Monitor 2: `/api/health`
- Monitor 3: `/api/appetizers` (lightweight GET request)
- Monitor 4: `/api/health`
- Monitor 5: `/api/health`

But `/api/health` is recommended as it's the lightest.

## 📊 Expected Results

With 5 monitors pinging every 5 minutes:
- **Total pings per hour**: ~60 pings
- **Average time between pings**: ~1 minute
- **Backend wake-up time**: < 30 seconds after spin-down

## ⚠️ Important Notes

1. **Same URL is OK**: UptimeRobot allows multiple monitors for the same URL
2. **Free Tier Limit**: 50 monitors (you're using only 5-6, so plenty of room)
3. **No Duplicate Error**: You won't get "duplicate monitor" error - that's only for Render's built-in monitors
4. **All Monitors Active**: All monitors will ping simultaneously, giving you redundancy

## 🔍 Troubleshooting

### Monitor Shows "Down"
- Check if your backend URL is correct
- Verify `/api/health` endpoint is working
- Check Render logs to see if backend is responding

### Monitor Not Pinging
- Wait a few minutes after creation
- Check monitor settings
- Verify URL is accessible

### Want More Monitors?
- Free tier allows up to 50 monitors
- You can create even more if needed!

## 📱 Quick Checklist

- [ ] Signed up/logged into UptimeRobot
- [ ] Created Monitor 1 with `/api/health` endpoint
- [ ] Created Monitor 2 with same URL
- [ ] Created Monitor 3 with same URL
- [ ] Created Monitor 4 with same URL
- [ ] Created Monitor 5 with same URL
- [ ] Created Monitor 6 (optional) with same URL
- [ ] All monitors showing "Up" status
- [ ] Backend staying awake!

## 🎉 Done!

Once all monitors are created and showing "Up", your backend will be pinged frequently enough to stay awake on Render's free tier!

**Your backend URL format:**
```
https://saltier-backend.onrender.com/api/health
```
(Replace `saltier-backend` with your actual Render service name)



