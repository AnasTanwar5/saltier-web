import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import appetizerRoutes from './routes/appetizerRoutes.js';
import couponRoutes from './routes/couponRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    process.env.FRONTEND_URL || '',
    /\.onrender\.com$/, // Allow all Render frontend URLs
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json({ limit: '10mb' })); // Increase limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/appetizers', appetizerRoutes);
app.use('/api/coupons', couponRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root route - helpful message
app.get('/', (req, res) => {
  res.json({ 
    message: 'Saltier API Server',
    status: 'running',
    endpoints: {
      health: '/api/health',
      appetizers: '/api/appetizers',
      coupons: '/api/coupons'
    },
    note: 'This is the backend API. Please access the frontend URL for the web application.'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

