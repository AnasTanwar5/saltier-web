import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import appetizerRoutes from './routes/appetizerRoutes.js';
import couponRoutes from './routes/couponRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB using MONGO_URI
connectDB();

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:8080',
  process.env.FRONTEND_URL,
  'https://saltier.vercel.app'
].filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (Postman/mobile apps)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      /\.onrender\.com$/.test(origin) ||
      /\.vercel\.app$/.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error('CORS not allowed'));
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/appetizers', appetizerRoutes);
app.use('/api/coupons', couponRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running'
  });
});

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Saltier API Server',
    status: 'running',
    endpoints: {
      health: '/api/health',
      appetizers: '/api/appetizers',
      coupons: '/api/coupons'
    },
    note: 'This is the backend API. Please use frontend URL for website.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
