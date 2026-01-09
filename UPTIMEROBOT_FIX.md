# Fix: UptimeRobot Not Allowing Duplicate URLs

If UptimeRobot won't let you create multiple monitors with the same URL, use **different endpoints** or **query parameters** to make each URL unique.

## ✅ Solution: Use Different Endpoints

Your backend has multiple endpoints. Use different ones for each monitor!

### Your Backend URL
```
https://saltier-web.onrender.com
```

### Monitor Setup (5-6 Monitors)

**Monitor 1:**
- **Friendly Name**: `Saltier Backend - Health Check 1`
- **URL**: `https://saltier-web.onrender.com/api/health`
- **Interval**: 5 minutes

**Monitor 2:**
- **Friendly Name**: `Saltier Backend - Health Check 2`
- **URL**: `https://saltier-web.onrender.com/api/health?monitor=2`
- **Interval**: 5 minutes
- **Note**: Query parameter `?monitor=2` makes it unique

**Monitor 3:**
- **Friendly Name**: `Saltier Backend - Appetizers`
- **URL**: `https://saltier-web.onrender.com/api/appetizers`
- **Interval**: 5 minutes
- **Note**: Different endpoint (GET request, lightweight)

**Monitor 4:**
- **Friendly Name**: `Saltier Backend - Health Check 3`
- **URL**: `https://saltier-web.onrender.com/api/health?ping=1`
- **Interval**: 5 minutes
- **Note**: Different query parameter

**Monitor 5:**
- **Friendly Name**: `Saltier Backend - Root`
- **URL**: `https://saltier-web.onrender.com/`
- **Interval**: 5 minutes
- **Note**: Root endpoint (also lightweight)

**Monitor 6:**
- **Friendly Name**: `Saltier Backend - Health Check 4`
- **URL**: `https://saltier-web.onrender.com/api/health?check=keepalive`
- **Interval**: 5 minutes
- **Note**: Another unique query parameter

## 🎯 Recommended Setup

### Option 1: Query Parameters (Easiest)

All monitors use `/api/health` but with different query parameters:

1. `https://saltier-web.onrender.com/api/health?m=1`
2. `https://saltier-web.onrender.com/api/health?m=2`
3. `https://saltier-web.onrender.com/api/health?m=3`
4. `https://saltier-web.onrender.com/api/health?m=4`
5. `https://saltier-web.onrender.com/api/health?m=5`
6. `https://saltier-web.onrender.com/api/health?m=6`

**Why this works:**
- Query parameters make URLs technically different
- All hit the same lightweight endpoint
- Backend ignores the query parameters
- UptimeRobot sees them as different URLs

### Option 2: Different Endpoints

Mix of endpoints (all lightweight):

1. `/api/health` - Health check
2. `/api/appetizers` - Get appetizers (GET, no data returned if empty)
3. `/` - Root endpoint
4. `/api/health?ping=1` - Health with query
5. `/api/health?ping=2` - Health with different query
6. `/api/coupons` - Get coupons (GET, lightweight)

## 📋 Step-by-Step with Query Parameters

### Monitor 1
1. Click "+ Add New Monitor"
2. **Type**: HTTP(s)
3. **Friendly Name**: `Saltier Monitor 1`
4. **URL**: `https://saltier-web.onrender.com/api/health?m=1`
5. **Interval**: 5 minutes
6. Click "Create Monitor"

### Monitor 2
1. Click "+ Add New Monitor"
2. **Type**: HTTP(s)
3. **Friendly Name**: `Saltier Monitor 2`
4. **URL**: `https://saltier-web.onrender.com/api/health?m=2`
5. **Interval**: 5 minutes
6. Click "Create Monitor"

### Monitor 3
1. Click "+ Add New Monitor"
2. **Type**: HTTP(s)
3. **Friendly Name**: `Saltier Monitor 3`
4. **URL**: `https://saltier-web.onrender.com/api/health?m=3`
5. **Interval**: 5 minutes
6. Click "Create Monitor"

### Monitor 4
1. Click "+ Add New Monitor"
2. **Type**: HTTP(s)
3. **Friendly Name**: `Saltier Monitor 4`
4. **URL**: `https://saltier-web.onrender.com/api/health?m=4`
5. **Interval**: 5 minutes
6. Click "Create Monitor"

### Monitor 5
1. Click "+ Add New Monitor"
2. **Type**: HTTP(s)
3. **Friendly Name**: `Saltier Monitor 5`
4. **URL**: `https://saltier-web.onrender.com/api/health?m=5`
5. **Interval**: 5 minutes
6. Click "Create Monitor"

### Monitor 6
1. Click "+ Add New Monitor"
2. **Type**: HTTP(s)
3. **Friendly Name**: `Saltier Monitor 6`
4. **URL**: `https://saltier-web.onrender.com/api/health?m=6`
5. **Interval**: 5 minutes
6. Click "Create Monitor"

## ✅ Verification

After creating all monitors:

1. All should show **"Up"** status
2. Each will ping your backend
3. Backend will stay awake!

## 🔍 Why This Works

- **Query parameters** (`?m=1`, `?m=2`, etc.) make URLs technically different
- UptimeRobot sees them as unique URLs
- Your backend ignores query parameters on `/api/health`
- All monitors effectively ping the same endpoint
- Result: 5-6 pings every 5 minutes = backend stays awake!

## 📊 Expected Results

With 5 monitors using query parameters:
- Each pings every 5 minutes
- Combined: ~1 ping per minute
- Backend wake-up time: < 30 seconds
- **Cost: $0** (all free)

## 🎉 Done!

All monitors will work, and your backend will stay awake on Render's free tier!

