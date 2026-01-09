# Keep Render Backend Awake - Multiple Uptime Monitors

Since Render doesn't allow duplicate monitors, we'll use multiple **external** uptime monitoring services to ping your backend and keep it awake.

## 🎯 Goal
Keep your backend awake by having 5-6 different services ping it every 5-10 minutes.

## ✅ Solution: Use Multiple External Uptime Services

### Free Uptime Monitoring Services

1. **UptimeRobot** (Free - 50 monitors)
   - URL: https://uptimerobot.com
   - Interval: 5 minutes (free tier)
   - Setup: Add HTTP(s) Monitor → Your backend URL

2. **Better Uptime** (Free - 10 monitors)
   - URL: https://betteruptime.com
   - Interval: 1 minute (free tier)
   - Setup: Add Monitor → HTTP Check

3. **Uptime.com** (Free - 1 monitor, but can create multiple accounts)
   - URL: https://uptime.com
   - Interval: 5 minutes
   - Setup: Add Monitor → HTTP Check

4. **Pingdom** (Free trial)
   - URL: https://www.pingdom.com
   - Interval: 1 minute
   - Setup: Add Check → HTTP Check

5. **StatusCake** (Free - 10 monitors)
   - URL: https://www.statuscake.com
   - Interval: 5 minutes
   - Setup: Add Uptime Test → HTTP(S)

6. **Cron-Job.org** (Free - unlimited)
   - URL: https://cron-job.org
   - Interval: 5 minutes
   - Setup: Create Cron Job → HTTP Request

## 🚀 Quick Setup Guide

### Option 1: UptimeRobot (Recommended - Easiest)

1. Go to https://uptimerobot.com → Sign up (free)
2. Click **"Add New Monitor"**
3. Configure:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Saltier Backend 1
   - **URL**: `https://your-backend.onrender.com/api/health`
   - **Monitoring Interval**: 5 minutes
4. Click **"Create Monitor"**
5. Repeat steps 2-4 to create 4-5 more monitors (all pointing to same URL)

**Note**: UptimeRobot free tier allows 50 monitors, so you can create multiple!

### Option 2: Multiple Services (Best Coverage)

Set up 1-2 monitors on each service:

1. **UptimeRobot**: 2 monitors (5 min interval each)
2. **Better Uptime**: 2 monitors (1 min interval)
3. **Cron-Job.org**: 2 monitors (5 min interval)
4. **StatusCake**: 1 monitor (5 min interval)

Total: 7 monitors pinging your backend!

## 📋 Step-by-Step Setup

### UptimeRobot Setup

1. Sign up at https://uptimerobot.com
2. Dashboard → **"Add New Monitor"**
3. Settings:
   - **Type**: HTTP(s)
   - **Friendly Name**: Saltier Monitor 1
   - **URL**: `https://saltier-backend.onrender.com/api/health`
   - **Interval**: 5 minutes
4. Click **"Create Monitor"**
5. Repeat for Monitor 2, 3, 4, 5 (all same URL, different names)

### Better Uptime Setup

1. Sign up at https://betteruptime.com
2. Dashboard → **"Add Monitor"**
3. Settings:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://saltier-backend.onrender.com/api/health`
   - **Check Interval**: 1 minute
   - **Name**: Saltier Backend
4. Click **"Create Monitor"**
5. Create 1-2 more monitors

### Cron-Job.org Setup

1. Sign up at https://cron-job.org
2. Dashboard → **"Create Cronjob"**
3. Settings:
   - **Title**: Keep Backend Awake
   - **Address**: `https://saltier-backend.onrender.com/api/health`
   - **Schedule**: Every 5 minutes
4. Click **"Create Cronjob"**
5. Create 2-3 more cronjobs

## 🎯 Recommended Configuration

For maximum uptime, use this setup:

| Service | Monitors | Interval | Total Pings/Hour |
|---------|----------|----------|------------------|
| UptimeRobot | 3 | 5 min | 36 |
| Better Uptime | 2 | 1 min | 120 |
| Cron-Job.org | 2 | 5 min | 24 |
| **Total** | **7** | - | **180 pings/hour** |

This ensures your backend gets pinged **every 20-30 seconds**, keeping it always awake!

## 🔧 Alternative: Self-Hosted Solution

If you want more control, you can create a simple script:

### Create a Keep-Alive Script

Create a file `keep-alive.js`:

```javascript
// Simple keep-alive script
const urls = [
  'https://your-backend.onrender.com/api/health',
];

async function ping() {
  for (const url of urls) {
    try {
      await fetch(url);
      console.log(`✅ Pinged ${url} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error(`❌ Failed to ping ${url}:`, error);
    }
  }
}

// Ping every 4 minutes
setInterval(ping, 4 * 60 * 1000);
ping(); // Initial ping
```

Then deploy this script to:
- **GitHub Actions** (free, runs every 5 minutes)
- **Vercel Cron** (free)
- **Railway** (separate service)

## 📊 Monitor Your Monitors

After setting up, verify they're working:

1. Check each service's dashboard
2. Verify all monitors show "UP" status
3. Check Render logs to see incoming requests
4. Your backend should stay awake!

## ⚠️ Important Notes

- **Free Tier Limits**: Most services have rate limits on free tier
- **Render Free Tier**: Still spins down after 15 min, but monitors will wake it up quickly
- **Upgrade Option**: Render paid tier ($7/month) = always on, no need for monitors
- **Cost**: All solutions above are **FREE**

## 💡 Pro Tip

Use the `/api/health` endpoint (not root `/`) because:
- It's lightweight
- Returns quickly
- Doesn't trigger any heavy operations
- Perfect for monitoring

## 🎉 Result

With 5-6 monitors pinging every 5 minutes:
- Backend wakes up within 30 seconds of spin-down
- Users experience minimal delay
- **Cost: $0/month** (all free services)

## Quick Links

- **UptimeRobot**: https://uptimerobot.com
- **Better Uptime**: https://betteruptime.com
- **Cron-Job.org**: https://cron-job.org
- **StatusCake**: https://www.statuscake.com

