# Saltier - MongoDB Integration

This project now uses MongoDB Atlas as its database instead of localStorage.

## Quick Start

1. **Set up MongoDB Atlas** (see `MONGODB_SETUP.md` for detailed instructions)

2. **Create `.env` file**:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   VITE_API_URL=http://localhost:3001/api
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the application**:
   ```bash
   # Run both frontend and backend
   npm run dev:all
   
   # Or run separately:
   npm run dev:server  # Backend on port 3001
   npm run dev         # Frontend on port 8080
   ```

## Project Structure

```
saltier-main/
├── server/                 # Backend server
│   ├── config/
│   │   └── db.ts          # MongoDB connection
│   ├── models/
│   │   ├── Appetizer.ts   # Appetizer model
│   │   └── Coupon.ts      # Coupon model
│   ├── routes/
│   │   ├── appetizerRoutes.ts
│   │   └── couponRoutes.ts
│   ├── index.ts           # Server entry point
│   └── tsconfig.json
├── src/                    # Frontend React app
│   ├── lib/
│   │   ├── api.ts         # API client
│   │   └── data.ts        # Data layer (uses API)
│   └── ...
└── .env                    # Environment variables (not in git)
```

## API Endpoints

### Appetizers
- `GET /api/appetizers` - Get all appetizers
- `GET /api/appetizers/:id` - Get single appetizer
- `POST /api/appetizers` - Create appetizer
- `PUT /api/appetizers/:id` - Update appetizer
- `DELETE /api/appetizers/:id` - Delete appetizer
- `POST /api/appetizers/seed` - Seed default appetizers

### Coupons
- `GET /api/coupons` - Get all coupons
- `GET /api/coupons/:id` - Get coupon by ID
- `GET /api/coupons/code/:code` - Get coupon by code
- `POST /api/coupons` - Create coupon
- `DELETE /api/coupons/:id` - Delete coupon

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | Required |
| `PORT` | Backend server port | 3001 |
| `VITE_API_URL` | API base URL for frontend | http://localhost:3001/api |

## Scripts

- `npm run dev` - Start frontend only
- `npm run dev:server` - Start backend only
- `npm run dev:all` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run build:server` - Build backend for production
- `npm run start:server` - Run built backend

## Migration from localStorage

The application has been migrated from localStorage to MongoDB:
- ✅ All data now persists in MongoDB Atlas
- ✅ Data is shared across all users/devices
- ✅ Admin can manage appetizers from dashboard
- ✅ Coupons are stored in database
- ✅ No data loss on browser clear

## Troubleshooting

See `MONGODB_SETUP.md` for detailed troubleshooting guide.

